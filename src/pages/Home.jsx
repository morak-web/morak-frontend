import background from '../assets/Home/background.png';
import morakLogo from '../assets/morak-logo.png';
import requestStartIcon from '../assets/Home/start-request-icon.png';
import registerDesignerIcon from '../assets/Home/register-designer-icon.png';

import { Link } from 'react-router-dom';

const ICON_AND_BTN = [
  {
    icon: requestStartIcon,
    btnName: '의뢰 시작하기',
    link: '',
  },
  {
    icon: registerDesignerIcon,
    btnName: '디자이너 등록하기',
    link: '',
  },
];

export default function Home() {
  return (
    <div
      className="min-w-screen min-h-screen flex flex-col items-center gap-[100px]"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <img src={morakLogo} alt="morakLogo" className="mt-[120px]" />
      <div className="flex gap-[115px]">
        {ICON_AND_BTN.map((item) => (
          <div className="flex flex-col justify-center items-center gap-5">
            <img
              className="w-[116px] h-[116px] cursor-pointer"
              src={item.icon}
              alt="item.icon"
            />
            <Link
              to={item.link}
              className="bg-white w-[150px] h-[80px] sm:w-[266px] sm:h-[110px] rounded-[50px] text-[rgba(96,114,255,1)]  sm:text-[27px] flex justify-center items-center cursor-pointer "
            >
              {item.btnName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
