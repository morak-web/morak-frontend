import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

// api
import { useProject } from '../../../context/ProjectContext';

export default function MatchingSeeDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { projectDetail, fetchProjectDetail, loading, error } = useProject();
  useEffect(() => {
    fetchProjectDetail(id);
  }, []);

  if (loading) {
    return (
      <div className="w-[95%] min-h-[710px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neutral-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-neutral-600 text-sm">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[95%] min-h-[710px] flex items-center justify-center">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 max-w-md">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-bold text-red-900 mb-1">오류가 발생했습니다</h3>
              <p className="text-sm text-red-700">{String(error.message || error)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // date
  const start = new Date(projectDetail?.createdAt);
  const end = new Date(projectDetail?.dueDate);
  const diffMs = end - start;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return (
    <div className="w-[95%] min-h-[710px] flex flex-col gap-6">
      {/* Header with Back Button */}
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
        <div className="px-8 py-6" style={{ backgroundImage: 'linear-gradient(to right, #0284C7, #0369A1)' }}>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">의뢰 목록</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{projectDetail?.title}</h1>
              <p className="text-white/80 text-sm mt-1">의뢰 상세 정보</p>
            </div>
          </div>
        </div>

        {/* Project Info Cards */}
        <div className="grid grid-cols-3 gap-6 p-8 bg-gradient-to-b from-neutral-50 to-white">
          <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F0FDF4' }}>
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">예산</h3>
            </div>
            <p className="text-2xl font-bold text-neutral-900">
              ₩ {projectDetail?.budgetEstimate?.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E0F2FE' }}>
                <svg className="w-6 h-6" style={{ color: '#0284C7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">프로젝트 기간</h3>
            </div>
            <p className="text-base font-bold text-neutral-900 mb-1">
              {projectDetail?.createdAt?.slice(0, 10).replaceAll('-', '.')} ~ {projectDetail?.dueDate?.slice(0, 10).replaceAll('-', '.')}
            </p>
            <p className="text-sm text-neutral-600">예상 {diffDays}일</p>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F3E8FF' }}>
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">마감일</h3>
            </div>
            <p className="text-2xl font-bold text-purple-700">
              {projectDetail?.dueDate?.slice(0, 10).replaceAll('-', '.')}
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
        <div className="p-8">
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-4 space-y-8">
            {/* Requirements Section */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E0F2FE' }}>
                  <svg className="w-6 h-6" style={{ color: '#0284C7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-neutral-900">의뢰 상세</h2>
              </div>
              <div className="bg-white rounded-xl p-5 border border-blue-200">
                <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
                  {projectDetail?.userRequirements || '상세 정보가 없습니다'}
                </p>
              </div>
            </div>

            {/* Reference Materials Section */}
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-6 border-2 border-amber-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-neutral-900">첨부 자료</h2>
              </div>
              <div className="bg-white rounded-xl p-5 border border-amber-200">
                {projectDetail?.referenceUrls?.length > 0 ? (
                  <div className="space-y-3">
                    {projectDetail.referenceUrls.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FEF3C7' }}>
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </div>
                        <a
                          href={item}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-neutral-700 hover:text-blue-600 transition-colors break-all flex-1"
                        >
                          {item}
                        </a>
                        <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500 text-center py-4">첨부 자료가 없습니다</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
