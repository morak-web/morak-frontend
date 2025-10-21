import { useNavigate } from 'react-router-dom';
import clientImg from '../../../assets/RequestList/designer1.png';
export default function MatchingCard(props) {
  const navigate = useNavigate();
  // date
  const start = new Date(props.createdAt);
  const end = new Date(props.expectedEndDate);
  const ms = end - start;
  const daysFloor = Math.floor(ms / 86400000);
  const CATEGORY = {
    1: '웹',
    2: '앱',
    3: '쇼핑몰/스마트 스토어',
    4: '키오스크/POS',
    5: '그래픽/영상',
    6: '기타',
  };
  return (
    <div className="bg-white border border-neutral-200 w-full min-h-[200px] rounded-xl flex hover:shadow-md transition-shadow">
      {/* left content */}
      <div className="w-3/4 px-7 py-6">
        <h1 className="text-neutral-900 text-lg font-semibold mb-4">{props.title}</h1>
        <div className="text-neutral-600 text-sm flex gap-4 mb-4">
          <div className="flex gap-2 items-center">
            <p className="font-medium text-neutral-700">예산</p>
            <p className="font-semibold text-neutral-900">{props.budgetEstimate.toLocaleString()}원</p>
          </div>
          <span className="text-neutral-300">|</span>
          <div className="flex gap-2 items-center">
            <p className="font-medium text-neutral-700">예상 기간</p>
            <p className="font-semibold text-neutral-900">{daysFloor}일</p>
          </div>
        </div>
        <div className="text-neutral-600 text-sm flex flex-col gap-2 mb-4">
          <p className="text-xs text-neutral-500 font-medium">요약 요구사항</p>
          <p className="leading-relaxed">{props.aiSummary}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <span className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#F0F9FF', color: '#0369A1' }}>
              {CATEGORY[props.categoryId]}
            </span>
          </div>
          <div className="text-neutral-400 text-xs flex gap-1">
            <p>등록일자</p>
            <p>{props.createdAt.slice(0, 10).replaceAll('-', '.')}</p>
          </div>
        </div>
      </div>
      {/* right content */}
      <div className="w-1/4 border-l border-neutral-200 flex flex-col justify-between px-5 py-6">
        <button
          className="px-4 py-2 rounded-lg bg-neutral-50 border border-neutral-300 text-xs text-neutral-700 font-medium self-end hover:bg-neutral-100 transition-colors"
          onClick={() => {
            const id = props.projectId;
            navigate(`/designer-page/project/${id}`);
          }}
        >
          상세보기
        </button>
        <div className="bg-neutral-50 rounded-lg flex items-center justify-center py-3 px-4 gap-2">
          <img src={clientImg} alt="clientImg" className="w-7 h-7 rounded-full" />
          <div className="flex flex-col flex-1 min-w-0">
            <h1 className="text-neutral-900 text-sm font-medium truncate">
              {props.clientNickname}
            </h1>
            <span className="text-neutral-500 text-xs">클라이언트</span>
          </div>
        </div>
      </div>
    </div>
  );
}
