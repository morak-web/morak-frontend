import { Link, useNavigate } from 'react-router-dom';
// api
import useMyProjectList from '../../../hooks/useMyProject';
import matchingIcon from '../../../assets/RequestList/matching-icon.png';
export default function MatchingPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useMyProjectList('MATCHING');

  if (isLoading) return <p>로딩 중...</p>;

  const list = Array.isArray(data) ? data : [];
  const matchingData = list.filter((item) => item.status === 'MATCHING');
  return (
    // api 연결 시 여기에 map 사용해서 수정하기
    <div className=" flex flex-col gap-[24px] ">
      {matchingData.map((item) => (
        <div
          key={item.projectId}
          className="w-[100%] py-[16px] px-[10px] bg-[#F7F8FC] rounded-[30px] flex"
        >
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
            <Link className="text-[#525466] text-[13px] font-semibold bg-[#DFE1ED] py-[10px] rounded-[19px] w-[100%] text-center">
              AI 매칭 바로가기
            </Link>
          </div>
          {/* right content */}
          <div className="flex-1 px-[24px] py-[6px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between mb-[14px]">
                <div className="flex flex-col gap-[7px]">
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    프로젝트 제목
                  </h1>
                  <div className="flex items-end gap-[4px]">
                    <p className="text-[#525466] text-[13px]">{item.title}</p>
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
                  <p className="text-[#525466] text-[13px]">
                    로고 디자인 브랜딩
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-[7px]">
                <div className="flex justify-between">
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    요구사항 요약
                  </h1>
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    예상 기간 60일
                  </h1>
                </div>
                <p className="text-[#525466] text-[13px]">
                  스타트업 브랜드 로고 제작 요청 – 친환경·테크 느낌의 심플한
                  로고 원해요. 단색 혹은 2컬러 정도로.
                </p>
              </div>
            </div>
            <div className="flex justify-end items-end">
              <button
                onClick={() => navigate('/client-page/matching-detail')}
                className="w-[103px] h-[40px] bg-[#DFE1ED] text-[15px] text-[#525466] rounded-[19px] flex justify-center items-center cursor-pointer"
              >
                상세 {'>'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
