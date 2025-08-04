import { Link, Outlet } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import pencilIcon from '../../assets/RequestList/pencilIcon.png';

const ASIDE_BAR = [
  {
    title: '프로젝트 매칭 대기',
    link: '/request/category',
  },
  {
    title: '내 작업 목록',
    link: '/request-list',
  },
  {
    title: '포트폴리오 관리',
    link: '',
  },
];

function LeftSection() {
  return (
    <div className=" w-[30%] h-[710px] flex flex-col items-center gap-[35px] ">
      <div className="bg-white rounded-[19px] w-[80%] h-[250px] flex flex-col items-center pt-[26px]">
        <div className="w-[80px] h-[80px] lg:w-[127px] lg:h-[127px] bg-red-300 rounded-[50%] mb-[12px]" />
        <Link className="flex gap-[2px] items-center">
          <p className="text-[10px] lg:text-[11px] text-[rgba(82,84,102,1)]">
            프로필 수정하기
          </p>
          <img src={pencilIcon} alt="pencilIcon" className="w-[9px] h-[9px]" />
        </Link>
        <div className="mt-[11px] w-[80%] h-[2px] bg-[#dadae0]" />
        <h1 className="pt-[9px] text-[13px] xl:text-[16px] text-[rgba(82,84,102,1)]">
          <span className="text-[20px] text-[rgba(96,114,255,1)] font-bold">
            김모락{' '}
          </span>
          님의 워크스페이스
        </h1>
      </div>
      <div className="flex flex-col 2xl:pr-[20%] gap-[8px] ">
        {ASIDE_BAR.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className={` border-t-[2px] w-[80px] sm:w-[152px] h-[50px] text-[13px] sm:text-[15px] pt-[10px] font-bold text-left ${item.title === '내 의뢰 목록' ? 'text-[#474858] border-[rgba(195,196,206)] ' : 'text-[rgba(195,196,206)]'}`}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
export default function DesignerPage() {
  return (
    <MainLayout>
      <div className="bg-[#f1f2f8] min-h-[calc(100vh-64px)] flex justify-center items-center py-[30px]">
        <div className="w-[100%] lg:w-[70%] h-[710px] flex mx-auto  ">
          <LeftSection />
          <div className="w-[70%] flex flex-col items-center  ">
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
