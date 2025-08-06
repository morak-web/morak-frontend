import { ProjectListMocks } from '../../mocks/ProjectList';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import leftScrollButton from '../../assets/Designer/left-scroll-button.png'
import rightScrollButton from '../../assets/Designer/right-scroll-button.png';

export default function MyWorkListPage() {
  const doingRef = useRef(null);
  const finishRef = useRef(null);

  const navigate = useNavigate();

  const scrollNext = (ref) => {
    if (!ref.current) return;
    // 한 번에 뷰포트 너비의 80% 만큼 스크롤
    const amount = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="bg-white w-[95%] min-h-[710px] rounded-[11px] px-[36px] py-[33px] flex flex-col justify-between">
      {/* 진행 중 프로젝트 */}
      <section className="h-[47%] w-full flex flex-col gap-[26px] relative">
        <h1 className="text-[16px] font-medium">진행 중 프로젝트</h1>

        {/* 스크롤 컨테이너 */}
        <div
          ref={doingRef}
          className="
            w-full pl-[13px] h-full flex items-start
            overflow-x-auto scroll-smooth no-scrollbar
            gap-[48px]
          "
        >
          {ProjectListMocks.doing.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 cursor-pointer"
              onClick={() =>
                navigate(`/designer-page/request-doing/${item.id}`)
              }
            >
              <div className="w-[260px] h-[172px] rounded-[11px] bg-[#DFE1ED] mb-[9px]" />
              <div className="flex flex-col items-center">
                <h1 className="text-[15px] text-[#525466]">{item.title}</h1>
                <div className="flex items-center gap-[16px]">
                  <p className="text-[13px] text-[#525466]">{item.status}</p>
                  <span className="text-[#525466]">|</span>
                  <p className="text-[13px] text-[#525466]">
                    {item.finishDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽 버튼 */}
        <button
          onClick={() => scrollNext(doingRef)}
          className="
            absolute right-0 top-1/2 -translate-y-1/2
            w-[66px] h-[100%] bg-gradient-to-r from-white/0 to-white/100     
            flex items-center justify-center
          "
        >
          <img src={rightScrollButton} alt="rightScrollButton" />
        </button>
      </section>

      {/* 완료된 프로젝트 */}
      <section className="h-[47%] w-full flex flex-col gap-[26px] relative">
        <h1 className="text-[16px] font-medium">완료된 프로젝트</h1>

        <div
          ref={finishRef}
          className="
            w-full pl-[13px] h-full flex items-start
            overflow-x-auto scroll-smooth no-scrollbar
            gap-[48px]
          "
        >
          {ProjectListMocks.finish.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 cursor-pointer"
              onClick={() =>
                navigate(`/designer-page/request-complete/${item.id}`)
              }
            >
              <div className="w-[260px] h-[172px] rounded-[11px] bg-[#DFE1ED] mb-[9px]" />
              <div className="flex flex-col items-center">
                <h1 className="text-[15px] text-[#525466]">{item.title}</h1>
                <div className="flex items-center gap-[5px]">
                  <p className="text-[13px] text-[#525466]">{item.date}</p>
                  <p className="text-[13px] text-[#525466] font-medium">완료</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollNext(finishRef)}
          className="
            absolute right-0 top-1/2 -translate-y-1/2
            w-[66px] h-[100%] bg-gradient-to-r from-white/0 to-white/100     
            flex items-center justify-center
          "
        >
          <img src={rightScrollButton} alt="rightScrollButton" />
        </button>
      </section>
    </div>
  );
}
