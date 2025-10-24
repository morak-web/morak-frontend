import closeBtn from '../../../assets/RequestList/close-button.png';
import plusBtn from '../../../assets/Designer/plus.png';
import PortfolioCard from '../../../components/Designer/Portfolio/PortfolioCard';
import { useState, useRef, useEffect, useCallback } from 'react';

const LS_KEY = 'designer_portfolio_cards_persist_v3';

const newCard = () => ({
  id:
    crypto?.randomUUID?.() ??
    String(Date.now()) + Math.random().toString(16).slice(2),
  title: '',
  description: '',
  link: '',
  images: [], // DataURL(Base64)
});

export default function DesignerPortfolioModal({
  portfolioModalOpen,
  onClose,
}) {
  if (!portfolioModalOpen) return null;

  // 1) 첫 렌더에서 localStorage "동기" 복원 (lazy init)
  const [cards, setCards] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return [newCard()];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [newCard()];
    } catch {
      return [newCard()];
    }
  });

  // 2) ★ 마운트 직후 1회 저장은 "건너뛰기" — 기존 데이터 덮어쓰기 방지
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return; // ← 첫 저장 skip
    }
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(cards));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [cards]);

  // (선택) 탭 간 동기화
  useEffect(() => {
    const handler = (e) => {
      if (e.key === LS_KEY && e.newValue) {
        try {
          const next = JSON.parse(e.newValue);
          if (Array.isArray(next)) setCards(next);
        } catch {}
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // 카드 조작
  const handleAddCard = useCallback(() => {
    setCards((prev) => [...prev, newCard()]);
  }, []);

  const removeCard = useCallback((removeIndex) => {
    setCards((prev) => {
      const next = prev.filter((_, idx) => idx !== removeIndex);
      return next.length > 0 ? next : [newCard()];
    });
  }, []);

  const updateCard = useCallback((index, patch) => {
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, ...patch } : c))
    );
  }, []);

  // 카드 추가 시 스크롤
  const containerRef = useRef(null);
  const prevCountRef = useRef(cards.length);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (cards.length > prevCountRef.current) {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    }
    prevCountRef.current = cards.length;
  }, [cards]);

  // 배경 클릭으로 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 min-w-screen min-h-screen bg-[#0101015e] justify-center items-center flex"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[63%] rounded-[11px] bg-white px-[45px] py-[27px] flex flex-col gap-[20px]"
      >
        <div className="flex justify-between">
          <h1 className="text-[20px] font-bold">포트폴리오 등록/관리</h1>
          <button className="cursor-pointer" onClick={onClose}>
            <img src={closeBtn} alt="closeBtn" className="w-[20px] h-[20px]" />
          </button>
        </div>

        <div
          className="w-full overflow-x-auto custom-scrollbar flex pb-[30px] gap-[47px] px-[10px] pt-[20px]"
          ref={containerRef}
        >
          {cards.map((item, idx) => (
            <PortfolioCard
              key={item.id ?? idx}
              data={item} // controlled
              onChange={(patch) => updateCard(idx, patch)} // 상위에 즉시 반영 → 저장 트리거
              removeCard={() => removeCard(idx)}
            />
          ))}

          <button
            type="button"
            onClick={handleAddCard}
            className="cursor-pointer flex-shrink-0 h-[400px] aspect-[1/1] rounded-xl  grid place-content-center"
            title="포트폴리오 카드 추가"
          >
            <img src={plusBtn} alt="plusBtn" className="w-[37px] h-[37px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
