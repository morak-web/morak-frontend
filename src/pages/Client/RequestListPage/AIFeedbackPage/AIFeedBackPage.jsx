import { useEffect, useCallback } from 'react';
import closeBtn from '../../../../assets/RequestList/AIFeedback/close-button.png';
import titleBackground from '../../../../assets/RequestList/AIFeedback/title-background.png';
import { useAIFeedback } from '../../../../context/AIFeedbackContext';
import morakAI from '../../../../assets/morak2.png';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeSanitize from 'rehype-sanitize';

export default function AIFeedBackPage({
  projectId,
  AIFeedbackModalOpen,
  onClose,
}) {
  const { midAIFeedback, fetchAIFeedback } = useAIFeedback();

  // 모달 열릴 때/프로젝트 바뀔 때 최신 피드백 로드
  useEffect(() => {
    if (AIFeedbackModalOpen && projectId) {
      fetchAIFeedback(projectId, 'MID');
    }
  }, [AIFeedbackModalOpen, projectId, fetchAIFeedback]);

  // ESC로 닫기
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose?.();
    },
    [onClose]
  );

  useEffect(() => {
    if (!AIFeedbackModalOpen) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [AIFeedbackModalOpen, handleKeyDown]);

  if (!AIFeedbackModalOpen) return null;

  const GradientGlass = {
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.14) 100%)',
    border: '1px solid rgba(255,255,255,0.6)',
    boxShadow:
      '0 10px 24px rgba(150, 170, 255, 0.25), 0 2px 0 rgba(255,255,255,0.2) inset',
  };

  const content = midAIFeedback?.content ?? '';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 min-w-screen min-h-screen bg-[#0101015e] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="AI 피드백"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[85%] rounded-[11px] bg-white shadow-xl overflow-hidden"
      >
        {/* 헤더 */}
        <div className="w-full h-[65px] relative">
          <img
            src={titleBackground}
            alt="title background"
            className="w-full h-[65px] object-cover"
          />
          <div className="px-[33px] absolute top-[28%] flex justify-between items-center w-full">
            <h1 className="text-[#6072FF] text-[20px] font-medium">
              <span className="font-bold">AI</span> 모락
            </h1>
            <button
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={onClose}
              aria-label="닫기"
            >
              <img src={closeBtn} alt="close button" />
            </button>
          </div>
        </div>

        {/* 본문 */}
        <div className="w-full h-[calc(100%-65px)] pl-[35px] pr-[60px] py-[27px]">
          <div className="flex">
            {/* 좌측 일러스트 */}
            <div className="w-[300px] h-[650px] flex items-end justify-center">
              <img
                src={morakAI}
                className="w-[250px] h-[250px] relative bottom-0"
                alt="morakAI"
              />
            </div>

            {/* 우측 피드백(유리 카드) */}
            <div className="relative w-full h-[650px]">
              <div
                className="relative h-[630px] -mt-[2px] rounded-[14px] p-5 md:p-6 backdrop-blur overflow-y-auto custom-scrollbar"
                style={GradientGlass}
              >
                <div className="relative z-10 text-[16px] leading-7 text-zinc-700">
                  {content ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      rehypePlugins={[rehypeSanitize]}
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1
                            className="text-2xl font-bold mt-2 mb-2 text-[#111827]"
                            {...props}
                          />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2
                            className="text-xl font-bold mt-2 mb-1.5 text-[#111827]"
                            {...props}
                          />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="text-lg font-semibold mt-2 mb-1 text-[#111827]"
                            {...props}
                          />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="mb-2" {...props} />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong className="font-semibold" {...props} />
                        ),
                        em: ({ node, ...props }) => (
                          <em className="italic" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc pl-5 my-2 space-y-1"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="list-decimal pl-5 my-2 space-y-1"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="leading-7" {...props} />
                        ),
                        a: ({ node, ...props }) => (
                          <a
                            className="underline underline-offset-2 hover:opacity-80"
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                          />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="border-l-4 pl-3 py-1 my-2 text-[#525466] italic"
                            {...props}
                          />
                        ),
                        code: ({ inline, className, children, ...props }) => {
                          if (inline) {
                            return (
                              <code
                                className="px-1 py-0.5 rounded bg-[#F3F4F6] text-[#111827] text-[13px]"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          }
                          return (
                            <pre
                              className="p-3 rounded bg-[#0B1020] text-[#E5E7EB] overflow-auto text-[13px]"
                              {...props}
                            >
                              <code className={className}>{children}</code>
                            </pre>
                          );
                        },
                        hr: ({ node, ...props }) => (
                          <hr className="my-4 border-[#E5E7EB]" {...props} />
                        ),
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  ) : (
                    <div className="text-[#9CA3AF]">
                      표시할 피드백이 없습니다.
                    </div>
                  )}
                </div>
              </div>
              {/* 본문(유리) 종료 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
