import MainLayout from '../../../../components/layout/MainLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DownLoadModal from './Payment/DownloadModal';
import { useAIFeedback } from '../../../../context/AIFeedbackContext';
import { useProject } from '../../../../context/ProjectContext';
import noFileImg from '../../../../assets/Designer/no-file.png';

function FilePreview({ url }) {
  if (!url) {
    return (
      <div className="w-full h-full flex-col gap-[10px] flex items-center justify-center">
        <img src={noFileImg} alt="no file" className="w-[200px] opacity-70" />
        <p className="text-[18px] text-[#525466]">
          아직 파일이 업로드되지 않았습니다!
        </p>
      </div>
    );
  }

  const safeUrl = encodeURI(url); // ★ 공백/한글 인코딩
  const ext = safeUrl.split('?')[0].split('.').pop()?.toLowerCase();
  const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'].includes(
    ext
  );
  const isPdf = ext === 'pdf';

  if (isImage) {
    return (
      <img
        src={safeUrl}
        alt="미리보기"
        className="w-full h-full object-contain"
        onError={() => console.error('[preview] 이미지 로드 실패:', safeUrl)}
      />
    );
  }
  if (isPdf) {
    return (
      <iframe
        title="PDF 미리보기"
        src={safeUrl}
        className="w-full h-full"
        onError={() => console.error('[preview] PDF 로드 실패:', safeUrl)}
      />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center text-[#525466]">
      미리보기를 지원하지 않는 파일 형식입니다.
    </div>
  );
}

export default function FinalFeedbackPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // AI Feedback
  // result file
  const { finalAIFeedback, fetchAIFeedback } = useAIFeedback();
  const { finalResultFile, fetchResultFile } = useProject();
  useEffect(() => {
    fetchAIFeedback(id, 'FINAL');
    fetchResultFile(id, 'FINAL');
  }, []);
  console.log(finalResultFile);

  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  return (
    <MainLayout>
      <div className="bg-[#F2F3FA] py-[30px] w-full min-h-[calc(100vh-64px)] flex flex-col justify-center items-center">
        <div className="flex flex-col w-[95%] h-[780px] bg-white rounded-[11px] p-[26px] gap-[2%]">
          <div className="w-full h-[360px]">
            <FilePreview url={finalResultFile?.fileUrl} />
          </div>
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
            </div>
            <div className="flex flex-col h-full justify-between w-[48%]">
              <div className="h-[85%] flex flex-col gap-[10px]">
                <h1 className="text-[20px] font-medium">디자이너 설명</h1>
                <div className="overflow-y-auto max-h-[100%] custom-scrollbar pr-[20px]">
                  <p className="text-[#525466] text-[16px]">
                    {finalResultFile?.description ? (
                      finalResultFile?.description
                    ) : (
                      <p className="text-[#52546683]">
                        아직 설명이 업로드되지 않았습니다.
                      </p>
                    )}
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
                <a
                  href={finalResultFile?.fileUrl}
                  target="_blank"
                  rel="noopener"
                  className="bg-[#6072FF] w-[220px] h-[40px] text-white text-[11px] sm:text-[16px] rounded-[20px] py-[11px] cursor-pointer flex justify-center items-center"
                  onClick={() => {
                    setDownloadModalOpen(true);
                  }}
                >
                  결과물 다운로드
                </a>
                <DownLoadModal
                  downloadModalOpen={downloadModalOpen}
                  onClose={() => setDownloadModalOpen(false)}
                  id={id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
