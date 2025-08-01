export default function AIMessageBubble() {
  // const isUser===message.sender==="user"
  // ${isUser ? 'justify-end' : 'justify-start'}
  //  내 이름은 오른쪽으로 배치
  return (
    <div className={`flex `}>
      <div className="bg-[#F7F8FC] inline-block px-[20px] py-[12px] rounded-[12px]">
        <div className="flex justify-end mb-[4px]">
          <h1 className="text-[#525466] text-[14px]">김모락 / 1분 전</h1>
        </div>
        <p className="text-[#525466] text-[16px]">
          3 개의 파일을 업로드 했습니다.
        </p>
      </div>
    </div>
  );
}
