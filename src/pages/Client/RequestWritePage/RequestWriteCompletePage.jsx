import MainLayout from '../../../components/layout/MainLayout';
import completeIcon from '../../../assets/RequestWrite/request-write-complete-icon.png';
import { useNavigate } from 'react-router-dom';

export default function RequestWriteCompletePage() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] py-[30px] flex items-center">
        <div className=" w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[37px] flex flex-col justify-between">
          <div className="h-[90%] flex flex-col justify-center items-center">
            <img
              src={completeIcon}
              alt="completeIcon"
              className="w-[90px] mb-[40px]"
            />
            <h1 className="text-[32px] font-medium flex text-center leading-10">
              의뢰서 작성이 <br />
              완료되었습니다!
            </h1>
            <p className="text-[20px] text-[#525466] mt-[25px]">
              디자이너 매칭을 기다려주세요
            </p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="text-[18px] cursor-pointer"
            ></button>
            <button
              onClick={() => navigate('/client-page/request-list/writing')}
              className="text-[18px] cursor-pointer"
            >
              의뢰 내역 보기 {'>'}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
