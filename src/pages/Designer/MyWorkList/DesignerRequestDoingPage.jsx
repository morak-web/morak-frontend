import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import goBackIcon from '../../../assets/RequestList/RequestDetail/back-icon.png';
import SubmitRequestModal from '../Submit/SubmitRequestModal';
import FeedbackCheckModal from '../Feedback/FeedbackCheckModal';
import FinalSubmitModal from '../Submit/FinalSubmitModal';

// API
import { useProject } from '../../../context/ProjectContext';

export default function DesignerRequestDoingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [finalModalOpen, setFinalModalOpen] = useState(false);

  const { projectDetail, fetchProjectDetail } = useProject();
  useEffect(() => {
    fetchProjectDetail(id);
  }, []);
  console.log(projectDetail);

  return (
    <div className="bg-white w-[95%] min-h-[710px] rounded-[11px] py-[20px] flex flex-col gap-[20px]">
      <div className="flex justify-between pl-[25px]">
        <button
          className="flex gap-[5px] cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <img
            src={goBackIcon}
            alt="goBackIcon"
            className="w-[15px] h-[15px]"
          />
          <span className="text-[#D8DAE5] text-[10px] md:text-[13px] font-light">
            내 작업 목록
          </span>
        </button>
        <div className="flex gap-[5px] md:gap-[15px] pr-[5px] md:pr-[36px] items-start ">
          <div className="flex flex-col items-end">
            <h1 className="text-[#525466] text-[11px] sm:text-[13px] md:text-[16px]">
              {projectDetail?.title}
            </h1>
          </div>
          <div className="text-[15px] h-[40px] flex flex-col justify-between items-end">
            <p>api 님과의 프로젝트</p>
            <p className="text-blue-500 text-[10px] md:text-[13px] font-normal">
              진행 중
            </p>
            <p className="font-light text-[10px] text-[#525466]">
              {projectDetail?.createdAt.slice(0, 10).replaceAll('-', '.')} ~{' '}
              {projectDetail?.dueDate.slice(0, 10).replaceAll('-', '.')}{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="px-[6%] gap-[20px] w-[100%] h-[600px] flex flex-col justify-between">
        <div className="flex justify-between w-[100%] h-[210px]">
          <div
            // src={useDoingData.thumbnail}
            // alt="thumbnail"
            className="w-[32%] h-[100%] rounded-[11px] bg-purple-200"
          />
          <div
            // src={useDoingData.thumbnail}
            // alt="thumbnail"
            className="w-[32%] h-[100%] rounded-[11px] bg-purple-200"
          />
          <div
            // src={useDoingData.thumbnail}
            // alt="thumbnail"
            className="w-[32%] h-[100%] rounded-[11px] bg-purple-200"
          />
        </div>
        <div className="overflow-y-auto h-[55%] pl-[8px] pr-[15px] custom-scrollbar">
          <h1 className="text-[#525466] text-[16px] font-bold mb-[5px]">
            요구사항 확인
          </h1>
          {/* {useDoingData.detailSections.map((item) => (
            <div className="text-[#525466] text-[13px] mb-[8px]">
              <p className="font-semibold text-[#525466d3] text-[14px]">
                -{item.header}
              </p>
              {item.summary !== '' && <p>[ {item.summary} ]</p>}
              <ul className="list-disc pl-7 space-y-[1px] text-[13px] text-[#525466]">
                {item.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))} */}
          <p className="font-light text-[13px] text-[#525466]">
            {projectDetail?.userRequirements}
          </p>
        </div>
        <div className="w-[100%] h-[38px] flex justify-around">
          <button
            className="flex justify-center items-center w-[30%] rounded-[19px] bg-[#DFE1ED] text-[#23242B] text-[12px] sm:text-[16px] cursor-pointer"
            onClick={() => setSubmitModalOpen(true)}
          >
            결과물 제출하기
          </button>
          <button
            className="flex justify-center items-center w-[30%] rounded-[19px] bg-[#DFE1ED] text-[#23242B] text-[12px] sm:text-[16px] cursor-pointer"
            onClick={() => setFeedbackModalOpen(true)}
          >
            피드백 확인
          </button>
          <button
            className="flex justify-center items-center w-[30%] rounded-[19px] bg-[#6072FF] text-white text-[12px] sm:text-[16px] cursor-pointer"
            onClick={() => setFinalModalOpen(true)}
          >
            최종 결과 제출
          </button>
        </div>
      </div>
      <SubmitRequestModal
        submitModalOpen={submitModalOpen}
        id={id}
        onClose={() => setSubmitModalOpen(false)}
      />
      <FeedbackCheckModal
        id={id}
        feedbackModalOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />
      <FinalSubmitModal
        id={id}
        finalModalOpen={finalModalOpen}
        onClose={() => setFinalModalOpen(false)}
      />
    </div>
  );
}
