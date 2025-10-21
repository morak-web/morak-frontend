import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import designerImg from '../../../assets/RequestList/designer2.png';
import arrowDownImg from '../../../assets/RequestList/arrow-down.png';
import AIBtn from '../../../assets/RequestList/btn-style.png';

import AIFeedBackPage from '../../../pages/Client/RequestListPage/AIFeedbackPage/AIFeedBackPage';
import IntermediateFeedbackModal from '../../../pages/Client/RequestListPage/IntermediateFeedback/IntermediateFeedbackModal';

// api
import { useProject } from '../../../context/ProjectContext';

const MATCHING_AND_COMPLETE_BTN = [
  '의뢰 상세',
  'AI 피드백',
  '중간 결과 / 피드백',
  '최종 결과',
];

export default function CompletePage() {
  const navigate = useNavigate();
  const [AIFeedbackModalOpen, setAIFeedbackModalOpen] = useState(false);
  const [interFeedbackModalOpen, setInterFeedbackModalOpen] = useState(false);
  const { projectList = [], fetchProjectList, error, loading } = useProject();
  useEffect(() => {
    fetchProjectList('COMPLETE');
  }, []);
  const completeData = projectList.filter(
    (item) => item['status'] === 'COMPLETE'
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neutral-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-neutral-600 text-sm">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 max-w-md">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-bold text-red-900 mb-1">오류가 발생했습니다</h3>
              <p className="text-sm text-red-700">{String(error.message || error)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (completeData?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#F0FDF4' }}>
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">완료된 프로젝트가 없습니다</h3>
        <p className="text-neutral-500">프로젝트가 완료되면 여기에 표시됩니다</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {completeData.map((item, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
        >
          <div className="flex">
            {/* Left Section - Designer Info */}
            <div className="w-2/5 px-8 py-8 flex flex-col items-center justify-center border-r-2 border-green-200" style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)' }}>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.designer?.profileImageUrl || designerImg}
                  alt="designer"
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                />
                <div>
                  <h3 className="text-base font-bold text-green-900">
                    {item.designer?.name || '디자이너'}
                  </h3>
                  <p className="text-xs text-green-700">님과의 프로젝트</p>
                </div>
              </div>
              <div className="mb-4">
                <span className="px-4 py-2 rounded-full text-sm font-bold inline-flex items-center gap-2" style={{ backgroundColor: '#22C55E', color: '#FFFFFF' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  완료
                </span>
              </div>
              <div className="mb-6 text-center">
                <p className="text-xs text-green-700 leading-relaxed">
                  {item.designer?.designerIntro || '프로젝트가 완료되었습니다'}
                </p>
              </div>
              <button
                onClick={() => {
                  const id = item?.designer?.designerId;
                  navigate(`/client-page/designer-portfolio/${id}`);
                }}
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:scale-105 w-full"
                style={{ backgroundColor: '#22C55E', color: '#FFFFFF' }}
              >
                포트폴리오 보기
              </button>
            </div>

            {/* Right Section - Project Info */}
            <div className="flex-1 px-8 py-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between mb-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">프로젝트 제목</h3>
                    <p className="text-lg font-bold text-neutral-900">{item.title}</p>
                    <span className="text-xs text-neutral-400">
                      생성일: {item.createdAt.slice(0, 10).replaceAll('-', '.')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">완료일</h3>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-base font-bold text-green-700">D - day</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-green-200 mb-6">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">요구사항 요약</h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {item.aiSummary || '요약 정보가 없습니다'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {MATCHING_AND_COMPLETE_BTN.map((label) => (
                  <button
                    key={label}
                    onClick={() => {
                      if (label === '최종 결과') {
                        const id = item?.projectId;
                        navigate(`final-feedback/${id}`);
                      } else if (label === 'AI 피드백') {
                        setAIFeedbackModalOpen(true);
                      } else if (label === '중간 결과 / 피드백') {
                        setInterFeedbackModalOpen(true);
                      } else if (label === '의뢰 상세') {
                        const id = item?.projectId;
                        navigate(`/client-page/working-detail/${id}`);
                      }
                    }}
                    className="px-4 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                    style={
                      label === '최종 결과'
                        ? { backgroundColor: '#22C55E', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)' }
                        : label === 'AI 피드백'
                        ? { backgroundColor: '#9333EA', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)' }
                        : { backgroundColor: '#F5F5F5', color: '#525252', border: '2px solid #E5E5E5' }
                    }
                  >
                    {label === '의뢰 상세' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                    {label === '최종 결과' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <AIFeedBackPage
            AIFeedbackModalOpen={AIFeedbackModalOpen}
            onClose={() => setAIFeedbackModalOpen(false)}
          />
          <IntermediateFeedbackModal
            interFeedbackModalOpen={interFeedbackModalOpen}
            onClose={() => setInterFeedbackModalOpen(false)}
          />
        </div>
      ))}
    </div>
  );
}
