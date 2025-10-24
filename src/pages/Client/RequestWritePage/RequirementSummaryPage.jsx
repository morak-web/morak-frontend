// RequirementSummaryPage.jsx
import MainLayout from '../../../components/layout/MainLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import folderImg from '../../../assets/RequestWrite/folder.png';
import { useProject } from '../../../context/ProjectContext';
import { useMemo, useState } from 'react';

export default function RequirementSummaryPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // 문자열일 수 있음
  const projectId = useMemo(() => (id ? String(id) : null), [id]);

  const { responseData, patchNewProject } = useProject();

  const [submitting, setSubmitting] = useState(false);

  const startDate = useMemo(() => new Date(), []);
  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  const pad = (n) => String(n).padStart(2, '0');
  const ymdDot = `${year}. ${pad(month)}. ${pad(day)}`;

  const CATEGORY = {
    1: '웹사이트',
    2: '앱',
    3: '쇼핑몰/스마트스토어',
    4: '키오스크/POS',
    5: '그래픽/영상',
    6: '기타',
  };

  const STORAGE_KEY = 'request_write_draft_v1';
  const AI_THREAD_KEY = projectId ? `ai_req_thread_v1:${projectId}` : null;

  const clearLocalDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      if (AI_THREAD_KEY) localStorage.removeItem(AI_THREAD_KEY);
      localStorage.removeItem('draftProjectId');
      localStorage.removeItem('draftCategoryId');
      localStorage.removeItem('draftSavedAt');
    } catch (e) {
      console.error('localStorage remove failed', e);
    }
  };

  const onSubmit = async () => {
    if (!projectId || submitting) return; // 가드
    setSubmitting(true);
    try {
      // 서버: DRAFT -> MATCHING
      const res = await patchNewProject(projectId); // 내부에서 PATCH /projects/:id/submit 호출
      // 성공 시에만 로컬 정리
      clearLocalDraft();
      navigate('/request/write/complete');
    } catch (e) {
      console.error(e);
      const msg =
        e?.response?.data?.details ||
        e?.response?.data?.error ||
        e?.message ||
        '제출 중 오류가 발생했습니다.';
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] py-[30px] flex items-center">
        <div className=" w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgrgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between">
          <h1 className="text-[24px] font-bold flex flex-col mb-[30px]">
            의뢰 내용 확인/요약
          </h1>

          <div className="flex flex-col gap-[6px] overflow-y-auto custom-scrollbar pr-[40px] mb-[56px]">
            <div>
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                프로젝트 제목 / 카테고리
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]">
                {responseData?.title} / {CATEGORY[responseData?.categoryId]}
              </p>
            </div>

            <div>
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                지출 가능 예산
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]">
                {Number(responseData?.budgetEstimate || 0).toLocaleString()} 원
              </p>
            </div>

            <div>
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                기간
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]">
                {ymdDot} ~{' '}
                {String(responseData?.dueDate || '').replaceAll('-', '.')}
              </p>
            </div>

            <div>
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                상세 요구 사항
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px] whitespace-pre-wrap">
                {responseData?.userRequirements}
              </p>
            </div>

            <div>
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                모집 요건
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px] whitespace-pre-wrap">
                {responseData?.designerRequirements}
              </p>
            </div>

            <div className=" pb-[10px] border-b-[1px] border-[#5254665e]">
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                참고 자료
              </h1>
              {(responseData?.referenceUrls || []).map((item) => (
                <p
                  key={item}
                  className="text-[#525466] text-[13px] pl-[7px] pt-[9px] flex"
                  title={item}
                >
                  {item.length > 100 ? `${item.slice(0, 100)}...` : item}
                </p>
              ))}
            </div>

            <p className="text-[#A9A9A9] text-[12px] text-end mt-[2px]">
              내용을 수정하려면 이전으로 돌아가주세요.
            </p>
          </div>

          {/* 이전, 제출 버튼 */}
          <div className="flex justify-between items-center">
            <Link
              to={`/request/AI-question/${projectId}`}
              className=" text-[18px] cursor-pointer"
            >
              이전
            </Link>
            <button
              onClick={onSubmit}
              disabled={!projectId || submitting}
              className={`px-[17px] py-[8px] rounded-[16px] text-[18px] cursor-pointer ${
                !projectId || submitting
                  ? 'bg-gray-300 pointer-events-none'
                  : 'bg-[#BDCFFF]'
              }`}
            >
              {submitting ? '제출 중…' : '제출'}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
