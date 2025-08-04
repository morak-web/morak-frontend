export default function DesignerRegisterPage() {
  return (
    <div className="bg-white w-[95%] min-h-[577px] rounded-[11px] px-[36px] py-[26px] flex flex-col justify-between">
      <section className="mb-[40px]">
        <h1 className="text-[20px] text-[#525466] font-semibold">
          디자이너 등록
        </h1>
      </section>
      <section className="w-[100%] h-[400px] px-[5px] sm:px-[20px] flex flex-col justify-between mb-[10px]">
        <div className="flex items-center">
          <h1 className="text-[13px] md:text-[15px] text-[#525466] font-semibold  w-[30%] sm:w-[25%]">
            이름
          </h1>
          <input
            type="text"
            className="w-[70%] md:w-[300px] h-[38px] bg-[#f2f3fa] rounded-[19px] px-[20px] text-black text-[16px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694]"
          />
        </div>
        <div className="flex items-center">
          <h1 className="text-[13px] md:text-[15px] text-[#525466] font-semibold w-[30%] sm:w-[25%]">
            관심 분야
          </h1>
          <input
            type="text"
            className="w-[70%] md:w-[300px] h-[38px] bg-[#f2f3fa] rounded-[19px] px-[20px] text-black text-[16px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694]"
          />
        </div>
        <div className="flex items-center">
          <h1 className="text-[13px] md:text-[15px] text-[#525466] font-semibold w-[30%] sm:w-[25%]">
            디자인 경력
          </h1>
          <div className="w-[70%] md:w-[300px] h-[38px] bg-[#f2f3fa] rounded-[19px] flex items-center pr-[7px] sm:pr-0 sm:gap-5 pl-[20px] focus-within:border-[1px] focus-within:border-[#d6d6d694]">
            <input type="number" className=" w-[80%] outline-none" />
            <p className="text-[#525466] text-[13px] whitespace-nowrap ">
              년차
            </p>
          </div>
        </div>
        <div className="flex">
          <h1 className="text-[13px] md:text-[15px] text-[#525466] font-semibold w-[30%] sm:w-[25%]">
            기타 설명
          </h1>
          <div className="flex flex-col gap-[14px] w-[70%] ">
            <textarea className="h-[180px] bg-[#F2F3FA] rounded-[19px]  resize-none py-[16px] px-[20px] text-black text-[16px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694]" />
            <button className="w-[100%] md:w-[300px] h-[38px] rounded-[19px] shadow-md  text-[10px] sm:text-[15px] cursor-pointer text-[#525466]">
              포트폴리오 등록하기
            </button>
          </div>
        </div>
      </section>
      <section className="w-[100%] flex justify-end">
        <button className="cursor-pointer w-[190px] h-[45px] bg-[#bdcfff] text-[16px] rounded-[23px]">
          등록/수정 완료
        </button>
      </section>
    </div>
  );
}
