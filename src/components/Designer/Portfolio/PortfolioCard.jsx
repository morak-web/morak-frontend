import { useState, useEffect } from 'react';
import closeBtn from '../../../assets/RequestList/close-button.png';
import { useDesigner } from '../../../context/DesignerContext';
import noFileImg from '../../../assets/Designer/no-file.png';

export default function PortfolioCard({ removeCard }) {
  const [showImg, setShowImg] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { createDesignerRegister } = useDesigner();
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url); // 누수 방지
  }, [file]);
  const onFileChange = (e) => setFile(e.target.files?.[0] ?? null);
  const onCompleteBtn = () => {
    alert('등록이 완료되었습니다.');
  };

  return (
    <div className="w-[100%] sm:w-[340px] h-[400px]  shadow-[4px_4px_10px_#00000024] rounded-[19px] shrink-0 px-[22px] pt-[18px] pb-[23px]">
      <button
        type="button"
        className="w-[100%] flex justify-end cursor-pointer"
        onClick={removeCard}
      >
        <img src={closeBtn} alt="closeBtn" className="w-[15px] h-[15px]" />
      </button>
      <div className="mb-[13px]">
        <h1 className="text-[#525466] text-[15px] mb-1">프로젝트명</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[100%] h-[38px] bg-[#F2F3FA] rounded-[10px] outline-none px-3"
        />
      </div>
      <div className="mb-[10px]">
        <h1 className="text-[#525466] text-[15px] mb-1">썸네일 이미지</h1>
        {file ? (
          <div className="w-full h-[153px] rounded-[10px] flex justify-center items-center border-[1px] border-[#DFE1ED]">
            {file.type === 'image/png' ? (
              <img
                src={previewUrl}
                alt="미리보기"
                className="w-full h-full  object-contain"
              />
            ) : file.type === 'application/pdf' ? (
              // 간단 프리뷰: 임베드(브라우저 PDF 뷰어)
              <embed
                src={previewUrl + '#toolbar=0&navpanes=0&scrollbar=0'}
                type="application/pdf"
                className="w-full h-full"
              />
            ) : (
              <p>지원하지 않는 형식</p>
            )}
          </div>
        ) : (
          <div className="w-full h-[153px] flex flex-col rounded-[10px] border-[1px] border-[#DFE1ED] gap-[13px] items-center justify-center">
            <img
              src={noFileImg}
              alt="noFileImg"
              className="w-[80px] h-[70px]"
            />
            <h1 className="text-center text-[13px] text-[#525466] font-light">
              포트폴리오 파일을
              <br /> 업로드해주세요!
            </h1>
          </div>
        )}
      </div>
      <input
        type="file"
        accept=".png,application/pdf"
        onChange={onFileChange}
        className="z-10 absolute w-[300px] h-[38px] text-transparent cursor-pointer"
      />
      <button className="w-[100%] h-[38px] rounded-[10px] text-[#525466] text-[14px] shadow-[4px_4px_10px_#00000024] cursor-pointer">
        포트폴리오 파일
      </button>
      <button
        type="button"
        onClick={onCompleteBtn}
        className="mt-[10px] shadow-md rounded-[15px] text-[16px] px-[20px] py-[4px] w-full self-end bg-[#BDCFFF] text-white cursor-pointer"
      >
        완료
      </button>
    </div>
  );
}
