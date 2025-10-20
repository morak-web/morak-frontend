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

  const [thread, setThread] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const scrollRef = useRef(null);

  // 초기 로드: 트리 가져와서 리스트로 보관
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!projectId) return;
      setLoading(true);
      try {
        const list = await fetchAIQuestionList(projectId); // [ {questionId, parentQuestionId, question, answer, depth, createdAt}, ... ]
        if (!mounted) return;
        // 안전하게 정렬(의도: 표시 순서를 questionId ASC로 보장)
        const sorted = (list || [])
          .slice()
          .sort((a, b) => a.questionId - b.questionId);
        setThread(sorted);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [projectId, fetchAIQuestionList]);

  // 현재(다음) 질문: answer === null 중 questionId가 가장 작은 것 "한 개"
  const currentQuestion = useMemo(() => {
    const nulls = thread.filter((n) => n.answer == null);
    if (nulls.length === 0) return null;
    return nulls.reduce(
      (min, n) => (n.questionId < min.questionId ? n : min),
      nulls[0]
    );
  }, [thread]);

  const hasMoreQuestions = !!currentQuestion;

  // 이전(답변된) 항목만 정렬해서 보여줄 리스트
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

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    if (!projectId || submitting) return;
    const msg = input.trim();
    if (!msg || !currentQuestion) return;

    setSubmitting(true);
    try {
      // 1) 답변 전송
      const payload = {
        questionId: currentQuestion.questionId,
        answer: msg,
      };
      const res = await createResponse(projectId, payload);
      const nextQuestions = (res && res.nextQuestions) || [];

      // 2) 현재 질문의 answer 반영 + 바로 뒤에 nextQuestions 삽입
      setThread((prev) => {
        const idx = prev.findIndex(
          (n) => n.questionId === currentQuestion.questionId
        );
        if (idx === -1) return prev;

        const updated = [...prev];
        // 현재 질문에 답 채우기
        updated[idx] = { ...updated[idx], answer: msg };

        if (nextQuestions.length > 0) {
          // 서버가 준 후속 질문들을 스탬핑해서 삽입
          const stamped = nextQuestions.map((q) => ({
            ...q,
            answer: q.answer ?? null,
            createdAt: q.createdAt ?? new Date().toISOString(),
          }));
          // 이어서 표시 순서를 위해 questionId 기준 정렬 보정
          stamped.sort((a, b) => a.questionId - b.questionId);
          updated.splice(idx + 1, 0, ...stamped);
        }
        // 전체를 questionId 기준으로 정렬 유지(안전장치)
        updated.sort((a, b) => a.questionId - b.questionId);
        return updated;
      });

      setInput('');
      // setThread 이후 currentQuestion/hasMoreQuestions는 자동 반영됨
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
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
      <div className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-br from-primary-50 via-white to-neutral-50 py-8 px-4">
        <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-xl h-[calc(100vh-160px)] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200/50">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6 flex items-center gap-4 shadow-lg">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/50">
              <img src={morakAI} alt="morakAI" className="w-10 h-10 rounded-full" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI 모락</h1>
              <p className="text-primary-100 text-sm">의뢰서 작성을 도와드릴게요</p>
            </div>
          </div>

          {/* Chat */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-8 py-6 space-y-6 custom-scrollbar bg-gradient-to-b from-neutral-50/50 to-white"
              >
                {/* 첫 인사 */}
                <div className="flex gap-4 items-start animate-fade-in">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-md">
                    <img src={morakAI} alt="모락" className="w-6 h-6" />
                  </div>
                  <div className="bg-white border border-neutral-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm max-w-xl">
                    <p className="text-neutral-800 leading-relaxed">
                      안녕하세요! <span className="font-bold text-primary-700">AI 모락</span>이에요.
                      <br />몇 가지 질문에 답해주시면 <span className="font-semibold">의뢰서 작성</span>을 도와드릴게요!
                    </p>
                  </div>
                </div>

                {/* 이전(답변된) Q/A */}
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                      <p className="text-neutral-500 text-sm">질문을 불러오는 중...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {answeredList.map((n, idx) => (
                      <div key={`answered-${n.questionId}`} className="space-y-4 animate-fade-in" style={{animationDelay: `${idx * 0.1}s`}}>
                        {/* AI 질문 */}
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-md">
                            <img src={morakAI} alt="모락" className="w-6 h-6" />
                          </div>
                          <div className="bg-white border border-neutral-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm max-w-xl">
                            <p className="text-neutral-800 leading-relaxed">{n.question}</p>
                          </div>
                        </div>
                        {/* 사용자 답변 */}
                        <div className="flex gap-4 items-start justify-end">
                          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl rounded-tr-sm px-5 py-4 shadow-md max-w-xl">
                            <p className="text-white leading-relaxed whitespace-pre-wrap">{n.answer}</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <svg className="w-5 h-5 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* 현재 질문 */}
                    {currentQuestion && (
                      <div className="flex gap-4 items-start animate-fade-in">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-md">
                          <img src={morakAI} alt="모락" className="w-6 h-6" />
                        </div>
                        <div className="bg-white border-2 border-primary-300 rounded-2xl rounded-tl-sm px-5 py-4 shadow-lg max-w-xl">
                          <p className="text-neutral-800 leading-relaxed font-medium">{currentQuestion.question}</p>
                        </div>
                      </div>
                    )}

                    {!currentQuestion && answeredList.length === 0 && (
                      <div className="text-center py-12 text-neutral-400">
                        표시할 질문이 없습니다.
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* 입력창 */}
              <div className="px-8 py-5 bg-white border-t border-neutral-200">
                <div className="flex items-center gap-3 bg-neutral-100 rounded-2xl px-5 py-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-500 transition-all">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    disabled={!hasMoreQuestions || submitting}
                    placeholder={hasMoreQuestions ? '답변을 입력하세요...' : '모든 질문이 완료되었습니다'}
                    className="flex-1 bg-transparent outline-none text-neutral-900 placeholder:text-neutral-400 disabled:text-neutral-400"
                  />
                  <button
                    type="submit"
                    disabled={!hasMoreQuestions || submitting || !input.trim()}
                    className="p-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 rounded-xl transition-all disabled:cursor-not-allowed group"
                    title="답변 보내기"
                  >
                    <svg className="w-5 h-5 text-white transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* 하단 버튼 */}
          <div className="flex justify-between items-center px-8 py-4 bg-neutral-50 border-t border-neutral-200">
            <button
              type="button"
              onClick={() => navigate('/request/write')}
              className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              이전
            </button>
            <button
              onClick={goNext}
              disabled={hasMoreQuestions}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                !hasMoreQuestions
                  ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              다음 단계
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
