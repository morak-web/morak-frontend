import backIcon from '../../../assets/RequestList/RequestDetail/back-icon.png';
import facebookIcon from '../../../assets/RequestList/SocialIcon/facebook.png';
import youtubeIcon from '../../../assets/RequestList/SocialIcon/youtube.png';
import figmaIcon from '../../../assets/RequestList/SocialIcon/figma.png';
import { RequestListMocks } from '../../../mocks/RequestListMocks';
export default function DesignerPortfolioPage({
  id,
  requestState,
  closeScreen,
}) {
  const data = RequestListMocks[requestState];
  const useData = data.find((item) => item.id === id);
  return (
    <div className=" w-[95%] h-[710px] bg-white rounded-[19px] py-[2%] px-[3%] flex flex-col gap-3">
      <button
        className="cursor-pointer text-[#d8dae5] text-[12px] flex items-center gap-2"
        onClick={() => closeScreen()}
      >
        <img src={backIcon} alt="backIcon" className="w-[12px] h-[12px]" />
        의뢰 목록
      </button>
      <div className="overflow-y-auto max-h-[605px] w-[100%] px-[1%] custom-scrollbar ">
        <div className="w-[97%] pb-[2%] flex flex-col gap-10">
          <div className="bg-[#F7F8fc] rounded-[15px] px-[6%] py-[6%]  flex flex-col">
            <div className="w-[100%] h-[200px] bg-blue-200 mb-[20px]"></div>
            <div className="flex items-center gap-3 mb-[8px]">
              <h1 className="text-[15px] sm:text-[20px] text-black font-semibold ">
                디자이너 {useData.designer.name}
              </h1>
              <div className="flex h-[20px] gap-2">
                <img
                  src={facebookIcon}
                  alt="facebookIcon"
                  className="mr-[3px]"
                />
                <img src={youtubeIcon} alt="youtubeIcon" />
                <img src={figmaIcon} alt="figmaIcon" />
              </div>
            </div>
            <h2 className="text-[#525466] text-[13px] sm:text-[16px] font-semibold mb-[6px]">
              {useData.designer.job}, {useData.designer.personalHistory}년차
            </h2>
            <p className="text-[#525466] text-[13px]">
              {useData.designer.description}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-[20px] text-[#525466] font-medium">
              참여 프로젝트
            </h1>
            <div className=" flex flex-col xl:flex-row md:flex-row lg:flex-col justify-between gap-[20px] sm:gap-[3%]">
              {useData.designer.project.map((item, idx) => (
                <div className="flex flex-col items-center">
                  <img
                    src={item.picture}
                    key={idx}
                    className="w-[100%] h-[80%] rounded-[10px] mb-[5px]"
                  />
                  <p className="text-[16px] text-[#525466]">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
