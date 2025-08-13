import { useNavigate, useParams } from 'react-router-dom';
import clientImg from '../../../assets/RequestList/designer1.png';
export default function MatchingCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="bg-[#EAECF5] w-[100%] min-h-[230px] rounded-[10px] flex">
      {/* left content */}
      <div className="w-[75%] px-[27px] py-[25px]">
        <h1 className="text-[#525466] text-[18px] mb-[19px]">
          퍼스널 헬스케어 플랫폼
        </h1>
        <div className="text-[#525466] text-[13px] flex mb-[13px]">
          <div className="flex gap-[5px]">
            <p className="font-medium">예산</p>
            <p>3,000,000</p>
          </div>
          <p className="mx-[19px]">|</p>
          <div className="flex gap-[5px]">
            <p className="font-medium">예상 기간 </p>
            <p>50일</p>
          </div>
        </div>
        <div className="text-[#525466] text-[13px] flex flex-col">
          <p>(요약 요구사항)</p>
          <p>
            모바일 앱 초기 UI 구성안 필요해요. 헬스케어 앱이고 직관적인 UX, 밝고
            신뢰감 있는 색감으로 부탁드려요!
          </p>
        </div>
        <div className="text-[#525466] text-[10px] flex gap-[5px] justify-end">
          <p>등록일자</p>
          <p>2025. 08. 04</p>
        </div>
        {/* map으로 처리하기 */}
        <div className="text-[#525466] text-[12px] flex gap-[7px]">
          <div className="bg-white rounded-[10px] px-[7px] py-[4px]">웹</div>
          <div className="bg-white rounded-[10px] px-[7px] py-[4px]">앱</div>
        </div>
      </div>
      {/* right content */}
      <div className="w-[25%] border-l-[1px] border-[#52546648] flex flex-col justify-between px-[18px] my-[14px]">
        <button
          className="w-[56px] h-[24px] rounded-[10px] bg-white border-[1px] border-[#0000007a] text-[10px] text-[#525466] self-end cursor-pointer"
          onClick={
            () => navigate(`/designer-page/project`)
            // navigate(`/designer-page/project-matching-wait/project/${id}`)
          }
        >
          상세보기
        </button>
        <div className="h-[44px] bg-white rounded-[10px] flex justify-center py-[9px] gap-[6px]">
          <img src={clientImg} alt="clientImg" className="w-[27px] h-[27px]" />
          <h1 className="text-[#525466] text-[12px] self-start">김모락</h1>
          <div className="text-[#525466] text-[10px] bg-[#EAECF5] rounded-[10px] px-[8px] h-[15px] mt-[1px]">
            클라이언트
          </div>
        </div>
      </div>
    </div>
  );
}
