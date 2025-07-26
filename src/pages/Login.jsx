import MainLayout from '../components/layout/MainLayout';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import checkIcon from '../assets/Login/check-icon.png';

export default function Login() {
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
      <div className="w-full h-[calc(100vh-64px)] bg-[#F2F3FA] flex justify-center items-center">
        <div className="w-[471px] h-[557px] bg-white py-[39px] px-[50px] rounded-[10px] shadow-lg">
          <h1 className="text-[24px] mb-[55px] font-bold">로그인</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginHandler();
            }}
          >
            <div className="flex flex-col gap-[4px] mb-[15px]">
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
            <div className="flex justify-between mb-[39px]">
              <div className="flex">
                <label className="flex gap-[7px] items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-[17px] h-[17px] hidden peer"
                  />
                  <span className="block w-[17px] h-[17px] border-[1px] border-[#B0B3C6] rounded-[3px] relative" />
                  <img
                    src={checkIcon}
                    alt="checkIcon"
                    className="peer-checked:block hidden w-[16px] h-[17px] absolute"
                  />
                  <span className="text-[#B0B3C6] text-[15px] ">
                    아이디 저장
                  </span>
                </label>
              </div>
              <Link
                to="/find-id-password"
                className="text-[#9397AC] text-[15px]"
              >
                아이디/비밀번호 찾기
              </Link>
            </div>
            <button
              type="submit"
              className={`w-[100%] h-[56px] rounded-[5px]  text-black flex justify-center items-center font-regular mb-[36px] cursor-pointer ${loginBtnState ? 'bg-[#BED2FF]' : 'bg-[#DFE1ED]'}`}
            >
              로그인
            </button>
          </form>
          <div className="w-[100%] h-[2px] bg-[#DFE1ED] mb-[16px]" />
          <div className="text-[15px] flex justify-center gap-[5px]">
            <p>아직 모락 회원이 아니신가요?</p>
            <Link to="/sign-up" className="text-[#93AFFF]">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
