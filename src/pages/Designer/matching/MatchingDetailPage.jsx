import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProject } from '../../../context/ProjectContext';
import { useDesigner } from '../../../context/DesignerContext';

import backIcon from '../../../assets/RequestList/RequestDetail/back-icon.png';
import moneyIcon from '../../../assets/Designer/matching/money.png';
import timeIcon from '../../../assets/Designer/matching/time.png';
const CATEGORY = {
  1: '웹사이트',
  2: '앱',
  3: '쇼핑몰/스마트스토어',
  4: '키오스크/POS',
  5: '그래픽/영상',
  6: '기타',
};
export default function MatchingDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apply, setApply] = useState();
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
      setApply(crated);
    } catch (e) {
      throw e;
    }
  };
  console.log('created', apply);

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
              {CATEGORY[projectDetail?.categoryId]}
            </div>
          </div>
        </div>
        <div className="flex flex-col text-[#525466] text-[12px] font-light items-end justify-between gap-[10px]">
          <div className="flex gap-[10px]">
            <p>등록일자</p>
            <p>{projectDetail?.createdAt.slice(0, 10).replaceAll('-', '.')}</p>
          </div>
          <button
            type="submit"
            disabled={apply?.status === 'PENDING'}
            className={`w-[80px] h-[30px] flex justify-center items-center text-[14px] py-[10px] rounded-[10px]  ${apply?.status === 'PENDING' ? 'bg-gray-200' : 'bg-[#668df7] cursor-pointer text-white'}`}
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
          <p className="text-[#525466] text-[13px] font-light">
            {projectDetail?.createdAt?.slice(0, 10).replaceAll('-', '.')} -{' '}
            {projectDetail?.dueDate?.slice(0, 10).replaceAll('-', '.')}
          </p>
        </div>
      </div>
      <div className="overflow-y-auto custom-scrollbar h-[430px] mr-[40px] ">
        {/* content */}
        <div className="mx-[36px] pb-[14px] mb-[14px] border-b-[1px] border-[#52546652]">
          <h1 className="text-[#525466] text-[16px] font-bold mb-[18px]">
            업무 내용
          </h1>
          <section className="mb-2 flex flex-col gap-[10px]">
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
          <ul className="text-[#525466] text-[13px] space-y-1 ">
            <li>{projectDetail?.designerRequirements}</li>
          </ul>
        </div>
      </div>
    </form>
  );
}
