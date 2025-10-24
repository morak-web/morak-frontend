import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import closeBtn from '../../../assets/RequestList/close-button.png';
import folderBtn from '../../../assets/Designer/folder.png';
import { useDesigner } from '../../../context/DesignerContext';
import noFileImg from '../../../assets/Designer/no-file.png';

// ✅ 캐릭터 이미지 경로 맞게 수정
import mascotImg from '../../../assets/morak-designer.png';

export default function SubmitRequestModal({ id, submitModalOpen, onClose }) {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false); // ⬅️ 로딩 상태
  const { createResultFile } = useDesigner();

  // 파일 미리보기 URL 관리
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // 배경 스크롤 락 (열릴 때만)
  useEffect(() => {
    if (!submitModalOpen) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [submitModalOpen]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const phase = 'MID';
    try {
      setSubmitting(true); // ⬅️ 로딩 시작
      const created = await createResultFile(id, { phase, description, file });
      alert('결과물 제출 완료!');
      console.log('결과물:', created);
      // onClose?.(); // 제출 후 닫으려면 주석 해제
    } catch (e) {
      console.error(e);
      alert(
        e?.response?.data?.message ||
          e?.response?.data?.error ||
          '업로드 중 오류가 발생했습니다.'
      );
    } finally {
      setSubmitting(false); // ⬅️ 로딩 끝
    }
  };

  const onFileChange = (e) => setFile(e.target.files?.[0] ?? null);

  const handleBackdropClick = () => {
    if (!submitting) onClose?.(); // 업로드 중엔 닫기 금지
  };

  // 포털로 body 최상단 레벨에 그려서 부모 애니메이션과 충돌 줄임
  return createPortal(
    <AnimatePresence initial={false} mode="wait">
      {submitModalOpen && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="modal"
            onClick={(e) => e.stopPropagation()}
            className="w-[80%] h-[85%] rounded-[11px] bg-white px-[35px] py-[27px] flex flex-col"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.18 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between">
              <h1 className="text-[20px] font-bold">결과물 제출하기</h1>
              <button
                className="cursor-pointer disabled:opacity-60"
                onClick={onClose}
                aria-label="닫기"
                disabled={submitting}
              >
                <img
                  src={closeBtn}
                  alt="closeBtn"
                  className="w-[20px] h-[20px]"
                />
              </button>
            </div>

            <form
              onSubmit={onSubmit}
              className="relative w-[100%] h-[100%] flex flex-col pr-[36px]" // ⬅️ relative: 오버레이 기준
            >
              {/* ⬇️ 업로드 오버레이: 폼 영역만 덮음 */}
              {submitting && (
                <motion.div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  aria-live="polite"
                  aria-busy="true"
                  role="status"
                >
                  <motion.img
                    src={mascotImg}
                    alt="업로드 중"
                    className="w-[120px] h-[120px] drop-shadow-lg select-none pointer-events-none"
                    draggable={false}
                    animate={{ y: [0, -14, 0] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <div className="mt-3 text-[14px] sm:text-[15px] font-semibold text-[#525466]">
                    업로드 중입니다…
                  </div>
                </motion.div>
              )}

              <div className="bg-[#D9D9D9] w-[100%] h-[1px] mt-[15px]" />

              <div className="w-[100%] h-[100%] flex flex-col ">
                <div className="w-[100%] h-[50%] flex flex-col pl={[2]} gap-[10px] pt-[10px] mb-[28px]">
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
                              src={
                                previewUrl + '#toolbar=0&navpanes=0&scrollbar=0'
                              }
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
                      disabled={submitting}
                    />

                    <div className="w-full flex justify-end">
                      {/* label+input 조합으로 클릭 버그 방지 */}
                      <label
                        className={`inline-flex items-center gap-2 ${submitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <input
                          type="file"
                          accept=".png,application/pdf"
                          onChange={onFileChange}
                          className="sr-only"
                          disabled={submitting}
                        />
                        <img
                          src={folderBtn}
                          alt="파일 선택"
                          className="w-[22px] h-[22px]"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="w-[234px] h-[38px] rounded-[16px] bg-[#BDCFFF] text-[16px] flex items-center justify-center self-end cursor-pointer disabled:opacity-60"
              >
                결과물 제출하기
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
