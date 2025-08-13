const TYPE = [
  {
    title: 'ALL',
  },
  {
    title: '웹',
  },
  {
    title: '앱',
  },
  {
    title: '쇼핑몰/스마트 스토어',
  },
  {
    title: '키오스크/POS',
  },
  {
    title: '그래픽/영상',
  },
  {
    title: '기타',
  },
];

import MatchingCard from './MatchingCard';

export default function ProjectMatchingList() {
  return (
    <div className="bg-white w-[95%] min-h-[710px] rounded-[11px] py-[20px] pl-[30px]">
      <div className="mb-[11px]">
        <h1>지원 가능 프로젝트</h1>
      </div>
      <div className="h-[32px] flex gap-[11px] mb-[27px]">
        {TYPE.map((item) => (
          <div key={item.title} className="flex">
            <button className="h-[32px] px-[13px] py-[8px] bg-[#EAECF5] rounded-[10px] cursor-pointer">
              <h1 className="text-[#525466] text-[13px]">{item.title}</h1>
            </button>
            {item.title === 'ALL' && (
              <div className="bg-[#52546648] h-[33px] w-[1px] ml-[20px] mr-[9px]" />
            )}
          </div>
        ))}
      </div>
      <div className="overflow-y-auto max-h-[570px] flex flex-col gap-[29px]  custom-scrollbar mr-[13px] pr-[19px]">
        {/* MatchingCard 안에 map 코드 작성 */}
        <MatchingCard />
        <MatchingCard />
        <MatchingCard />
        <MatchingCard />
        <MatchingCard />
        <MatchingCard />
        <MatchingCard />
      </div>
    </div>
  );
}
