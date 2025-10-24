import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import designerImg from '../../../assets/RequestList/designer2.png';
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

const CATEGORY = [
  '',
  '웹사이트',
  '앱',
  '쇼핑몰/스마트스토어',
  '키오스크/POS',
  '그래픽/영상',
  '기타',
];

export default function CompletePage() {
  const navigate = useNavigate();

  // ✅ 단일 모달 인스턴스 + 선택된 프로젝트 ID
  const [aiOpen, setAiOpen] = useState(false);
  const [interOpen, setInterOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const { projectList = [], fetchProjectList, error, loading } = useProject();

  useEffect(() => {
    fetchProjectList('COMPLETE');
  }, [fetchProjectList]);

  const completeData = useMemo(
    () => projectList.filter((item) => item?.status === 'COMPLETE'),
    [projectList]
  );

  // ✅ 모달 열리면 body 스크롤 잠그기
  useEffect(() => {
    const lock = aiOpen || interOpen;
    if (lock) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [aiOpen, interOpen]);

  const openAI = (projectId) => {
    setSelectedProjectId(projectId);
    setAiOpen(true);
  };
  const openInter = (projectId) => {
    setSelectedProjectId(projectId);
    setInterOpen(true);
  };

  if (loading) return <></>;
  if (error) return <div>error!! {String(error.message || error)}</div>;

  return (
    <div className="w-full h-[470px] flex flex-col gap-[15px]">
      {completeData.map((item) => (
        <div
          key={item?.projectId} // ✅ 안정적인 키
          className="w-[100%] min-h-[230px] py-[16px] px-[10px] bg-[#F7F8FC] rounded-[30px] flex"
        >
          {/* left content */}
          <div className="w-[38%] py-[10px] px-[6%] flex flex-col items-center justify-between border-r-[1px] border-[#D9D9D9]">
            <div>
              <div className="flex gap-[20px]">
                <img
                  src={designerImg}
                  alt="designerImg"
                  className="w-[53px] h-[53px] mb-[11px]"
                />
                <div className="flex flex-col gap-[5px] mt-[10px]">
                  <h1 className="text-[12px] font-light">
                    <span className="text-[15px] font-semibold">
                      {item?.designer?.name ?? '디자이너'}
                    </span>{' '}
                    님과의 프로젝트
                  </h1>
                </div>
              </div>
              <div className="text-[#525466] text-[12px] mb-[12px] flex flex-col items-center text-center">
                <p className="text-[12px] text-[#525466] text-center">
                  {item?.designer?.designerIntro
                    ? item.designer.designerIntro.slice(0, 80)
                    : ''}
                </p>
              </div>
            </div>
            <button
              className="text-[#525466] text-[13px] font-semibold bg-[#DFE1ED] py-[10px] rounded-[19px] w-[100%] text-center cursor-pointer"
              onClick={() => {
                const id = item?.designer?.designerId;
                if (id) navigate(`/client-page/designer-portfolio/${id}`);
              }}
            >
              포트폴리오 보기
            </button>
          </div>

          {/* right content */}
          <div className="flex-1 px-[24px] py-[6px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between mb-[14px]">
                <div className="flex flex-col gap-[7px]">
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    프로젝트 제목
                  </h1>
                  <div className="flex items-end gap-[4px]">
                    <p className="text-[#525466] text-[12px]">{item?.title}</p>
                    <p className="text-[#525466] text-[10px]">
                      {item?.createdAt
                        ? item.createdAt.slice(0, 10).replaceAll('-', '.')
                        : ''}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[7px] items-end">
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    카테고리
                  </h1>
                  <p className="text-[#525466] text-[12px]">
                    {CATEGORY[item?.categoryId] ?? '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* buttons */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 px-[5%]">
              {MATCHING_AND_COMPLETE_BTN.map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    if (label === '최종 결과') {
                      const id = item?.projectId;
                      if (id)
                        navigate(
                          `/client-page/request-list/complete/final-feedback/${id}`
                        );
                    } else if (label === 'AI 피드백') {
                      openAI(item?.projectId);
                    } else if (label === '중간 결과 / 피드백') {
                      openInter(item?.projectId);
                    } else if (label === '의뢰 상세') {
                      const id = item?.projectId;
                      if (id) navigate(`/client-page/working-detail/${id}`);
                    }
                  }}
                  className={`w-[100%] h-[30px] text-[#525466] text-[13px] rounded-[14px] ${
                    label === '최종 결과'
                      ? 'bg-[#6072FF] text-white cursor-pointer'
                      : 'cursor-pointer bg-[#DFE1ED]'
                  } ${label === 'AI 피드백' ? ' text-white' : ''}`}
                  style={
                    label === 'AI 피드백'
                      ? {
                          backgroundImage: `url(${AIBtn})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : undefined
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* ✅ 단일 모달 인스턴스들을 포털로 body에 붙이기 */}
      {aiOpen &&
        createPortal(
          <AIFeedBackPage
            AIFeedbackModalOpen={aiOpen}
            onClose={() => setAiOpen(false)}
            projectId={selectedProjectId}
          />,
          document.body
        )}

      {interOpen &&
        createPortal(
          <IntermediateFeedbackModal
            interFeedbackModalOpen={interOpen}
            onClose={() => setInterOpen(false)}
            projectId={selectedProjectId}
          />,
          document.body
        )}
    </div>
  );
}
