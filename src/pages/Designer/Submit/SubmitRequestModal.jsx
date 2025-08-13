import { useState } from 'react';
import closeBtn from '../../../assets/RequestList/close-button.png';
import moreBtn from '../../../assets/Designer/more.png';
import folderBtn from '../../../assets/Designer/folder.png';

export default function SubmitRequestModal({ submitModalOpen, onClose }) {
  if (!submitModalOpen) return null;
  const [imgUploadBtn, setImgUploadBtn] = useState(false);
  return (
    <div
      onClick={onClose}
      className=" fixed inset-0 z-50  min-w-screen min-h-screen bg-[#0101015e] justify-center items-center flex"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[85%] rounded-[11px] bg-white px-[35px] py-[27px] flex flex-col gap-[4%]"
      >
        <div className="flex justify-between ">
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
        <div className="w-[100%] h-[100%] flex flex-col pr-[36px]">
          <div className="flex items-end md:gap-[11px] mx-[1%] justify-between">
            <input
              type="text"
              className="w-[60%] h-[45px] bg-[#F2F3FA] px-[22px] py-[11px] rounded-[19px] text-[#525466] text-[20px] font-medium outline-none"
            />
            <p className="text-[#525466] text-[13px] sm:text-[16px] font-light">
              2025.08.23
            </p>
          </div>
          <div className="bg-[#D9D9D9] w-[100%] h-[1px] my-[10px]"></div>
          <div className="w-[100%] h-[100%] flex flex-col ">
            <div className="w-[100%] h-[50%] flex flex-col pl-[2%] gap-[10px] pt-[10px] mb-[28px]">
              <p className="text-[16px] text-[#525466]">미리보기 사진</p>
              <div className="w-[100%] h-[100%] flex justify-between gap-[10px]">
                <div className="w-[95%] flex justify-between">
                  <div className="w-[45%] h-[95%] bg-[#DFE1ED] rounded-[10px]"></div>
                  <div className="w-[45%] h-[95%] bg-[#DFE1ED] rounded-[10px]"></div>
                </div>
                <button
                  onClick={() => setImgUploadBtn(!imgUploadBtn)}
                  className="cursor-pointer flex items-start"
                >
                  <img
                    src={moreBtn}
                    alt="moreBtn"
                    className="w-[25px] h-[25px]"
                  />
                </button>
                {imgUploadBtn && (
                  <button className="fixed right-55 top-71 bg-white shadow-lg w-[130px] h-[40px] rounded-[20px] cursor-pointer">
                    <h1 className="text-[#525466] text-[14px]">사진 업로드 </h1>
                  </button>
                )}
              </div>
            </div>
            <div className="w-[100%] h-[33%]">
              <div className="w-[100%] h-[100%] bg-[#F7F8FC] rounded-[30px] px-[30px] pt-[30px] pb-[20px] ">
                <textarea
                  type="text"
                  className="outline-none h-[80%] w-[100%] flex items-center resize-none overflow-y-auto custom-scrollbar mb-[10px]"
                  placeholder="디자인 설명을 자유롭게 작성해주세요!"
                />
                <div className="w-[100%] flex justify-end ">
                  <button>
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
        </div>
      </div>
    </div>
  );
}
