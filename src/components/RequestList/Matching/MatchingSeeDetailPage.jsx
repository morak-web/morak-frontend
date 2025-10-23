import backIcon from '../../../assets/RequestList/RequestDetail/back-icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

// api
import { useProject } from '../../../context/ProjectContext';
const CATEGORY = [
  '',
  '웹사이트',
  '앱',
  '쇼핑몰/스마트스토어',
  '키오스크/POS',
  '그래픽/영상',
  '기타',
];
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
              매칭이 완료될 때까지
              <br />
              잠시 기다려주세요!
            </h1>
          </div>
          <div className="w-[45%] flex flex-col items-center justify-between">
            <div className="flex items-center justify-between text-[#525466] ] px-[10px] pb-[10px] ">
              <div className="flex flex-col items-center">
                <p className="text-[10px]">예상 기간 {diffDays.toFixed(0)}일</p>
                <p className="text-[12px]">
                  {projectDetail?.createdAt.slice(0, 10).replaceAll('-', '.')} ~{' '}
                  {projectDetail?.dueDate.slice(0, 10).replaceAll('-', '.')}
                </p>
                {/* <p className="font-semibold text-[10px] ">
                  ₩ {projectDetail?.budgetEstimate.toLocaleString()}
                </p> */}
              </div>
            </div>
            <div className="w-[100%] h-[1px] border-b-[1px] mb-[10px] border-[#D9D9D9]" />
            <div className="flex justify-between gap-[10px]  text-end ">
              <div className="flex justify-between gap-[40px]">
                <div className="flex flex-col items-center gap-[2px]">
                  <p className="text-[#525466] font-semibold text-[13px]">
                    프로젝트 명
                  </p>
                  <p className="text-[#525466] text-[12px]">
                    {projectDetail?.title}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-[2px]">
                  <p className="text-[#525466] font-semibold text-[13px]">
                    {' '}
                    카테고리
                  </p>
                  <p className="text-[#525466] text-[12px]">
                    {CATEGORY[projectDetail?.categoryId]}
                  </p>
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
                {projectDetail?.referenceUrls.map((item, idx) => (
                  <div className="flex font-light text-[13px] text-[#525466] gap-[5px]">
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
