import MainLayout from '../../../components/layout/MainLayout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../../context/ProjectContext';

const CATEGORY = [
  {
    title: '웹사이트',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    id: 1,
  },
  {
    title: '앱',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    id: 2,
  },
  {
    title: '쇼핑몰/스마트스토어',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    id: 3,
  },
  {
    title: '키오스크/POS',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    id: 4,
  },
  {
    title: '그래픽/영상',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    id: 5,
  },
  {
    title: '기타',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    id: 6,
  },
];
export default function ChooseCategoryPage() {
  const [isClicked, setIsClicked] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const navigate = useNavigate();
  const { create } = useProject();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await create({ categoryId: categoryId });
      localStorage.setItem('draftProjectId', String(categoryId));
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-b from-sky-50 to-white flex items-center py-12 px-4">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-12 flex flex-col gap-10 border border-neutral-100"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-neutral-900">프로젝트 카테고리</h1>
            <p className="text-neutral-600">어떤 디자인이 필요하신가요?</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1">
            {CATEGORY.map((item) => (
              <button
                type="button"
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-200 ${
                  item.title === isClicked
                    ? 'bg-sky-600 shadow-xl scale-[1.02]'
                    : 'bg-white hover:bg-sky-50 shadow-md hover:shadow-lg hover:scale-[1.02] border-2 border-neutral-200 hover:border-sky-300'
                }`}
                onClick={() => {
                  setIsClicked(item.title);
                  setCategoryId(item.id);
                }}
              >
                <div className="flex flex-col items-center gap-4 relative z-10">
                  <div className={`w-16 h-16 transition-all duration-200 ${
                    item.title === isClicked
                      ? 'text-white'
                      : 'text-sky-600 group-hover:text-sky-700'
                  }`}>
                    {item.icon}
                  </div>
                  <h2 className={`text-lg font-bold text-center transition-colors leading-tight ${
                    item.title === isClicked ? 'text-white' : 'text-neutral-900 group-hover:text-sky-700'
                  }`}>
                    {item.title}
                  </h2>
                </div>

                {/* Selection indicator */}
                {item.title === isClicked && (
                  <div className="absolute top-4 right-4 animate-fade-in">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-neutral-200">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-neutral-600 hover:text-neutral-900 font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              이전
            </button>
            <button
              type="submit"
              onClick={() => navigate('/request/write')}
              disabled={!isClicked}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                isClicked
                  ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              다음 단계
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
