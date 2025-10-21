import { useEffect, useState } from 'react';
import MatchingCard from '../../../components/Designer/Matching/MatchingCard';
import ApplyDetailCard from './applyDetailCard';
import { useDesigner } from '../../../context/DesignerContext';

const TYPE = [
  {
    title: 'ALL',
    id: 0,
  },
  {
    title: '웹',
    id: 1,
  },
  {
    title: '앱',
    id: 2,
  },
  {
    title: '쇼핑몰/스마트 스토어',
    id: 3,
  },
  {
    title: '키오스크/POS',
    id: 4,
  },
  {
    title: '그래픽/영상',
    id: 5,
  },
  {
    title: '기타',
    id: 6,
  },
];

const STATUS = [
  {
    title: '매칭중',
    en: 'MATCHING',
  },
  {
    title: '작업중',
    en: 'WORKING',
  },
];

export default function ProjectMatchingList() {
  const [status, setStatus] = useState('MATCHING');
  const [checkedCategory, setCheckedCategory] = useState(0);
  const [seePage, setSeePage] = useState(true);
  const {
    matchingWaitingList,
    fetchMatchingWaiting,
    loading,
    error,
    fetchApplyProjectList,
    applyProjectList,
  } = useDesigner();
  useEffect(() => {
    fetchApplyProjectList(status);
    fetchMatchingWaiting();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>error!! {String(error.message || error)}</div>;
  const matchingProjectList =
    checkedCategory === 0
      ? matchingWaitingList
      : matchingWaitingList?.filter(
          (item) => item?.categoryId === checkedCategory
        );
  console.log('1', matchingWaitingList);
  console.log(matchingProjectList);
  const projectList = applyProjectList?.filter(
    (item) => item?.projectStatus === status
  );
  console.log('app', projectList);
  return (
    <div className="w-[95%] min-h-[710px]">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden mb-6">
        <div className="px-8 py-6" style={{ backgroundImage: 'linear-gradient(to right, #0284C7, #0369A1)' }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {seePage ? '지원 가능 프로젝트' : '내가 신청한 프로젝트'}
                </h1>
                <p className="text-white/80 text-sm mt-1">
                  {seePage ? '새로운 프로젝트를 찾아보세요' : '신청한 프로젝트를 관리하세요'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSeePage(!seePage)}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: '#FFFFFF', color: '#0284C7' }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={seePage ? "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" : "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"} />
                </svg>
                <span>{seePage ? '신청 목록' : '프로젝트 찾기'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="px-8 py-6 bg-gradient-to-b from-neutral-50 to-white border-t border-neutral-200">
          {seePage ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <h3 className="text-sm font-bold text-neutral-700">카테고리 필터</h3>
              </div>
              <div className="flex gap-3 flex-wrap">
                {TYPE.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => setCheckedCategory(item.id)}
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                    style={
                      checkedCategory === item.id
                        ? { backgroundColor: '#0284C7', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' }
                        : { backgroundColor: '#F5F5F5', color: '#525252' }
                    }
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-sm font-bold text-neutral-700">프로젝트 상태</h3>
              </div>
              <div className="flex gap-3">
                {STATUS.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => setStatus(item.en)}
                    className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
                    style={
                      status === item.en
                        ? { backgroundColor: '#0284C7', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' }
                        : { backgroundColor: '#F5F5F5', color: '#525252' }
                    }
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8">
        {seePage ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-neutral-900">
                  총 {matchingProjectList?.length || 0}개의 프로젝트
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F0F9FF', color: '#0284C7' }}>
                  {TYPE.find(t => t.id === checkedCategory)?.title || 'ALL'}
                </span>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[570px] flex flex-col gap-5 custom-scrollbar pr-2">
              {matchingProjectList?.length > 0 ? (
                matchingProjectList.map((item) => (
                  <div key={item.projectId}>
                    <MatchingCard {...item} />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#F0F9FF' }}>
                    <svg className="w-12 h-12" style={{ color: '#0284C7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">프로젝트가 없습니다</h3>
                  <p className="text-neutral-500">다른 카테고리를 선택해보세요</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-neutral-900">
                  총 {projectList?.length || 0}개의 프로젝트
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F0F9FF', color: '#0284C7' }}>
                  {STATUS.find(s => s.en === status)?.title || '전체'}
                </span>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[570px] flex flex-col gap-5 custom-scrollbar pr-2">
              {projectList?.length > 0 ? (
                projectList.map((item) => (
                  <div key={item.projectId}>
                    <ApplyDetailCard {...item} />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#F0F9FF' }}>
                    <svg className="w-12 h-12" style={{ color: '#0284C7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">신청한 프로젝트가 없습니다</h3>
                  <p className="text-neutral-500">새로운 프로젝트에 지원해보세요</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
