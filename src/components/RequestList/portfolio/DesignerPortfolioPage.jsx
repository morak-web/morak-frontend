import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import backIcon from '../../../assets/RequestList/RequestDetail/back-icon.png';
import noFileImg from '../../../assets/Designer/no-file.png';
import morak from '../../../assets/morak-designer.png';

import { useDesigner } from '../../../context/DesignerContext';

export default function DesignerPortfolioPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchDesignerInfo, designerInfo } = useDesigner();

  // 마운트 시 1회만 fetch
  const fetchedRef = useRef(false);
  useEffect(() => {
    if (!id) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchDesignerInfo?.(id);
  }, [id, fetchDesignerInfo]);

  const portfolio = designerInfo?.portfolio ?? [];
  console.log(designerInfo);

  return (
    <div className="w-[95%] h-[710px] bg-white rounded-[19px] py-[2%] px-[3%] flex flex-col gap-3">
      <button
        className="cursor-pointer text-[#d8dae5] text-[12px] flex items-center gap-2"
        onClick={() => navigate(-1)}
        aria-label="뒤로가기"
      >
        <img src={backIcon} alt="backIcon" className="w-[12px] h-[12px]" />
        의뢰 목록
      </button>

      <div className="overflow-y-auto max-h-[605px] w-[100%] px-[1%] custom-scrollbar">
        <div className="w-[97%] pb-[2%] flex flex-col gap-10">
          {/* 프로필 카드 */}
          <div className="bg-[#F7F8fc] rounded-[15px] px-[6%] py-[6%] flex">
            {/* 커버/배너 영역 */}
            <div className="w-[300px] h-[200px] mb-[20px] rounded-[12px] overflow-hidden flex items-center justify-center">
              <img src={morak} alt="morak" className="w-[200px] h-[200px]" />
            </div>

            {/* 이름 + 정보 */}
            <div className="w-[500px] flex items-start flex-col mb-[8px]">
              <h1 className="text-[20px] text-black font-semibold mb-[10px]">
                디자이너 {designerInfo?.name ?? '이름 미상'}
              </h1>
              <h2 className="text-[#525466] text-[16px] font-semibold mb-[7px]">
                {designerInfo?.interestedIn ? '웹디자인' : '웹디자인'} /{' '}
                {designerInfo?.yearsOfExperience ? 3 : 3}년차
              </h2>
              <p className="text-[#525466] text-[14px]">
                {/* {designerInfo?.intro ?? '소개 정보가 아직 없습니다.'} */}
                사용자 여정 분석을 바탕으로 정보 구조를 설계하고, Figma로
                와이어프레임→프로토타입→하이파이까지 빠르게 전달합니다.
                <br />
                디자인 시스템을 구축해 일관성과 확장성을 확보하는 것을
                좋아합니다. <br />
                협업 툴: Figma, Zeplin, Notion, Jira / 핸드오프 경험 다수.
              </p>

              {/* 로딩 스켈레톤 (designerInfo 없을 때) */}
              {!designerInfo && (
                <div className="mt-4 animate-pulse w-full">
                  <div className="h-4 bg-[#e9ecf4] rounded w-2/3 mb-2" />
                  <div className="h-4 bg-[#e9ecf4] rounded w-1/2" />
                </div>
              )}
            </div>
          </div>

          {/* 포트폴리오 */}
          <div className="flex flex-col gap-4">
            <h1 className="text-[20px] text-[#525466] font-medium">
              참여 프로젝트
            </h1>

            {portfolio.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[3%]">
                {portfolio.map((item, idx) => {
                  const src = item?.fileUrl || item?.picture || noFileImg;
                  const title =
                    item?.title ??
                    (item?.description && item.description !== 'undefined'
                      ? item.description
                      : `포트폴리오 이미지 ${idx + 1}`);
                  return (
                    <div
                      key={item?.id ?? idx}
                      className="flex flex-col items-center w-full"
                    >
                      <a
                        href={item?.fileUrl || src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        title="이미지 원본 열기"
                      >
                        <div className="w-[350px] h-[200px] object-cover rounded-[10px] mb-[5px] border-[2px] border-[#e5e7f0]">
                          <img
                            src={src}
                            alt={title}
                            loading="lazy"
                            className="w-full h-[200px] mb-[5px]"
                            onError={(e) => {
                              e.currentTarget.src = noFileImg;
                            }}
                          />
                        </div>
                      </a>

                      <p className="text-[16px] text-[#525466] line-clamp-1 max-w-[350px] text-center">
                        {title}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full py-8 text-center text-[#8a8da0]">
                등록된 포트폴리오가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
