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

  const onSubmit = async () => {
    try {
      await patchNewProject(id);
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
                {responseData?.budgetEstimate.toLocaleString()} 원
              </p>
            </div>
            <div>
              <div>
                <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                  기간
                </h1>
                <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]">
                  {ymdDot} ~ {responseData?.dueDate.replaceAll('-', '.')}
                </p>
              </div>
            </div>
            <div>
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                상세 요구 사항
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]">
                {/* -주요기능 [사용자의 건강 데이터를 통합 관리하고, 목표 달성을
                지원하는 퍼스널 헬스케어 플랫폼] 건강 상태 트래킹 (예: 수면,
                운동, 심박수, 혈압 등) 건강 목표 설정 및 진행률 확인 맞춤형 건강
                피드백 및 알림 제공 식단 및 물 섭취 기록 기능 타겟 사용자:
                20~50대 남녀, 건강을 꾸준히 관리하고자 하는 일반인 및 헬스케어
                관심층 -톤앤매너 밝고 신뢰감 있는 색감 사용 (예: 화이트 배경
                중심에 블루/민트 계열 포인트 컬러) 너무 병원스럽지 않되,
                전문성과 안정감이 느껴지는 스타일 전체적으로 클린하고 여백이 잘
                살아있는 UI 요청드립니다 -UX 원칙 사용자가 처음 접해도 쉽게
                이해하고 사용할 수 있도록 직관적인 구조로 설계해주세요 정보의
                계층 구조가 명확하고, 손가락 조작(터치/스크롤)이 자연스러운
                흐름으로 구성되어야 합니다 자주 사용하는 기능은 하단 탭바 또는
                메인화면 상단에 고정하여 접근성을 높여주세요 피드백이나 알림은
                부드러운 애니메이션 또는 아이콘 강조로 거부감 없이 전달되게 구성
                바랍니다 */}
                {responseData?.userRequirements}
              </p>
            </div>
            <div>
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                모집 요건
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px]">
                {responseData?.designerRequirements}
              </p>
            </div>
            <div className="mb-[24px]">
              <h1 className="text-[#525466] text-[17px] border-b-[1px] border-[#5254665e] pb-[4px]">
                참고 자료
              </h1>
              <p className="text-[#525466] text-[13px] pb-[23px] border-b-[1px] border-[#5254665e] pl-[7px] pt-[9px] flex">
                <img
                  src={folderImg}
                  alt="folderImg"
                  className="w-[16px] h-[15px] mr-[2px]"
                />
                퍼스널 헬스케어 플랫폼 레퍼런스.zip{' '}
              </p>
              <p className="text-[#A9A9A9] text-[12px] text-end mt-[2px]">
                내용을 수정하려면 이전으로 돌아가주세요.
              </p>
            </div>
            <div className="relative">
              <h1 className="text-[#525466] text-[16px] mb-[6px]">
                의뢰 내용을 바탕으로 요약했습니다!
              </h1>
              <textarea className="w-[100%] h-[227px] bg-[#F7F8FC] rounded-[20px] resize-none py-[26px] px-[31px] text-[#525466] text-[15px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694] mb-[56px]"></textarea>
              <p className="text-[#A9A9A9] text-[12px] absolute right-5 bottom-20">
                요약문을 확인하고 제출 버튼을 눌러주세요.
              </p>
            </div>
          </div>
          {/* 이전, 다음 버튼 */}
          <div className="flex justify-between items-center">
            <Link
              to={`/request/AI-question/${id}`}
              className=" text-[18px] cursor-pointer"
            >
              이전
            </Link>
            <button
              onClick={onSubmit}
              className="bg-[#BDCFFF] px-[17px] py-[8px] rounded-[8px] text-[18px] cursor-pointer"
            >
              제출
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
