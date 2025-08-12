import closeBtn from '../../../assets/RequestList/close-button.png';
import ChatPage from './ChatPage';

export default function IntermediateFeedbackModal({
  interFeedbackModalOpen,
  onClose,
}) {
  if (!interFeedbackModalOpen) return null;
  return (
    <div
      onClick={onClose}
      className=" fixed inset-0 z-50  min-w-screen min-h-screen bg-[#0101015e] justify-center items-center flex"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[85%] rounded-[11px] bg-white px-[35px] py-[27px] flex flex-col gap-[4%]"
      >
        <div className="flex justify-between ">
          <h1 className="text-[20px] font-bold">중간 결과 / 피드백</h1>
          <button className="cursor-pointer">
            <img
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
              className="w-[20px] h-[20px]"
            />
          </button>
        </div>
        <div className="w-[100%] h-[100%] flex flex-col pr-[36px]">
          <div className="flex justify-between">
            <div className="flex items-end gap-[11px] mx-[1%]">
              <h1 className="text-[#525466] text-[15px] sm:text-[20px] font-medium ">
                와이어프레임 초안 1차 색상안 2종 포함
              </h1>
              <p className="text-[#525466] text-[13px] sm:text-[16px] font-light">
                2025.08.23
              </p>
            </div>
            <div className="flex flex-col justify-end md:flex-row text-[#525466] text-[13px] sm:text-[16px] font-light ml-[10px] md:ml-[0px] md:gap-[11px] whitespace-nowrap">
              <p>파일 3건</p>
              <p>다운로드</p>
            </div>
          </div>
          <div className="bg-[#D9D9D9] w-[100%] h-[1px] my-[10px]"></div>
          <div className="w-[100%] h-[100%] flex flex-col justify-between">
            <div className="w-[100%] h-[50%] flex flex-col px-[1%]">
              <div className="w-[100%] h-[100%] flex justify-between ">
                <div className="w-[45%] h-[95%] bg-[#DFE1ED] rounded-[10px]"></div>
                <div className="w-[45%] h-[95%] bg-[#DFE1ED] rounded-[10px]"></div>
              </div>
              <p className="text-[#525466] text-[13px] md:text-[16px]">
                1차 시안은 브랜드의 젊고 에너지 넘치는 이미지를 강조하기 위해
                곡선형 타이포그래피와 오렌지 계열 포인트 컬러를 사용했습니다. 총
                2가지 스타일을 제안드리며, A안은 좀 더 캐주얼하고 B안은 심플하고
                정제된 느낌입니다. 각 안에는 흑백 버전도 포함되어 있어 다양한
                매체 적용을 고려했습니다. 피드백 주시면 다음 시안에
                반영하겠습니다.
              </p>
            </div>
            <div className="w-[100%] h-[45%] px-[1%] flex flex-col justify-end">
              <ChatPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
