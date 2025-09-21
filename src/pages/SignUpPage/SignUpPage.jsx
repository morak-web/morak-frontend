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
      <div className="w-full min-h-[calc(100vh-64px)] bg-[#F2F3FA] flex justify-center items-center">
        <div className="w-[471px] h-[635px] bg-white py-[39px] px-[50px] rounded-[10px] shadow-lg">
          <h1 className="text-[24px] mb-[30px] font-bold">회원가입</h1>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              signUpHandler();
            }}
          >
            <div className="flex flex-col gap-[10px] mb-[52px]">
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
              className={`w-[100%] h-[56px] rounded-[5px] ${signUpBtnState ? 'bg-[#BED2FF]' : 'bg-[#DFE1ED]'} text-black flex justify-center items-center font-regular mb-[36px] cursor-pointer `}
            >
              회원가입
            </button>
          </form>
          <div className="w-[100%] h-[2px] bg-[#DFE1ED] mb-[16px]" />
          <div className="text-[15px] flex justify-center gap-[5px]">
            <p>이미 모락 회원이신가요?</p>
            <Link to="/login" className="text-[#93AFFF]">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
