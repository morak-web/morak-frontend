import MainLayout from '../../../components/layout/MainLayout';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useProject } from '../../../context/ProjectContext';
import { useNavigate, Link } from 'react-router-dom';

export default function RequestWritePage() {
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  // api
  const { create, responseData } = useProject();
  const [title, setTitle] = useState('');
  const [budgetEstimate, setBudgetEstimate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [userRequirements, setUserRequirements] = useState('');
  const [designerRequirements, setDesignerRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startDate = new Date();
  function toDateString(d) {
    if (!d) return null;
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const categoryId = responseData?.categoryId;

    const payload = {
      categoryId: Number(categoryId),
      title: title.trim(),
      budgetEstimate: Number(budgetEstimate),
      dueDate: toDateString(dueDate),
      userRequirements: userRequirements.trim(),
      designerRequirements: designerRequirements.trim(),
    };

    setIsSubmitting(true);
    try {
      const created = await create(payload);
      const { projectId } = created;
      console.log(projectId);
      navigate(`/request/AI-question/${projectId}`);
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
      return null;
    }
  };

  useEffect(() => {
    if (
      !title ||
      !budgetEstimate ||
      !dueDate ||
      !userRequirements ||
      !designerRequirements
    ) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  }, [title, budgetEstimate, dueDate, userRequirements, designerRequirements]);

  return (
    <MainLayout>
      <form
        onSubmit={onSubmit}
        className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-b from-sky-50 to-white py-12 px-4"
      >
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10 flex flex-col gap-8 border border-neutral-100 min-h-[800px]">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-neutral-900">의뢰서 작성</h1>
            <p className="text-neutral-600">프로젝트 정보를 자세히 알려주세요</p>
          </div>
          <div className="overflow-y-auto flex flex-col gap-8 pr-4 custom-scrollbar flex-1">
            <div className="space-y-2">
              <label className="text-neutral-900 font-semibold text-base flex items-center gap-2">
                <span className="text-error-500">*</span>
                프로젝트 제목
              </label>
              <input
                type="text"
                className="bg-white rounded-xl h-14 w-full text-neutral-900 border-2 border-neutral-200 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 px-5 text-base transition-all"
                placeholder="예: 쇼핑몰 UI/UX 디자인"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-neutral-900 font-semibold text-base flex items-center gap-2">
                <span className="text-error-500">*</span>
                지출 가능 예산
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">₩</div>
                <input
                  type="text"
                  className="w-full md:w-80 bg-white rounded-xl h-14 text-neutral-900 border-2 border-neutral-200 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 pl-10 pr-5 text-base transition-all"
                  placeholder="1,000,000"
                  value={budgetEstimate}
                  onChange={(e) => setBudgetEstimate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-neutral-900 font-semibold text-base flex items-center gap-2">
                <span className="text-error-500">*</span>
                프로젝트 기간
              </label>
              <div className="flex items-center gap-4">
                <DatePicker
                  shouldCloseOnSelect
                  selected={startDate}
                  onChange={(data) => setStartDate(data)}
                  startDate={startDate}
                  endDate={dueDate}
                  dateFormat="yyyy. MM. dd"
                  className="bg-white rounded-xl h-14 w-44 text-center border-2 border-neutral-200 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all"
                  popperPlacement="bottom-start"
                  popperClassName="z-[9999]"
                />
                <div className="text-neutral-300 text-2xl">→</div>
                <DatePicker
                  selected={dueDate}
                  onChange={(data) => setDueDate(data)}
                  startDate={startDate}
                  endDate={dueDate}
                  placeholderText="마감일 선택"
                  dateFormat="yyyy. MM. dd"
                  className="bg-white rounded-xl h-14 w-44 text-center border-2 border-neutral-200 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all"
                  popperPlacement="bottom-start"
                  popperClassName="z-[9999]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-neutral-900 font-semibold text-base flex items-center gap-2">
                <span className="text-error-500">*</span>
                상세 요구 사항
              </label>
              <p className="text-neutral-500 text-sm">
                프로젝트 개요, 주요 기능, 화면 구성, 톤앤매너 등을 자세히 알려주세요
              </p>
              <textarea
                className="w-full min-h-[140px] bg-white rounded-xl resize-none p-5 text-neutral-900 text-base border-2 border-neutral-200 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all"
                placeholder="예: 20-30대 여성을 타겟으로 한 패션 쇼핑몰 디자인이 필요합니다..."
                value={userRequirements}
                onChange={(e) => setUserRequirements(e.target.value)}
              ></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-neutral-900 font-semibold text-base flex items-center gap-2">
                <span className="text-error-500">*</span>
                모집 요건
              </label>
              <p className="text-neutral-500 text-sm">
                원하는 디자이너의 필수 역량, 사용 툴 등을 적어주세요
              </p>
              <textarea
                className="w-full min-h-[140px] bg-white rounded-xl resize-none p-5 text-neutral-900 text-base border-2 border-neutral-200 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all"
                placeholder="예: Figma 능숙자, UI/UX 포트폴리오 필수..."
                value={designerRequirements}
                onChange={(e) => setDesignerRequirements(e.target.value)}
              ></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-neutral-900 font-semibold text-base">
                참고 자료
              </label>
              <p className="text-neutral-500 text-sm">
                레퍼런스나 필요한 자료를 추가해주세요
              </p>
              <button type="button" className="w-full h-32 bg-neutral-50 hover:bg-sky-50 border-2 border-dashed border-neutral-300 hover:border-sky-400 rounded-xl cursor-pointer text-neutral-400 hover:text-sky-600 transition-all flex flex-col items-center justify-center gap-2 group">
                <svg className="w-10 h-10 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-medium">파일 추가</span>
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center pt-6 border-t border-neutral-200">
            <button
              type="button"
              onClick={() => navigate('/request/category')}
              className="text-neutral-600 hover:text-neutral-900 font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              이전
            </button>
            <button
              type="submit"
              disabled={warning || isSubmitting}
              className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                !warning && !isSubmitting
                  ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-500 rounded-full animate-spin"></div>
                  <span>의뢰서 생성 중...</span>
                </>
              ) : (
                '다음 단계'
              )}
            </button>
          </div>
        </div>
      </form>
    </MainLayout>
  );
}
