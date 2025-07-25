import morakLogo from '../../assets/Header/morak-logo-nav.png';
import messageIcon from '../../assets/Header/message.png';
import notificationIcon from '../../assets/Header/notification-status.png';

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <nav className="h-[64px] pl-[32px] pr-[24px] py-[20px] flex justify-between items-center">
      <Link to="/">
        <img src={morakLogo} alt="morakLogo" />
      </Link>
      {isLogin ? (
        <div className="flex gap-[23px] ">
          <div className="flex gap-[21px] items-center">
            <Link>
              <img src={messageIcon} alt="messageIcon" />
            </Link>
            <Link>
              <img src={notificationIcon} alt="notificationIcon" />
            </Link>
          </div>
          <div className="w-8 h-8 rounded-[50%] bg-fuchsia-600" />
        </div>
      ) : (
        <div className="flex gap-[22px] items-center">
          <Link to="/login" className="text-[12px]">
            로그인
          </Link>
          <Link
            // to="/sign-up"
            className="text-[12px] bg-[#BDCFFF] py-[6px] px-[14px] rounded-[5px]"
            onClick={() => setIsLogin(true)}
          >
            회원가입
          </Link>
        </div>
      )}
    </nav>
  );
}
