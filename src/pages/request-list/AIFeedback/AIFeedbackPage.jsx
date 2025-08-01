import closeBtn from '../../../assets/RequestList/AIFeedback/close-button.png';
import titleBackground from '../../../assets/RequestList/AIFeedback/title-background.png';
import AIChatPage from './AIChatPage';

export default function AIFeedbackPage({ feedbackModalOpen, onClose }) {
  if (!feedbackModalOpen) return null;
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
              AI 피드백
            </h1>
            <button className="w-[20px] h-[20px]">
              <img src={closeBtn} alt="closeBtn" className="a" />
            </button>
          </div>
        </div>
        <div className="w-full h-[calc(100%-65px)] pl-[35px] pr-[60px] py-[27px]">
          <div className="flex items-end h-[3%] gap-[11px] px-[20px]">
            <h1 className="text-[20px] font-medium text-[#525466]">
              와이어프레임 초안 1차 색상안 2종 포함
            </h1>
            <p className="text-[#525466] text-[16px] font-light">2025.08.23</p>
          </div>
          <div className="w-full h-[1px] bg-[#D9D9D9] my-[10px]" />
          <div className="w-full h-[90%] pl-[20px]">
            <AIChatPage />
          </div>
        </div>
      </div>
    </div>
  );
}
