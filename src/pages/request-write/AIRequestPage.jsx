export default function AIRequestPage({ next, prev }) {
  return (
    <div className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] py-[30px] flex items-center">
      <div className=" w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between">
        <h1 className="text-[24px] font-bold flex flex-col mb-[30px]">
          안녕하세요 AI 모락이에요
        </h1>
        <textarea
          className="w-[100%] h-[280px] bg-[#F7F8FC] rounded-[20px] resize-none py-[26px] px-[31px] text-black font-[16px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694] mb-[282px]"
          placeholder="의뢰 내용을 작성해주세요."
        ></textarea>
        <div className="flex justify-between items-center">
          <button onClick={prev} className=" text-[18px] cursor-pointer">
            이전
          </button>
          <button
            onClick={next}
            className="bg-[#BDCFFF] px-[17px] py-[8px] rounded-[8px] text-[18px] cursor-pointer"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
