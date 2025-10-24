// RequirementSummaryPage.jsx
import MainLayout from '../../../components/layout/MainLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProject } from '../../../context/ProjectContext';
import { useMemo, useRef, useState, useEffect } from 'react';
import morakAI from '../../../assets/morak2.png';

export default function RequirementSummaryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const projectId = useMemo(() => (id ? String(id) : null), [id]);

  // ✅ submitAndSync가 있으면 그걸 쓰고, 없으면 patchNewProject로 폴백
  const { responseData, patchNewProject, submitAndSync } = useProject();

  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false); // 더블클릭/엔터 중복 제출 방지

  // ★ 진행바/오버레이 속도 제어 상수
  const MIN_OVERLAY_MS = 1600; // 최소 오버레이 표시 시간
  const MAX_PROGRESS_BEFORE_DONE = 92; // 완료 전 머무는 상한
  const TICK_MS = 180; // 증가 주기(느리게)
  const EASING = 0.06; // 진행 이징 계수(작을수록 느림)

  // ★ 진행바 상태
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const startedAtRef = useRef(0);

  const startDate = useMemo(() => new Date(), []);
  const pad = (n) => String(n).padStart(2, '0');
  const ymdDot = `${startDate.getFullYear()}. ${pad(startDate.getMonth() + 1)}. ${pad(startDate.getDate())}`;

  const CATEGORY = {
    1: '웹사이트',
    2: '앱',
    3: '쇼핑몰/스마트스토어',
    4: '키오스크/POS',
    5: '그래픽/영상',
    6: '기타',
  };

  const STORAGE_KEY = 'request_write_draft_v1';
  const AI_THREAD_KEY = projectId ? `ai_req_thread_v1:${projectId}` : null;

  const clearLocalDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      if (AI_THREAD_KEY) localStorage.removeItem(AI_THREAD_KEY);
      localStorage.removeItem('draftProjectId');
      localStorage.removeItem('draftCategoryId');
      localStorage.removeItem('draftSavedAt');
    } catch (e) {
      console.error('localStorage remove failed', e);
    }
  };

  // ★ 제출 버튼
  const onSubmit = async () => {
    if (!projectId || submitting || submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    setProgress(6); // 시작 시 살짝 채움
    startedAtRef.current = performance.now();

    try {
      // ✅ 제출 + 작성중 목록에서 제거 (컨텍스트 동기화)
      if (typeof submitAndSync === 'function') {
        await submitAndSync(projectId);
      } else {
        await patchNewProject(projectId);
      }

      // 성공: 즉시 100%로
      setProgress(100);

      // 최소 체류시간 보장 후 이동
      const elapsed = performance.now() - startedAtRef.current;
      const remain = Math.max(0, MIN_OVERLAY_MS - elapsed);
      setTimeout(
        () => {
          clearLocalDraft();
          navigate('/request/write/complete');
        },
        Math.max(remain, 300)
      ); // 100% 상태도 잠깐 보여주기
    } catch (e) {
      console.error(e);
      const msg =
        e?.response?.data?.details ||
        e?.response?.data?.error ||
        e?.message ||
        '제출 중 오류가 발생했습니다.';
      alert(msg);
      setProgress(0);
      setSubmitting(false);
      submittingRef.current = false;
    } finally {
      // 네비게이션되면 언마운트로 인터벌 정리됨
    }
  };

  // ★ 진행바: 제출 중일 때 0~MAX_PROGRESS_BEFORE_DONE%까지 서서히 증가
  useEffect(() => {
    if (!submitting) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setProgress(0);
      return;
    }
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= MAX_PROGRESS_BEFORE_DONE) return prev;
        const step = Math.max(0.25, (MAX_PROGRESS_BEFORE_DONE - prev) * EASING); // 느린 이징
        return Math.min(prev + step, MAX_PROGRESS_BEFORE_DONE);
      });
    }, TICK_MS);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [submitting]);

  return (
    <MainLayout>
      <div className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] py-[30px] flex items-center">
        <div className="relative w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between">
          <h1 className="text-[24px] font-bold flex flex-col mb-[30px]">
            의뢰 내용 확인/요약
          </h1>

          <div className="flex flex-col gap-[6px] overflow-y-auto custom-scrollbar pr-[40px] mb-[56px]">
            <div>
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                프로젝트 제목 / 카테고리
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]">
                AI가 제목을 자동으로 작성해요.
              </p>
            </div>
            <div>
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                카테고리
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]">
                {CATEGORY[responseData?.categoryId]}
              </p>
            </div>
            <div>
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                지출 가능 예산
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]}">
                {Number(responseData?.budgetEstimate || 0).toLocaleString()} 원
              </p>
            </div>

            <div>
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                기간
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]">
                {ymdDot} ~{' '}
                {String(responseData?.dueDate || '').replaceAll('-', '.')}
              </p>
            </div>

            <div>
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                상세 요구 사항
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px] whitespace-pre-wrap">
                {responseData?.userRequirements}
              </p>
            </div>

            <div>
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                모집 요건
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px] whitespace-pre-wrap">
                {responseData?.designerRequirements}
              </p>
            </div>

            <div className="pb-[10px] border-b-[1px] border-[#5254665e]">
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                참고 자료
              </h1>
              {(responseData?.referenceUrls || []).map((item) => (
                <p
                  key={item}
                  className="text-[#525466] text-[13px] pl-[7px] pt-[9px] flex"
                  title={item}
                >
                  {item.length > 100 ? `${item.slice(0, 100)}...` : item}
                </p>
              ))}
            </div>

            <p className="text-[#A9A9A9] text-[12px] text-end mt-[2px]">
              내용을 수정하려면 이전으로 돌아가주세요.
            </p>
          </div>

          {/* 이전, 제출 버튼 */}
          <div className="flex justify-between items-center">
            <Link
              to={`/request/AI-question/${projectId}`}
              className={`text-[18px] ${submitting ? 'pointer-events-none opacity-60' : 'cursor-pointer'}`}
            >
              이전
            </Link>
            <button
              onClick={onSubmit}
              disabled={!projectId || submitting}
              className={`px-[17px] py-[8px] rounded-[16px] text-[18px] ${
                !projectId || submitting
                  ? 'bg-gray-300 pointer-events-none'
                  : 'bg-[#BDCFFF] cursor-pointer'
              }`}
            >
              {submitting ? '제출 중…' : '제출'}
            </button>
          </div>

          {/* ★ 제출 중 오버레이: 캐릭터 통통 튀기 + 안내 문구 + 느린 진행바 */}
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
                  style={{ animationDuration: '1.25s' }} // bounce도 살짝 느리게
                  draggable={false}
                />
                <div className="text-[#444] text-[16px] font-medium">
                  잠시만 기다려주세요
                </div>
                <div className="flex items-center gap-1 mt-[-6px]">
                  <span
                    className="w-2 h-2 rounded-full bg-[#9aa] animate-bounce"
                    style={{
                      animationDelay: '0ms',
                      animationDuration: '1.25s',
                    }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#9aa] animate-bounce"
                    style={{
                      animationDelay: '140ms',
                      animationDuration: '1.25s',
                    }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[#9aa] animate-bounce"
                    style={{
                      animationDelay: '280ms',
                      animationDuration: '1.25s',
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
