import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import pencilIcon from '../../assets/RequestList/pencilIcon.png';
import MainLayout from '../../components/layout/MainLayout';
import { useMyInfo } from '../../context/MyInfoContext';
import userIcon from '../../assets/user-icon.png';

const ASIDE_BAR = [
  {
    title: '의뢰서 작성',
    link: '/request/category',
  },
  {
    title: '내 의뢰 목록',
    link: 'request-list',
  },
  {
    title: '결제 내역',
    link: 'payment-list',
  },
];

function LeftSide() {
  const [clickedBar, setClickedBar] = useState('내 의뢰 목록');
  const { fetchMyInfo, myInfo } = useMyInfo();
  useEffect(() => {
    fetchMyInfo();
  }, []);
  return (
    <div className="w-80 min-h-[calc(100vh-96px)] flex flex-col gap-6 pr-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-neutral-200/50">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img
              src={myInfo?.profileImageUrl ? myInfo?.profileImageUrl : userIcon}
              className="w-28 h-28 rounded-full object-cover ring-4 shadow-md"
              style={{ ringColor: '#E0F2FE', boxShadow: '0 0 0 4px #E0F2FE, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
              alt="프로필"
            />
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 w-full h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
          <p className="mt-4 text-center text-neutral-700">
            <span className="text-xl font-bold block mb-1" style={{ color: '#0284C7' }}>{myInfo?.name}</span>
            <span className="text-sm">님의 워크스페이스</span>
          </p>
        </div>
      </div>

      <nav className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-neutral-200/50 space-y-2">
        {ASIDE_BAR.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
              item.title === clickedBar
                ? 'text-white shadow-md'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
            style={item.title === clickedBar ? { backgroundImage: 'linear-gradient(to right, #0284C7, #0369A1)' } : {}}
            onClick={() => setClickedBar(item.title)}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
export default function ClientPage() {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br via-white to-neutral-50 py-8 px-4" style={{ backgroundImage: 'linear-gradient(to bottom right, #F0F9FF, white, #FAFAFA)' }}>
        <div className="max-w-7xl mx-auto flex gap-6">
          <LeftSide />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
