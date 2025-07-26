import MainLayout from '../../components/layout/MainLayout';
import websiteIcon from '../../assets/RequestWrite/website-icon.png';
import appIcon from '../../assets/RequestWrite/app-icon.png';
import shoppingIcon from '../../assets/RequestWrite/shopping-icon.png';
import posIcon from '../../assets/RequestWrite/POS-icon.png';
import graphicIcon from '../../assets/RequestWrite/graphic-icon.png';
import moreIcon from '../../assets/RequestWrite/more-icon.png';
import aiIcon from '../../assets/RequestWrite/ai-icon.png';

import { Link } from 'react-router-dom';

const CATEGORY = [
  {
    title: '웹사이트',
    icon: websiteIcon,
  },
  {
    title: '앱',
    icon: appIcon,
  },
  {
    title: '쇼핑몰/스마트스토어',
    icon: shoppingIcon,
  },
  {
    title: '키오스크/POS',
    icon: posIcon,
  },
  {
    title: '그래픽/영상',
    icon: graphicIcon,
  },
  {
    title: '기타',
    icon: moreIcon,
  },
];
export default function ChooseCategoryPage() {
  return (
    <MainLayout>
      <div className="w-[100%] bg-[#f1f2f8] h-[calc(100vh-64px)] py-[62px]">
        <div className="w-[100%] sm:w-[55%] mx-auto bg-white h-[99%] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between">
          <h1 className="text-[24px] font-bold">프로젝트 카테고리</h1>
          <div className="grid grid-cols-3 gap-13 h-[80%] mt-[10px]">
            {CATEGORY.map((item) => (
              <div className="bg-[#F7F8FC] rounded-[20px] shadow-[3px_0px_3px_rgba(0,0,0,0.1),0_4px_3px_rgba(0,0,0,0.1)] px-[21px] py-[12px] cursor-pointer">
                <h2 className=" text-[10px] lg:text-[16px]">{item.title}</h2>
                <div className="w-[100%] h-[1px] bg-[#BFC2D3] mt-[8px] mb-[10px] " />
                <div className="bg-white w-[100%] h-[77%] rounded-[20px] flex justify-center items-center">
                  <img src={item.icon} className="w-[70%]" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <Link to="/" className=" text-[18px] cursor-pointer">
              이전
            </Link>
            <Link
              to="/request/write"
              className="bg-[#BDCFFF] px-[17px] py-[8px] rounded-[8px] text-[18px] cursor-pointer"
            >
              다음
            </Link>
          </div>
        </div>
        <button>
          <img
            src={aiIcon}
            className="absolute bottom-2 right-6 w-[80px] cursor-pointer"
          />
        </button>
      </div>
    </MainLayout>
  );
}
