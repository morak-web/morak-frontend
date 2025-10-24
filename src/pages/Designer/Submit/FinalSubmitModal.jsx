import { useState, useEffect } from 'react';
import closeBtn from '../../../assets/Designer/close-button.png';
import folderBtn from '../../../assets/Designer/folder.png';
import { useDesigner } from '../../../context/DesignerContext';
import noFileImg from '../../../assets/Designer/no-file.png';

const MAX_INLINE_IMAGE = 1.5 * 1024 * 1024; // 1.5MB 이하 이미지만 저장

export default function FinalSubmitModal({ id, finalModalOpen, onClose }) {
  if (!finalModalOpen) return null;

  const DRAFT_KEY = `finalSubmit:desc:${id}:v1`; // 설명 캐시
  const FILE_KEY = `finalSubmit:file:${id}:v1`; // 이미지 캐시(작은 것만)

  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { createResultFile } = useDesigner();

  // 설명 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (typeof saved === 'string') setDescription(saved);
    } catch {}
  }, [DRAFT_KEY]);

  // 설명 변경 시 즉시 저장
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, description || '');
    } catch {}
  }, [description, DRAFT_KEY]);

  // 파일 복원 (작은 이미지인 경우에만)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(FILE_KEY);
      if (!raw) return;
      const cached = JSON.parse(raw);
      if (!cached?.dataUrl || !cached?.name || !cached?.type) return;
      // DataURL → File 재구성
      const f = dataURLToFile(cached.dataUrl, cached.name, cached.type);
      setFile(f);
      const blobUrl = URL.createObjectURL(f);
      setPreviewUrl(blobUrl);
      return () => URL.revokeObjectURL(blobUrl);
    } catch {}
  }, [FILE_KEY]);

  // 새 파일 선택 → 미리보기 + (작은 이미지면) 캐시 저장
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const save = async () => {
      try {
        // 이미지이면서 용량 제한 이하면 DataURL 저장
        if (file.type.startsWith('image/') && file.size <= MAX_INLINE_IMAGE) {
          const dataUrl = await fileToDataURL(file);
          localStorage.setItem(
            FILE_KEY,
            JSON.stringify({
              name: file.name,
              type: file.type,
              size: file.size,
              dataUrl,
              updatedAt: Date.now(),
            })
          );
        } else {
          // 용량 크거나 이미지가 아니면, 캐시는 지우고 파일명만 유지하고 싶다면 여기에 별도 저장 가능
          localStorage.removeItem(FILE_KEY);
        }
      } catch {}
    };
    save();

    return () => URL.revokeObjectURL(url);
  }, [file, FILE_KEY]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const phase = 'FINAL';
    try {
      const created = await createResultFile(id, { phase, description, file });
      alert('결과물 제출 완료!');
      console.log(created);
      // 제출 후에도 캐시 삭제하지 않음 → 다시 열어도 그대로 보임
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const onFileChange = (e) => setFile(e.target.files?.[0] ?? null);

  return (
    <div
      onClick={onClose}
      className=" fixed inset-0 z-50 min-w-screen min-h-screen bg-[#0101015e] justify-center items-center flex"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[85%] rounded-[11px] bg-white px-[35px] py-[27px] flex flex-col"
      >
        <div className="flex justify-between">
          <h1 className="text-[20px] font-bold">결과물 제출하기</h1>
          <button className="cursor-pointer">
            <img
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
              className="w-[20px] h-[20px]"
            />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="w-[100%] h-[100%] flex flex-col pr-[36px]"
        >
          <div className="bg-[#D9D9D9] w-[100%] h-[1px] mt-[15px]"></div>

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
                        최종 결과 파일을
                        <br /> 업로드해주세요!
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-[100%] h-[250px]">
              <div className="w-[100%] h-[100%] bg-[#F7F8FC] rounded-[30px] px-[30px] pt-[30px] pb-[20px] ">
                <textarea
                  type="text"
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
                  />
                  {/* 기본 submit 방지 위해 type="button"만 추가 (디자인 변화 없음) */}
                  <button type="button" className="absolute cursor-pointer">
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
            className="w-[234px] h-[38px] rounded-[16px] bg-[#6072FF] text-[16px] text-white flex items-center justify-center self-end cursor-pointer"
          >
            최종 결과 제출
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}
function dataURLToFile(dataUrl, fileName, mimeType) {
  const byteString = atob(dataUrl.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new File([ab], fileName, { type: mimeType });
}
