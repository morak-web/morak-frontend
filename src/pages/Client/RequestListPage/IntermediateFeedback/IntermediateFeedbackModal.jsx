import closeBtn from '../../../../assets/RequestList/close-button.png';
import { useProject } from '../../../../context/ProjectContext';
import { useEffect } from 'react';
import noFileImg from '../../../../assets/Designer/no-file.png';

function FilePreview({ url }) {
  if (!url)
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-[10px]">
        <img
          src={noFileImg}
          alt="no file"
          className="max-w-[200px] opacity-70"
        />
        <p className="text-[18px] text-[#525466]">
          아직 파일이 업로드되지 않았습니다!
        </p>
      </div>
    );

  const ext = url.split('?')[0].split('.').pop()?.toLowerCase();
  const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'].includes(
    ext
  );
  const isPdf = ext === 'pdf';

  if (isImage) {
    return (
      <img src={url} alt="미리보기" className="w-full h-full object-contain" />
    );
  }
  if (isPdf) {
    return <iframe title="PDF 미리보기" src={url} className="w-full h-full" />;
  }
  return (
    <div className="w-full h-full flex items-center justify-center text-[#525466]">
      미리보기를 지원하지 않는 파일 형식입니다.
    </div>
  );
}

export default function IntermediateFeedbackModal({
  interFeedbackModalOpen,
  onClose,
  projectId,
}) {
  if (!interFeedbackModalOpen) return null;

  const { midResultFile, fetchResultFile } = useProject();
  useEffect(() => {
    fetchResultFile(projectId, 'MID');
  }, []);
  console.log(midResultFile);
  return (
    <div
      onClick={onClose}
      className=" fixed inset-0 z-50  min-w-screen min-h-screen bg-[#0101015e] justify-center items-center flex"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[85%] rounded-[11px] bg-white px-[35px] py-[27px] flex flex-col"
      >
        <div className="flex justify-between ">
          <h1 className="text-[20px] mt-[10px] font-bold">
            중간 결과 / 피드백
          </h1>
          <button className="cursor-pointer">
            <img
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
              className="w-[20px] h-[20px]"
            />
          </button>
        </div>
        <div className="w-[100%] h-[100%] flex flex-col pr-[36px]">
          <div className="flex justify-between">
            <div className="flex items-end gap-[11px] mx-[1%]">
              <p className="text-[#525466] text-[13px] sm:text-[16px] font-light">
                {midResultFile?.createdAt?.slice(0, 10).replaceAll('-', '.')}
              </p>
            </div>
            <div className="flex flex-col justify-end md:flex-row text-[#525466] text-[13px] sm:text-[16px] font-normal ml-[10px] md:ml-[0px] md:gap-[11px] whitespace-nowrap hover:text-black hover:font-bold">
              <a target="_blank" rel="noopener" href={midResultFile?.fileUrl}>
                파일 다운로드
              </a>
            </div>
          </div>
          <div className="bg-[#D9D9D9] w-[100%] h-[1px] my-[10px]"></div>
          <div className="w-[100%] h-[100%] flex flex-col justify-between">
            <div className="w-[100%] h-[50%] flex flex-col px-[1%]">
              <div className="w-[100%] h-[100%] flex justify-between mb-[10px]">
                <FilePreview url={midResultFile?.fileUrl} />
              </div>
              <div className="flex flex-col gap-[11px]">
                <p className="text-[#525466] text-[16px]">
                  {midResultFile?.description}
                </p>
              </div>
            </div>
            {/* <div className="w-[100%] h-[45%] px-[1%] flex flex-col justify-end">
              <ChatPage />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
