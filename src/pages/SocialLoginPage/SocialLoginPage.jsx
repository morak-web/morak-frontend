import MainLayout from '../../components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/morak-logo.png';
import kakaoLogo from '../../assets/Login/kakao-logo.png';
import loginWithKakao from '../../features/auth/loginWithKakao';

export default function SocialLoginPage() {
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate('/');
  };

  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-b from-sky-50 to-white flex justify-center items-center py-12">
        <div className="w-full max-w-sm bg-white p-10 rounded-2xl shadow-xl border border-neutral-100 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <img src={Logo} alt="logo" className="h-10" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-900 mb-1">간편 로그인</h2>
              <p className="text-neutral-600 text-sm">SNS 계정으로 빠르게 시작하세요</p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginHandler();
            }}
            className="w-full"
          >
            <button
              type="submit"
              onClick={loginWithKakao}
              className="w-full h-12 rounded-xl text-neutral-900 font-semibold flex justify-center items-center cursor-pointer bg-[#FEE500] hover:bg-[#FDD835] gap-3 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              <img
                src={kakaoLogo}
                alt="kakaoLogo"
                className="w-5 h-5"
              />
              <span>카카오로 시작하기</span>
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
