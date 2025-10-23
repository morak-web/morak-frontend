import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import designerImg from '../../../assets/RequestList/designer1.png';
import AIBtn from '../../../assets/RequestList/btn-style.png';

// button 3
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

export default function ProgressingPage() {
  const [AIFeedbackModalOpen, setAIFeedbackModalOpen] = useState(false);
  const [interFeedbackModalOpen, setInterFeedbackModalOpen] = useState(false);
  const navigate = useNavigate();
  const { projectList, fetchProjectList, error, loading } = useProject();
  useEffect(() => {
    fetchProjectList('MATCHING');
  }, []);
  const workingData = projectList.filter(
    (item) => item['status'] === 'MATCHING'
  );
  console.log(workingData);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>error!! {String(error.message || error)}</div>;
  return (
    <div className="w-full h-[470px] flex flex-col gap-[15px]">
      {workingData.map((item) => (
        <div
          key={item.designer.name}
          className="w-[100%] py-[16px] min-h-[230px] px-[10px] bg-[#F7F8FC] rounded-[30px] flex"
        >
          {/* left content */}
          <div className="w-[38%] py-[10px] px-[6%] flex flex-col items-center justify-between  border-r-[1px] border-[#D9D9D9]">
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
                      {item.designer.name}
                    </span>{' '}
                    님과의 프로젝트
                  </h1>
                </div>
              </div>
              <div className="text-[#525466] text-[12px] mb-[12px] flex flex-col items-center text-center gap-[10px]">
                <p className="text-[12px] text-[#525466] text-center">
                  {item.designer?.designerIntro}
                </p>
              </div>
            </div>
            <button
              className="text-[#525466] text-[13px] font-semibold bg-[#DFE1ED] py-[10px] rounded-[19px] w-[100%] text-center cursor-pointer"
              onClick={() => {
                const id = item?.designer?.designerId;
                navigate(`/client-page/designer-portfolio/${id}`);
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
                    <p className="text-[#525466] text-[12px]">{item.title}</p>
                    <p className="text-[#525466] text-[10px]">
                      {item.createdAt.slice(0, 10).replaceAll('-', '.')}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[7px] items-end">
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    카테고리
                  </h1>
                  <p className="text-[#525466] text-[12px]">
                    {CATEGORY[item.categoryId]}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-[7px]  mb-[7px]">
                <div className="flex justify-between">
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    요구사항 요약
                  </h1>
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    D - 75
                  </h1>
                </div>
                <p className="text-[#525466] text-[12px]">{item.aiSummary}</p>
              </div>
            </div>
            {/* button */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 px-[5%]">
              {MATCHING_AND_COMPLETE_BTN.map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    if (label === 'AI 피드백') {
                      setAIFeedbackModalOpen(true);
                    } else if (label === '중간 결과 / 피드백') {
                      setInterFeedbackModalOpen(true);
                    } else if (label === '의뢰 상세') {
                      const id = item?.projectId;
                      navigate(`/client-page/working-detail/${id}`);
                    }
                  }}
                  className={`w-[100%] h-[30px] bg-[#DFE1ED] text-[#525466] text-[13px] rounded-[14px] ${label === '최종 결과' ? 'opacity-40' : 'cursor-pointer'} ${label === 'AI 피드백' ? ' text-white' : ''}`}
                  disabled={label === '최종 결과'}
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
          <AIFeedBackPage
            AIFeedbackModalOpen={AIFeedbackModalOpen}
            onClose={() => setAIFeedbackModalOpen(false)}
            projectId={item.projectId}
          />
          <IntermediateFeedbackModal
            interFeedbackModalOpen={interFeedbackModalOpen}
            onClose={() => setInterFeedbackModalOpen(false)}
            projectId={item.projectId}
          />
        </div>
      ))}
    </div>
  );
}
