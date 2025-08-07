import closeBtn from '../../../assets/RequestList/close-button.png';
import ChatingPage from './ChatingPage';
export default function FeedbackCheckModal({ feedbackModalOpen, onClose }) {
  if (!feedbackModalOpen) return null;
  return (
    <div
      onClick={onClose}
      className=" fixed inset-0 z-50  min-w-screen min-h-screen bg-[#0101015e] justify-center items-center flex"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[85%] min-h-0 rounded-[11px] bg-white px-[35px] py-[27px] flex flex-col gap-[30px]"
      >
        <div className="flex justify-between">
          <h1 className="text-[20px] font-bold">피드백 확인</h1>
          <button className="cursor-pointer">
            <img
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
              className="w-[20px] h-[20px]"
            />
          </button>
        </div>
        <div className="flex-1 flex flex-col min-h-0 pr-[36px]">
          <div className="flex items-end gap-[11px] mx-[1%]">
            <h1 className="text-[#525466] text-[15px] sm:text-[20px] font-medium ">
              와이어프레임 초안 1차 색상안 2종 포함
            </h1>
            <p className="text-[#525466] text-[13px] sm:text-[16px] font-light">
              2025.08.23
            </p>
          </div>
          <div className="bg-[#D9D9D9] w-[100%] h-[1px] my-[10px]"></div>
          <div className="flex flex-1 px-[1%] flex-col min-h-0">
            <ChatingPage />
          </div>
        </div>
      </div>
    </div>
  );
}
