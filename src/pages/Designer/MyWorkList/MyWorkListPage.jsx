import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import rightScrollButton from '../../../assets/Designer/right-scroll-button.png';
import { useDesigner } from '../../../context/DesignerContext';
import morak from '../../../assets/morak2.png';

export default function MyWorkListPage() {
  const doingRef = useRef(null);
  const finishRef = useRef(null);
  const navigate = useNavigate();

  const scrollNext = (ref) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: ref.current.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };
  const scrollPrev = (ref) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: -ref.current.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  // ⬇️ 화살표 노출 제어 상태
  const [doingArrows, setDoingArrows] = useState({ left: false, right: false });
  const [finishArrows, setFinishArrows] = useState({
    left: false,
    right: false,
  });

  const computeArrows = (el) => {
    if (!el) return { left: false, right: false };
    const eps = 1;
    const left = el.scrollLeft > eps;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - eps;
    return { left, right };
  };

  const updateDoingArrows = useCallback(() => {
    const next = computeArrows(doingRef.current);
    setDoingArrows((prev) =>
      prev.left !== next.left || prev.right !== next.right ? next : prev
    );
  }, []);
  const updateFinishArrows = useCallback(() => {
    const next = computeArrows(finishRef.current);
    setFinishArrows((prev) =>
      prev.left !== next.left || prev.right !== next.right ? next : prev
    );
  }, []);

  const { workingList, completeList, fetchDesignerProject } = useDesigner();
  useEffect(() => {
    fetchDesignerProject('WORKING');
    fetchDesignerProject('COMPLETE');
  }, []);

  // 리스트 변경/리사이즈/초기 진입 시 갱신
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      updateDoingArrows();
      updateFinishArrows();
    });
    const onResize = () => {
      updateDoingArrows();
      updateFinishArrows();
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [workingList, completeList, updateDoingArrows, updateFinishArrows]);

  const STATUS = { WORKING: '작업 중', COMPLETE: '완료' };

  return (
    <div className="bg-white w-[95%] min-h-[710px] rounded-[11px] px-[36px] py-[33px] flex flex-col gap-[34px]">
      {/* 진행 중 프로젝트 */}
      <section className="h-[47%] w-full flex flex-col gap-[26px] relative">
        <h1 className="text-[16px] font-medium">진행 중 프로젝트</h1>

        <div
          ref={doingRef}
          onScroll={updateDoingArrows}
          className="w-full pl-[13px] h-full flex items-start overflow-x-auto scroll-smooth no-scrollbar gap-[48px]"
        >
          {workingList.map((item) => (
            <div
              key={item.projectId}
              className="flex-shrink-0 cursor-pointer"
              onClick={() =>
                navigate(`/designer-page/request-doing/${item.projectId}`)
              }
            >
              <div className="w-[260px] h-[172px] rounded-[11px] flex justify-center items-center bg-[#dfe1edb9] mb-[9px]">
                <img src={morak} className="w-[113px] h-[113px]" alt="morak" />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-[15px] text-[#525466]">{item.title}</h1>
                <div className="flex items-center gap-[16px]">
                  <p className="text-[13px] text-[#525466] font-light">
                    {STATUS[item.status]}
                  </p>
                  <span className="text-[#525466]">|</span>
                  <p className="text-[13px] text-[#525466] font-light">
                    {item.createdAt.slice(0, 10).replaceAll('-', '.')} ~{' '}
                    {item.dueDate.slice(0, 10).replaceAll('-', '.')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ← 왼쪽 버튼 (여유 있을 때만 표시) */}
        {doingArrows.left && (
          <button
            onClick={() => scrollPrev(doingRef)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[66px] h-[100%]
                       bg-gradient-to-r from-white/100 to-white/0 flex items-center justify-center"
            aria-label="왼쪽으로 스크롤"
          >
            <img
              src={rightScrollButton}
              alt="leftScrollButton"
              className="rotate-180"
            />
          </button>
        )}

        {/* → 오른쪽 버튼 (여유 있을 때만 표시) */}
        {doingArrows.right && (
          <button
            onClick={() => scrollNext(doingRef)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[66px] h-[100%]
                       bg-gradient-to-r from-white/0 to-white/100 flex items-center justify-center"
            aria-label="오른쪽으로 스크롤"
          >
            <img src={rightScrollButton} alt="rightScrollButton" />
          </button>
        )}
      </section>

      {/* 완료된 프로젝트 */}
      <section className="h-[47%] w-full flex flex-col gap-[20px] relative">
        <h1 className="text-[16px] font-medium">완료된 프로젝트</h1>

        <div
          ref={finishRef}
          onScroll={updateFinishArrows}
          className="w-full pl-[13px] h-full flex items-start overflow-x-auto scroll-smooth no-scrollbar gap-[48px]"
        >
          {completeList?.map((item) => (
            <div
              key={item.projectId}
              className="flex-shrink-0 cursor-pointer"
              onClick={() =>
                navigate(`/designer-page/request-complete/${item.projectId}`)
              }
            >
              <div className="w-[260px] h-[172px] rounded-[11px] bg-[#DFE1ED] mb-[9px]" />
              <div className="flex flex-col items-center">
                <h1 className="text-[15px] text-[#525466]">{item.title}</h1>
                <div className="flex items-center gap-[5px]">
                  <p className="text-[13px] text-[#525466] font-medium">
                    {STATUS[item.status]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ← 왼쪽 버튼 */}
        {finishArrows.left && (
          <button
            onClick={() => scrollPrev(finishRef)}
            className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[66px] h-[100%]
                       bg-gradient-to-r from-white/100 to-white/0 flex items-center justify-center"
            aria-label="왼쪽으로 스크롤"
          >
            <img
              src={rightScrollButton}
              alt="leftScrollButton"
              className="rotate-180"
            />
          </button>
        )}

        {/* → 오른쪽 버튼 */}
        {finishArrows.right && (
          <button
            onClick={() => scrollNext(finishRef)}
            className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[66px] h-[100%]
                       bg-gradient-to-r from-white/0 to-white/100 flex items-center justify-center"
            aria-label="오른쪽으로 스크롤"
          >
            <img src={rightScrollButton} alt="rightScrollButton" />
          </button>
        )}
      </section>
    </div>
  );
}
