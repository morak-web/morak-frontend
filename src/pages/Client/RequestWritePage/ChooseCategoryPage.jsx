import MainLayout from '../../../components/layout/MainLayout';
import websiteIcon from '../../../assets/RequestWrite/website-icon.png';
import appIcon from '../../../assets/RequestWrite/app-icon.png';
import shoppingIcon from '../../../assets/RequestWrite/shopping-icon.png';
import posIcon from '../../../assets/RequestWrite/POS-icon.png';
import graphicIcon from '../../../assets/RequestWrite/graphic-icon.png';
import moreIcon from '../../../assets/RequestWrite/more-icon.png';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 굳이 create/update 불러올 필요 없음 (여기선 서버호출 X)
// import { useProject } from '../../../context/ProjectContext';

const CATEGORY = [
  { title: '웹사이트', icon: websiteIcon, id: 1 },
  { title: '앱', icon: appIcon, id: 2 },
  { title: '쇼핑몰/스마트스토어', icon: shoppingIcon, id: 3 },
  { title: '키오스크/POS', icon: posIcon, id: 4 },
  { title: '그래픽/영상', icon: graphicIcon, id: 5 },
  { title: '기타', icon: moreIcon, id: 6 },
];

export default function ChooseCategoryPage() {
  const [isClicked, setIsClicked] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const navigate = useNavigate();

  // 로컬 선택 복원
  useEffect(() => {
    const savedCategoryId = Number(
      localStorage.getItem('draftCategoryId') || 0
    );
    if (savedCategoryId) {
      const cat = CATEGORY.find((c) => c.id === savedCategoryId);
      if (cat) {
        setCategoryId(cat.id);
        setIsClicked(cat.title);
      }
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!categoryId || submitting || submittingRef.current) return;

    submittingRef.current = true;
    setSubmitting(true);
    try {
      // 서버 호출 없이 로컬만 저장
      localStorage.setItem('draftCategoryId', String(categoryId));
      localStorage.setItem('draftSavedAt', new Date().toISOString());

      // 작성 페이지에서 "초안이 없으면 1회만 create" 로직이 실행됨
      navigate('/request/write'); // or `/request/write/${draftId}` 구조면 거기에 맞춰 이동
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] flex items-center py-[30px]">
        <form
          onSubmit={onSubmit}
          className="w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between"
        >
          <h1 className="text-[24px] font-bold mb-[30px]">프로젝트 카테고리</h1>

          <div className="grid grid-cols-3 gap-13 h-[80%] mt-[10px] mb-[20px]">
            {CATEGORY.map((item) => (
              <button
                type="button"
                key={item.title}
                className={`${
                  item.title === isClicked
                    ? 'shadow-[0_0_7px_5px_#BDCFFF]'
                    : 'shadow-[3px_0px_3px_rgba(0,0,0,0.1),0_4px_3px_rgba(0,0,0,0.1)]'
                } bg-[#F7F8FC] rounded-t-[20px] cursor-pointer hover:shadow-[0_0_7px_5px_#BDCFFF] flex flex-col justify-between items-start`}
                onClick={() => {
                  setIsClicked(item.title);
                  setCategoryId(item.id);
                }}
              >
                <h2 className="text-[16px] pl-[19px] mt-[12px]">
                  {item.title}
                </h2>
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-[100%] h-[80%]"
                />
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-[18px] cursor-pointer"
            >
              이전
            </button>

            <button
              type="submit"
              disabled={!categoryId || submitting}
              className={`${
                categoryId && !submitting
                  ? 'bg-[#BDCFFF]'
                  : 'bg-gray-300 pointer-events-none'
              } px-[17px] py-[8px] rounded-[16px] text-[18px] cursor-pointer`}
            >
              {submitting ? '저장 중…' : '다음'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
