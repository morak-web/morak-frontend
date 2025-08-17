import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useMyProjectList from '../../../hooks/useMyProjectList';
import designerImg from '../../../assets/RequestList/designer1.png';
import arrowDownImg from '../../../assets/RequestList/arrow-down.png';
import AIBtn from '../../../assets/RequestList/btn-style.png';
// 디자이너 포트폴리오
import DesignerPortfolioPage from '../../request-list/components/DesignerPortfolioPage';
// button 3
import RequestDetailPage from '../../request-list/components/RequestDetailPage';
import AIFeedbackPage from '../../request-list/AIFeedback/AIFeedbackPage';
import IntermediateFeedbackModal from '../../request-list/IntermediateFeedback/IntermediateFeedbackModal';

const MATCHING_AND_COMPLETE_BTN = [
  '의뢰 상세',
  'AI 피드백',
  '중간 결과 / 피드백',
  '최종 결과',
];

export default function ProgressingPage() {
  const [AIFeedbackModalOpen, setAIFeedbackModalOpen] = useState(false);
  const [interFeedbackModalOpen, setInterFeedbackModalOpen] = useState(false);
  const navigate = useNavigate();

  // working API
  const { data, isLoading, isError } = useMyProjectList('WORKING');
  if (isLoading) return <p>로딩 중...</p>;
  const list = Array.isArray(data) ? data : [];
  const workingData = list.filter((item) => item.status === 'WORKING');

  return (
    // api 연결 시 여기에 map 사용해서 수정하기
    <div className=" flex flex-col gap-[24px] ">
      {workingData.map((item) => (
        <div
          key={item.projectId}
          className="w-[100%] py-[16px] px-[10px] bg-[#F7F8FC] rounded-[30px] flex"
        >
          {/* left content */}
          <div className="w-[38%] py-[10px] px-[6%] flex flex-col items-center  border-r-[1px] border-[#D9D9D9]">
            <div className="flex gap-[20px]">
              <img
                src={designerImg}
                alt="designerImg"
                className="w-[53px] h-[53px] mb-[11px]"
              />
              <div className="flex flex-col gap-[5px]">
                <h1 className="text-[12px] font-light">
                  <span className="text-[15px] font-semibold">김락모</span>{' '}
                  님과의 프로젝트
                </h1>{' '}
                {/* map 사용하기 */}
                <div className="flex gap-[10px]">
                  <div className=" px-[12px] h-[14px] text-[9px] text-[#525466] bg-white rounded-[3px] ">
                    웹디자인
                  </div>
                  <div className=" px-[12px] h-[14px] text-[9px] text-[#525466] bg-white rounded-[3px] ">
                    브랜딩
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[#525466] text-[12px] mb-[12px] flex flex-col items-center text-center gap-[10px]">
              <p className="text-[12px] text-[#525466] text-center">
                UI/UX 디자인을 중심으로 웹·모바일 프로젝트를 20건 이상 리드하며
                사용자 중심 디자인을 실현해왔습니다.Figma, Adobe XD, Zeplin 등을
                활용해 개발자
              </p>
              <button className="text-[#525466] font-bold text-[10px] flex gap-[2px] cursor-pointer">
                자세히 보기
                <img
                  src={arrowDownImg}
                  alt="arrowDownImg"
                  className="w-[15px] h-[15px]"
                />
              </button>
            </div>
            <Link
              className="text-[#525466] text-[13px] font-semibold bg-[#DFE1ED] py-[10px] rounded-[19px] w-[100%] text-center"
              to="/client-page/designer-portfolio"
            >
              포트폴리오 보기
            </Link>
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
                    <p className="text-[#525466] text-[13px]">{item.title}</p>
                    <p className="text-[#525466] text-[10px]">
                      {item.createdAt.slice(0, 10).replaceAll('-', '.')}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[7px] items-end">
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    프로젝트 카테고리
                  </h1>
                  {/* 이 부분은 map 사용해서 구현하기 */}
                  <p className="text-[#525466] text-[13px]">
                    로고 디자인 브랜딩
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
                <p className="text-[#525466] text-[13px]">
                  모바일 앱 초기 UI 구성안 필요해요. 헬스케어 앱이고 직관적인
                  UX, 밝고 신뢰감 있는 색감으로 부탁드려요!
                </p>
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
                      navigate('/client-page/request-detail');
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
        </div>
      ))}
      <AIFeedbackPage
        AIFeedbackModalOpen={AIFeedbackModalOpen}
        onClose={() => setAIFeedbackModalOpen(false)}
      />
      <IntermediateFeedbackModal
        interFeedbackModalOpen={interFeedbackModalOpen}
        onClose={() => setInterFeedbackModalOpen(false)}
      />
    </div>
  );
}
