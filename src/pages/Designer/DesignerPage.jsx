// DesignerPage.jsx
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import pencilIcon from '../../assets/RequestList/pencilIcon.png';
import { useMyInfo } from '../../context/MyInfoContext';
import userIcon from '../../assets/morak-designer.png';

const ASIDE_BAR = [
  { title: '프로젝트 매칭 대기', link: 'project-matching-wait' },
  { title: '내 작업 목록', link: 'my-work-list' },
  { title: '포트폴리오 관리', link: 'register' },
];

function LeftSection() {
  const location = useLocation();
  const { fetchMyInfo, myInfo } = useMyInfo();

  const [clickedBar, setClickedBar] = useState('프로젝트 매칭 대기');
  const [reveal, setReveal] = useState(false); // 초기 등장 애니메이션
  const [pulseIdx, setPulseIdx] = useState(null); // 클릭 파동 위치
  const [navBump, setNavBump] = useState(false); // 내비 전체 살짝 튀는 효과

  // ✅ 무한 렌더링 방지: fetchMyInfo 1회만 호출
  const didFetch = useRef(false);
  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    fetchMyInfo?.();
  }, [fetchMyInfo]);

  // 현재 라우트에 따라 자동 선택 (값이 바뀔 때만 setState)
  useEffect(() => {
    const normalize = (l) => (l.startsWith('/') ? l : `/${l}`);
    const match = ASIDE_BAR.find((i) =>
      location.pathname.includes(normalize(i.link))
    );
    if (match && match.title !== clickedBar) {
      setClickedBar(match.title);
    }
  }, [location.pathname, clickedBar]);

  // 초기 페이드 인
  useEffect(() => {
    const t = setTimeout(() => setReveal(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleClick = (title, idx) => {
    if (title !== clickedBar) setClickedBar(title);
    setPulseIdx(idx);
    setNavBump(true);
    setTimeout(() => setNavBump(false), 180); // 살짝 눌림/튀김
    setTimeout(() => setPulseIdx(null), 650); // ping 종료 후 제거
  };

  return (
    <div
      className={`w-[30%] h-[710px] flex flex-col items-center gap-[35px]
                  transition-all duration-700 ease-out
                  ${reveal ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
    >
      {/* 프로필 카드 */}
      <div className="bg-white rounded-[19px] w-[80%] h-[250px] flex flex-col items-center pt-[26px] shadow-sm">
        {!myInfo ? (
          // 로딩 스켈레톤
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
              className="w-[80px] h-[80px] lg:w-[127px] lg:h-[127px] rounded-[50%] mb-[12px]"
            />
            <NavLink className="flex gap-[2px] items-center" to="register">
              <p className="text-[10px] lg:text-[11px] text-[rgba(82,84,102,1)]">
                프로필 수정하기
              </p>
              <img
                src={pencilIcon}
                alt="pencilIcon"
                className="w-[9px] h-[9px]"
              />
            </NavLink>
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
                    transition-transform duration-200 ${navBump ? 'scale-[0.995]' : 'scale-100'}`}
      >
        {ASIDE_BAR.map((item, idx) => {
          return (
            <NavLink
              key={item.title}
              to={item.link}
              end
              onClick={() => handleClick(item.title, idx)}
              className={({ isActive }) =>
                `group relative border-t-[2px] w-[80px] sm:w-[152px] h-[50px]
                 text-[13px] sm:text-[15px] pt-[10px] font-bold text-left
                transition-all duration-300 ease-out
                 ${isActive ? 'text-[#474858] border-[rgba(195,196,206)]' : 'text-[rgba(195,196,206)]'}
                 after:content-[''] after:absolute after:left-0 after:bottom-[-1px]
                 after:h-[2px] after:bg-[#606EFF] after:transition-transform after:duration-300 after:origin-left
                 ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'}`
              }
            >
              <span className="relative">{item.title}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

/** 사이드바 섹션이 바뀔 때만 오른쪽 Outlet 페이드+슬라이드 */
function FadedOutlet({ triggerKey }) {
  const [reveal, setReveal] = useState(true);

  // triggerKey가 바뀔 때마다 "한 번" 페이드+슬라이드 인
  useEffect(() => {
    setReveal(false);
    const t = setTimeout(() => setReveal(true), 20);
    return () => clearTimeout(t);
  }, [triggerKey]);

  return (
    <div
      className={`w-full h-full transition-all duration-400 ease-out
                  ${reveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      <Outlet />
    </div>
  );
}

export default function DesignerPage() {
  const location = useLocation();
  const [reveal, setReveal] = useState(false);

  // 초기 페이드(우측 컨텐츠 래퍼)
  useEffect(() => {
    const t = setTimeout(() => setReveal(true), 60);
    return () => clearTimeout(t);
  }, []);

  // ✅ 섹션 키: "사이드바 상위 경로"가 바뀔 때만 Outlet 애니메이션
  const sectionKey = useMemo(() => {
    const normalize = (l) => (l.startsWith('/') ? l : `/${l}`);
    const match = ASIDE_BAR.map((i) => normalize(i.link)).find((seg) =>
      location.pathname.includes(seg)
    );
    return match || 'other';
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="bg-[#f1f2f8] min-h-[calc(100vh-64px)] flex justify-center items-center py-[30px]">
        <div className="w-[100%] lg:w-[70%] h-[710px] flex mx-auto">
          <LeftSection />
          <div
            className={`w-[70%] transition-all duration-700 ease-out
                        ${reveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            style={{ transitionDelay: reveal ? '80ms' : '0ms' }}
          >
            {/* 섹션이 바뀔 때만 오른쪽 Outlet 애니메이션 */}
            <FadedOutlet triggerKey={sectionKey} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
