import { Outlet, NavLink } from 'react-router-dom';
import useMyProjectList from '../../../hooks/useMyProject';

function TopSide() {
  const { data: draftList } = useMyProjectList('DRAFT');
  const { data: matchingList } = useMyProjectList('MATCHING');
  const { data: workingList } = useMyProjectList('WORKING');
  const { data: completeList } = useMyProjectList('COMPLETE');
  const draftCount = draftList?.filter(
    (item) => item.status === 'DRAFT'
  ).length;
  const matchingCount = matchingList?.filter(
    (item) => item.status === 'MATCHING'
  ).length;
  const workingCount = workingList?.filter(
    (item) => item.status === 'WORKING'
  ).length;
  const completeCount = completeList?.filter(
    (item) => item.status === 'COMPLETE'
  ).length;

  const STATUS = [
    { title: '작성 중', count: draftCount, state: 'draft' },
    { title: '매칭 중', count: matchingCount, state: 'matching' },
    { title: '진행 중', count: workingCount, state: 'working' },
    { title: '완료', count: completeCount, state: 'complete' },
  ];

  return (
    <div className="flex w-[100%] h-[80px] bg-white rounded-[11px] justify-center py-[13px] 2xl:px-[1px] px-[5px] ">
      {STATUS.map((item, idx) => (
        <div className="flex items-center" key={idx}>
          <h1 className="text-[11px] sm:text-[18px] md:text-[20px] text-[rgba(82,84,102,1)] mr-[7px] sm:mr-[12px] md:mr-[15px] xl:mr-[25px] 2xl:mr-[45px] ">
            {item.title}
          </h1>
          <h2
            className={`text-[17px] sm:text-[26px] md:text-[28px] ${item.count > 0 ? 'text-[#687AFE] font-bold ' : 'text-[rgba(195,196,206)] '}`}
          >
            {item.count}
          </h2>
          {idx < 3 ? (
            <div className="inline-block w-[1px] h-[42px] bg-[rgba(195,196,206)] mr-[6px] sm:mr-[18px] xl:mr-[25px] 2xl:mr-[40px] ml-[6px] sm:ml-[14px] md:ml-[20px] xl:ml-[25px] 2xl:ml-[40px]" />
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
}

function ContentTopSide() {
  const STATUS = [
    { title: '작성 중', state: 'draft' },
    { title: '매칭 중', state: 'matching' },
    { title: '진행 중', state: 'working' },
    { title: '완료', state: 'complete' },
  ];
  return (
    <div className="flex gap-[10px]">
      {STATUS.map((item) => (
        <NavLink key={item.title} to={item.state} className="no-underline">
          {({ isActive }) => (
            <label className="gap-[6px] flex items-center cursor-pointer">
              <input
                type="radio"
                name="requestState"
                className="w-[16px] h-[16px] hidden peer"
                checked={isActive}
                onChange={() => {}}
              />
              <span className="block w-[16px] h-[16px] border border-[#DFE1ED] rounded-[4px] peer-checked:bg-[#DFE1ED]" />
              <span className="text-[13px] text-[#525466]">{item.title}</span>
            </label>
          )}
        </NavLink>
      ))}
    </div>
  );
}

export default function RequestListPage() {
  return (
    <div className="w-[95%] h-[710px] flex flex-col justify-between">
      <TopSide />
      <div className="bg-white w-[100%] h-[84%] rounded-[11px]">
        <div className="pl-[28px] pr-[13px] py-[25px] h-[100%] flex flex-col gap-[33px]">
          <ContentTopSide />
          <div className="w-full flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-[27px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
