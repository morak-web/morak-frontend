// RequirementSummaryPage.jsx
import MainLayout from '../../../components/layout/MainLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import folderImg from '../../../assets/RequestWrite/folder.png';
import { useProject } from '../../../context/ProjectContext';

export default function RequirementSummaryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { responseData, patchNewProject } = useProject();
  const startDate = new Date(); // 예: 2025-09-23T23:10:00+09:00

  // 숫자만 뽑기
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

  const STORAGE_KEY = 'request_write_draft_v1'; // 작성 초안 키
  const AI_THREAD_KEY = `ai_req_thread_v1:${id}`; // AI 질문 스레드 키

  const onSubmit = async () => {
    try {
      await patchNewProject(id);

      // ★ 제출 성공 시 로컬 임시 저장본 제거
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(AI_THREAD_KEY);
        localStorage.removeItem('draftProjectId');
        localStorage.removeItem('draftCategoryId');
        localStorage.removeItem('draftSavedAt');
      } catch (e) {
        console.error('localStorage remove failed', e);
      }

      navigate('/request/write/complete');
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return (
    <MainLayout>
      <div className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] py-[30px] flex items-center">
        <div className=" w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between">
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
              <div>
                <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                  기간
                </h1>
                <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]">
                  {ymdDot} ~{' '}
                  {String(responseData?.dueDate || '').replaceAll('-', '.')}
                </p>
              </div>
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
              to={`/request/AI-question/${id}`}
              className=" text-[18px] cursor-pointer"
            >
              이전
            </Link>
            <button
              onClick={onSubmit}
              className="bg-[#BDCFFF] px-[17px] py-[8px] rounded-[16px] text-[18px] cursor-pointer"
            >
              제출
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
