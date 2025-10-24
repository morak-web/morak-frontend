import { useEffect, useMemo, useState } from 'react';
import closeBtn from '../../../../assets/RequestList/close-button.png';
import { useProject } from '../../../../context/ProjectContext';
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

  if (isImage)
    return (
      <img src={url} alt="미리보기" className="w-full h-full object-contain" />
    );
  if (isPdf)
    return <iframe title="PDF 미리보기" src={url} className="w-full h-full" />;
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

  const PHASE = 'MID';

  // 키는 useMemo로 고정
  const CACHE_KEY = useMemo(
    () => `mid_result_cache_v1:${projectId ?? 'unknown'}:${PHASE}`,
    [projectId]
  );
  const UNKNOWN_KEY = `mid_result_cache_v1:unknown:${PHASE}`;

  // ✅ 첫 렌더 전에 즉시 복원(깜빡임/사라짐 방지)
  const [cached, setCached] = useState(() => {
    try {
      // projectId가 아직 없으면 unknown 키라도 먼저 복원
      const raw =
        localStorage.getItem(
          `mid_result_cache_v1:${projectId ?? 'unknown'}:${PHASE}`
        ) || localStorage.getItem(UNKNOWN_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const { midResultFile, fetchResultFile } = useProject();

  // ✅ projectId가 뒤늦게 생겼다면 unknown → 실제 키로 마이그레이션
  useEffect(() => {
    if (!projectId) return;
    try {
      const raw = localStorage.getItem(UNKNOWN_KEY);
      if (raw && !localStorage.getItem(CACHE_KEY)) {
        localStorage.setItem(CACHE_KEY, raw);
        localStorage.removeItem(UNKNOWN_KEY);
        setCached(JSON.parse(raw));
      }
    } catch {}
  }, [projectId, CACHE_KEY]);

  // 모달 열릴 때: 캐시 유지 + 서버 최신화
  useEffect(() => {
    if (!projectId) return;
    fetchResultFile(projectId, PHASE).catch((e) => {
      console.error('[fetchResultFile]', e?.response?.data || e);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interFeedbackModalOpen, projectId]);

  // 서버 데이터 도착 시 캐시 갱신(새로고침 후에도 유지)
  useEffect(() => {
    if (!midResultFile) return;
    try {
      const snap = {
        fileUrl: midResultFile.fileUrl ?? null,
        description: midResultFile.description ?? '',
        createdAt: midResultFile.createdAt ?? null,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(snap));
      setCached(snap);
    } catch {}
  }, [midResultFile, CACHE_KEY]);

  // 화면 표시 데이터: 서버 응답 우선, 없으면 캐시
  const data =
    midResultFile && (midResultFile.fileUrl || midResultFile.description)
      ? midResultFile
      : cached;

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
            <div className="flex items-end gap-[11px] mr-[1%]">
              <p className="text-[#525466] text-[13px] sm:text-[16px] font-light">
                {(data?.createdAt || '')
                  ?.slice?.(0, 10)
                  ?.replaceAll?.('-', '.') || ''}
              </p>
            </div>
            <div className="flex flex-col justify-end md:flex-row text-[#525466] text-[13px] sm:text-[16px] font-normal ml-[10px] md:ml-[0px] md:gap-[11px] whitespace-nowrap hover:text-black hover:font-bold">
              {data?.fileUrl ? (
                <a target="_blank" rel="noopener" href={data.fileUrl}>
                  파일 다운로드
                </a>
              ) : (
                <span className="opacity-60">파일 다운로드</span>
              )}
            </div>
          </div>

          <div className="bg-[#D9D9D9] w-[100%] h-[1px] my-[10px]" />

          <div className="w-[100%] h-[100%] flex flex-col justify-between">
            <div className="w-[100%]flex flex-col px-[1%]">
              <div className="w-[100%] h-[380px] flex justify-between mb-[10px]">
                <FilePreview url={data?.fileUrl} />
              </div>
              <div className="flex flex-col gap-[11px] h-[240px] overflow-y-auto custom-scrollbar">
                <p className="text-[#525466] text-[16px]">
                  {data?.description || ''}
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
