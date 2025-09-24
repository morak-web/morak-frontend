import { useNavigate, useParams } from 'react-router-dom';

import backIcon from '../../../assets/RequestList/RequestDetail/back-icon.png';
import facebookIcon from '../../../assets/RequestList/SocialIcon/facebook.png';
import youtubeIcon from '../../../assets/RequestList/SocialIcon/youtube.png';
import figmaIcon from '../../../assets/RequestList/SocialIcon/figma.png';
import { RequestListMocks } from '../../../mocks/RequestListMocks';
import { useDesigner } from '../../../context/DesignerContext';
import { useEffect } from 'react';
export default function DesignerPortfolioPage() {
  const useData = RequestListMocks['doing'][0];
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchDesignerInfo, designerInfo } = useDesigner();
  useEffect(() => {
    fetchDesignerInfo(id);
  }, []);
  console.log(designerInfo);
  return (
    <div className=" w-[95%] h-[710px] bg-white rounded-[19px] py-[2%] px-[3%] flex flex-col gap-3">
      <button
        className="cursor-pointer text-[#d8dae5] text-[12px] flex items-center gap-2"
        onClick={() => navigate(-1)}
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
                디자이너 {designerInfo?.name}
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
              {designerInfo?.interestedIn} / {designerInfo?.yearsOfExperience}
              년차
            </h2>
            <p className="text-[#525466] text-[13px]">{designerInfo?.intro}</p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-[20px] text-[#525466] font-medium">
              참여 프로젝트
            </h1>
            <div className=" flex flex-col xl:flex-row md:flex-row lg:flex-col gap-[20px] sm:gap-[3%]">
              {designerInfo?.portfolio.map((item, idx) => (
                <div className="flex flex-col items-center ">
                  <img
                    src={item.picture}
                    key={idx}
                    className="w-[350px] h-[200px] rounded-[10px] mb-[5px] border-[2px]"
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
