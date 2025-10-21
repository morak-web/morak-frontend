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
    <div className="flex w-full h-20 bg-white rounded-xl justify-center items-center px-8 shadow-sm">
      {STATUS.map((item, idx) => (
        <div className="flex items-center flex-1 justify-center" key={idx}>
          <div className="flex items-center gap-4">
            <h1 className="text-sm sm:text-base md:text-lg text-neutral-600 font-medium">
              {item.title}
            </h1>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{ color: item.count > 0 ? '#0284C7' : '#D4D4D8' }}
            >
              {item.count}
            </h2>
          </div>
          {idx < 3 && (
            <div className="w-px h-10 bg-neutral-200 ml-8" />
          )}
        </div>
      ))}
    </div>
  );
}

function ContentTopSide({ tab, setTab, closeApplyList }) {
  return (
    <div className="flex justify-between items-center">
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
                  <label className="gap-2 flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="requestState"
                      className="w-4 h-4 hidden peer"
                      checked={isActive}
                      onChange={() => {}}
                    />
                    <span
                      className="block w-4 h-4 border-2 rounded transition-colors"
                      style={{
                        borderColor: isActive ? '#0284C7' : '#D4D4D8',
                        backgroundColor: isActive ? '#0284C7' : 'transparent'
                      }}
                    />
                    <span className="text-sm text-neutral-700 font-medium">
                      {item.title}
                    </span>
                  </label>
                )}
              </NavLink>
            ))}{' '}
          </>
        ) : (
          <h1 className="font-bold text-lg text-neutral-900">신청 디자이너 보기</h1>
        )}
      </div>
      {!tab && (
        <button
          onClick={closeApplyList}
          className="px-5 py-2 border border-neutral-900 text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
        >
          의뢰 목록 보기
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
