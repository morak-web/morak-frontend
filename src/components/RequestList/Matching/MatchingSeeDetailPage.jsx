import backIcon from '../../../assets/RequestList/RequestDetail/back-icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

// api
import { useProject } from '../../../context/ProjectContext';

export default function MatchingSeeDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { projectDetail, fetchProjectDetail, loading, error } = useProject();
  useEffect(() => {
    fetchProjectDetail(id);
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>error!! {String(error.message || error)}</div>;
  // date
  const start = new Date(projectDetail?.createdAt);
  const end = new Date(projectDetail?.dueDate);
  const diffMs = end - start;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
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
        <div className="flex sm:justify-around items-center gap-[20px] sm:gap-[0px]">
          <div className="w-[45%] sm:w-[30%] flex flex-col items-center justify-ceenter pt-[1%] gap-[10px]">
            <h1 className="text-[8px] sm:text-[12px] text-[#525466] text-center whitespace-nowrap">
              모락 AI로 함께 프로젝트를 진행 할<br /> 디자이너를 만나보세요!
            </h1>
          </div>
          <div className="w-[35%] md:w-[45%] flex flex-col justify-between">
            <div className="flex justify-between border-b-[1px] border-[#D9D9D9] text-end text-[#525466] pb-[5px] mb-[5px] px-[10px]">
              <div className="flex gap-[10px] justify-end">
                <p className="font-light text-[10px]">
                  {projectDetail?.createdAt.slice(0, 10).replaceAll('-', '.')} ~{' '}
                  {projectDetail?.dueDate.slice(0, 10).replaceAll('-', '.')}
                </p>
                <p className="font-normal text-[10px]">
                  예상 기간{' '}
                  <span className="font-normal">{diffDays.toFixed(0)}</span>일
                </p>
              </div>
              <p className="font-semibold text-[10px] ">
                ₩ {projectDetail?.budgetEstimate.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col md:flex md:flex-row md:px-[5%] xl:px-[15%] justify-between gap-[10px]">
              <div className="flex flex-col ">
                <h3 className="text-[#525466] text-[13px] font-semibold whitespace-nowrap">
                  프로젝트 명
                </h3>
                <p className="text-[#525466] text-[12px] font-light">
                  {projectDetail?.title}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[#525466] text-[13px] font-semibold whitespace-nowrap">
                  프로젝트 카테고리
                </h3>
                <div className="flex lg:flex-col xl:flex-row xl:gap-[10px] gap-[10px] lg:gap-[0px]">
                  <p className="text-[#525466] text-[10px] sm:text-[13px] font-light whitespace-nowrap"></p>
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
                {/* {data.detailSections.map((section) => (
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
                ))} */}
                <p className="font-light text-[13px] text-[#525466]">
                  {projectDetail?.userRequirements}
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[#525466] mb-[10px]">
                첨부 자료
              </h2>
              <div className="flex flex-col pl-4 ">
                {/* {data.tempPicture.map((item, idx) => (
                  <img
                    src={item}
                    key={idx}
                    className="w-[32%] rounded-[10px]"
                  />
                ))} */}
                {projectDetail?.referenceUrls.map((item, idx) => (
                  <div className="flex font-light text-[13px] text-[#525466] gap-[5px]">
                    <p>{idx + 1}. </p>
                    <a
                      href={item}
                      target="_blank"
                      className="font-light text-[13px] text-[#525466]"
                    >
                      {item}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
