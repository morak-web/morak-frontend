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
  // date
  const start = new Date(props.appliedAt);
  const end = new Date(props.expectedEndDate);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 w-full rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:scale-[1.01]">
      <div className="flex">
        {/* left content */}
        <div className="flex-1 px-8 py-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-neutral-900 text-xl font-bold leading-tight flex-1">{props.title}</h1>
            <span className="ml-4 px-4 py-1.5 rounded-full text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#0284C7', color: '#FFFFFF' }}>
              {CATEGORY[props.categoryId]}
            </span>
          </div>

          <div className="flex gap-6 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F0FDF4' }}>
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium">예산</p>
                <p className="text-base font-bold text-neutral-900">{props?.budgetEstimate.toLocaleString()}원</p>
              </div>
            </div>
            <div className="w-px bg-neutral-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FEF2F2' }}>
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium">마감일</p>
                <p className="text-base font-bold text-neutral-900">{end.slice(0, 10).replaceAll('-', '.')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xs text-neutral-600 font-semibold">요약 요구사항</p>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed line-clamp-3">{props.aiSummary}</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-neutral-400 text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>신청일: {start.slice(0, 10).replaceAll('-', '.')}</span>
              </div>
            </div>
            <div className="px-4 py-2 rounded-lg font-bold text-xs" style={{ backgroundColor: '#0EA5E9', color: '#FFFFFF' }}>
              신청 완료
            </div>
          </div>
        </div>

        {/* right content */}
        <div className="w-72 border-l-2 border-blue-200 flex flex-col justify-between p-6" style={{ background: 'linear-gradient(to bottom, #EFF6FF, white)' }}>
          <button
            className="w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg hover:scale-105"
            style={{ backgroundColor: '#0284C7', color: '#FFFFFF' }}
            onClick={() => {
              const id = props.projectId;
              navigate(`/designer-page/project/${id}`);
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>상세보기</span>
            </div>
          </button>

          <div>
            <p className="text-xs text-neutral-500 font-semibold mb-3">클라이언트 정보</p>
            <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-sm">
              <div className="flex items-center gap-3">
                <img src={clientImg} alt="client" className="w-12 h-12 rounded-full ring-2 ring-blue-200" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-neutral-900 truncate">{props.clientNickname}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0EA5E9' }}></div>
                    <span className="text-xs text-neutral-500">클라이언트</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
