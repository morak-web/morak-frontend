import { Link } from 'react-router-dom';
import { useEffect } from 'react';
// api
import { useProject } from '../../../context/ProjectContext';

export default function WritingPage() {
  const { projectList = [], fetchProjectList, error, loading } = useProject();
  useEffect(() => {
    fetchProjectList('DRAFT');
  }, []);
  const writingData = projectList.filter((item) => item['status'] === 'DRAFT');

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neutral-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-neutral-600 text-sm">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
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

  if (writingData?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FEF3C7' }}>
          <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">작성 중인 의뢰가 없습니다</h3>
        <p className="text-neutral-500 mb-6">새로운 의뢰를 작성해보세요</p>
        <Link
          to="/request/category"
          className="px-8 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:scale-105 no-underline"
          style={{ backgroundColor: '#0284C7', color: '#FFFFFF' }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>새 의뢰 작성</span>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {writingData.map((item, idx) => (
        <div key={idx} className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
          <div className="flex">
            {/* Left Section */}
            <div className="w-2/5 px-8 py-8 flex flex-col items-center justify-center border-r-2 border-amber-200" style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' }}>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: '#FFFFFF' }}>
                <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div className="text-amber-900 text-sm mb-6 text-center">
                <p className="font-semibold mb-1">작성이 완료되지 않았습니다</p>
                <p className="text-xs">의뢰서 작성을 완료해주세요</p>
              </div>
              <Link
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:scale-105 w-full text-center no-underline"
                to={`/request/category/${item.projectId || ''}`}
                style={{ backgroundColor: '#D97706', color: '#FFFFFF' }}
              >
                작성하러 가기
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex-1 px-8 py-8">
              <div className="flex justify-between mb-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">프로젝트 제목</h3>
                  <p className="text-lg font-bold text-neutral-900">{item?.title || '미정'}</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">카테고리</h3>
                  <p className="text-base font-semibold text-neutral-700">{item?.category || '미정'}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 bg-white rounded-xl p-5 border border-amber-200">
                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">요구사항 요약</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item?.aiSummary || '작성 중...'}
                </p>
              </div>

              {item?.createdAt && (
                <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>생성일: {item.createdAt.slice(0, 10).replaceAll('-', '.')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
