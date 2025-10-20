import MainLayout from '../../components/layout/MainLayout';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [signUpBtnState, setSignUpBtnState] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [idInput, setIdInput] = useState('');
  const [passwordInput, setpasswordInput] = useState('');
  const [confirmpasswordInput, setConfirmPasswordInput] = useState('');

  useEffect(() => {
    if (emailInput && idInput && passwordInput && confirmpasswordInput) {
      setSignUpBtnState(true);
    } else {
      setSignUpBtnState(false);
    }
  }, [emailInput, idInput, passwordInput, confirmpasswordInput]);

  const signUpHandler = () => {
    navigate('/');
  };

  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-b from-sky-50 to-white flex justify-center items-center py-12">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-neutral-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">회원가입</h1>
            <p className="text-neutral-600">모락과 함께 시작하세요</p>
          </div>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              signUpHandler();
            }}
          >
            <div className="flex flex-col gap-4 mb-6">
              <Input
                type="email"
                placeholder="이메일"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <Input
                type="text"
                placeholder="아이디"
                value={idInput}
                onChange={(e) => setIdInput(e.target.value)}
              />
              <Input
                type="password"
                placeholder="비밀번호 입력"
                value={passwordInput}
                onChange={(e) => setpasswordInput(e.target.value)}
              />
              <Input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmpasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={!signUpBtnState}
              className={`w-full h-12 rounded-xl font-semibold mb-6 transition-all ${
                signUpBtnState
                  ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              회원가입
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
            <p>이미 모락 회원이신가요?</p>
            <Link to="/login" className="text-sky-600 font-semibold hover:text-sky-700 transition-colors">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
