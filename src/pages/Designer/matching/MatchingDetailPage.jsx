import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
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

  const { designerInfo, projectApply } = useDesigner();
  const { projectDetail, fetchProjectDetail } = useProject();

  // 서버 응답을 여기 저장 (응답 객체 or boolean)
  const [appliedLocal, setAppliedLocal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProjectDetail(id);
  }, [id, fetchProjectDetail]);

  // 서버에서 이미 지원 여부가 내려온다면 여기서 잡아줌 (필드명은 서비스에 맞게 조정)
  const appliedFromServer = useMemo(() => {
    const s =
      projectDetail?.applicationStatus ??
      projectDetail?.status ??
      (projectDetail?.applied ? 'APPLIED' : '');
    return String(s || '').toUpperCase() === 'APPLIED';
  }, [projectDetail]);

  const isApplied = appliedFromServer || appliedLocal;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isApplied || submitting) return;

    const designerId = designerInfo?.id;
    if (!designerId) {
      alert('디자이너 정보가 없습니다.');
      return;
    }

    try {
      setSubmitting(true);
      const crated = await projectApply(id, { designerId }); // ← 오타 유지 금지
      // 응답 status가 'applied' 라고 했으니 대소문자 맞춰서 체크
      const ok = String(crated?.status || '').toUpperCase() === 'APPLIED';
      if (ok) {
        setAppliedLocal(true); // 버튼 비활성화
        alert('지원하기 완료');
      } else {
        // 혹시 다른 상태면 상세 로그
        console.log('[applyProject] unexpected status:', crated);
      }
      // 최신 상태 갱신 (서버에서 APPLIED로 바뀌었으면 UI 반영)
      fetchProjectDetail(id);
    } catch (e) {
      const msg = e?.response?.data?.error || e?.message;
      if (typeof msg === 'string' && msg.includes('이미 지원')) {
        setAppliedLocal(true);
        alert('이미 지원한 프로젝트입니다.');
      } else {
        console.error(e);
        alert('지원 중 오류가 발생했습니다.');
      }
    } finally {
      setSubmitting(false);
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
          <div className="text-[#525466] text-[13px] flex gap-[7px]">
            <div className="bg-[#EAECF5] rounded-[10px] px-[7px] py-[4px]">
              {CATEGORY[projectDetail?.categoryId]}
            </div>
          </div>
        </div>

        <div className="flex flex-col text-[#525466] text-[12px] font-light items-end justify-between gap-[10px]">
          <div className="flex gap-[10px]">
            <p>등록일자</p>
            <p>
              {projectDetail?.createdAt?.slice(0, 10)?.replaceAll('-', '.')}
            </p>
          </div>
          <button
            type="submit"
            disabled={isApplied || submitting}
            className={`w-[80px] h-[30px] flex justify-center items-center text-[14px] py-[10px] rounded-[10px] ${
              isApplied || submitting
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-[#668df7] text-white'
            }`}
          >
            {isApplied ? '지원 완료' : submitting ? '지원 중…' : '지원하기'}
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
            {projectDetail?.budgetEstimate?.toLocaleString?.()}
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
