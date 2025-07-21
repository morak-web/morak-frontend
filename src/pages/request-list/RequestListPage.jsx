import MainLayout from '../../components/layout/MainLayout';
import pencilIcon from '../../assets/RequestList/pencilIcon.png';
import { Link } from 'react-router-dom';

const ASIDE_BAR = [
  {
    title: '의뢰서 작성',
    link: '',
  },
  {
    title: '내 의뢰 목록',
    link: '',
  },
  {
    title: '결제 내역',
    link: '',
  },
];

const STATUS = [
  { title: '작성 중', count: 0 },
  { title: '매칭 중', count: 1 },
  { title: '진행 중', count: 0 },
  { title: '완료', count: 0 },
];

export default function RequestListPage() {
  return (
    <MainLayout>
      <div className="bg-[#f1f2f8] h-[calc(100vh-64px)] pt-[77px]">
        <div className="flex h-[100%] gap-[4%]">
          <div className="ml-[13%] w-[20%] flex flex-col gap-[35px]">
            <div className="bg-white rounded-[19px] w-[85%] h-[250px] flex flex-col items-center pt-[26px] ml-[20%]">
              <div className="w-[45%] h-[45%] lg:w-[127px] lg:h-[127px] bg-red-300 rounded-[50%] mb-[12px]" />
              <Link className="flex gap-[2px] items-center">
                <p className="text-[10px] lg:text-[11px] text-[rgba(82,84,102,1)]">
                  프로필 수정하기
                </p>
                <img
                  src={pencilIcon}
                  alt="pencilIcon"
                  className="w-[9px] h-[9px]"
                />
              </Link>
              <div className="mt-[11px] w-[80%] h-[2px] bg-[#dadae0]" />
              <h1 className="pt-[9px] text-[13px] xl:text-[16px] text-[rgba(82,84,102,1)]">
                <span className="text-[20px] text-[rgba(96,114,255,1)] font-bold">
                  김모락
                </span>{' '}
                님의 워크스페이스
              </h1>
            </div>
            <div className="flex flex-col lg:pl-[30%] pl-[20%]">
              {ASIDE_BAR.map((item) => (
                <Link className="text-[rgba(195,196,206)] border-t-[2px] w-[100%] lg:w-[152px] h-[50px] text-[15px] font-bold pt-[10px]">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-[46%] flex flex-col gap-[35px] ">
            <div className="flex w-[100%]  h-[10%] bg-white rounded-[11px] justify-center py-[13px] 2xl:px-[1px] px-[5px] ">
              {STATUS.map((item, idx) => (
                <div className="flex items-center">
                  <h1 className="text-[11px] sm:text-[14px] md:text-[18px] lg:text-[20px] text-[rgba(82,84,102,1)] mr-[4px] sm:mr-[8px] md:mr-[6px] lg:mr-[12px] 2xl:mr-[45px] ">
                    {item.title}
                  </h1>
                  <h2 className="text-[16px] sm:text-[20px] md:text-[26px] text-[rgba(195,196,206)]">
                    {item.count}
                  </h2>
                  {idx < 3 ? (
                    <div className="inline-block w-[1px] h-[42px] bg-[rgba(195,196,206)] mr-[7px] md:mr-[9px] lg:mr-[20px] xl: 2xl:mr-[40px] ml-[7px] md:ml-[9px] lg:ml-[20px] 2xl:ml-[40px]" />
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
            <div className="bg-white w-[100%]  h-[78%] rounded-[11px]"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
