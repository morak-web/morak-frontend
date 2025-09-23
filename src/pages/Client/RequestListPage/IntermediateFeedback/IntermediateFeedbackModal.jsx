import closeBtn from '../../../../assets/RequestList/close-button.png';
import ChatPage from './ChatPage';
import { useProject } from '../../../../context/ProjectContext';
import { useEffect } from 'react';

export default function IntermediateFeedbackModal({
  interFeedbackModalOpen,
  onClose,
  projectId,
}) {
  if (!interFeedbackModalOpen) return null;

  const { midResultFile, fetchResultFile } = useProject();
  useEffect(() => {
    fetchResultFile(projectId, 'MID');
  }, []);
  console.log(midResultFile);
  return (
    <div
      onClick={onClose}
      className=" fixed inset-0 z-50  min-w-screen min-h-screen bg-[#0101015e] justify-center items-center flex"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[85%] rounded-[11px] bg-white px-[35px] py-[27px] flex flex-col gap-[4%]"
      >
        <div className="flex justify-between ">
          <h1 className="text-[20px] font-bold">중간 결과 / 피드백</h1>
          <button className="cursor-pointer">
            <img
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
              className="w-[20px] h-[20px]"
            />
          </button>
        </div>
        <div className="w-[100%] h-[100%] flex flex-col pr-[36px]">
          <div className="flex justify-between">
            <div className="flex items-end gap-[11px] mx-[1%]">
              <h1 className="text-[#525466] text-[15px] sm:text-[20px] font-medium ">
                와이어프레임 초안 1차 색상안 2종 포함 //임시
              </h1>
              <p className="text-[#525466] text-[13px] sm:text-[16px] font-light">
                2025.08.23 //임시
              </p>
            </div>
            <div className="flex flex-col justify-end md:flex-row text-[#525466] text-[13px] sm:text-[16px] font-normal ml-[10px] md:ml-[0px] md:gap-[11px] whitespace-nowrap hover:text-black hover:font-bold">
              <a target="_blank" rel="noopener" href={midResultFile?.fileUrl}>
                파일 다운로드
              </a>
            </div>
          </div>
          <div className="bg-[#D9D9D9] w-[100%] h-[1px] my-[10px]"></div>
          <div className="w-[100%] h-[100%] flex flex-col justify-between">
            <div className="w-[100%] h-[50%] flex flex-col px-[1%]">
              <div className="w-[100%] h-[100%] flex justify-between ">
                <div className="w-[45%] h-[95%] bg-[#DFE1ED] rounded-[10px]"></div>
                <div className="w-[45%] h-[95%] bg-[#DFE1ED] rounded-[10px]"></div>
              </div>
              <p className="text-[#525466] text-[13px] md:text-[16px]">
                {midResultFile?.description}
              </p>
            </div>
            <div className="w-[100%] h-[45%] px-[1%] flex flex-col justify-end">
              <ChatPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
