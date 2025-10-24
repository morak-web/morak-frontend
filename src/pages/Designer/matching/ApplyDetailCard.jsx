import { useNavigate } from 'react-router-dom';
import clientImg from '../../../assets/RequestList/designer1.png';
const CATEGORY = {
  1: '웹',
  2: '앱',
  3: '쇼핑몰/스마트 스토어',
  4: '키오스크/POS',
  5: '그래픽/영상',
  6: '기타',
};
export default function ApplyDetailCard(props) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#EAECF5] w-[100%] min-h-[230px] rounded-[10px] flex">
      {/* left content */}
      <div className="w-[75%] px-[27px] py-[25px] flex flex-col justify-between">
        <h1 className="text-[#525466] text-[18px] mb-[19px] font-semibold">
          {props.title}
        </h1>
        <div className="text-[#525466] text-[13px] flex mb-[13px]">
          <div className="flex gap-[5px]">
            <p className="font-medium">예산</p>
            <p>{props?.budgetEstimate.toLocaleString()}</p>
          </div>
          <p className="mx-[19px]">|</p>
          <div className="flex gap-[5px]">
            <p className="font-medium">마감일 </p>
            <p>{props?.dueDate?.slice(0, 10).replaceAll('-', '.')}</p>
          </div>
        </div>
        <div className="text-[#525466] text-[13px] flex flex-col">
          <p>(요약 요구사항)</p>
          <p>{props.aiSummary}</p>
        </div>
        <div className="text-[#525466] text-[10px] flex gap-[5px] justify-end">
          <p>등록일자</p>
          <p>{props?.appliedAt?.slice(0, 10).replaceAll('-', '.')}</p>
        </div>
        {/* map으로 처리하기 */}
        <div className="text-[#525466] text-[12px] flex gap-[7px]">
          <div className="bg-white rounded-[10px] px-[7px] py-[4px]">
            {CATEGORY[props.categoryId]}
          </div>
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
