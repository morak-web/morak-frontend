import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProject } from '../../../context/ProjectContext';
import { useDesigner } from '../../../context/DesignerContext';

import backIcon from '../../../assets/RequestList/RequestDetail/back-icon.png';
import moneyIcon from '../../../assets/Designer/matching/money.png';
import timeIcon from '../../../assets/Designer/matching/time.png';
import lockIcon from '../../../assets/Designer/matching/lock.png';
export default function MatchingDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apply, setApply] = useState(false);
  const { designerInfo, projectApply } = useDesigner();
  const { projectDetail, fetchProjectDetail } = useProject();
  useEffect(() => {
    fetchProjectDetail(id);
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const designerId = designerInfo?.id;
    console.log(designerId);
    try {
      const crated = await projectApply(id, { designerId: designerId });
      alert('지원하기 완료');
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const start = new Date(projectDetail?.createdAt);
  const end = new Date(projectDetail?.expectedEndDate);
  const ms = end - start;
  const daysFloor = Math.floor(ms / 86400000);
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white w-[95%] min-h-[710px] rounded-[11px]"
    >
      <button
        type="button"
        onClick={() => navigate(-1)}
        className=" h-[12px] ml-[13px] mt-[15px] cursor-pointer flex text-[#D8DAE5] text-[12px] gap-[5px]"
      >
        <img src={backIcon} alt="backIcon" className="w-[12px] h-[12px]" />
        프로젝트 매칭 대기
      </button>
      {/* header */}
      <div className="flex justify-between items-start mt-[15px] mx-[36px] mb-[9px]">
        <div className="flex flex-col flex-1 justify-start ">
          <h1 className="text-[20px] font-semibold mb-[15px]">
            {projectDetail?.title}
          </h1>
          {/* map으로 수정 */}
          <div className="text-[#525466] text-[13px] flex gap-[7px]">
            <div className="bg-[#EAECF5] rounded-[10px] px-[7px] py-[4px]">
              웹 api
            </div>
            <div className="bg-[#EAECF5] rounded-[10px] px-[7px] py-[4px]">
              앱
            </div>
          </div>
        </div>
        <div className="flex flex-col text-[#525466] text-[12px] font-light items-end justify-between gap-[10px]">
          <div className="flex gap-[10px]">
            <p>등록일자</p>
            <p>{projectDetail?.createdAt.slice(0, 10).replaceAll('-', '.')}</p>
          </div>
          <button
            onClick={() => {
              setApply(true);
            }}
            type="submit"
            className={`${apply ? 'bg-gray-200' : 'bg-[#668df7] text-white'}  w-[80px] h-[30px] flex justify-center items-center text-[14px] py-[10px] rounded-[10px] cursor-pointer`}
          >
            지원하기
          </button>
        </div>
      </div>
      {/* money, time */}
      <div className="flex flex-col gap-[17px] py-[16px] border-b-[1px] border-t-[1px] border-[#52546652] mb-[14px] mx-[36px]">
        <div className="flex items-center">
          <img
            src={moneyIcon}
            alt="moneyIcon"
            className="w-[15px] h-[15px] mr-[15px]"
          />
          <p className="text-[#525466] text-[13px] font-medium mr-[5px]">
            예산
          </p>
          <p className="text-[#525466] text-[13px] font-light">
            {projectDetail?.budgetEstimate.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center">
          <img
            src={timeIcon}
            alt="timeIcon"
            className="w-[15px] h-[15px] mr-[15px]"
          />
          <p className="text-[#525466] text-[13px] font-medium mr-[5px]">
            에상 기간
          </p>
          <p className="text-[#525466] text-[13px] font-light">{daysFloor}일</p>
        </div>
        <div className="text-[#525466] text-[13px] font-light flex items-center">
          <img
            src={lockIcon}
            alt="lockIcon"
            className="w-[15px] h-[15px] mr-[15px]"
          />
          <p className="text-[#525466] text-[13px] font-medium mr-[5px]">
            모집 마감일 - api
          </p>
          <p className="text-[#525466] text-[13px] font-light">2025.08.19</p>
        </div>
      </div>
      <div className="overflow-y-auto custom-scrollbar h-[430px] mr-[40px] ">
        {/* content */}
        <div className="mx-[36px] pb-[14px] mb-[14px] border-b-[1px] border-[#52546652]">
          <h1 className="text-[#525466] text-[16px] font-bold mb-[18px]">
            업무 내용
          </h1>
          <section className="mb-2 flex flex-col gap-[10px]">
            {/* <div>
              <h2 className="text-sm font-semibold mb-1 text-[#525466d3]">
                - 주요 기능
              </h2>
              <p className="text-[13px] text-[#525466] px-[10px]">
                [ 사용자의 건강 데이터를 통합 관리하고, 목표 달성을 지원하는
                퍼스널 헬스케어 플랫폼 ]
              </p>
              <ul className="list-disc pl-7 space-y-1 text-[13px] text-[#525466]">
                <li>건강 상태 트래킹 (예: 수면, 운동, 심박수, 혈압 등)</li>{' '}
                <li>건강 목표 설정 및 진행률 확인</li>
                <li>맞춤형 건강 피드백 및 알림 제공</li>
                <li>식단 및 물 섭취 기록 기능</li>
                <li>
                  타겟 사용자: 20~50대 남녀, 건강을 꾸준히 관리하고자 하는
                  일반인 및 헬스케어 관심층
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold mb-1 text-[#525466d3]">
                - 톤앤매너
              </h2>
              <ul className="list-disc pl-7 space-y-1 text-[13px] text-[#525466]">
                <li>
                  밝고 신뢰감 있는 색감 사용 (예: 화이트 배경 중심에 블루/민트
                  계열 포인트 컬러)
                </li>
                <li>너무 병원스럽지 않되, 전문성과 안정감이 느껴지는 스타일</li>
                <li>전체적으로 클린하고 여백이 잘 살아있는 UI 요청드립니다</li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold mb-1 text-[#525466d3]">
                - UX 원칙
              </h2>
              <ul className="list-disc pl-7 space-y-1 text-[13px] text-[#525466]">
                <li>
                  사용자가 처음 접해도 쉽게 이해하고 사용할 수 있도록 직관적인
                  구조로 설계해주세요
                </li>
                <li>
                  정보의 계층 구조가 명확하고, 손가락 조작(터치/스크롤)이
                  자연스러운 흐름으로 구성되어야 합니다
                </li>
                <li>
                  자주 사용하는 기능은 하단 탭바 또는 메인화면 상단에 고정하여
                  접근성을 높여주세요
                </li>
                <li>
                  피드백이나 알림은 부드러운 애니메이션 또는 아이콘 강조로
                  거부감 없이 전달되게 구성 바랍니다
                </li>
              </ul>
            </div> */}
            <p className="text-[#525466] text-[13px] font-light">
              {projectDetail?.userRequirements}
            </p>
          </section>
        </div>
        {/* condition */}
        <div className="mx-[36px]">
          <h1 className="text-[#525466] text-[16px] font-bold mb-[18px]">
            모집 요건
          </h1>
          <ul className="text-[#525466] text-[13px]  pl-7 space-y-1 ">
            <li>{projectDetail?.designerRequirements}</li>
          </ul>
        </div>
      </div>
    </form>
  );
}
