import closeBtn from '../../../assets/RequestList/close-button.png';
import plusBtn from '../../../assets/Designer/plus.png';
import PortfolioCard from '../../../components/Designer/Portfolio/PortfolioCard';
import { useState, useRef, useEffect } from 'react';

export default function DesignerPortfolioModal({
  portfolioModalOpen,
  onClose,
}) {
  if (!portfolioModalOpen) return null;

  // pf 카드
  const [cards, setCards] = useState([{}]);
  const handleAddCard = () => {
    setCards((prev) => [...prev, {}]);
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
  }, [cards]);
  const removeCard = (removeIndex) => {
    setCards((prev) => prev.filter((_, idx) => idx !== removeIndex));
  };

  return (
    <div
      onClick={onClose}
      className=" fixed inset-0 z-50 min-w-screen min-h-screen bg-[#0101015e] justify-center items-center flex"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[63%] rounded-[11px] bg-white px-[45px] py-[27px] flex flex-col gap-[20px]"
      >
        <div className="flex justify-between ">
          <h1 className="text-[20px] font-bold">포트폴리오 등록/관리</h1>
          <button className="cursor-pointer">
            <img
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
              className="w-[20px] h-[20px]"
            />
          </button>
        </div>
        <div
          className="w-[100%] overflow-x-auto custom-scrollbar flex pb-[30px] gap-[47px] px-[10px] pt-[20px]"
          ref={containerRef}
        >
          {cards.map((item, idx) => (
            <PortfolioCard key={idx} removeCard={() => removeCard(idx)} />
          ))}
          <button
            type="button"
            onClick={handleAddCard}
            className="cursor-pointer flex-shrink-0 h-[400px]"
          >
            <img src={plusBtn} alt="plusBtn" className="w-[37px] h-[37px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
