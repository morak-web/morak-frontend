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
      <div className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] py-[30px] flex items-center">
        <div className="w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between">
          <h1 className="text-[24px] font-bold flex flex-col mb-[30px]">
            안녕하세요 AI 모락이에요
          </h1>

          {/* Chat */}
          <form onSubmit={handleSubmit} className="w-full h-full">
            <div className="bg-white h-[530px] rounded-[15px] pl-[30px] pr-[10px] pt-[20px] pb-[10px] flex flex-col justify-between">
              <div
                ref={scrollRef}
                className="h+[480px] pr-[18px] pb-[20px] custom-scrollbar overflow-y-auto flex flex-col mb-[10px] gap-[26px]"
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

                    {/* 현재 질문(한 개만 노출) */}
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
