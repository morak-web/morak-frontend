// ClientPage.jsx
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useMyInfo } from '../../context/MyInfoContext';
import userIcon from '../../assets/morak2.png';

const ASIDE_BAR = [
  { title: '의뢰서 작성', link: '/request/category' },
  { title: '내 의뢰 목록', link: 'request-list' },
  { title: '결제 내역', link: 'payment-list' },
];

function LeftSide() {
  const location = useLocation();
  const { fetchMyInfo, myInfo } = useMyInfo();

  const [clickedBar, setClickedBar] = useState('내 의뢰 목록');
  const [reveal, setReveal] = useState(false);
  const [pulseIdx, setPulseIdx] = useState(null);
  const [navBump, setNavBump] = useState(false);

  // 현재 라우트에 따라 자동 선택
  useEffect(() => {
    const match = ASIDE_BAR.find((i) => {
      const seg = i.link.startsWith('/') ? i.link : `/${i.link}`;
      return location.pathname.includes(seg);
    });
    if (match) setClickedBar(match.title);
  }, [location.pathname]);

  // ❗ fetchMyInfo 1회만 호출 (함수 아이디 변동으로 인한 루프 방지)
  const calledRef = useRef(false);
  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    fetchMyInfo?.();
  }, [fetchMyInfo]);

  useEffect(() => {
    const t = setTimeout(() => setReveal(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleClick = (title, idx) => {
    setClickedBar(title);
    setPulseIdx(idx);
    setNavBump(true);
    setTimeout(() => setNavBump(false), 180);
    setTimeout(() => setPulseIdx(null), 650);
  };

  return (
    <div
      className={`w-[30%] h-[710px] flex flex-col items-center gap-[35px]
      transition-all duration-700 ease-out
      ${reveal ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
    >
      {/* 프로필 카드 */}
      <div
        className={`bg-white rounded-[19px] w-[80%] h-[250px] flex flex-col items-center pt-[26px] shadow-sm`}
      >
        {!myInfo ? (
          <div className="flex flex-col items-center w-full animate-pulse">
            <div className="w-[80px] h-[80px] lg:w-[127px] lg:h-[127px] rounded-full bg-[#eef1f7]" />
            <div className="mt-[18px] w-[70%] h-[10px] rounded bg-[#eef1f7]" />
            <div className="mt-[10px] w-[45%] h-[10px] rounded bg-[#eef1f7]" />
          </div>
        ) : (
          <>
            <img
              src={myInfo?.profileImageUrl ? myInfo.profileImageUrl : userIcon}
              alt="프로필"
              className="w-[80px] h-[80px] lg:w-[127px] lg:h-[127px] rounded-[50%] mb-[12px]
                         transition-transform duration-500 ease-out scale-95 opacity-90"
              onLoad={(e) => {
                e.currentTarget.classList.remove('scale-95', 'opacity-90');
              }}
            />
            <div className="mt-[11px] w-[80%] h-[2px] bg-[#dadae0]" />
            <h1 className="pt-[9px] text-[13px] xl:text-[16px] text-[rgba(82,84,102,1)]">
              <span className="text-[20px] text-[rgba(96,114,255,1)] font-bold">
                {myInfo?.name ?? '사용자'}
              </span>{' '}
              님의 워크스페이스
            </h1>
          </>
        )}
      </div>

      {/* 사이드 내비 */}
      <div
        className={`relative flex flex-col 2xl:pr-[20%] gap-[8px]
                    transition-transform duration-200`}
      >
        {ASIDE_BAR.map((item, idx) => {
          const active = item.title === clickedBar;
          return (
            <Link
              key={item.title}
              to={item.link}
              aria-current={active ? 'page' : undefined}
              className={`group relative border-t-[2px] w-[80px] sm:w-[152px] h-[50px]
                          text-[13px] sm:text-[15px] pt-[10px] font-bold text-left
                          transition-all duration-300 ease-out
                          ${active ? 'text-[#474858] border-[rgba(195,196,206)]' : 'text-[rgba(195,196,206)]'}`}
              onClick={() => handleClick(item.title, idx)}
            >
              <span className="inline-block">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/** Outlet이 섹션 변경시에만 1번 애니메이션 되도록 */
function FadedOutlet({ triggerKey }) {
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    setReveal(false);
    const t = setTimeout(() => setReveal(true), 20);
    return () => clearTimeout(t);
  }, [triggerKey]);
  return (
    <div
      className={`w-full h-full transition-all duration-500 ease-out
                 ${reveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      <Outlet />
    </div>
  );
}

export default function ClientPage() {
  const location = useLocation();
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReveal(true), 60);
    return () => clearTimeout(t);
  }, []);

  // 섹션 키: 사이드바 항목 중 현재 경로에 포함되는 상위 경로
  const sectionKey = useMemo(() => {
    const normalize = (l) => (l.startsWith('/') ? l : `/${l}`);
    const match = ASIDE_BAR.map((i) => normalize(i.link)).find((seg) =>
      location.pathname.includes(seg)
    );
    return match || 'other';
  }, [location.pathname]);

  const isRequestList = sectionKey.includes('/request-list');

  return (
    <MainLayout>
      <div className="bg-[#f1f2f8] min-h-[calc(100vh-64px)] flex justify-center items-center py-[30px]">
        <div className="w-[100%] lg:w-[70%] h-[710px] flex mx-auto">
          <LeftSide />
          <div
            className={`w-[70%] transition-all duration-700 ease-out
                        ${reveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            style={{ transitionDelay: reveal ? '80ms' : '0ms' }}
          >
            {isRequestList ? (
              <Outlet />
            ) : (
              <FadedOutlet triggerKey={sectionKey} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
