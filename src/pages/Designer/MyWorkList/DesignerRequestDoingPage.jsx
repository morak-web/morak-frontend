import { useState, useEffect } from 'react';
import closeBtn from '../../../assets/RequestList/close-button.png';
import folderBtn from '../../../assets/Designer/folder.png';
import { useDesigner } from '../../../context/DesignerContext';
import noFileImg from '../../../assets/Designer/no-file.png';

export default function SubmitRequestModal({ id, submitModalOpen, onClose }) {
  if (!submitModalOpen) return null;

  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0); // input 리셋용

  const { createResultFile } = useDesigner();

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFile(f);
    // 같은 파일을 다시 선택해도 onChange가 안 뜰 수 있으므로 value 리셋 대비
    // (fileInputKey를 변경하면 input이 리렌더되어 value 초기화)
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return;
    if (!id) {
      alert('프로젝트 ID가 없습니다.');
      return;
    }
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const phase = 'MID'; // 서버 ENUM과 대소문자 일치 필수
    try {
      setUploading(true);
      // 디버그 로그: 실제 선택된 파일
      console.log('[SubmitRequestModal] selected file:', {
        name: file?.name,
        type: file?.type,
        size: file?.size,
      });

      const created = await createResultFile(id, { phase, description, file });
      console.log('결과물 제출 응답:', created);
      alert('결과물 제출 완료!');
      // 입력값 초기화
      setDescription('');
      setFile(null);
      setFileInputKey((k) => k + 1);
      onClose?.();
    } catch (err) {
      console.error('[SubmitRequestModal] submit error:', err);
      alert(err?.message || '제출에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 min-w-screen min-h-screen bg-[#0101015e] justify-center items-center flex"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[85%] rounded-[11px] bg-white px-[35px] py-[27px] flex flex-col"
      >
        <div className="flex justify-between">
          <h1 className="text-[20px] font-bold">결과물 제출하기</h1>
          <button type="button" className="cursor-pointer" onClick={onClose}>
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
                        <br />
                        업로드해주세요!
                      </h1>
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

                {/* 파일 인풋: label-for 패턴 사용 */}
                <input
                  key={fileInputKey}
                  id="result-file-input"
                  type="file"
                  accept="image/png,application/pdf"
                  onChange={onFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="result-file-input"
                  className="inline-flex items-center gap-2 cursor-pointer select-none"
                  title="파일 선택"
                >
                  <img
                    src={folderBtn}
                    alt="folderBtn"
                    className="w-[22px] h-[22px]"
                  />
                  <span className="text-sm text-[#525466]">파일 선택</span>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`w-[234px] h-[38px] rounded-[16px] ${
              uploading ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#DFE1ED]'
            } text-[16px] flex items-center justify-center self-end`}
          >
            {uploading ? '업로드 중…' : '결과물 제출하기'}
          </button>
        </form>
      </div>
    </div>
  );
}
