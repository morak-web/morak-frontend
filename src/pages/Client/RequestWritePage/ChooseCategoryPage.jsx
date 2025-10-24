import MainLayout from '../../../components/layout/MainLayout';
import websiteIcon from '../../../assets/RequestWrite/website-icon.png';
import appIcon from '../../../assets/RequestWrite/app-icon.png';
import shoppingIcon from '../../../assets/RequestWrite/shopping-icon.png';
import posIcon from '../../../assets/RequestWrite/POS-icon.png';
import graphicIcon from '../../../assets/RequestWrite/graphic-icon.png';
import moreIcon from '../../../assets/RequestWrite/more-icon.png';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../../context/ProjectContext';

const CATEGORY = [
  { title: '웹사이트', icon: websiteIcon, id: 1 },
  { title: '앱', icon: appIcon, id: 2 },
  { title: '쇼핑몰/스마트스토어', icon: shoppingIcon, id: 3 },
  { title: '키오스크/POS', icon: posIcon, id: 4 },
  { title: '그래픽/영상', icon: graphicIcon, id: 5 },
  { title: '기타', icon: moreIcon, id: 6 },
];

export default function ChooseCategoryPage() {
  const [isClicked, setIsClicked] = useState(''); // 선택된 타이틀 (하이라이트용)
  const [categoryId, setCategoryId] = useState(null); // 숫자 ID
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { create } = useProject();

  // 로컬 저장값 복원 (있다면)
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
    if (!categoryId || submitting) return;

    try {
      setSubmitting(true);

      // 서버에 프로젝트 초안 생성 (반드시 숫자 전달)
      const created = await create({ categoryId: Number(categoryId) });

      // 생성 결과에서 projectId를 가져와 로컬에 저장
      const projectId = created?.id ?? created?.projectId ?? null;
      if (projectId == null) {
        throw new Error('프로젝트 ID를 확인할 수 없습니다.');
      }

      localStorage.setItem('draftProjectId', String(projectId));
      localStorage.setItem('draftCategoryId', String(categoryId));
      localStorage.setItem('draftSavedAt', new Date().toISOString());

      // 다음 단계로 이동 (라우팅 구조에 따라 필요 시 /request/write/:id 로 바꾸세요)
      navigate('/request/write');
    } catch (err) {
      console.error(err);
      alert('프로젝트 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
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
                  setCategoryId(item.id); // 숫자 ID 저장
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
