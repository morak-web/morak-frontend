import MainLayout from '../../components/layout/MainLayout';
import Input from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginBtnState, setLoginBtnState] = useState(false);
  const [idInput, setIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const loginHandler = () => {
    navigate('/');
  };

  useEffect(() => {
    if (idInput && passwordInput) {
      setLoginBtnState(true);
    } else {
      setLoginBtnState(false);
    }
  }, [idInput, passwordInput]);

  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-b from-sky-50 to-white flex justify-center items-center py-12">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-neutral-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">로그인</h1>
            <p className="text-neutral-600">모락에 오신 것을 환영합니다</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginHandler();
            }}
          >
            <div className="flex flex-col gap-4 mb-6">
              <Input
                type="text"
                placeholder="아이디 입력"
                value={idInput}
                onChange={(e) => setIdInput(e.target.value)}
              />
              <Input
                type="password"
                placeholder="비밀번호 입력"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
            <div className="flex justify-between mb-8 items-center">
              <label className="flex gap-2 items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 hidden peer"
                />
                <div className="relative">
                  <span className="block w-5 h-5 border-2 border-neutral-300 rounded peer-checked:bg-sky-600 peer-checked:border-sky-600 transition-colors group-hover:border-neutral-400" />
                  <svg className="peer-checked:block hidden w-3 h-3 text-white absolute top-1 left-1 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-neutral-600 text-sm select-none">
                  아이디 저장
                </span>
              </label>
              <Link
                to="/find-id-password"
                className="text-neutral-500 text-sm hover:text-sky-600 transition-colors"
              >
                아이디/비밀번호 찾기
              </Link>
            </div>
            <button
              type="submit"
              disabled={!loginBtnState}
              className={`w-full h-12 rounded-xl font-semibold mb-6 transition-all ${
                loginBtnState
                  ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              로그인
            </button>
          </form>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-neutral-500">또는</span>
            </div>
          </div>
          <div className="text-sm flex justify-center gap-1 text-neutral-600">
            <p>아직 모락 회원이 아니신가요?</p>
            <Link to="/sign-up" className="text-sky-600 font-semibold hover:text-sky-700 transition-colors">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
