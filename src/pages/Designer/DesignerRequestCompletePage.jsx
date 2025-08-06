import { ProjectListMocks } from '../../mocks/ProjectList';
import { useParams, useNavigate } from 'react-router-dom';
import goBackIcon from '../../assets/RequestList/RequestDetail/back-icon.png';

export default function DesignerRequestCompletePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const finishData = ProjectListMocks['finish'];
  const useFinishData = finishData.find((item) => String(item.id) === id);

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
              {useFinishData.title}
            </h1>
            <p className=" text-[10px] md:text-[13px] font-normal text-green-600">
              완료됨
            </p>
          </div>
          <div className="text-[11px] sm:text-[13px] md:text-[15px]">
            {useFinishData.user} 님과의 프로젝트
          </div>
        </div>
      </div>
      <div className="px-[6%] gap-[20px] w-[100%] h-[600px] flex flex-col justify-between">
        <div className="flex justify-between w-[100%] h-[210px]">
          <img
            src={useFinishData.thumbnail}
            alt="thumbnail"
            className="w-[32%] h-[100%] rounded-[11px]"
          />
          <img
            src={useFinishData.thumbnail}
            alt="thumbnail"
            className="w-[32%] h-[100%] rounded-[11px]"
          />
          <img
            src={useFinishData.thumbnail}
            alt="thumbnail"
            className="w-[32%] h-[100%] rounded-[11px]"
          />
        </div>
        <div className="overflow-y-auto h-[85%] pl-[8px] pr-[15px] custom-scrollbar">
          <h1 className="text-[#525466] text-[16px] font-bold mb-[5px]">
            요구사항 확인
          </h1>
          {useFinishData.detailSections.map((item) => (
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
          ))}
        </div>
        <div className="w-[100%] flex justify-center">
          <p className="text-[#52546663] text-[13px] ">
            {useFinishData.date} 완료된 프로젝트 입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
