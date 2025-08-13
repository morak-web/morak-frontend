import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import designerImg from '../../../assets/RequestList/designer2.png';
import arrowDownImg from '../../../assets/RequestList/arrow-down.png';
import AIBtn from '../../../assets/RequestList/btn-style.png';

// 디자이너 포트폴리오
// import DesignerPortfolioPage from '../../request-list/components/DesignerPortfolioPage';
// // button 4
// import RequestDetailPage from '../../request-list/components/RequestDetailPage';
import AIFeedbackPage from '../../request-list/AIFeedback/AIFeedbackPage';
import IntermediateFeedbackModal from '../../request-list/IntermediateFeedback/IntermediateFeedbackModal';

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

  return (
    // api 연결 시 여기에 map 사용해서 수정하기
    <div className="w-[100%] py-[16px] px-[10px] bg-[#F7F8FC] rounded-[30px] flex">
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
              <span className="text-[15px] font-semibold">김락모</span> 님과의
              프로젝트
            </h1>{' '}
            {/* map 사용하기 */}
            <div className="flex gap-[10px]">
              <div className=" px-[12px] h-[14px] text-[9px] text-[#525466] bg-white rounded-[3px] ">
                인터렉션
              </div>
              <div className=" px-[12px] h-[14px] text-[9px] text-[#525466] bg-white rounded-[3px] ">
                3D
              </div>
            </div>
          </div>
        </div>
        <div className="text-[#525466] text-[12px] mb-[12px] flex flex-col items-center text-center gap-[10px]">
          <p className="text-[12px] text-[#525466] text-center">
            SNS 콘텐츠부터 프로모션 영상, 인터랙션 모션까지 다양한 디지털 콘텐츠
            디자인 경험이 있습니다. After Effects와 Lottie를 활용한 마이크로
            인터랙션
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
                <p className="text-[#525466] text-[13px]">
                  퍼스널 헬스케어 플랫폼
                </p>
                <p className="text-[#525466] text-[10px]">2025.08.23</p>
              </div>
            </div>
            <div className="flex flex-col gap-[7px] items-end">
              <h1 className="text-[#525466] text-[14px] font-semibold">
                프로젝트 카테고리
              </h1>
              {/* 이 부분은 map 사용해서 구현하기 */}
              <p className="text-[#525466] text-[13px]">
                SNS 콘텐츠 모션그래픽
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[7px] mb-[7px]">
            <div className="flex justify-between">
              <h1 className="text-[#525466] text-[14px] font-semibold">
                요구사항 요약
              </h1>
              <h1 className="text-[#525466] text-[14px] font-semibold">
                D - day
              </h1>
            </div>
            <p className="text-[#525466] text-[13px]">
              SNS 광고용 짧은 모션 영상이 필요합니다. 브랜드 톤에 맞는 컬러감과
              부드러운 전환 효과 중심으로 구성해주세요. 텍스트 강조 애니메이션과
              간단한 로고 모션도 포함되면 좋겠습니다.
            </p>
          </div>
        </div>
        {/* button */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-2  px-[5%]">
          {MATCHING_AND_COMPLETE_BTN.map((label) => (
            <button
              key={label}
              onClick={() => {
                if (label === '최종 결과') {
                  navigate('final-feedback');
                } else if (label === 'AI 피드백') {
                  setAIFeedbackModalOpen(true);
                } else if (label === '중간 결과 / 피드백') {
                  setInterFeedbackModalOpen(true);
                } else if (label === '의뢰 상세') {
                  navigate('/client-page/request-detail');
                }
              }}
              className={`w-[100%] h-[30px] text-[#525466] text-[13px] rounded-[14px]  ${label === '최종 결과' ? 'bg-[#6072FF] text-white cursor-pointer' : 'cursor-pointer bg-[#DFE1ED]'}  ${label === 'AI 피드백' ? ' text-white' : ''}  `}
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
      {/* <RequestDetailPage /> */}
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
