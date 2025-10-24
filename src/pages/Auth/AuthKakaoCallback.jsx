// src/pages/AuthKakaoCallback.jsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/client';

export default function AuthKakaoCallback() {
  const navigate = useNavigate();
  const onceRef = useRef(false);

  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    (async () => {
      try {
        // 0) SDK init
        if (!window.Kakao) throw new Error('sdk_not_loaded');
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
        }

        // 1) code 추출
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        if (!code) throw new Error('no_code_in_callback');

        // 2) 토큰 교환 (프론트에서 직접 교환하는 현재 구조 유지)
        const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI; // 반드시 콘솔값과 동일
        const params = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
          redirect_uri: redirectUri,
          code,
        });
        // client_secret 쓰면 아래 주석 해제
        // params.append('client_secret', import.meta.env.VITE_KAKAO_CLIENT_SECRET);

        const tokenResp = await fetch('https://kauth.kakao.com/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          body: params,
        });
        const tokenJson = await tokenResp.json();
        if (!tokenResp.ok || !tokenJson.access_token) {
          const reason = `${tokenJson.error || 'token_exchange_failed'}:${tokenJson.error_description || ''}`;
          throw new Error(reason);
        }

        // 3) 사용자 정보 조회
        window.Kakao.Auth.setAccessToken(tokenJson.access_token);
        const me = await window.Kakao.API.request({ url: '/v2/user/me' });

        const email = me?.kakao_account?.email || null;
        if (!email) {
          // 이메일 추가 동의 필요 시: 동일 redirectUri(= vercel.app 콜백)로 재요청
          window.Kakao.Auth.authorize({
            redirectUri,
            scope: 'account_email',
            prompt: 'consent',
          });
          return;
        }

        // 카카오 프로필
        const kaProfile = me?.kakao_account?.profile || {};
        const kakaoNickname =
          kaProfile.nickname || me?.properties?.nickname || null;
        const kakaoImageUrl =
          kaProfile.profile_image_url || me?.properties?.profile_image || '';

        // 4) 우리 서버 로그인
        const res = await apiClient.post('/login', { email }); // baseURL에 /api 포함 여부는 apiClient에서 처리
        const { token, isNewMember, user: loginUser } = res.data || {};
        if (!token) throw new Error('no_server_token');

        // 4-1) 토큰 저장 + axios 헤더
        localStorage.setItem('accessToken', token);
        window.dispatchEvent(new Event('auth'));
        try {
          apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        } catch {}

        // 5) 필요시 프로필 보정
        const needFill =
          isNewMember ||
          !loginUser?.nickname ||
          !loginUser?.name ||
          !loginUser?.profileImageUrl;

        if (needFill) {
          const payload = {};
          if (kakaoNickname) {
            payload.name = kakaoNickname;
            payload.nickname = kakaoNickname;
          }
          if (kakaoImageUrl) {
            payload.profileImageUrl = kakaoImageUrl;
          }
          if (Object.keys(payload).length > 0) {
            try {
              await apiClient.patch('/me', payload);
            } catch (e) {
              console.warn('PATCH /me failed (continue anyway)', e);
            }
          }
        }

        // 6) URL 정리
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);

        // 7) 홈으로
        navigate('/', { replace: true });
      } catch (err) {
        console.error('[AuthKakaoCallback] failed:', err);
        const msg = err?.message || 'unexpected';
        navigate(`/login?error=${encodeURIComponent(msg)}`, { replace: true });
      }
    })();
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}
