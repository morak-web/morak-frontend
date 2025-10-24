import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import designerImg from '../../../assets/morak-designer.png';
import AIBtn from '../../../assets/RequestList/btn-style.png';

import AIFeedBackPage from '../../../pages/Client/RequestListPage/AIFeedbackPage/AIFeedBackPage';
import IntermediateFeedbackModal from '../../../pages/Client/RequestListPage/IntermediateFeedback/IntermediateFeedbackModal';
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

export default function ProgressingPage() {
  const navigate = useNavigate();
  const { projectList = [], fetchProjectList, error, loading } = useProject();

  // 단일 모달 상태 + 어떤 프로젝트인지
  const [aiOpen, setAiOpen] = useState(false);
  const [interOpen, setInterOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    fetchProjectList('WORKING');
  }, [fetchProjectList]);

  const workingData = useMemo(
    () => projectList.filter((item) => item?.status === 'WORKING'),
    [projectList]
  );

  // 모달 열릴 때 body 스크롤 잠그기 (선택)
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

  if (loading) return null;
  if (error) return <div>error!! {String(error.message || error)}</div>;

  return (
    <div className="w-full h-[470px] flex flex-col gap-[15px]">
      {workingData.map((item) => (
        <div
          key={item.projectId} // ✅ 프로젝트 ID로 고유 키
          className="w-[100%] py-[16px] min-h-[230px] px-[10px] bg-[#F7F8FC] rounded-[30px] flex"
        >
          {/* left content */}
          <div className="w-[38%] py-[10px] px-[6%] flex flex-col items-center justify-between border-r-[1px] border-[#D9D9D9]">
            <div>
              <div className="flex gap-[10px]">
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
                  <h1 className="text-center w-[60px] text-[10px] h-[14px] bg-white rounded-[3px]">
                    웹디자인
                  </h1>
                </div>
              </div>
              <div className="text-[#525466] text-[12px] mb-[12px] flex flex-col items-center text-center gap-[10px]">
                <p className="text-[12px] text-[#525466] text-center">
                  {item?.designer?.designerIntro
                    ? ''
                    : '사용자 여정 분석을 바탕으로 정보 구조를 설계하고, Figma로 와이어프레임→프로토타입→하이파이까지 빠르게 전달합니다.디자인 시스템을 구축해 일관성과 확장성을 확보하는 것을 좋아합니다. 협업 툴: Figma, Zeplin, Notion, Jira / 핸드오프 경험 다수.'.slice(
                        0,
                        80
                      )}
                  ...
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
                  <div className="flex items-end gap-[6px]">
                    <p className="text-[#525466] text-[12px]">{item?.title}</p>
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

              <div className="flex justify-between gap-[7px] mb-[7px]">
                <div className="flex flex-col gap-[7px]">
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    기간
                  </h1>
                  <p className="text-[#525466] text-[12px]">
                    {item?.createdAt
                      ? item.createdAt.slice(0, 10).replaceAll('-', '.')
                      : '-'}
                  </p>
                </div>
                <h1 className="text-[#525466] text-[14px] font-semibold">
                  D - 37
                </h1>
              </div>
            </div>

            {/* buttons */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 px-[5%]">
              {MATCHING_AND_COMPLETE_BTN.map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    if (label === '최종 결과') {
                      navigate(
                        `/client-page/request-list/complete/final-feedback/${item.projectId}`
                      );
                    } else if (label === 'AI 피드백') {
                      openAI(item.projectId);
                    } else if (label === '중간 결과 / 피드백') {
                      openInter(item.projectId);
                    } else if (label === '의뢰 상세') {
                      navigate(`/client-page/working-detail/${item.projectId}`);
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

      {/* ✅ 모달은 단일 인스턴스로, 포털로 body에 붙이기 */}
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
