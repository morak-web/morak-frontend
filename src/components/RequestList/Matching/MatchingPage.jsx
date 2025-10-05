import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import matchingIcon from '../../../assets/RequestList/matching-icon.png';
import { useOutletContext } from 'react-router-dom';

// api
import { useProject } from '../../../context/ProjectContext';

export default function MatchingPage() {
  const navigate = useNavigate();
  const { openApplyList } = useOutletContext();
  const { projectList = [], fetchProjectList, error, loading } = useProject();
  useEffect(() => {
    fetchProjectList('MATCHING');
  }, []);
  const matchingData = projectList.filter(
    (item) => item['status'] === 'MATCHING'
  );
  console.log(matchingData);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>error!! {String(error.message || error)}</div>;

  return (
    <div className="w-full h-[470px] flex flex-col gap-[15px]">
      {matchingData.map((item) => (
        <div className="w-[100%] py-[16px] px-[10px] bg-[#F7F8FC] rounded-[30px] flex">
          {/* left content */}
          <div className="w-[38%] py-[10px] px-[6%] flex flex-col items-center  border-r-[1px] border-[#D9D9D9]">
            <img
              src={matchingIcon}
              alt="matchingIcon"
              className="w-[76px] h-[76px] mb-[14px]"
            />
            <div className="text-[#525466] text-[12px] mb-[19px] flex flex-col items-center text-center">
              <p>
                아직 매칭이 되지 않은 의뢰입니다. 모락 AI로 함께 프로젝트를 진행
                할 디자이너를 만나보세요!
              </p>
            </div>
          </div>
          {/* right content */}
          <div className="flex-1 px-[24px] py-[6px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between mb-[14px]">
                <div className="flex flex-col gap-[7px]">
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    프로젝트 제목
                  </h1>
                  <div className="flex items-end gap-[6px]">
                    <p className="text-[#525466] text-[12px] font-light">
                      {item.title}
                    </p>
                    <p className="text-[#525466] text-[10px]">
                      {item.createdAt.slice(0, 10).replaceAll('-', '.')}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[7px] items-end">
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    프로젝트 카테고리
                  </h1>
                  {/* 이 부분은 map 사용해서 구현하기 */}
                  <p className="text-[#525466] text-[12px] font-ligth">
                    {/* 로고 디자인 브랜딩 */}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-[7px]">
                <div className="flex justify-between">
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    요구사항 요약
                  </h1>
                  {/* <h1 className="text-[#525466] text-[14px] font-semibold">
                    예상 기간 일
                  </h1> */}
                </div>
                <p className="text-[#525466] text-[12px] font-light">
                  {item.aiSummary}
                </p>
              </div>
            </div>
            <div className="flex gap-[10px] justify-center">
              <button
                onClick={() => {
                  const id = item?.projectId;
                  navigate(`/client-page/matching-detail/${id}`);
                }}
                className="w-[182px] h-[30px] rounded-[14px] bg-[#DFE1ED] text-[#525466] text-[13px] flex justify-center items-center cursor-pointer"
              >
                의뢰 상세
              </button>
              <button
                onClick={() => {
                  const id = item?.projectId;
                  navigate(`/client-page/request-list/apply-designer/${id}`);
                  openApplyList();
                }}
                className="w-[182px] h-[30px] rounded-[14px] text-[13px] bg-[#6072FF] text-white cursor-pointer flex justify-center items-center"
              >
                신청 디자이너 보기
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
