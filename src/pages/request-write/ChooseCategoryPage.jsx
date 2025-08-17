import websiteIcon from '../../assets/RequestWrite/website-icon.png';
import appIcon from '../../assets/RequestWrite/app-icon.png';
import shoppingIcon from '../../assets/RequestWrite/shopping-icon.png';
import posIcon from '../../assets/RequestWrite/POS-icon.png';
import graphicIcon from '../../assets/RequestWrite/graphic-icon.png';
import moreIcon from '../../assets/RequestWrite/more-icon.png';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORY = [
  {
    categoryId: 1,
    title: '웹사이트',
    icon: websiteIcon,
  },
  {
    categoryId: 2,
    title: '앱',
    icon: appIcon,
  },
  {
    categoryId: 3,
    title: '쇼핑몰/스마트스토어',
    icon: shoppingIcon,
  },
  {
    categoryId: 4,
    title: '키오스크/POS',
    icon: posIcon,
  },
  {
    categoryId: 5,
    title: '그래픽/영상',
    icon: graphicIcon,
  },
  {
    categoryId: 6,
    title: '기타',
    icon: moreIcon,
  },
];

export default function ChooseCategoryPage({ next, value, onChange }) {
  const [isClicked, setIsClicked] = useState('');

  useEffect(() => {
    if (value !== undefined) setIsClicked(value);
  }, [value]);

  const handleSelect = (categoryId) => {
    setIsClicked(categoryId);
    onChange?.(categoryId);
  };

  return (
    <div className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] flex items-center py-[30px]">
      <div className="w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between">
        <h1 className="text-[24px] font-bold mb-[30px]">프로젝트 카테고리</h1>
        <div className="grid grid-cols-3 gap-13 h-[80%] mt-[10px] mb-[20px]">
          {CATEGORY.map((item) => (
            <div
              key={item.categoryId}
              className={`${item.categoryId === isClicked ? 'shadow-[0_0_7px_5px_#BDCFFF]' : 'shadow-[3px_0px_3px_rgba(0,0,0,0.1),0_4px_3px_rgba(0,0,0,0.1)]'} bg-[#F7F8FC] rounded-[20px]  px-[21px] py-[12px] cursor-pointer hover:shadow-[0_0_7px_5px_#BDCFFF] `}
              onClick={() => handleSelect(item.categoryId)}
            >
              <h2 className=" text-[10px] md:text-[16px] lg:text-[13px] xl:text-[15px] 2xl:text-[16px]">
                {item.title}
              </h2>
              <div className="w-[100%] h-[1px] bg-[#BFC2D3] mt-[8px] mb-[10px] sm:hidden lg:flex" />
              <div className="bg-white w-[100%] h-[77%] rounded-[20px] flex justify-center items-center sm:hidden lg:flex">
                <img src={item.icon} className="w-[70%]" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Link to="/" className=" text-[18px] cursor-pointer">
            이전
          </Link>
          <button
            onClick={next}
            className={`${
              isClicked
                ? 'bg-[#BDCFFF]' // 선택된 상태에만 활성화
                : 'bg-gray-300 pointer-events-none' // 미선택 시 비활성화
            } px-[17px] py-[8px] rounded-[8px] text-[18px] cursor-pointer`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
