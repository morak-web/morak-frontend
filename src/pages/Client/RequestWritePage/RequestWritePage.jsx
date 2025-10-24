// RequestWritePage.jsx
import MainLayout from '../../../components/layout/MainLayout';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useProject } from '../../../context/ProjectContext';
import { useNavigate } from 'react-router-dom';
// import 'react-datepicker/dist/react-datepicker.css'; // 필요 시 활성화

const STORAGE_KEY = 'request_write_draft_v1';

export default function RequestWritePage() {
  const [warning, setWarning] = useState(false);
  const [hydrated, setHydrated] = useState(false); // ★ 복원 완료 플래그
  const navigate = useNavigate();

  // api
  const { create, responseData } = useProject();

  // ----- state -----
  const [title, setTitle] = useState('');
  const [budgetEstimate, setBudgetEstimate] = useState('');
  const [userRequirements, setUserRequirements] = useState('');
  const [designerRequirements, setDesignerRequirements] = useState('');

  // DatePicker는 Date/null을 사용
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(null);

  // 참고 URL: 입력은 문자열, 전송 시 배열로 파싱
  const [referenceText, setReferenceText] = useState('');

  // -------- helpers --------
  const toDateString = (d) => {
    if (!d) return null;
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  const normalizeUrl = (raw) => {
    let s = String(raw || '').trim();
    if (!s) return '';
    if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
    return s;
  };

  const parseReferenceUrls = (text) => {
    const arr = String(text || '')
      .split(/[\n,]+/) // 줄바꿈/콤마 모두 허용
      .map(normalizeUrl)
      .filter(Boolean);
    return Array.from(new Set(arr)); // 중복 제거
  };

  const toNumber = (s) => Number(String(s).replace(/[^\d]/g, '') || 0);

  // -------- submit --------
  const onSubmit = async (e) => {
    e.preventDefault();
    const categoryId = responseData?.categoryId;
    const referenceUrls = parseReferenceUrls(referenceText);

    const payload = {
      categoryId: Number(categoryId),
      title: title.trim(),
      budgetEstimate: toNumber(budgetEstimate),
      dueDate: toDateString(dueDate),
      userRequirements: userRequirements.trim(),
      designerRequirements: designerRequirements.trim(),
      referenceUrls,
    };

    try {
      const created = await create(payload);
      if (!created) return;
      const { projectId } = created;
      navigate(`/request/AI-question/${projectId}`);
    } catch (err) {
      console.error(err);
    }
  };

  // -------- restore once on mount --------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setTitle(saved.title ?? '');
        setBudgetEstimate(saved.budgetEstimate ?? ''); // 포맷된 문자열 그대로
        setUserRequirements(saved.userRequirements ?? '');
        setDesignerRequirements(saved.designerRequirements ?? '');
        setReferenceText(saved.referenceText ?? '');
        setStartDate(saved.startDate ? new Date(saved.startDate) : new Date());
        setDueDate(saved.dueDate ? new Date(saved.dueDate) : null);
      }
    } catch (e) {
      console.error('restore failed', e);
    } finally {
      setHydrated(true); // ★ 복원 완료
    }
  }, []);

  // -------- persist on change (after hydrated) --------
  useEffect(() => {
    if (!hydrated) return; // ★ 복원 끝나기 전에는 저장 금지
    const draft = {
      title,
      budgetEstimate, // "1,234,567" 같은 포맷 문자열로 저장 가능
      userRequirements,
      designerRequirements,
      referenceText,
      startDate: startDate ? startDate.toISOString() : null,
      dueDate: dueDate ? dueDate.toISOString() : null,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      console.error('persist failed', e);
    }
  }, [
    hydrated,
    title,
    budgetEstimate,
    userRequirements,
    designerRequirements,
    referenceText,
    startDate,
    dueDate,
  ]);

  // -------- validation --------
  useEffect(() => {
    const hasAllRequired =
      !!title &&
      !!budgetEstimate &&
      !!dueDate &&
      !!userRequirements &&
      !!designerRequirements &&
      parseReferenceUrls(referenceText).length > 0;

    setWarning(!hasAllRequired);
  }, [
    title,
    budgetEstimate,
    dueDate,
    userRequirements,
    designerRequirements,
    referenceText,
  ]);

  return (
    <MainLayout>
      <form
        onSubmit={onSubmit}
        className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] py-[30px] flex items-center"
      >
        <div className=" w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between">
          <h1 className="text-[24px] font-bold flex flex-col mb-[30px]">
            의뢰서 직접 작성
          </h1>

          <div className="overflow-y-auto flex flex-col gap-[27px] pr-[31px] custom-scrollbar mb-10">
            {/* 프로젝트 제목 */}
            <div>
              <h1 className="text-[#525466] text-[17px] mb-2">
                <span className="text-red-600">*</span> 프로젝트 제목
              </h1>
              <input
                type="text"
                className="bg-[#F7F8FC] rounded-[8px] h-[40px] w-[100%] text-black font-[16px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694] px-4 text-[15px]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 예산 */}
            <div className="relative">
              <h1 className="text-[#525466] text-[17px] mb-2">
                <span className="text-red-600">*</span> 지출 가능 예산
              </h1>
              <input
                type="text"
                className="w-[200px] bg-[#F7F8FC] rounded-[8px] h-[40px] text-black font-[16px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694] pl-8 text-[15px]"
                value={budgetEstimate}
                onChange={(e) => setBudgetEstimate(e.target.value)}
              />
              <p className="text-[#B0B3C6] text-[14px] absolute bottom-2 left-[10px]">
                ₩
              </p>
            </div>

            {/* 일정 */}
            <div className="flex items-end">
              <div>
                <h1 className="text-[#525466] text-[17px] mb-2">
                  <span className="text-red-600">*</span> 예상 시작일
                </h1>
                <DatePicker
                  shouldCloseOnSelect
                  selected={startDate}
                  onChange={(d) => setStartDate(d)}
                  startDate={startDate}
                  endDate={dueDate}
                  dateFormat="yyyy. MM. dd"
                  className="bg-[#F7F8FC] rounded-[8px] h-[40px] w-[121px] text-[14px] text-center outline-none focus:border-[1px] focus:border-[#d6d6d694]"
                  popperPlacement="bottom-start"
                  popperClassName="z-[9999]"
                />
              </div>
              <p className="text-[#B0B3C6] text-[30px] mx-[25px]">-</p>
              <div>
                <h1 className="text-[#525466] text-[17px] mb-2">마감일</h1>
                <DatePicker
                  selected={dueDate}
                  onChange={(d) => setDueDate(d)}
                  startDate={startDate}
                  endDate={dueDate}
                  placeholderText="YYYY. MM. DD"
                  dateFormat="yyyy. MM. dd"
                  className="bg-[#F7F8FC] rounded-[8px] h-[40px] w-[121px] text-[14px] text-center outline-none focus:border-[1px] focus:border-[#d6d6d694]"
                  popperPlacement="bottom-start"
                  popperClassName="z-[9999]"
                />
              </div>
            </div>

            {/* 상세 요구 사항 */}
            <div>
              <h1 className="text-[#525466] text-[17px]">
                <span className="text-red-600">*</span> 상세 요구 사항
              </h1>
              <p className="text-[#525466] text-[12px] mb-[6px]">
                프로젝트 개요 / 주요 기능(화면 구성, 필수 페이지 등) / 톤앤매너
                / 우대사항 등을 알려주세요.
              </p>
              <textarea
                className="w-[100%] h-[125px] bg-[#F7F8FC] rounded-[20px] resize-none py-[10px] px-4 text-black text-[15px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694]"
                value={userRequirements}
                onChange={(e) => setUserRequirements(e.target.value)}
              />
            </div>

            {/* 모집 요건 */}
            <div>
              <h1 className="text-[#525466] text-[17px]">
                <span className="text-red-600">*</span> 모집 요건
              </h1>
              <p className="text-[#525466] text-[12px] mb-[6px]">
                원하는 디자이너의 필수 역량, 사용 툴 등을 적어주세요.
              </p>
              <textarea
                className="w-[100%] h-[125px] bg-[#F7F8FC] rounded-[20px] resize-none py-[10px] px-4 text-black text-[15px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694]"
                value={designerRequirements}
                onChange={(e) => setDesignerRequirements(e.target.value)}
              />
            </div>

            {/* 참고 자료 (문자열 입력 → 배열 파싱) */}
            <div className="mb-[15px]">
              <h1 className="text-[#525466] text-[17px]">
                <span className="text-red-600">*</span> 참고 자료
              </h1>
              <p className="text-[#525466] text-[12px] mb-[6px]">
                레퍼런스 URL을 줄바꿈 또는 콤마(,)로 구분해서 입력하세요.
              </p>
              <textarea
                className="w-[100%] h-[125px] bg-[#F7F8FC] rounded-[20px] resize-none py-[10px] px-4 text-black text-[15px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694]"
                value={referenceText}
                onChange={(e) => setReferenceText(e.target.value)}
                placeholder={`https://linear.app\nhttps://notion.so/...`}
              />
              {/* 미리보기 (선택) */}
              {/* <div className="mt-2 text-xs text-gray-500">
                {parseReferenceUrls(referenceText).map((u) => <div key={u}>{u}</div>)}
              </div> */}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate('/request/category')}
              className="text-[18px] cursor-pointer"
            >
              이전
            </button>

            {/* submit에서만 네비게이션 */}
            <button
              type="submit"
              disabled={warning}
              className={`${warning ? 'bg-gray-300 pointer-events-none' : 'bg-[#BDCFFF]'} px-[17px] py-[8px] rounded-[16px] text-[18px] cursor-pointer`}
            >
              다음
            </button>
          </div>
        </div>
      </form>
    </MainLayout>
  );
}
