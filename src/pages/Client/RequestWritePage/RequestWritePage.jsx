// RequestWritePage.jsx
import MainLayout from '../../../components/layout/MainLayout';
import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { useProject } from '../../../context/ProjectContext';
import { useNavigate } from 'react-router-dom';
// import 'react-datepicker/dist/react-datepicker.css'; // 필요 시 활성화
import morakAI from '../../../assets/morak2.png'; // 경로 확인

const STORAGE_KEY = 'request_write_draft_v1';

export default function RequestWritePage() {
  const [warning, setWarning] = useState(false);
  const [hydrated, setHydrated] = useState(false); // ★ 복원 완료 플래그
  const [submitting, setSubmitting] = useState(false); // ★ 제출 중 오버레이
  const [progress, setProgress] = useState(0); // ★ 진행바 퍼센트 (0~100)
  const intervalRef = useRef(null);

  const navigate = useNavigate();

  // api
  const { create, responseData } = useProject();

  // ----- state -----
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
    if (submitting) return;

    const categoryId =
      Number(localStorage.getItem('draftCategoryId')) ||
      Number(responseData?.categoryId || 0);

    if (!categoryId) {
      alert('카테고리 선택 정보가 없습니다. 카테고리를 먼저 선택해 주세요.');
      return;
    }
    const referenceUrls = parseReferenceUrls(referenceText);

    const payload = {
      categoryId: Number(categoryId),
      budgetEstimate: toNumber(budgetEstimate),
      dueDate: toDateString(dueDate),
      userRequirements: userRequirements.trim(),
      designerRequirements: designerRequirements.trim(),
      referenceUrls,
    };

    try {
      setSubmitting(true);
      setProgress(8); // 시작 시 살짝 채워진 느낌

      const created = await create(payload);

      // 성공: 100%까지 채우고 살짝 보여준 뒤 이동
      setProgress(100);
      setTimeout(() => {
        if (!created) return;
        const { projectId } = created;
        navigate(`/request/AI-question/${projectId}`);
      }, 250);
    } catch (err) {
      console.error(err);
      alert('제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      setProgress(0);
      setSubmitting(false);
    } finally {
      // 실제 언마운트/네비게이트 전까지 인터벌은 useEffect에서 정리됨
    }
  };

  // -------- 진행바: 제출 중일 때 0~90%까지 서서히 증가 --------
  useEffect(() => {
    if (!submitting) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setProgress(0);
      return;
    }

    // 120ms마다 서서히 증가(90%까지만), 남은 10%는 완료 시 채움
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const step = Math.max(0.5, (90 - prev) * 0.08); // 점점 느려지는 이징
        return Math.min(prev + step, 90);
      });
    }, 120);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [submitting]);

  // -------- restore once on mount --------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
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
      !!budgetEstimate &&
      !!dueDate &&
      !!userRequirements &&
      !!designerRequirements &&
      parseReferenceUrls(referenceText).length > 0;

    setWarning(!hasAllRequired);
  }, [
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
        aria-busy={submitting}
        className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] py-[30px] flex items-center"
      >
        <div className="relative w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between">
          <h1 className="text-[24px] font-bold flex flex-col mb-[30px]">
            의뢰서 직접 작성
          </h1>

          <div className="overflow-y-auto flex flex-col gap-[27px] pr-[31px] custom-scrollbar mb-10">
            {/* 프로젝트 제목 */}
            <div>
              <h1 className="text-[#525466] text-[17px] mb-2">
                <span className="text-[#000000]">*</span> 프로젝트 제목
              </h1>
              <input
                disabled
                type="text"
                className="bg-[#F7F8FC] rounded-[8px] h-[40px] w-[100%] text-[#7b7d94] font-[16px] border-[1px] border-transparent outline-none px-4 text-[15px]"
                value={'AI가 제목을 자동으로 작성해요.'}
                readOnly
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
                disabled={submitting}
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
                  disabled={submitting}
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
                  disabled={submitting}
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
                disabled={submitting}
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
                disabled={submitting}
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
                disabled={submitting}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate('/request/category')}
              className="text-[18px] cursor-pointer"
              disabled={submitting}
            >
              이전
            </button>

            {/* submit에서만 네비게이션 */}
            <button
              type="submit"
              disabled={warning || submitting}
              className={`px-[17px] py-[8px] rounded-[16px] text-[18px] cursor-pointer ${
                warning || submitting
                  ? 'bg-gray-300 pointer-events-none'
                  : 'bg-[#BDCFFF]'
              }`}
            >
              {submitting ? '제출 중…' : '다음'}
            </button>
          </div>

          {/* ★ 제출 중 오버레이: 캐릭터 통통 튀기 + 안내 문구 + 점점 차는 진행바 */}
          {submitting && (
            <div
              className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-[2px] rounded-[16px]"
              role="alertdialog"
              aria-live="assertive"
              aria-label="제출 중입니다. 잠시만 기다려주세요."
            >
              <div className="flex flex-col items-center gap-3">
                <img
                  src={morakAI}
                  alt="모락 캐릭터"
                  className="w-[72px] h-[72px] animate-bounce"
                  draggable={false}
                />
                <div className="text-[#444] text-[16px] font-medium">
                  잠시만 기다려주세요
                </div>
                <div className="flex items-center gap-1 mt-[-6px]">
                  <span
                    className="w-2 h-2 rounded-full bg-[#9aa] animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#9aa] animate-bounce"
                    style={{ animationDelay: '120ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#9aa] animate-bounce"
                    style={{ animationDelay: '240ms' }}
                  />
                </div>

                {/* 진행바 */}
                <div
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                  className="w-[220px] h-[8px] bg-[#e9ecf6] rounded-full overflow-hidden mt-2"
                  title={`${Math.round(progress)}%`}
                >
                  <div
                    className="h-full bg-[#BDCFFF] transition-all duration-200 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </MainLayout>
  );
}
