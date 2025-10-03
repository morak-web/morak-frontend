// src/lib/kakao.js
export function initKakao() {
  if (!window.Kakao) throw new Error('Kakao SDK not loaded');
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
  }
}
