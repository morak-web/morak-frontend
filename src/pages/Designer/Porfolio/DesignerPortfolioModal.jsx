import closeBtn from '../../../assets/RequestList/close-button.png';
import plusBtn from '../../../assets/Designer/plus.png';
import PortfolioCard from '../../../components/Designer/Portfolio/PortfolioCard';
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

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

  // 1) 첫 렌더에서 localStorage 동기 복원
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

  // 저장 유틸 (즉시 저장)
  const saveNow = useCallback(
    (data = cards) => {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(data));
        return true;
      } catch (e) {
        // 용량 초과 등 오류 가시화
        const msg =
          e?.name === 'QuotaExceededError' ||
          String(e).includes('QuotaExceeded')
            ? '저장 용량이 초과되었습니다. 이미지 용량을 줄이거나 개수를 줄여주세요.'
            : '임시 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
        console.warn('localStorage save failed:', e);
        alert(msg);
        return false;
      }
    },
    [cards]
  );

  // 2) 마운트 직후 1회 저장은 건너뛰기 (기존 데이터 덮지 않기)
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    // 변경될 때마다 저장 (자동 저장)
    saveNow();
  }, [cards, saveNow]);

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

  // ESC로 닫기 + Body 스크롤 잠금 + 언마운트 시 강제 저장
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        saveNow(); // 닫기 전에 저장 시도
        onClose?.();
      }
    };
    window.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // 스크롤 잠금

    // 새로고침/페이지 이탈 시 저장
    const beforeUnload = () => saveNow();
    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('beforeunload', beforeUnload);
      document.body.style.overflow = prevOverflow;

      // 컴포넌트 언마운트 시에도 마지막으로 저장 시도
      saveNow();
    };
  }, [onClose, saveNow]);

  // 배경 클릭으로 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      saveNow(); // 닫기 전에 저장
      onClose?.();
    }
  };

  // 완료(닫기) 버튼도 저장 보장
  const handleCloseClick = () => {
    saveNow();
    onClose?.();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0101015e] backdrop-blur-[1px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] h-[63%] rounded-[11px] bg-white px-[45px] py-[27px] flex flex-col gap-[20px] shadow-lg"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-[20px] font-bold">포트폴리오 등록/관리</h1>
          <button
            className="cursor-pointer"
            onClick={handleCloseClick}
            aria-label="닫기"
          >
            <img src={closeBtn} alt="closeBtn" className="w-[20px] h-[20px]" />
          </button>
        </div>

        <div
          ref={containerRef}
          className="w-full overflow-x-auto custom-scrollbar flex pb-[30px] gap-[47px] px-[10px] pt-[20px]"
        >
          {cards.map((item, idx) => (
            <PortfolioCard
              key={item.id ?? idx}
              data={item}
              onChange={(patch) => updateCard(idx, patch)}
              removeCard={() => removeCard(idx)}
            />
          ))}

          <button
            type="button"
            onClick={handleAddCard}
            className="cursor-pointer flex-shrink-0 h-[400px] aspect-[1/1] rounded-xl grid place-content-center border border-dashed border-[#cfd3e1] hover:border-[#6072FF] transition-colors"
            title="포트폴리오 카드 추가"
          >
            <img src={plusBtn} alt="plusBtn" className="w-[37px] h-[37px]" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
