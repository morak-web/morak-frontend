import { Link, Outlet } from 'react-router-dom';
import { useCallback, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import pencilIcon from '../../assets/RequestList/pencilIcon.png';
import { useMyInfo } from '../../context/MyInfoContext';
import userIcon from '../../assets/user-icon.png';
import { NavLink } from 'react-router-dom';
const ASIDE_BAR = [
  {
    title: '프로젝트 매칭 대기',
    link: 'project-matching-wait',
  },
  {
    title: '내 작업 목록',
    link: 'my-work-list',
  },
  {
    title: '포트폴리오 관리',
    link: 'register',
  },
];

function LeftSection() {
  const { fetchMyInfo, myInfo } = useMyInfo();
  useCallback(() => {
    fetchMyInfo();
  }, []);

  return (
    <div className="w-80 min-h-[calc(100vh-96px)] flex flex-col gap-6 pr-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-neutral-200/50">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img
              src={myInfo?.profileImageUrl ? myInfo?.profileImageUrl : userIcon}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-primary-100 shadow-md"
              alt="프로필"
            />
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <NavLink
            to="register"
            className="mt-4 flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-600 transition-colors group"
          >
            <span>프로필 수정</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </NavLink>
          <div className="mt-4 w-full h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
          <p className="mt-4 text-center text-neutral-700">
            <span className="text-xl font-bold text-primary-600 block mb-1">{myInfo?.name}</span>
            <span className="text-sm">님의 워크스페이스</span>
          </p>
        </div>
      </div>

      <nav className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-neutral-200/50 space-y-2">
        {ASIDE_BAR.map((item) => (
          <NavLink
            key={item.title}
            to={item.link}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`
            }
          >
            {item.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
export default function DesignerPage() {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-primary-50 via-white to-neutral-50 py-8 px-4">
        <div className="max-w-7xl mx-auto flex gap-6">
          <LeftSection />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
