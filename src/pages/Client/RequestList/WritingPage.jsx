import { Link } from 'react-router-dom';
import writingPencilIcon from '../../../assets/RequestList/writing-pencil-icon.png';
export default function WritingPage() {
  return (
    // api 연결 시 여기에 map 사용해서 수정하기
    <div className="w-[100%] py-[16px] px-[10px] bg-[#F7F8FC] rounded-[30px] flex">
      {/* left content */}
      <div className="w-[38%] py-[10px] px-[6%] flex flex-col items-center  border-r-[1px] border-[#D9D9D9]">
        <img
          src={writingPencilIcon}
          alt="writingPencilIcon"
          className="w-[76px] h-[76px] mb-[14px]"
        />
        <div className="text-[#525466] text-[12px] mb-[19px] flex flex-col items-center">
          <p>작성이 완료되지 않은 의뢰입니다.</p>
          <p>의뢰서 작성을 완료해주세요!</p>
        </div>
        <Link className="text-[#525466] text-[13px] font-semibold bg-[#DFE1ED] py-[10px] rounded-[19px] w-[100%] text-center">
          작성하러 가기
        </Link>
      </div>
      {/* right content */}
      <div className="flex-1 px-[24px] py-[6px]">
        <div className="flex justify-between mb-[14px]">
          <div className="flex flex-col gap-[7px]">
            <h1 className="text-[#525466] text-[14px] font-semibold">
              프로젝트 제목
            </h1>
            <p className="text-[#525466] text-[13px]">미정</p>
          </div>
          <div className="flex flex-col gap-[7px] items-end">
            <h1 className="text-[#525466] text-[14px] font-semibold">
              프로젝트 카테고리
            </h1>
            <p className="text-[#525466] text-[13px]">미정</p>
          </div>
        </div>
        <div className="flex flex-col gap-[7px]">
          <h1 className="text-[#525466] text-[14px] font-semibold">
            요구사항 요약
          </h1>
          <p className="text-[#525466] text-[13px]">작성 중..</p>
        </div>
      </div>
    </div>
  );
}
