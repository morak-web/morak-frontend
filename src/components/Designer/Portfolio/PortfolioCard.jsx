import { useState, useEffect } from 'react';
import closeBtn from '../../../assets/RequestList/close-button.png';
import { useDesigner } from '../../../context/DesignerContext';
import noFileImg from '../../../assets/Designer/no-file.png';

export default function PortfolioCard({ removeCard }) {
  const [showImg, setShowImg] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('없음');
  const [tags, setTags] = useState('없음');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { patchDesignerPf, createDesignerPf } = useDesigner();

  const [portfolioId, setPortfolioId] = useState(null); // ★ 생성 후 id 보관 → 이후 PATCH 분기
  const isCreated = !!portfolioId; // ★ 생성 여부 플래그

  const onSubmitPf = async (e) => {
    e.preventDefault();
    try {
      if (!isCreated) {
        // ---------- 첫 제출: POST ----------
        if (!file) {
          alert('포트폴리오 파일을 업로드해주세요.');
          return;
        }

        // POST에선 title + file만 보냄 (description/tags는 무시)
        const created = await createDesignerPf({
          title,
          file,
        });

        if (!created) return;

        // 서버에서 내려주는 id 키에 맞춰 사용 (id or portfolioId 등)
        setPortfolioId(created.id ?? created.portfolioId); // ★ 다음부터 PATCH
        const showUrl = created.fileUrl
          ? `${created.fileUrl}?t=${Date.now()}`
          : null;
        if (showUrl) setPreviewUrl(showUrl);
        console.log(created);
        console.log(showUrl);
        alert('포트폴리오 등록이 완료되었습니다.'); // ★ 성공 알림
        // 옵션: 등록 후 파일 선택 상태 초기화
        // setFile(null);
      } else {
        // ---------- 이후 제출: PATCH ----------
        const payload = {
          title,
          // 빈 문자열로 비우고 싶다면 그대로 전송 (요구사항에 따라 '없음' 대신 ''로 바꿔도 됨)
          description,
          tags,
          // 파일을 바꾼 경우에만 포함 (안 바꾸면 기존 유지)
          ...(file instanceof File ? { file } : {}),
        };

        const updated = await patchDesignerPf(portfolioId, payload);
        if (!updated) return;

        const showUrl = updated.fileUrl
          ? `${updated.fileUrl}?t=${Date.now()}`
          : previewUrl;
        if (showUrl) setPreviewUrl(showUrl);
        console.log(updated);
        console.log(showUrl);
        alert('포트폴리오가 수정되었습니다.'); // ★ 성공 알림
        // 옵션: 수정 후 파일 선택 상태 초기화
        // setFile(null);
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onFileChange = (e) => setFile(e.target.files?.[0] ?? null);

  const onCompleteBtn = () => {
    // ★ 버튼 onClick 알림은 제출 흐름 안에서 처리하므로 별도 알림이 겹치지 않게 비워두는 걸 권장
    // alert('포트폴리오 등록이 완료되었습니다.');
  };

  return (
    <form
      onSubmit={onSubmitPf}
      className="w-[100%] sm:w-[340px] h-[400px] shadow-[4px_4px_10px_#00000024] rounded-[19px] shrink-0 px-[22px] pt-[18px] pb-[23px]"
    >
      {' '}
      <button
        type="button"
        className="w-[100%] flex justify-end cursor-pointer"
        onClick={removeCard}
      >
        {' '}
        <img src={closeBtn} alt="closeBtn" className="w-[15px] h-[15px]" />{' '}
      </button>{' '}
      <div className="mb-[13px]">
        {' '}
        <h1 className="text-[#525466] text-[15px] mb-1">프로젝트명</h1>{' '}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[100%] h-[38px] bg-[#F2F3FA] rounded-[10px] outline-none px-3"
        />{' '}
      </div>{' '}
      <div className="mb-[10px]">
        <h1 className="text-[#525466] text-[15px] mb-1">썸네일 이미지</h1>
        {previewUrl ? (
          <div className="w-full h-[153px] rounded-[10px] flex justify-center items-center border-[1px] border-[#DFE1ED]">
            {/* 이미지인지 PDF인지 판별 */}
            {file?.type?.startsWith?.('image/') ||
            (!file && !previewUrl?.toLowerCase().includes('.pdf')) ? (
              <img
                src={previewUrl}
                alt="미리보기"
                className="w-full h-full object-contain"
              />
            ) : (
              <embed
                src={previewUrl + '#toolbar=0&navpanes=0&scrollbar=0'}
                type="application/pdf"
                className="w-full h-full"
              />
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
              포트폴리오 파일을 <br /> 업로드해주세요!
            </h1>
          </div>
        )}
      </div>
      <input
        type="file"
        accept=".png,application/pdf"
        onChange={onFileChange}
        className="z-10 absolute w-[300px] h-[38px] text-transparent cursor-pointer"
      />{' '}
      <button
        type="button"
        className="w-[100%] h-[38px] rounded-[10px] text-[#525466] text-[14px] shadow-[4px_4px_10px_#00000024] cursor-pointer"
      >
        {' '}
        포트폴리오 파일{' '}
      </button>{' '}
      <button
        type="submit"
        onClick={onCompleteBtn}
        className="mt-[10px] shadow-md rounded-[15px] text-[16px] px-[20px] py-[4px] w-full self-end bg-[#BDCFFF] text-white cursor-pointer"
      >
        {' '}
        완료{' '}
      </button>{' '}
    </form>
  );
}
