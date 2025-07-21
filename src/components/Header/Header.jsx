import morakLogo from '../../assets/Header/morak-logo-nav.png';
import messageIcon from '../../assets/Header/message.png';
import notificationIcon from '../../assets/Header/notification-status.png';

import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="h-[64px] pl-[32px] pr-[24px] py-[20px] flex justify-between items-center">
      <Link to="/">
        <img src={morakLogo} alt="morakLogo" />
      </Link>
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
    </nav>
  );
}
