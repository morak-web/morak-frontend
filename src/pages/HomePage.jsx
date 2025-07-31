import MainLayout from '../components/layout/MainLayout';
import mainImage from '../assets/Home/background-picture.png';
import startRequestBtn from '../assets/Home/button1-icon.png';
import registerDesignerBtn from '../assets/Home/button2-icon.png';
import goIcon from '../assets/Home/go-icon.png';

import machingIcon from '../assets/Home/matching-icon.png';
import writeIcon from '../assets/Home/write-icon.png';
import task from '../assets/Home/task.png';

import { Link } from 'react-router-dom';
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
      <div className="w-[100%] min-h-[calc(100vh-64px)] mb-[100px] ">
        <img
          src={mainImage}
          alt="mainImage"
          className="w-[100%] h-[650px] relative"
        />
        <div className="flex flex-col md:flex-row md:justify-between w-[100%] h-[40%] absolute top-50 px-[10%]  ">
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
              <span className="text-[#2C44FF] text-[27px] sm:text-[32px] font-bold ">
                AI 모락
              </span>
              이 도와드릴게요
            </h3>
          </div>
          <div className="md:hidden flex w-[410px] h-[100%] items-end mx-[-5%] mt-[6%]  ">
            <Link className="relative" to={'request/category'}>
              <img
                src={startRequestBtn}
                alt="startRequestBtn"
                className="w-[300px] h-[100px] opacity-65 relative"
              />
              <h1 className=" text-[20px] text-white whitespace-nowrap absolute left-10 top-8">
                의뢰 시작하기
              </h1>
            </Link>
            <Link className="relative ml-[-20px]">
              <img
                src={registerDesignerBtn}
                alt=""
                className="w-[360px] h-[100px] opacity-65 relative"
              />
              <h1 className=" text-[20px] text-white whitespace-nowrap absolute left-11 top-8">
                디자이너 등록하기
              </h1>
            </Link>
          </div>
          <div className="hidden md:flex flex-col md:w-[500px] h-[100%] items-end md:mr-[-12%] lg:mr-[-12%] xl:mr-[-7%] 2xl:mr-0 md:mt-[10px] lg:mt-0">
            <Link className="relative block" to={'request/category'}>
              <img
                src={startRequestBtn}
                alt="startRequestBtn"
                className="md:w-[320px] lg:w-[400px] xl:w-[500px] md:h-[150px] lg:h-[200px] opacity-65 relative"
              />
              <div className="flex justify-end items-center absolute md:left-22 lg:left-31 md:gap-10 lg:gap-17 md:top-14 lg:top-19.5 xl:gap-25 xl:left-44 ">
                <h1 className="md:text-[22px] lg:text-[24px] whitespace-nowrap text-white">
                  의뢰 시작하기
                </h1>
                <img src={goIcon} alt="goIcon" className="w-[24px] h-[24px]" />
              </div>
            </Link>
            <Link className="relative block mt-[-45px] lg:mt-[-63px]">
              <img
                src={registerDesignerBtn}
                alt="registerDesignerBtn"
                className="md:w-[320px] lg:w-[400px] xl:w-[500px] md:h-[150px] lg:h-[200px] opacity-65 relative "
              />
              <div className="flex justify-end items-center  absolute  md:left-18 lg:left-26 md:gap-4 lg:gap-10 md:top-14 lg:top-19.5 xl:gap-19 xl:left-39">
                <h1 className=" md:text-[22px] lg:text-[24px] whitespace-nowrap text-white ">
                  디자이너 등록하기
                </h1>
                <img src={goIcon} alt="goIcon" className="w-[24px] h-[24px] " />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col px-[10%] gap-[50px]">
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
