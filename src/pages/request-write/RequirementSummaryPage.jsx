import folderImg from '../../assets/RequestWrite/folder.png';

export default function RequirementSummaryPage({ prev, onSubmit, data }) {
  return (
    <div className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] py-[30px] flex items-center">
      <div className=" w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between">
        <h1 className="text-[24px] font-bold flex flex-col mb-[30px]">
          의뢰 내용 확인/요약
        </h1>
        <div className="flex flex-col gap-[6px] overflow-y-auto custom-scrollbar pr-[40px] mb-[56px]">
          <div>
            <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]  pl-[7px]">
              프로젝트 제목
            </h1>
            <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]">
              {data.title}
            </p>
          </div>
          <div>
            <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]  pl-[7px]">
              지출 가능 예산
            </h1>
            <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]">
              {data.budgetEstimate}
            </p>
          </div>
          <div>
            <div>
              <div className=" border-b-[1px] border-[#5254665e] pb-[4px]  flex gap-[90px]">
                <h1 className="text-[#525466] text-[17px]  pl-[7px]">
                  예상 시작일
                </h1>
                <h1 className="text-[#525466] text-[17px]">마감일</h1>
              </div>
              <div className="flex border-[#5254665e]  pb-[23px] border-b-[1px] pl-[7px] pt-[9px] gap-[49px]">
                <p className="text-[#525466] text-[13px]">{data.createdAt}</p>
                <p className="text-[#525466] text-[13px]">-</p>
                <p className="text-[#525466] text-[13px] ">{data.dueDate}</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]  pl-[7px]">
              상세 요구 사항
            </h1>
            <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]">
              {data.userRequirements}
            </p>
          </div>
          <div className="mb-[24px]">
            <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]  pl-[7px]">
              참고 자료
            </h1>
            <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px] flex">
              <img
                src={folderImg}
                alt="folderImg"
                className="w-[16px] h-[15px] mr-[2px]"
              />
              퍼스널 헬스케어 플랫폼 레퍼런스.zip{' '}
            </p>
            <p className="text-[#A9A9A9] text-[12px] text-end mt-[2px]">
              내용을 수정하려면 이전으로 돌아가주세요.
            </p>
          </div>
          <div className="relative">
            <h1 className="text-[#525466] text-[16px] mb-[6px]">
              의뢰 내용을 바탕으로 요약했습니다!
            </h1>
            <textarea className="w-[100%] h-[227px] bg-[#F7F8FC] rounded-[20px] resize-none py-[26px] px-[31px] text-[#525466] text-[15px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694] mb-[56px]"></textarea>
            <p className="text-[#A9A9A9] text-[12px] absolute right-5 bottom-20">
              요약문을 확인하고 제출 버튼을 눌러주세요.
            </p>
          </div>
        </div>
        {/* 이전, 다음 버튼 */}
        <div className="flex justify-between items-center">
          <button onClick={prev} className=" text-[18px] cursor-pointer">
            이전
          </button>
          <button
            type="submit"
            onClick={onSubmit}
            className="bg-[#BDCFFF] px-[17px] py-[8px] rounded-[8px] text-[18px] cursor-pointer"
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
}
