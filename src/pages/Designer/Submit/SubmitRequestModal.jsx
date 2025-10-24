import { useState, useEffect, useMemo } from 'react';
import closeBtn from '../../../assets/RequestList/close-button.png';
import folderBtn from '../../../assets/Designer/folder.png';
import { useDesigner } from '../../../context/DesignerContext';
import noFileImg from '../../../assets/Designer/no-file.png';

const MAX_INLINE_FILE_SIZE = 3 * 1024 * 1024; // 3MB 이하면 base64로 저장

export default function SubmitRequestModal({ id, submitModalOpen, onClose }) {
  // 언마운트되어도 복원 가능하게 localStorage 사용
  const STORAGE_KEY = useMemo(
    () => `submit_result_draft_v1:${id ?? 'unknown'}`,
    [id]
  );

  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null); // 실제 File 객체
  const [previewUrl, setPreviewUrl] = useState(null); // ObjectURL
  const [hydrated, setHydrated] = useState(false);
  const [largeFileMeta, setLargeFileMeta] = useState(null);

  const { createResultFile } = useDesigner();

  // -------- localStorage 유틸 --------
  const saveLocal = (draft) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {}
  };
  const loadLocal = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  const clearLocal = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const fileToDataURL = (f) =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(f);
    });
  const dataURLToFile = (dataUrl, name, type) => {
    try {
      const [meta, b64] = dataUrl.split(',');
      const mime =
        type || meta.match(/:(.*?);/)?.[1] || 'application/octet-stream';
      const bin = atob(b64);
      const u8 = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      return new File([u8], name || 'restored', { type: mime });
    } catch {
      return null;
    }
  };

  // -------- 최초 마운트/ID 변경 시 복원 --------
  useEffect(() => {
    const saved = loadLocal();
    if (saved) {
      setDescription(saved.description ?? '');
      if (saved.file?.inlined && saved.file?.dataUrl) {
        const restored = dataURLToFile(
          saved.file.dataUrl,
          saved.file.name,
          saved.file.type
        );
        if (restored) setFile(restored);
      } else if (saved.file?.meta) {
        setLargeFileMeta(saved.file.meta);
      }
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [STORAGE_KEY]); // 라우트로 id 바뀌어도 해당 초안 복원

  // -------- 미리보기 ObjectURL 관리 --------
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // -------- 설명 변경 시 저장 --------
  useEffect(() => {
    if (!hydrated) return;
    const saved = loadLocal() || {};
    saveLocal({ ...saved, description, savedAt: new Date().toISOString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, hydrated]);

  // -------- 파일 변경 시 저장 --------
  useEffect(() => {
    if (!hydrated) return;
    (async () => {
      const saved = loadLocal() || {};
      if (!file) {
        setLargeFileMeta(null);
        saveLocal({ ...saved, file: null, savedAt: new Date().toISOString() });
        return;
      }
      if (file.size <= MAX_INLINE_FILE_SIZE) {
        const dataUrl = await fileToDataURL(file);
        saveLocal({
          ...saved,
          file: {
            inlined: true,
            name: file.name,
            type: file.type,
            size: file.size,
            dataUrl,
          },
          savedAt: new Date().toISOString(),
        });
        setLargeFileMeta(null);
      } else {
        const meta = {
          name: file.name,
          type: file.type,
          size: file.size,
          note: '파일이 커서 메타만 저장됨. 다시 선택 필요',
        };
        saveLocal({
          ...saved,
          file: { inlined: false, meta },
          savedAt: new Date().toISOString(),
        });
        setLargeFileMeta(meta);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, hydrated]);

  // -------- 핸들러 --------
  const onFileChange = (e) => setFile(e.target.files?.[0] ?? null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const phase = 'MID';
    try {
      if (!file && largeFileMeta) {
        alert(
          '큰 파일은 메타만 저장되어 있습니다. 실제 파일을 다시 선택해주세요.'
        );
        return;
      }
      const created = await createResultFile(id, { phase, description, file });
      console.log('결과물:', created);
      alert('결과물 제출 완료!');
      // 성공 시 초안 삭제(원하면 유지도 가능)
      clearLocal();
      // onClose?.();
    } catch (e) {
      console.error(e);
      alert(
        e?.response?.data?.message ||
          e?.response?.data?.error ||
          '업로드 중 오류가 발생했습니다.'
      );
    }
  };

  return (
    // 모달은 항상 마운트(라우트 이동 후 돌아와도 복원됨). 화면에만 숨김 처리.
    <div
      onClick={onClose}
      style={{ display: submitModalOpen ? 'flex' : 'none' }}
      className="fixed inset-0 z-50 min-w-screen min-h-screen bg-[#0101015e] justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[85%] rounded-[11px] bg-white px-[35px] py-[27px] flex flex-col"
      >
        <div className="flex justify-between">
          <h1 className="text-[20px] font-bold">결과물 제출하기</h1>
          <button className="cursor-pointer" onClick={onClose}>
            <img src={closeBtn} alt="closeBtn" className="w-[20px] h-[20px]" />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="w-[100%] h-[100%] flex flex-col pr-[36px]"
        >
          <div className="bg-[#D9D9D9] w-[100%] h-[1px] mt-[15px]" />
          <div className="w-[100%] h-[100%] flex flex-col ">
            <div className="w-[100%] h-[50%] flex flex-col pl-[2%] gap-[10px] pt-[10px] mb-[28px]">
              <div className="w-full h-full mt-[15px]">
                <div className="w-full h-[300px] flex justify-center items-center">
                  {file ? (
                    <div className="w-full h-[300px] flex flex-col justify-center items-center">
                      {file.type === 'image/png' ? (
                        <img
                          src={previewUrl}
                          alt="미리보기"
                          className="w-[1047px] h-[290px] object-contain"
                        />
                      ) : file.type === 'application/pdf' ? (
                        <embed
                          src={previewUrl + '#toolbar=0&navpanes=0&scrollbar=0'}
                          type="application/pdf"
                          className="w-[1047px] h-[290px]"
                        />
                      ) : (
                        <p>지원하지 않는 형식</p>
                      )}
                      <div className="text-sm text-gray-500 mt-2">
                        {file.name}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[13px] items-center justify-center">
                      <img
                        src={noFileImg}
                        alt="noFileImg"
                        className="w-[107px] h-[107px]"
                      />
                      <h1 className="text-center text-[16px] text-[#525466] font-light">
                        결과 파일을
                        <br /> 업로드해주세요!
                      </h1>
                      {largeFileMeta && (
                        <div className="text-xs text-gray-500 mt-2 text-center">
                          {largeFileMeta.name} (
                          {Math.round(largeFileMeta.size / 1024)} KB)
                          <br />
                          {largeFileMeta.note}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-[100%] h-[250px]">
              <div className="w-[100%] h-[100%] bg-[#F7F8FC] rounded-[30px] px-[30px] pt-[30px] pb-[20px] ">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="outline-none h-[80%] w-[100%] flex items-center resize-none overflow-y-auto custom-scrollbar mb-[10px]"
                  placeholder="디자인 설명을 자유롭게 작성해주세요!"
                />
                <div className="w-full flex justify-end relative cursor-pointer">
                  <input
                    type="file"
                    accept=".png,application/pdf"
                    onChange={onFileChange}
                    className="z-10 absolute w-[22px] h-[22px] text-transparent cursor-pointer"
                    title="파일 선택"
                  />
                  <button
                    type="button"
                    className="absolute cursor-pointer"
                    aria-label="파일 선택"
                  >
                    <img
                      src={folderBtn}
                      alt="folderBtn"
                      className="w-[22px] h-[22px]"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-[234px] h-[38px] rounded-[16px] bg-[#BDCFFF] text-[16px] flex items-center justify-center self-end cursor-pointer"
          >
            결과물 제출하기
          </button>
        </form>
      </div>
    </div>
  );
}
