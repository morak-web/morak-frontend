import { useNavigate } from 'react-router-dom';
import clientImg from '../../../assets/RequestList/designer1.png';
export default function MatchingCard(props) {
  const navigate = useNavigate();
  // date
  const start = new Date(props.createdAt);
  const end = new Date(props.expectedEndDate);
  const ms = end - start;
  const daysFloor = Math.floor(ms / 86400000);

  return (
    <div className="bg-[#EAECF5] w-[100%] min-h-[230px] rounded-[10px] flex">
      {/* left content */}
      <div className="w-[75%] px-[27px] py-[25px]">
        <h1 className="text-[#525466] text-[18px] mb-[19px]">{props.title}</h1>
        <div className="text-[#525466] text-[13px] flex mb-[13px]">
          <div className="flex gap-[5px]">
            <p className="font-medium">예산</p>
            <p>{props.budgetEstimate.toLocaleString()}</p>
          </div>
          <p className="mx-[19px]">|</p>
          <div className="flex gap-[5px]">
            <p className="font-medium">예상 기간 </p>
            <p>{daysFloor}일</p>
          </div>
        </div>
        <div className="text-[#525466] text-[13px] flex flex-col">
          <p>(요약 요구사항)</p>
          <p>{props.aiSummary}</p>
        </div>
        <div className="text-[#525466] text-[10px] flex gap-[5px] justify-end">
          <p>등록일자</p>
          <p>{props.createdAt.slice(0, 10).replaceAll('-', '.')}</p>
        </div>
        {/* map으로 처리하기 */}
        <div className="text-[#525466] text-[12px] flex gap-[7px]">
          <div className="bg-white rounded-[10px] px-[7px] py-[4px]">웹</div>
          <div className="bg-white rounded-[10px] px-[7px] py-[4px]">앱</div>
        </div>
      </div>
      {/* right content */}
      <div className="w-[25%] border-l-[1px] border-[#52546648] flex flex-col justify-between px-[18px] my-[14px]">
        <button
          className="w-[56px] h-[24px] rounded-[10px] bg-white border-[1px] border-[#0000007a] text-[10px] text-[#525466] self-end cursor-pointer"
          onClick={() => {
            const id = props.projectId;
            navigate(`/designer-page/project/${id}`);
          }}
        >
          상세보기
        </button>
        <div className="h-[44px] bg-white rounded-[10px] flex justify-center py-[9px] gap-[6px]">
          <img src={clientImg} alt="clientImg" className="w-[27px] h-[27px]" />
          <h1 className="text-[#525466] text-[12px] self-start">
            {props.clientNickname}
          </h1>
          <div className="text-[#525466] text-[10px] bg-[#EAECF5] rounded-[10px] px-[8px] h-[15px] mt-[1px]">
            클라이언트
          </div>
        </div>
      </div>
    </div>
  );
}
