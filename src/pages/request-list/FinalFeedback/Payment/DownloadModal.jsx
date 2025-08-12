import closeBtn from '../../../../assets/RequestList/AIFeedback/close-btn.png';
import downloadBtn from '../../../../assets/RequestList/AIFeedback/download.png';
import nextBtn from '../../../../assets/RequestList/AIFeedback/next.png';
import completeIcon from '../../../../assets/RequestWrite/request-write-complete-icon.png';
import { useState } from 'react';

export default function DownLoadModal({ downloadModalOpen, onClose }) {
  const [downloadModal, setDownloadModal] = useState(true);
  const [paymentModal, setPaymentModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const handleClickButton = () => {
    onClose();
    setDownloadModal(true);
    setPaymentModal(false);
    setCompleteModal(false);
  };
  if (!downloadModalOpen) return null;
  return (
    <div
      onClick={handleClickButton}
      className=" fixed inset-0 z-50  min-w-screen min-h-screen bg-[#0101015e] justify-center items-center flex"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[85%] rounded-[11px] bg-white flex flex-col"
      >
        <div className="w-full h-[20px]  flex justify-end mt-[20px] pr-[20px]">
          <button
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={handleClickButton}
          >
            <img src={closeBtn} alt="closeBtn" className="w-[20px]" />
          </button>
        </div>
        {downloadModal && (
          <div className=" flex flex-col justify-between flex-1">
            <div className="flex flex-col h-[90%] justify-center items-center  gap-[23px]">
              <p className="text-[28px]">다운로드가 완료되었습니다!</p>
              <img
                src={downloadBtn}
                alt="downloadBtn"
                className="w-[53px] h-[53px]"
              />
            </div>
            <div className="flex justify-end pr-[20px] h-[10%] ">
              <button
                className="text-[20px] flex items-center cursor-pointer"
                onClick={() => {
                  setDownloadModal(false);
                  setPaymentModal(true);
                }}
              >
                결제 진행{' '}
                <img
                  src={nextBtn}
                  alt="nextBtn"
                  className="w-[24px] h-[24px]"
                />
              </button>
            </div>
          </div>
        )}
        {paymentModal && (
          <div className="flex flex-col items-center justify-center  h-[100%]">
            <div className="w-[80%] md:w-[50%] ">
              <div className="pb-[22px] border-b-[1px] border-[#52546657] flex justify-between">
                <h1 className="text-[#525466] text-[20px]">프로젝트 명</h1>
                <p className="text-[#525466] text-[18px]">
                  퍼스널 헬스케어 플랫폼
                </p>
              </div>
              <div className="pb-[22px] border-b-[1px] border-[#52546657] flex justify-between pt-[22px]">
                <h1 className="text-[#525466] text-[20px]">
                  프로젝트 진행 기간
                </h1>
                <p className="text-[#525466] text-[18px] flex">
                  <p>2025. 8. 23</p>
                  <p className="mx-[16px]">-</p>
                  <p>2025. 10. 25</p>
                </p>
              </div>
              <div className="pb-[22px] border-b-[1px] border-[#52546657] flex justify-between pt-[22px]">
                <h1 className="text-[#525466] text-[20px]">청구일</h1>
                <p className="text-[#525466] text-[18px]">2025. 10. 25</p>
              </div>
              <div className="flex justify-between pt-[22px]">
                <h1 className="text-[#525466] text-[20px]">청구 금액</h1>
                <p className="text-[#525466] text-[18px]">30,000,00</p>
              </div>
            </div>
            <div className="flex flex-col gap-[28px] mt-[87px] justify-center items-center">
              <h1 className="text-[#525466] text-[22px]">
                결제하려면 <span className="text-[#6072FF]">다음</span>을
                눌러주세요.
              </h1>
              <button
                className="text-[#FFFFFF] text-[20px] w-[112px] h-[60px] bg-[#6072FF] rounded-[20px] cursor-pointer"
                onClick={() => {
                  setPaymentModal(false);
                  setCompleteModal(true);
                }}
              >
                다음
              </button>
            </div>
          </div>
        )}
        {completeModal && (
          <div className="h-[90%] flex flex-col justify-center items-center">
            <img
              src={completeIcon}
              alt="completeIcon"
              className="mb-[57px] w-[85px] h-[62px]"
            />
            <h1 className="text-[32px] mb-[22px]">결제가 완료되었습니다 !</h1>
            <p className="text-[#525466] text-[20px]">
              결제 내역은 마이 페이지에서 확인하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
