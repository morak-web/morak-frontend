import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

// api
import { useProject } from '../../../context/ProjectContext';

export default function MatchingPage() {
  const navigate = useNavigate();
  const { openApplyList } = useOutletContext();
  const { projectList = [], fetchProjectList, error, loading } = useProject();
  useEffect(() => {
    fetchProjectList('MATCHING');
  }, []);
  const matchingData = projectList.filter(
    (item) => item['status'] === 'MATCHING'
  );

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

  if (matchingData?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#E0F2FE' }}>
          <svg className="w-12 h-12" style={{ color: '#0284C7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">매칭 중인 프로젝트가 없습니다</h3>
        <p className="text-neutral-500">새로운 의뢰를 작성해보세요</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {matchingData.map((item, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
        >
          <div className="flex">
            {/* Left Section */}
            <div className="w-2/5 px-8 py-8 flex flex-col items-center justify-center border-r-2 border-blue-200" style={{ background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)' }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 relative" style={{ backgroundColor: '#FFFFFF' }}>
                <svg className="w-12 h-12" style={{ color: '#0284C7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0284C7' }}>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="mb-6 text-center">
                <h3 className="text-base font-bold mb-2" style={{ color: '#0369A1' }}>디자이너 매칭 중</h3>
                <p className="text-xs text-blue-700 leading-relaxed">
                  모락 AI로 함께 프로젝트를<br/>
                  진행할 디자이너를 만나보세요!
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex-1 px-8 py-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between mb-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">프로젝트 제목</h3>
                    <p className="text-lg font-bold text-neutral-900">{item.title}</p>
                    <span className="text-xs text-neutral-400">
                      생성일: {item.createdAt.slice(0, 10).replaceAll('-', '.')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">카테고리</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#E0F2FE', color: '#0284C7' }}>
                      {item.categoryName || '미분류'}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-blue-200">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">요구사항 요약</h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {item.aiSummary || '요약 정보가 없습니다'}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  onClick={() => {
                    const id = item?.projectId;
                    navigate(`/client-page/matching-detail/${id}`);
                  }}
                  className="px-6 py-3 rounded-xl font-semibold text-sm transition-all border-2 hover:scale-105"
                  style={{ borderColor: '#0284C7', backgroundColor: '#FFFFFF', color: '#0284C7' }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>의뢰 상세</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    const id = item?.projectId;
                    navigate(`/client-page/request-list/apply-designer/${id}`);
                    openApplyList();
                  }}
                  className="px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:scale-105"
                  style={{ backgroundColor: '#0284C7', color: '#FFFFFF' }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>신청 디자이너</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
