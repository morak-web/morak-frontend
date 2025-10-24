import morakLogo from '../../assets/morak-logo.png';
import messageIcon from '../../assets/Header/message.png';
import notificationIcon from '../../assets/Header/notification-status.png';
import userIcon from '../../assets/user-icon.png';

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const hasToken = () => !!localStorage.getItem('accessToken');
  const [isLogin, setIsLogin] = useState(hasToken);
  return (
    <nav className="h-[64px] pl-[32px] pr-[24px] py-[20px] flex justify-between items-center ">
      <Link to="/" className="w-[85px] h-[17px]">
        <img src={morakLogo} alt="morakLogo" />
      </Link>
      {!isLogin ? (
        <div className="flex gap-[23px] ">
          <div className="flex gap-[21px] items-center">
            <Link to="/chat">
              <img src={messageIcon} alt="messageIcon" />
            </Link>
            <Link to="/client-page/request-list/writing">
              <img src={notificationIcon} alt="notificationIcon" />
            </Link>
          </div>
          <Link
            className="w-8 h-8 rounded-[50%] cursor-pointer"
            to="/client-page/request-list"
          >
            <img src={userIcon} alt="userIcon" />
          </Link>
        </div>
      ) : (
        <div className="flex gap-[22px] items-center">
          {/* <Link to="/login" className="text-[12px]">
            로그인
          </Link> */}
          <Link
            to="/login"
            className="text-[12px] bg-[#BDCFFF] py-[6px] px-[14px] rounded-[5px]"
            // onClick={() => setIsLogin(true)}
          >
            로그인
          </Link>
        </div>
      )}
    </nav>
  );
}
