import { useState, useEffect } from 'react';
import { useDesigner } from '../../../context/DesignerContext';

export default function SubmitRequestModal({ id, submitModalOpen, onClose }) {
  if (!submitModalOpen) return null;
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const { createResultFile } = useDesigner();
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url); // 누수 방지
  }, [file]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const phase = 'MID';
    try {
      const created = await createResultFile(id, { phase, description, file });
      alert('결과물 제출 완료!');
      console.log(created);
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const onFileChange = (e) => setFile(e.target.files?.[0] ?? null);
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md justify-center items-center flex p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl max-h-[90vh] rounded-3xl bg-white shadow-2xl flex flex-col overflow-hidden animate-scale-in"
      >
        <div className="flex justify-between items-center px-8 py-6 bg-gradient-to-r" style={{ backgroundImage: 'linear-gradient(to right, #0284C7, #0369A1)' }}>
          <h1 className="text-2xl font-bold text-white">결과물 제출하기</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/20 transition-all group"
          >
            <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex-1 flex flex-col px-8 py-6 overflow-y-auto"
        >
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex-1 min-h-[300px]">
              <div className="w-full h-full rounded-2xl border-2 border-dashed border-neutral-300 flex justify-center items-center bg-gradient-to-br from-neutral-50 to-white transition-all group"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#38BDF8'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#D4D4D8'}
              >
                {file ? (
                  <div className="w-full h-full flex flex-col justify-center items-center p-6">
                    {file.type === 'image/png' ? (
                      <img
                        src={previewUrl}
                        alt="미리보기"
                        className="max-w-full max-h-[280px] object-contain rounded-xl shadow-lg"
                      />
                    ) : file.type === 'application/pdf' ? (
                      <embed
                        src={previewUrl + '#toolbar=0&navpanes=0&scrollbar=0'}
                        type="application/pdf"
                        className="w-full h-[280px] rounded-xl shadow-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-error-100 flex items-center justify-center">
                          <svg className="w-8 h-8 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <p className="text-neutral-600 font-medium">지원하지 않는 형식</p>
                      </div>
                    )}
                    <div className="text-sm text-neutral-600 mt-4 font-semibold px-4 py-2 bg-neutral-100 rounded-lg">
                      {file.name}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5 items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: '#E0F2FE' }}>
                      <svg className="w-10 h-10" style={{ color: '#0284C7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h1 className="text-center text-lg font-semibold text-neutral-700">
                      결과 파일을
                      <br /> 업로드해주세요
                    </h1>
                    <p className="text-sm text-neutral-400">PNG, PDF 파일을 지원합니다</p>
                  </div>
                )}
              </div>
            </div>
            <div className="h-60">
              <div className="w-full h-full bg-white rounded-2xl px-6 pt-6 pb-4 border-2 border-neutral-200 transition-all"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#0EA5E9';
                  e.currentTarget.style.boxShadow = '0 0 0 4px #E0F2FE';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E5E5';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <textarea
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="outline-none h-[calc(100%-50px)] w-full resize-none overflow-y-auto custom-scrollbar mb-3 text-base text-neutral-900 placeholder:text-neutral-400 bg-transparent leading-relaxed"
                  placeholder="디자인 설명을 자유롭게 작성해주세요!"
                />
                <div className="w-full flex justify-end relative">
                  <input
                    type="file"
                    accept=".png,application/pdf"
                    onChange={onFileChange}
                    className="z-10 absolute w-12 h-12 opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="p-3 rounded-xl border-2 transition-all group"
                    style={{ backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E0F2FE';
                      e.currentTarget.style.borderColor = '#7DD3FC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F0F9FF';
                      e.currentTarget.style.borderColor = '#BAE6FD';
                    }}
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: '#0284C7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-6 border-t border-neutral-200 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold transition-all"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl text-white font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
              style={{ backgroundImage: 'linear-gradient(to right, #0284C7, #0369A1)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundImage = 'linear-gradient(to right, #0369A1, #075985)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundImage = 'linear-gradient(to right, #0284C7, #0369A1)'}
            >
              결과물 제출하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
