import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import goBackIcon from '../../../assets/RequestList/RequestDetail/back-icon.png';
import SubmitRequestModal from '../Submit/SubmitRequestModal';
import FinalSubmitModal from '../Submit/FinalSubmitModal';

// API
import { useProject } from '../../../context/ProjectContext';

export default function DesignerRequestDoingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [finalModalOpen, setFinalModalOpen] = useState(false);

  const { projectDetail, fetchProjectDetail } = useProject();
  useEffect(() => {
    fetchProjectDetail(id);
  }, []);
  console.log(projectDetail);

  return (
    <div className="bg-white w-[95%] h-[650px] rounded-[11px] py-[20px] flex flex-col gap-[10px]">
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
      </div>
      <div className="flex w-full justify-between pl-[40px] gap-[5px] md:gap-[15px] pr-[5px] md:pr-[36px] items-start  ">
        <div className="flex flex-col items-start">
          <h1 className="text-[#525466] font-bold text-[11px] sm:text-[13px] md:text-[20px] mt-[15px]">
            {projectDetail?.title}
          </h1>
        </div>
        <div className="text-[15px] h-[40px] flex flex-col justify-between items-end">
          <p className="text-[12px] text-[#525466]">
            <span className="text-[#525466] font-semibold">김다은</span> 님과의
            프로젝트
          </p>
          <p className="text-blue-500 text-[10px] md:text-[13px] font-normal">
            진행 중
          </p>
          <p className="font-light text-[10px] text-[#525466]">
            {projectDetail?.createdAt?.slice(0, 10).replaceAll('-', '.')} ~{' '}
            {projectDetail?.dueDate?.slice(0, 10).replaceAll('-', '.')}{' '}
          </p>
        </div>
      </div>
      <div className="h-[1px] bg-[#9498bd5d] w-[830px] mx-[30px] my-[5px]" />
      <div className="px-[6%] gap-[20px] w-[100%] h-[600px] flex flex-col justify-between">
        <div className="overflow-y-auto mt-[20px] h-[55%] pl-[8px] pr-[15px] custom-scrollbar gap-[20px] flex flex-col">
          <div>
            <h1 className="text-[#525466] text-[16px] font-bold mb-[5px]">
              요구사항 확인
            </h1>
            <p className="font-light text-[13px] text-[#525466]">
              {projectDetail?.userRequirements}
            </p>
          </div>
          <div>
            <h1 className="text-[#525466] text-[16px] font-bold mb-[5px]">
              참고자료
            </h1>
            <div className="font-light text-[13px] text-[#525466]">
              {projectDetail?.referenceUrls.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[38px] flex justify-around">
          <button
            className="flex justify-center items-center w-[40%] rounded-[19px] bg-[#DFE1ED] text-[#23242B] text-[12px] sm:text-[16px] cursor-pointer"
            onClick={() => setSubmitModalOpen(true)}
          >
            결과물 제출하기
          </button>
          <button
            className="flex justify-center items-center w-[40%] rounded-[19px] bg-[#6072FF] text-white text-[12px] sm:text-[16px] cursor-pointer"
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
      <FinalSubmitModal
        id={id}
        finalModalOpen={finalModalOpen}
        onClose={() => setFinalModalOpen(false)}
      />
    </div>
  );
}
