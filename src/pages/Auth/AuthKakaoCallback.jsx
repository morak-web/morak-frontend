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

        // 2) 토큰 교환
        const params = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_KAKAO_REST_API_KEY, // REST API 키
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI, // 콘솔/authorize와 동일
          code,
        });
        // Client Secret 사용 중이면 주석 해제
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

        // 3) 사용자 정보 조회 (이메일 + 닉네임/이미지)
        window.Kakao.Auth.setAccessToken(tokenJson.access_token);
        const me = await window.Kakao.API.request({ url: '/v2/user/me' });

        const email = me?.kakao_account?.email || null;
        if (!email) {
          // 이메일 동의 재요청
          window.Kakao.Auth.authorize({
            redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
            scope: 'account_email',
            prompt: 'consent',
          });
          return;
        }

        // 카카오 프로필(닉네임/이미지) 추출
        const kaProfile = me?.kakao_account?.profile || {};
        const kakaoNickname =
          kaProfile.nickname || me?.properties?.nickname || null;
        const kakaoImageUrl =
          kaProfile.profile_image_url || me?.properties?.profile_image || '';

        // 4) 우리 서버 로그인(회원가입 통합)
        const res = await apiClient.post('/api/login', { email });
        const { token, isNewMember, user: loginUser } = res.data || {};
        if (!token) throw new Error('no_server_token');
        console.log(kakaoNickname);
        console.log(kakaoImageUrl);

        // 토큰 저장 (이후 요청 Authorization 헤더 자동)
        localStorage.setItem('accessToken', token);

        // 5) 필요하면 닉네임/이미지 채워 넣기 (신규이거나, 기존에 비어있는 경우)
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
            payload.profileImageUrl = kakaoImageUrl;
          }
          if (kakaoImageUrl) {
            payload.profileImageUrl = kakaoImageUrl;
          }
          if (Object.keys(payload).length > 0) {
            try {
              await apiClient.patch('/api/me', payload);
            } catch (e) {
              console.warn('PATCH /api/me failed (continue anyway)', e);
            }
          }
        }

        // 6) URL에서 code 제거(새로고침 시 재교환 방지)
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);

        // 7) 이동 (신규면 온보딩, 아니면 홈)
        navigate(isNewMember ? '/' : '/', { replace: true });
      } catch (err) {
        console.error('[AuthKakaoCallback] failed:', err);
        const msg = err?.message || 'unexpected';
        navigate(`/login?error=${encodeURIComponent(msg)}`, { replace: true });
      }
    })();
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}
