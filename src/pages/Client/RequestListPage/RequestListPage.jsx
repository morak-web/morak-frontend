import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import ApplyDesignerListCard from './ApplyDesigner/ApplyDesignerListCard';
import { useProject } from '../../../context/ProjectContext';
import { motion, useReducedMotion } from 'framer-motion';

function TopSide({ STATUS }) {
  return (
    <div className="flex w-[100%] h-[80px] bg-white rounded-[11px] justify-center py-[13px] 2xl:px-[1px] px-[5px] shadow-md">
      {STATUS.map((item, idx) => (
        <div className="flex items-center" key={idx}>
          <h1 className="text-[11px] sm:text-[18px] md:text-[20px] text-[rgba(82,84,102,1)] mr-[7px] sm:mr-[12px] md:mr-[15px] xl:mr-[25px] 2xl:mr-[45px] ">
            {item.title}
          </h1>
          <motion.h2
            key={`${item.title}-${item.count}`}
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.18 } }}
            className={`text-[17px] sm:text-[26px] md:text-[28px] ${item.count > 0 ? 'text-[#687AFE] font-bold ' : 'text-[rgba(195,196,206)] '}`}
          >
            {item.count}
          </motion.h2>
          {idx < 3 ? (
            <div className="inline-block w-[1px] h-[42px] bg-[rgba(195,196,206)] mr-[6px] sm:mr-[18px] xl:mr-[25px] 2xl:mr-[40px] ml-[6px] sm:ml-[14px] md:ml-[20px] xl:ml-[25px] 2xl:ml-[40px]" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ContentTopSide({ tab, setTab, closeApplyList, STATUS }) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-[10px]">
        {tab ? (
          <>
            {STATUS.map((item) => (
              <NavLink
                key={item.title}
                to={item.status}
                className="no-underline"
              >
                {({ isActive }) => (
                  <label className="gap-[6px] flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="requestState"
                      className="w-[16px] h-[16px] hidden peer"
                      checked={isActive}
                      onChange={() => {}}
                    />
                    <span className="block w-[16px] h-[16px] border border-[#DFE1ED] rounded-[4px] peer-checked:bg-[#DFE1ED]" />
                    <span className="text-[13px] text-[#525466]">
                      {item.title}
                    </span>
                  </label>
                )}
              </NavLink>
            ))}
          </>
        ) : (
          <h1 className="font-bold">신청 디자이너 보기</h1>
        )}
      </div>
      <button
        onClick={() => (tab ? setTab(false) : closeApplyList())}
        className={`${!tab && 'w-[160px] h-[31px] text-black text-[14px] flex justify-center items-center cursor-pointer'}`}
      >
        {tab ? '' : '의뢰 목록 보기 > '}
      </button>
    </div>
  );
}

export default function RequestListPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(true);
  const [showApplyList, setShowApplyList] = useState(false);
  const location = useLocation();
  const shouldReduce = useReducedMotion();

  const [counts, setCounts] = useState({
    DRAFT: 0,
    MATCHING: 0,
    WORKING: 0,
    COMPLETE: 0,
  });

  const { fetchProjectList } = useProject();

  // StrictMode에서도 data load가 "한 번만" 돌도록 가드
  const didLoad = useRef(false);
  const loadCounts = useCallback(async () => {
    if (didLoad.current) return;
    didLoad.current = true;
    try {
      const STATUSES = ['DRAFT', 'MATCHING', 'WORKING', 'COMPLETE'];
      const results = await Promise.all(
        STATUSES.map((s) => fetchProjectList(s))
      );
      const next = {};
      results.forEach((res, i) => {
        const len = Array.isArray(res)
          ? res.length
          : Array.isArray(res?.data)
            ? res.data.length
            : typeof res?.totalCount === 'number'
              ? res.totalCount
              : 0;
        next[STATUSES[i]] = len;
      });
      setCounts((prev) => ({ ...prev, ...next }));
    } catch (e) {
      console.error('load counts error:', e);
    }
  }, [fetchProjectList]);

  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  useEffect(() => {
    const isParent = /\/client-page\/request-list\/?$/.test(location.pathname);
    if (isParent && tab && !showApplyList) {
      navigate('writing', { replace: true });
    }
  }, [location.pathname, showApplyList, tab, navigate]);

  const STATUS = [
    { title: '작성 중', count: counts.DRAFT, status: 'writing' },
    { title: '매칭 중', count: counts.MATCHING, status: 'matching' },
    { title: '진행 중', count: counts.WORKING, status: 'progressing' },
    { title: '완료', count: counts.COMPLETE, status: 'complete' },
  ];

  const openApplyList = () => {
    setTab(false);
    setShowApplyList(true);
  };

  const closeApplyList = () => {
    // 깜빡임 2회 방지: 라우팅 먼저 → 상태 변경
    navigate('/client-page/request-list/matching', { replace: true });
    requestAnimationFrame(() => {
      setShowApplyList(false);
      setTab(true);
    });
  };

  // 교차 페이드/슬라이드(언마운트 없이 전환)
  const paneTransition = { duration: 0.22, ease: 'easeOut' };
  const listAnimate = showApplyList
    ? { opacity: 0, x: shouldReduce ? 0 : -8 }
    : { opacity: 1, x: 0 };
  const applyAnimate = showApplyList
    ? { opacity: 1, x: 0 }
    : { opacity: 0, x: shouldReduce ? 0 : 8 };

  return (
    <div className="w-[95%] h-[710px] flex flex-col justify-between">
      <TopSide STATUS={STATUS} />
      <div className="bg-white w-[100%] h-[84%] rounded-[11px] shadow-md">
        <div className="pl-[28px] pr-[13px] py-[20px] h-[100%] flex flex-col gap-[33px]">
          <ContentTopSide
            tab={tab}
            setTab={setTab}
            closeApplyList={closeApplyList}
            STATUS={STATUS}
          />

          {/* ▼ content 영역: 두 패널을 겹치고 토글만 애니메이션 */}
          <div className="relative flex-1">
            {/* 리스트(Outlet) 패널 */}
            <motion.div
              initial={false} // 초기 마운트시 페이드 생략
              animate={listAnimate}
              transition={paneTransition}
              className="absolute inset-0 flex flex-col gap-[24px] overflow-y-auto pr-[27px] custom-scrollbar will-change-transform"
              style={{ pointerEvents: showApplyList ? 'none' : 'auto' }}
              aria-hidden={showApplyList}
            >
              <Outlet context={{ openApplyList }} />
            </motion.div>

            {/* 신청 디자이너 패널 */}
            <motion.div
              initial={false}
              animate={applyAnimate}
              transition={paneTransition}
              className="absolute inset-0 flex flex-col gap-[24px] overflow-y-auto pr-[27px] custom-scrollbar will-change-transform"
              style={{ pointerEvents: showApplyList ? 'auto' : 'none' }}
              aria-hidden={!showApplyList}
            >
              <ApplyDesignerListCard />
            </motion.div>
          </div>
          {/* ▲ content 끝 */}
        </div>
      </div>
    </div>
  );
}
