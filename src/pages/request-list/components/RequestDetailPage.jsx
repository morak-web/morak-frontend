import backIcon from '../../../assets/RequestList/RequestDetail/back-icon.png';
import { RequestDetailMocks } from '../../../mocks/RequestDetailMocks';
import { useNavigate } from 'react-router-dom';
import desingerImg from '../../../assets/RequestList/designer1.png';

export default function RequestDetailPage() {
  const navigate = useNavigate();
  const data = RequestDetailMocks[1];
  return (
    <div className="w-[95%] h-[710px] bg-white rounded-[19px] py-[2%] px-[3%]">
      <button
        className="cursor-pointer text-[#d8dae5] text-[12px] flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <img src={backIcon} alt="backIcon" className="w-[12px] h-[12px]" />
        의뢰 목록
      </button>
      <div className=" px-[4%] py-[1%]">
        <div className="flex justify-around gap-[10px]">
          <img
            src={desingerImg}
            alt="desingerImg"
            className="w-[12%] h-[12%] rounded-[50%]"
          />
          <div className="flex flex-col items-center justify-ceenter pt-[1%] gap-[10px]">
            <h1 className="text-[10px] sm:text-[20px] whitespace-nowrap">
              <span className="font-bold text-[15px] sm:text-[22px]">
                김락모
              </span>{' '}
              님과의 프로젝트
            </h1>
            <button
              className="w-[90%] bg-[#DFE1ED] rounded-[19px] h-[38px] text-[#525466] text-[13px] font-semibold cursor-pointer"
              onClick={() => navigate('/client-page/designer-portfolio')}
            >
              포트폴리오 보기
            </button>
          </div>
          <div className="w-[35%] md:w-[45%] flex flex-col justify-between">
            <div className=" border-b-[1px] border-[#D9D9D9] text-end text-[#525466] text-[13px] font-light md:pb-[3%] md:mb-[3%]">
              진행중 ...
              {/* 이부분 고쳐야함 */}
            </div>
            <div className="flex flex-col md:flex md:flex-row md:px-[5%] xl:px-[15%] justify-between gap-[10px]">
              <div className="flex flex-col ">
                <h3 className="text-[#525466] text-[9px] md:text-[13px] font-semibold whitespace-nowrap">
                  제목
                </h3>
                <p className="text-[#525466] text-[10px] sm:text-[13px] font-light">
                  {data.projectName}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[#525466] text-[9px] md:text-[13px] font-semibold">
                  카테고리
                </h3>
                <div className="flex lg:flex-col xl:flex-row xl:gap-[10px] gap-[10px] lg:gap-[0px]">
                  {/* {category.map((item) => ( */}
                  <p className="text-[#525466] text-[10px] sm:text-[13px] font-light whitespace-nowrap ">
                    UI/UX 앱디자인{' '}
                  </p>
                  {/* ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] max-h-[500px] bg-[#F7F8FC] rounded-[30px] pr-[28px] mt-8 py-[30px]">
          <div className=" w-[100%] max-h-[440px] overflow-y-auto flex flex-col px-[30px]  custom-scrollbar ">
            <div className="mb-[20px]">
              <h2 className="text-[16px] font-bold text-[#525466] mb-[10px]">
                의뢰 상세
              </h2>
              <div className="pl-4 ">
                {data.detailSections.map((section) => (
                  <section key={section.header} className="mb-2">
                    <h2 className="text-sm font-semibold mb-1 text-[#525466d3]">
                      - {section.header}
                    </h2>
                    <ul className="list-disc pl-7 space-y-1 text-[13px] text-[#525466]">
                      {section.items.map((text, idx) => (
                        <li key={idx}>{text}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[#525466] mb-[10px]">
                첨부 자료
              </h2>
              <div className="flex justify-between pl-4">
                {data.tempPicture.map((item, idx) => (
                  <img
                    src={item}
                    className="w-[32%] rounded-[10px]"
                    key={idx}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
