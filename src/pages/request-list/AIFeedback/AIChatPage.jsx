import AIMessageBubble from './AIMessageBubble';
import folderIcon from '../../../assets/RequestList/IntermediateFeedback/folder-icon.png';

export default function AIChatPage() {
  return (
    <div className="w-full h-full flex flex-col gap-[3%]">
      <div className="w-full h-[77%] pt-[10px]">
        <div className="h-full overflow-y-auto custom-scrollbar pr-[10px] flex flex-col gap-[10px]">
          <AIMessageBubble />
          <AIMessageBubble />
          <AIMessageBubble />
          <AIMessageBubble />
          <AIMessageBubble />
          <AIMessageBubble />
          <AIMessageBubble />
          <AIMessageBubble />
          <AIMessageBubble />
        </div>
      </div>
      <div className="w-full h-[20%] flex flex-col justify-between">
        <div className="flex items-end justify-between gap-[20px]">
          <div className="text-[#525466] text-[14px]">
            <h1>[ AI에게 물어보기💬]</h1>
            <h2>
              아래 질문 중 하나를 선택하면, AI가 추가적인 피드백을 제공합니다.
            </h2>
          </div>
          <img
            src={folderIcon}
            alt="folderIcon"
            className="w-[22px] h-[22px]"
          />
        </div>
        <div className="flex justify-between">
          <button className="bg-[#F7F8FC] text-[#525466] text-[16px] rounded-[25px] px-[80px] py-[16px]">
            컬러 조합이 괜찮은가요?
          </button>
          <button className="bg-[#F7F8FC] text-[#525466] text-[16px] rounded-[25px] px-[80px] py-[16px]">
            폰트 스타일이 너무 무거운 느낌은 아닌가요?
          </button>
          <button className="bg-[#F7F8FC] text-[#525466] text-[16px] rounded-[25px] px-[80px] py-[16px]">
            가독성에 문제는 없나요?
          </button>
        </div>
      </div>
    </div>
  );
}
