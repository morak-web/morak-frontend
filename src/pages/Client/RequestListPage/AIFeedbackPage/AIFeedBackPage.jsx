import { useEffect } from 'react';
import closeBtn from '../../../../assets/RequestList/AIFeedback/close-button.png';
import titleBackground from '../../../../assets/RequestList/AIFeedback/title-background.png';
import { useAIFeedback } from '../../../../context/AIFeedbackContext';
import morakAI from '../../../../assets/morak2.png';

export default function AIFeedBackPage({
  projectId,
  AIFeedbackModalOpen,
  onClose,
}) {
  if (!AIFeedbackModalOpen) return null;
  const { midAIFeedback, fetchAIFeedback } = useAIFeedback();
  useEffect(() => {
    fetchAIFeedback(projectId, 'MID');
  }, []);
  console.log(midAIFeedback);
  const GradientGlass = {
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.14) 100%)',
    border: '1px solid rgba(255,255,255,0.6)',
    boxShadow:
      '0 10px 24px rgba(150, 170, 255, 0.25), 0 2px 0 rgba(255,255,255,0.2) inset',
  };

  return (
    <div
      onClick={onClose}
      className=" fixed inset-0 z-50  min-w-screen min-h-screen bg-[#0101015e] justify-center items-center flex"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[85%] rounded-[11px] bg-white"
      >
        <div className="w-full h-[65px] relative">
          <img
            src={titleBackground}
            alt="titleBackground"
            className=" w-full h-[65px]"
          />
          <div className="px-[33px] absolute top-[28%] flex justify-between items-center w-full">
            <h1 className="text-[#6072FF] text-[20px] font-medium">
              <span className="font-bold">AI</span> 모락
            </h1>
            <button
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={onClose}
            >
              <img src={closeBtn} alt="closeBtn" />
            </button>
          </div>
        </div>
        <div className="w-full h-[calc(100%-65px)] pl-[35px] pr-[60px] py-[27px]">
          {/* <div className="flex items-end h-[3%] gap-[11px] px-[20px]">
            <h1 className="text-[20px] font-medium text-[#525466]">
              와이어프레임 초안 1차 색상안 2종 포함 // 임시
            </h1>
            <p className="text-[#525466] text-[16px] font-light">
              2025.08.23//임시
            </p>
          </div> */}
          {/* <div className="w-full h-[1px] bg-[#D9D9D9] my-[10px]" /> */}
          <div className="flex">
            <div className=" w-[300px] h-[650px] items-end flex justify-center">
              <img
                src={morakAI}
                className="w-[250px] h-[250px] relative bottom-0"
                alt="morakAI"
              />
            </div>
            <div className="relative w-full h-[650px] ">
              <div
                className="topbar relative h-[630px] -mt-[2px] rounded-[14px] p-5 md:p-6 backdrop-blur overflow-y-auto custom-scrollbar"
                style={GradientGlass}
              >
                {/* 내용 */}
                <div className="relative z-10 text-[16px] leading-7 text-zinc-700 whitespace-pre-line">
                  {midAIFeedback?.content}
                </div>
              </div>
              {/* 본문(유리) */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
