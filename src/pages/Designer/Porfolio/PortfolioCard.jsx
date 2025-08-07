import { useState } from 'react';
import closeBtn from '../../../assets/RequestList/close-button.png';

export default function PortfolioCard({ removeCard }) {
  const [showImg, setShowImg] = useState(false);
  return (
    <div className="w-[100%] sm:w-[340px] h-[400px]  shadow-[4px_4px_10px_#00000024] rounded-[19px] shrink-0 px-[22px] pt-[18px] pb-[23px]">
      <button
        className="w-[100%] flex justify-end cursor-pointer"
        onClick={removeCard}
      >
        <img src={closeBtn} alt="closeBtn" className="w-[15px] h-[15px]" />
      </button>
      <div className="mb-[13px]">
        <h1 className="text-[#525466] text-[15px] mb-1">프로젝트명</h1>
        <input
          type="text"
          className="w-[100%] h-[38px] bg-[#F2F3FA] rounded-[10px] outline-none px-3"
        />
      </div>
      <div className="mb-[20px]">
        <h1 className="text-[#525466] text-[15px] mb-1">썸네일 이미지</h1>
        {showImg ? (
          <div className="relative">
            <div className="w-[100%] h-[180px] bg-[#DFE1ED] rounded-[10px] "></div>

            {/* <img className="w-[100%] h-[170px] bg-[#DFE1ED] rounded-[10px] " /> */}
            <button
              onClick={() => setShowImg(!showImg)}
              className="shadow-md w-[130px] h-[40px] rounded-[20px] text-[#525466] text-[14px] absolute top-28 right-[-60px] bg-white cursor-pointer"
            >
              사진 편집
            </button>
          </div>
        ) : (
          <div className="relative">
            <div className="w-[100%] h-[180px] bg-[#DFE1ED] rounded-[10px] "></div>
            <button
              onClick={() => setShowImg(!showImg)}
              className="shadow-md w-[100px] sm:w-[130px] h-[40px] rounded-[20px] text-[#525466] text-[14px] absolute top-31 right-[-30px] sm:right-[-60px] bg-white cursor-pointer"
            >
              사진 업로드
            </button>
          </div>
        )}
      </div>
      <button className="w-[100%] h-[38px] rounded-[10px] text-[#525466] text-[14px] shadow-[4px_4px_10px_#00000024] cursor-pointer">
        포트폴리오 파일
      </button>
    </div>
  );
}
