import MainLayout from '../../../../components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DownLoadModal from './Payment/DownloadModal';
import { useAIFeedback } from '../../../../context/AIFeedbackContext';
import { useParams } from 'react-router-dom';

export default function FinalFeedbackPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { finalAIFeedback, fetchAIFeedback } = useAIFeedback();
  useEffect(() => {
    fetchAIFeedback(id, 'FINAL');
  }, []);
  console.log(finalAIFeedback);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  return (
    <MainLayout>
      <div className="bg-[#F2F3FA] py-[30px] w-full min-h-[calc(100vh-64px)] flex flex-col justify-center items-center">
        <div className="flex flex-col w-[95%] h-[780px] bg-white rounded-[11px] p-[26px] gap-[2%]">
          <div className="bg-red-200 h-[49%]">사진</div>
          <div className="flex justify-between h-[49%]">
            <div className="flex flex-col w-[48%] h-full justify-between gap-[10px]">
              <div className="flex flex-col gap-[10px] h-[100%]">
                <h1 className="text-[#6072FF] text-[20px]  font-medium">
                  AI 설명
                </h1>
                <div className="overflow-y-auto max-h-[100%] custom-scrollbar pr-[20px]">
                  <p className="text-[#525466] text-[16px]">
                    {finalAIFeedback?.content}
                  </p>
                </div>
              </div>
              {/* <div className="flex flex-col gap-[10px] h-[35%]">
                <h1 className="text-[#6072FF] text-[20px]  font-medium">
                  AI 요약
                </h1>
                <div className="overflow-y-auto max-h-[100%] custom-scrollbar pr-[20px]">
                  <ul className="text-[16px] list-disc pl-[20px]">
                    <li className="">
                      "사용자 흐름에 맞춘 직관적 레이아웃과 낮은 시각 피로도를
                      고려한 색상 구성입니다."
                    </li>
                    <li>"터치 편의성과 정보 전달 중심의 실용적인 UI입니다."</li>
                    <li>"터치 편의성과 정보 전달 중심의 실용적인 UI입니다."</li>
                    <li>"터치 편의성과 정보 전달 중심의 실용적인 UI입니다."</li>
                    <li>"터치 편의성과 정보 전달 중심의 실용적인 UI입니다."</li>
                  </ul>
                </div>
              </div> */}
            </div>
            <div className="flex flex-col h-full justify-between w-[48%]">
              <div className="h-[85%] flex flex-col gap-[10px]">
                <h1 className="text-[20px] font-medium">디자이너 설명</h1>
                <div className="overflow-y-auto max-h-[100%] custom-scrollbar pr-[20px]">
                  <p className="text-[#525466] text-[16px]">
                    주요 목표는 정보 우선 + 사용 흐름 단순화였습니다.메인 화면
                    첫 진입 시 원하는 기능을 빠르게 선택할 수 있도록 카드형
                    구조로 설계했고, 버튼 크기와 여백을 충분히 주어 터치
                    편의성을 고려했습니다.배경 컬러는 아이보리 톤을 사용해 시각
                    피로를 줄였고, 액션 요소는 브랜드 메인 컬러로 명확히
                    강조했습니다.텍스트가 잘 보이도록 대비를 충분히 주고, 시선
                    유도를 위해 타이포 정렬을 중앙 정렬로 맞췄습니다.버튼은
                    시각적으로 튀지 않으면서도 클릭을 유도할 수 있도록
                    라운드형으로 배치했습니다.주요 목표는 정보 우선 + 사용 흐름
                    단순화였습니다.메인 화면 첫 진입 시 원하는 기능을 빠르게
                    선택할 수 있도록 카드형 구조로 설계했고, 버튼 크기와 여백을
                    충분히 주어 터치 편의성을 고려했습니다.배경 컬러는 아이보리
                    톤을 사용해 시각 피로를 줄였고, 액션 요소는 브랜드 메인
                    컬러로 명확히 강조했습니다.텍스트가 잘 보이도록 대비를
                    충분히 주고, 시선 유도를 위해 타이포 정렬을 중앙 정렬로
                    맞췄습니다.버튼은 시각적으로 튀지 않으면서도 클릭을 유도할
                    수 있도록 라운드형으로 배치했습니다.주요 목표는 정보 우선 +
                    사용 흐름 단순화였습니다.메인 화면 첫 진입 시 원하는 기능을
                    빠르게 선택할 수 있도록 카드형 구조로 설계했고, 버튼 크기와
                    여백을 충분히 주어 터치 편의성을 고려했습니다.배경 컬러는
                    아이보리 톤을 사용해 시각 피로를 줄였고, 액션 요소는 브랜드
                    메인 컬러로 명확히 강조했습니다.텍스트가 잘 보이도록 대비를
                    충분히 주고, 시선 유도를 위해 타이포 정렬을 중앙 정렬로
                    맞췄습니다.버튼은 시각적으로 튀지 않으면서도 클릭을 유도할
                    수 있도록 라운드형으로 배치했습니다.주요 목표는 정보 우선 +
                    사용 흐름 단순화였습니다.메인 화면 첫 진입 시 원하는 기능을
                    빠르게 선택할 수 있도록 카드형 구조로 설계했고, 버튼 크기와
                    여백을 충분히 주어 터치 편의성을 고려했습니다.배경 컬러는
                    아이보리 톤을 사용해 시각 피로를 줄였고, 액션 요소는 브랜드
                    메인 컬러로 명확히 강조했습니다.텍스트가 잘 보이도록 대비를
                    충분히 주고, 시선 유도를 위해 타이포 정렬을 중앙 정렬로
                    맞췄습니다.버튼은 시각적으로 튀지 않으면서도 클릭을 유도할
                    수 있도록 라운드형으로 배치했습니다.
                  </p>
                </div>
              </div>
              <div className="flex justify-end h-[10%] gap-[20px]">
                <button
                  onClick={() => navigate(-1)}
                  className="bg-[#DFE1ED] w-[220px] h-[40px]  text-[#525466] text-[13px] sm:text-[16px] rounded-[20px] py-[11px] cursor-pointer flex justify-center items-center"
                >
                  의뢰 목록 돌아가기
                </button>
                <button
                  className="bg-[#6072FF] w-[220px] h-[40px] text-white text-[11px] sm:text-[16px] rounded-[20px] py-[11px] cursor-pointer flex justify-center items-center"
                  onClick={() => setDownloadModalOpen(true)}
                >
                  결과물 다운로드
                </button>
                <DownLoadModal
                  downloadModalOpen={downloadModalOpen}
                  onClose={() => setDownloadModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
