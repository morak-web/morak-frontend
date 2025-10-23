import { useState } from 'react';
import { Link } from 'react-router-dom';

import MainLayout from '../../components/layout/MainLayout';
import mainImage from '../../assets/Home/background-picture.png';
import goIcon from '../../assets/Home/go-icon.png';

import machingIcon from '../../assets/Home/matching-icon.png';
import writeIcon from '../../assets/Home/write-icon.png';
import task from '../../assets/Home/task.png';

function GlassButton({ label, to, hoverText = '#93A8ED' }) {
  const [hover, setHover] = useState(false);

  // 기본/호버 상태에 따라 투명도·보더·그로우 강도 조절
  const panelBg = hover
    ? 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.20) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.10) 100%)';

  const borderColor = hover
    ? 'rgba(255, 255, 255, 0)'
    : 'rgba(255,255,255,0.45)';
  const outerShadow = hover
    ? '0 10px 28px rgba(208, 172, 214, 0.45), inset 0 2px 0 rgba(255,255,255,0.25)'
    : '0 8px 20px rgba(100, 100, 100, 0.25), inset 0 2px 0 rgba(255,255,255,0.18)';

  const rimGradient = hover
    ? 'linear-gradient(180deg, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.36) 40%, rgba(255,255,255,0.18) 60%, rgba(255,255,255,0.10) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.28) 40%, rgba(255,255,255,0.16) 60%, rgba(255,255,255,0.08) 100%)';

  const neonBg = hover
    ? 'radial-gradient(120% 120% at 100% 100%, rgb(255, 255, 255) 0%, rgba(255,119,230,0) 55%), radial-gradient(120% 120% at 0% 0%, rgb(255, 255, 255) 0%, rgba(255,119,230,0) 60%)'
    : 'radial-gradient(120% 120% at 100% 100%, rgba(48, 51, 192, 0.28) 0%, rgba(255,119,230,0) 55%), radial-gradient(120% 120% at 0% 0%, rgba(51, 116, 177, 0.644) 0%, rgba(255,119,230,0) 60%)';

  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative block"
    >
      {/* 패널 */}
      <div
        className="topbar relative w-[350px] h-[99px] rounded-[50px] overflow-hidden cursor-pointer
                   transition-all duration-200 ease-out"
        style={{
          background: panelBg,
          boxShadow: outerShadow,
          transform: hover ? 'translateY(-1px) scale(1.01)' : 'none',
        }}
      >
        {/* 유리 하이라이트 (림) */}
        <span
          className="pointer-events-none absolute inset-[1.5px] rounded-[24px] transition-opacity duration-200"
          style={{
            background: rimGradient,
            mixBlendMode: 'screen',
            opacity: hover ? 0.95 : 0.85,
          }}
        />
        {/* 핑크 네온 가장자리 */}
        <span
          className="pointer-events-none absolute -inset-[2px] rounded-[28px] transition-all duration-200"
          style={{
            background: neonBg,
            opacity: hover ? 1 : 0.8,
            filter: hover ? 'blur(14px)' : 'blur(10px)',
          }}
        />

        {/* 내용 */}
        <div className="relative z-10 h-full w-full flex items-center justify-center pl-9 gap-6">
          <h1
            className="transition-colors duration-200 text-[24px] whitespace-nowrap text-center"
            style={{ color: hover ? hoverText : '#FFFFFF' }}
          >
            {label}
          </h1>
          <img
            src={goIcon}
            alt="go"
            className="w-[22px] h-[22px] md:w-[24px] md:h-[24px] transition-transform duration-200"
            style={{ transform: hover ? 'translateX(2px)' : 'none' }}
          />
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const TRAIT = [
    {
      icon: machingIcon,
      title: '[ 추천 매칭 ]',
      description:
        '나에게 맞는 디자이너 매칭\n -> 내가 찾지 않아도, 추천받을 수 있어요',
    },
    {
      icon: writeIcon,
      title: '[ AI 의뢰서 작성 ]',
      description:
        'AI가 도와주는 의뢰서 작성\n -> 질문만 답하면 의뢰서 자동 완성!',
    },
    {
      icon: task,
      title: '[ AI 중간 점검 ]',
      description:
        'AI 피드백으로 중간 점검\n -> 진행 중인 결과물, AI가 검토해드려요',
    },
  ];

  return (
    <MainLayout>
      {/* .topbar: 유리알 효과 */}
      <style>{`
        .topbar {
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
        }
      `}</style>

      <div className="w-[100%] h-[100%] overflow-hidden">
        <img
          src={mainImage}
          alt="main"
          className="w-[100%] h-[650px] relative"
        />

        {/* 히어로 */}
        <div className="flex flex-col md:flex-row md:justify-between w-[100%] h-[40%] absolute top-50 px-[10%]">
          {/* 왼쪽 카피 */}
          <div className="w-[50%] h-[100%]">
            <h1 className="text-[30px] sm:text-[35px] lg:text-[48px] xl:text-[55px] whitespace-nowrap">
              딱 맞는 디자이너
              <br />
              쉽고 빠르게 매칭해 드려요
            </h1>
            <p className="text-[18px] sm:text-[20px] mt-[10%] sm:mt-[5%] whitespace-nowrap">
              디자인이 필요할 땐,
              <br />
              누구나 쉽게 의뢰하고,
              <br />
              내게 딱 맞는 디자이너를 만날 수 있어요.
            </p>
            <h3 className="text-[27px] sm:text-[32px] mt-[4%] sm:mt-[2%] whitespace-nowrap">
              <span className="text-[#2C44FF] text-[27px] sm:text-[32px] font-bold">
                AI 모락
              </span>
              이 도와드릴게요
            </h3>
          </div>

          <div className="hidden md:flex flex-col md:w-[500px] h-[100%] items-end gap-[100px] mt-10">
            <GlassButton
              label="의뢰 시작하기"
              to="request/category"
              hoverText="#666dce"
            />
            <div className="mt-[-45px] lg:mt-[-63px]">
              <GlassButton
                label="디자이너 등록하기"
                to="/designer-page"
                hoverText="#666dce"
              />
            </div>
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className="flex flex-col px-[10%] gap-[50px] mb-[80px]">
          <div>
            <p className="text-[20px]">우리의 고민</p>
            <h1 className="text-[30px] sm:text-[40px]">
              초보 개발자와 디자이너를 위한
              <br className="hidden sm:flex" /> 시스템
            </h1>
          </div>
          <div className="flex justify-between gap-[10%]">
            {TRAIT.map((item) => (
              <div className="flex flex-col gap-[15px]" key={item.title}>
                <img src={item.icon} alt="icon" className="w-[73px] h-[73px]" />
                <h1 className="text-[15px] whitespace-nowrap sm:text-[20px]">
                  {item.title}
                </h1>
                <p className="text-[13px] sm:text-[16px] whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
