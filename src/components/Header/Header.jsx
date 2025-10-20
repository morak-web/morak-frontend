import morakLogo from '../../assets/Header/morak-logo-nav.png';
import messageIcon from '../../assets/Header/message.png';
import notificationIcon from '../../assets/Header/notification-status.png';

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const hasToken = () => !!localStorage.getItem('accessToken');
  const [isLogin, setIsLogin] = useState(hasToken);
  return (
    <nav className="h-16 px-6 flex justify-between items-center bg-white border-b border-neutral-200 sticky top-0 z-50 backdrop-blur-sm bg-white/80">
      <Link to="/" className="transition-opacity hover:opacity-70">
        <img src={morakLogo} alt="morakLogo" className="h-7" />
      </Link>
      {isLogin ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/chat"
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <img src={messageIcon} alt="messageIcon" className="w-5 h-5" />
            </Link>
            <Link className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
              <img
                src={notificationIcon}
                alt="notificationIcon"
                className="w-5 h-5"
              />
            </Link>
          </div>
          <Link
            className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 cursor-pointer hover:shadow-md transition-shadow ring-2 ring-white"
            to="/client-page/request-list"
          />
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Link
            to="/login"
            className="text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition-colors px-4 py-2"
          >
            로그인
          </Link>
          <Link
            to="/sign-up"
            className="text-sm font-semibold bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg transition-all hover:shadow-md"
          >
            시작하기
          </Link>
        </div>
      )}
    </nav>
  );
}
