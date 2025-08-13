import { useState, useRef, useEffect } from 'react';
import closeBtn from '../../../assets/Designer/close-button.png';
import plusBtn from '../../../assets/Designer/plus.png';
import folderBtn from '../../../assets/Designer/folder.png';

export default function FinalSubmitModal({ finalModalOpen, onClose }) {
  if (!finalModalOpen) return null;
  const [isActiveIdx, setIsActiveIdx] = useState(null);
  const [imgWrapper, setImgWrapper] = useState([{}]);

  const handleAddImg = () => {
    setImgWrapper((prev) => [...prev, {}]);
  };
  const removeImg = (removeIdx) => {
    setImgWrapper((prev) => prev.filter((_, idx) => idx !== removeIdx));
  };

  const containerRef = useRef();
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    // 부드럽게 스크롤
    container.scrollTo({
      left: container.scrollWidth,
      behavior: 'smooth',
    });
  }, [imgWrapper]);
  return (
    <div
      onClick={onClose}
      className=" fixed inset-0 z-50  min-w-screen min-h-screen bg-[#0101015e] justify-center items-center flex"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[85%] rounded-[11px] bg-white px-[35px] py-[27px] flex flex-col"
      >
        <div className="flex justify-between">
          <h1 className="text-[20px] font-bold">최종 결과 제출</h1>
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
          <div className="bg-[#D9D9D9] w-[100%] h-[1px] mt-[14px] mb-[27px]"></div>
          <div className="w-[100%] h-[100%] flex flex-col ">
            {/* 미리보기 사진 */}
            <div className="w-[100%] h-[342px] flex flex-col pl-[2%] gap-[10px] pt-[10px] mb-[48px]">
              <p className="text-[16px] text-[#525466] mb-[38px]">
                미리보기 사진 - 최대 4장 업로드
              </p>
              <div className="w-[100%] h-[100%] flex justify-between gap-[10px]">
                <div
                  className="w-[100%] h-[280px] flex overflow-x-auto  custom-scrollbar gap-[26px]"
                  ref={containerRef}
                >
                  {imgWrapper.map((item, idx) => (
                    <div
                      {...item}
                      key={idx}
                      className="w-[270px] h-[250px] bg-[#DFE1ED] rounded-[10px] shrink-0 relative cursor-pointer "
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsActiveIdx(idx);
                      }}
                    >
                      {idx === isActiveIdx && (
                        <button
                          className="w-[130px] h-[45px] bg-white rounded-[20px] text-[14px] text-[#525466] flex justify-center items-center shadow-lg absolute bottom-13 right-[-40px] z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          사진 업로드
                        </button>
                      )}
                      <button
                        className="w-[14px] h-[16px] absolute right-3 top-3 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImg(idx);
                        }}
                      >
                        <img src={closeBtn} alt="closeBtn" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddImg}
                    className="cursor-pointer h-[100%] flex-shrink-0"
                  >
                    <img
                      src={plusBtn}
                      alt="plusBtn"
                      className="w-[37px] h-[37px]"
                    />
                  </button>
                </div>
              </div>
            </div>
            {/* 디자인 설명 */}
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
