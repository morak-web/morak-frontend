import MainLayout from '../../components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/morak-logo.png';
import kakaoLogo from '../../assets/Login/kakao-logo.png';

export default function SocialLoginPage() {
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate('/');
  };

  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-64px)] bg-[#F2F3FA] flex justify-center items-center">
        <div className="w-[471px] h-[244px] bg-white py-[39px] px-[50px] rounded-[10px] shadow-lg flex flex-col items-center justify-between">
          <img src={Logo} alt="logo" className="w-[135px] h-[27px]" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginHandler();
            }}
          >
            <button
              type="submit"
              className={`w-[356px] h-[53px] rounded-[9px]  text-black flex justify-center items-center font-regular mb-[36px] cursor-pointer bg-[#FEE500] gap-[10px]`}
            >
              <img
                src={kakaoLogo}
                alt="kakaoLogo"
                className="w-[17px] h-[17px]"
              />
              <h1>카카오 로그인</h1>
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
