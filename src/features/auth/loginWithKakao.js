// src/features/auth/loginWithKakao.js
import { initKakao } from '../../lib/kakao';

export default function loginWithKakao() {
  initKakao();
  window.Kakao.Auth.authorize({
    redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    scope: 'account_email profile_nickname profile_image', // 이메일 동의 필요
  });
}
