import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ApplyDesignerListCard from './ApplyDesigner/ApplyDesignerListCard';
const STATUS = [
  { title: '작성 중', count: 0, status: 'writing' },
  { title: '매칭 중', count: 1, status: 'matching' },
  { title: '진행 중', count: 0, status: 'progressing' },
  { title: '완료', count: 0, status: 'complete' },
];

function TopSide() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
      <div className="px-8 py-6" style={{ backgroundImage: 'linear-gradient(to right, #0284C7, #0369A1)' }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">내 의뢰 관리</h1>
            <p className="text-white/80 text-sm mt-1">프로젝트 현황을 한눈에 확인하세요</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-0 bg-gradient-to-b from-neutral-50 to-white">
        {STATUS.map((item, idx) => (
          <div key={idx} className="relative">
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: item.count > 0 ? '#E0F2FE' : '#F5F5F5' }}>
                  <svg className="w-6 h-6" style={{ color: item.count > 0 ? '#0284C7' : '#D4D4D8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d={
                        item.status === 'writing' ? 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' :
                        item.status === 'matching' ? 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' :
                        item.status === 'progressing' ? 'M13 10V3L4 14h7v7l9-11h-7z' :
                        'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      }
                    />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold" style={{ color: item.count > 0 ? '#0284C7' : '#D4D4D8' }}>
                  {item.count}
                </h2>
              </div>
              <h1 className="text-base font-semibold text-neutral-700">
                {item.title}
              </h1>
            </div>
            {idx < 3 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-neutral-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentTopSide({ tab, setTab, closeApplyList }) {
  return (
    <div className="flex justify-between items-center pb-6 border-b border-neutral-200">
      <div className="flex gap-3">
        {tab ? (
          <>
            {STATUS.map((item) => (
              <NavLink
                key={item.title}
                to={item.status}
                className="no-underline"
              >
                {({ isActive }) => (
                  <button
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                    style={
                      isActive
                        ? { backgroundColor: '#0284C7', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' }
                        : { backgroundColor: '#F5F5F5', color: '#525252' }
                    }
                  >
                    <span
                      className="block w-2 h-2 rounded-full"
                      style={{ backgroundColor: isActive ? '#FFFFFF' : '#A3A3A3' }}
                    />
                    <span>{item.title}</span>
                  </button>
                )}
              </NavLink>
            ))}
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E0F2FE' }}>
              <svg className="w-6 h-6" style={{ color: '#0284C7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="font-bold text-xl text-neutral-900">신청 디자이너 보기</h1>
          </div>
        )}
      </div>
      {!tab && (
        <button
          onClick={closeApplyList}
          className="px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:scale-105"
          style={{ backgroundColor: '#0284C7', color: '#FFFFFF' }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>의뢰 목록 보기</span>
          </div>
        </button>
      )}
    </div>
  );
}

export default function RequestListPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(true);
  const [showApplyList, setShowApplyList] = useState(false);
  const openApplyList = () => {
    setTab(false);
    setShowApplyList(true);
  };
  const closeApplyList = () => {
    setShowApplyList(false);
    setTab(true);
    navigate('/client-page/request-list/matching');
  };
  return (
    <div className="w-[95%] min-h-[710px] flex flex-col gap-6">
      <TopSide />
      <div className="bg-white w-full flex-1 rounded-xl shadow-sm">
        <div className="p-8 h-full flex flex-col gap-8">
          <ContentTopSide
            tab={tab}
            setTab={setTab}
            closeApplyList={closeApplyList}
          />
          <div className="flex flex-col gap-6 overflow-y-auto pr-4 custom-scrollbar">
            {showApplyList ? (
              <ApplyDesignerListCard />
            ) : (
              <Outlet context={{ openApplyList }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
