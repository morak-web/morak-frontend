// AIRequestPage.jsx
import MainLayout from '../../../../components/layout/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
import arrowIcon from '../../../../assets/RequestList/IntermediateFeedback/arrow-icon.png';
import morakAI from '../../../../assets/morak-AI-logo.png';
import { useProject } from '../../../../context/ProjectContext';

export default function AIRequestPage() {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const { fetchAIQuestionList, createResponse } = useProject();

  // ★ 프로젝트별 스토리지 키 (projectId가 있어야만 생성)
  const storageKey = useMemo(
    () => (projectId ? `ai_req_thread_v1:${projectId}` : null),
    [projectId]
  );

  const [thread, setThread] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false); // ★ 복원 완료 플래그
  const [reveal, setReveal] = useState(false); // ★ 초기 등장 애니메이션

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // ★ 로컬 스냅샷 저장/복원 유틸 (키가 없으면 no-op)
  const saveLocal = (data) => {
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {}
  };
  const loadLocal = () => {
    if (!storageKey) return null;
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  // ★ 서버 리스트와 로컬 스냅샷 병합
  const mergeServerAndLocal = (serverList = [], localSnap = null) => {
    if (!localSnap) return serverList;
    const localById = Object.fromEntries(
      (localSnap.thread || []).map((n) => [n.questionId, n])
    );
    const merged = serverList.map((s) => {
      const l = localById[s.questionId];
      const answer = s.answer ?? l?.answer ?? null; // 서버 우선, 없으면 로컬 보존
      return { ...s, answer };
    });
    const serverIds = new Set(serverList.map((s) => s.questionId));
    const onlyLocal = (localSnap.thread || []).filter(
      (n) => !serverIds.has(n.questionId)
    );
    return [...merged, ...onlyLocal].sort(
      (a, b) => a.questionId - b.questionId
    );
  };

  // 초기 등장 애니메이션 트리거
  useEffect(() => {
    const t = setTimeout(() => setReveal(true), 20);
    return () => clearTimeout(t);
  }, []);

  // 초기 로드: storageKey가 준비되면 (1) 로컬 복원 → (2) 서버 병합
  useEffect(() => {
    let mounted = true;
    if (!storageKey || !projectId) return; // 키/ID 없으면 대기

    const snap = loadLocal();
    if (snap) {
      setThread(Array.isArray(snap.thread) ? snap.thread : []);
      setInput(snap.input || '');
      setLoading(false); // 로컬 먼저 보이기
    }

    (async () => {
      try {
        const list = await fetchAIQuestionList(projectId);
        if (!mounted) return;
        const sorted = (list || [])
          .slice()
          .sort((a, b) => a.questionId - b.questionId);
        const merged = mergeServerAndLocal(sorted, snap);
        setThread(merged);
        // 병합 결과 저장(입력값은 로컬 스냅샷의 것을 유지)
        saveLocal({ thread: merged, input: snap?.input || '' });
      } finally {
        if (mounted) {
          setLoading(false);
          setHydrated(true); // ★ 복원/병합 완료
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [storageKey, projectId, fetchAIQuestionList]);

  // 현재(다음) 질문: answer === null 중 questionId가 가장 작은 것
  const currentQuestion = useMemo(() => {
    const nulls = thread.filter((n) => n.answer == null);
    if (nulls.length === 0) return null;
    return nulls.reduce(
      (min, n) => (n.questionId < min.questionId ? n : min),
      nulls[0]
    );
  }, [thread]);

  const hasMoreQuestions = !!currentQuestion;

  // 이전(답변된) 항목
  const answeredList = useMemo(() => {
    return thread
      .filter((n) => n.answer != null && n.answer !== '')
      .slice()
      .sort((a, b) => a.questionId - b.questionId);
  }, [thread]);

  // 리스트/전송 상태 바뀔 때 스크롤 맨 아래로
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [thread, submitting]);

  // ★ input 변경 시 즉시 저장 (복원 전에는 저장 금지)
  useEffect(() => {
    if (!hydrated) return;
    saveLocal({ thread, input });
  }, [input]); // thread 저장은 submit/병합 시점에서 처리

  // ★ 복원/병합 완료 후 or 다음 질문 활성화 시 자동 포커스
  useEffect(() => {
    if (!hydrated) return;
    if (hasMoreQuestions && !submitting) {
      inputRef.current?.focus();
    }
  }, [hydrated, hasMoreQuestions, submitting, currentQuestion?.questionId]);

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    if (!projectId || submitting) return;
    const msg = input.trim();
    if (!msg || !currentQuestion) return;

    setSubmitting(true);
    try {
      // 1) 서버로 답변 전송
      const payload = { questionId: currentQuestion.questionId, answer: msg };
      const res = await createResponse(projectId, payload);
      const nextQuestions = (res && res.nextQuestions) || [];

      // 2) 로컬 스레드 업데이트(+ 저장)
      setThread((prev) => {
        const idx = prev.findIndex(
          (n) => n.questionId === currentQuestion.questionId
        );
        if (idx === -1) return prev;

        const updated = [...prev];
        updated[idx] = { ...updated[idx], answer: msg };

        if (nextQuestions.length > 0) {
          const stamped = nextQuestions.map((q) => ({
            ...q,
            answer: q.answer ?? null,
            createdAt: q.createdAt ?? new Date().toISOString(),
          }));
          stamped.sort((a, b) => a.questionId - b.questionId);
          updated.splice(idx + 1, 0, ...stamped);
        }
        updated.sort((a, b) => a.questionId - b.questionId);
        saveLocal({ thread: updated, input: '' }); // ★ 저장
        return updated;
      });

      setInput('');
    } catch (err) {
      console.error(err);
      // 실패해도 기존 로컬 상태는 유지
    } finally {
      setSubmitting(false);
      // DOM 반영 뒤 포커스 회복
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const goNext = () => {
    if (!hasMoreQuestions) {
      navigate(`/request/requirement-summary/${projectId}`);
    }
  };

  return (
    <MainLayout>
      <div className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] py-[30px] flex items-center">
        <div className="w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between">
          <h1 className="text-[24px] font-bold flex flex-col mb-[30px]">
            안녕하세요 AI 모락이에요
          </h1>

          {/* Chat */}
          <form onSubmit={handleSubmit} className="w-full h-full">
            <div
              className={`bg-white h-[530px] rounded-[15px] pl-[30px] pr-[10px] pt-[20px] pb-[10px] flex flex-col justify-between
              transition-all duration-500 ease-out
              ${reveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            >
              <div
                ref={scrollRef}
                className="h-[480px] pr-[18px] pb-[20px] custom-scrollbar overflow-y-auto flex flex-col mb-[10px] gap-[26px]"
              >
                {/* 첫 인사 */}
                <div className="flex gap-[12px]">
                  <img
                    src={morakAI}
                    alt="morakAI"
                    className="w-[44px] h-[44px] items-start"
                  />
                  <div className="inline-block shadow-md bg-[#F7F8FC] px-[14px] py-[11px] rounded-[12px] self-start text-[#525466]">
                    <h1 className="text-[14px] font-medium">모락</h1>
                    <p className="text-[16px]">
                      안녕하세요! <b>AI모락</b>이에요. <br />제 질문에 답을
                      해주시면 <b>의뢰서 작성</b>을 도와드릴게요!
                    </p>
                  </div>
                </div>

                {/* 이전(답변된) Q/A */}
                {loading ? (
                  <div className="text-[#9aa] text-sm">질문을 불러오는 중…</div>
                ) : (
                  <>
                    {answeredList.map((n) => (
                      <div
                        key={`answered-${n.questionId}`}
                        className="flex flex-col gap-[26px]"
                      >
                        {/* 질문 버블 */}
                        <div className="flex gap-[12px]">
                          <img
                            src={morakAI}
                            alt="morakAI"
                            className="w-[44px] h-[44px] items-start"
                          />
                          <div className="inline-block shadow-md bg-[#F7F8FC] px-[14px] py-[11px] rounded-[12px] self-start text-[#525466]">
                            <h1 className="text-[14px] font-medium">모락</h1>
                            <p className="text-[16px]">{n.question}</p>
                          </div>
                        </div>
                        {/* 나의 답변 버블 */}
                        <div className="inline-block shadow-md bg-[#E6F0FF] px-[14px] py-[11px] rounded-[12px] self-end text-[#2b2f36]">
                          <h1 className="text-[13px] font-medium text-right">
                            나
                          </h1>
                          <p className="text-[16px] whitespace-pre-wrap">
                            {n.answer}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* 현재 질문(한 개만) */}
                    {currentQuestion && (
                      <div
                        key={`current-${currentQuestion.questionId}`}
                        className="flex flex-col gap-[26px]"
                      >
                        <div className="flex gap-[12px]">
                          <img
                            src={morakAI}
                            alt="morakAI"
                            className="w-[44px] h-[44px] items-start"
                          />
                          <div className="inline-block shadow-md bg-[#F7F8FC] px-[14px] py-[11px] rounded-[12px] self-start text-[#525466]">
                            <h1 className="text-[14px] font-medium">모락</h1>
                            <p className="text-[16px]">
                              {currentQuestion.question}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 질문 없을 때 */}
                    {!currentQuestion && answeredList.length === 0 && (
                      <div className="text-[#9aa] text-sm">
                        표시할 질문이 없습니다.
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* 입력창 */}
              <div className="flex h-[45px] bg-[#EDEFF7] items-center rounded-[35px] px-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  ref={inputRef}
                  disabled={!hasMoreQuestions || submitting}
                  placeholder={
                    hasMoreQuestions
                      ? '여기에 답변을 입력하세요'
                      : '모든 질문이 완료되었습니다'
                  }
                  className="w-[95%] h-[50px] rounded-[35px] outline-none px-[10px] bg-transparent"
                />
                <div className="flex gap-[10px]">
                  <button
                    type="submit"
                    disabled={!hasMoreQuestions || submitting || !input.trim()}
                    className="w-[24px] h-[24px] cursor-pointer disabled:opacity-50"
                    title="답변 보내기"
                  >
                    <img src={arrowIcon} alt="arrowIcon" />
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* 하단 버튼 */}
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={() => navigate('/request/write')}
              className="text-[18px] cursor-pointer"
            >
              이전
            </button>
            <button
              onClick={goNext}
              disabled={hasMoreQuestions}
              className={`bg-[#BDCFFF] px-[17px] py-[8px] rounded-[16px] text-[18px] cursor-pointer ${
                hasMoreQuestions ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
