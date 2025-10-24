import { useEffect, useState } from 'react';
import MatchingCard from '../../../components/Designer/Matching/MatchingCard';
import ApplyDetailCard from './applyDetailCard';
import { useDesigner } from '../../../context/DesignerContext';

const TYPE = [
  {
    title: 'ALL',
    id: 0,
  },
  {
    title: '웹',
    id: 1,
  },
  {
    title: '앱',
    id: 2,
  },
  {
    title: '쇼핑몰/스마트 스토어',
    id: 3,
  },
  {
    title: '키오스크/POS',
    id: 4,
  },
  {
    title: '그래픽/영상',
    id: 5,
  },
  {
    title: '기타',
    id: 6,
  },
];

const STATUS = [
  {
    title: '매칭중',
    en: 'MATCHING',
  },
  {
    title: '작업중',
    en: 'WORKING',
  },
];

export default function ProjectMatchingList() {
  const [status, setStatus] = useState('MATCHING');
  const [checkedCategory, setCheckedCategory] = useState(0);
  const [seePage, setSeePage] = useState(true);
  const {
    matchingWaitingList,
    fetchMatchingWaiting,
    loading,
    error,
    fetchApplyProjectList,
    applyProjectList,
  } = useDesigner();
  useEffect(() => {
    fetchApplyProjectList(status);
    fetchMatchingWaiting();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>error!! {String(error.message || error)}</div>;
  const matchingProjectList =
    checkedCategory === 0
      ? matchingWaitingList
      : matchingWaitingList?.filter(
          (item) => item?.categoryId === checkedCategory
        );
  console.log('1', matchingWaitingList);
  console.log(matchingProjectList);
  const projectList = applyProjectList?.filter(
    (item) => item?.projectStatus === status
  );
  console.log('app', projectList);
  return (
    <div className="bg-white w-[95%] min-h-[710px] rounded-[11px] py-[20px] pl-[30px] flex flex-col">
      <div className="mb-[11px] flex justify-between pr-[22px]">
        <h1>{seePage ? '지원 가능 프로젝트' : '내가 신청한 프로젝트'}</h1>
      </div>
      <div className="h-[620px]">
        {seePage ? (
          <div className="h-[32px] flex gap-[11px] mb-[27px]">
            {TYPE.map((item) => (
              <div key={item.title} className="flex">
                <button
                  onClick={() => setCheckedCategory(item.id)}
                  className={`  h-[32px] px-[13px]  rounded-[10px] cursor-pointer ${checkedCategory === item.id ? 'bg-[#BDCFFF]' : 'bg-[#EAECF5] '}`}
                >
                  <h1
                    className={` ${checkedCategory === item.id ? 'text-white' : 'text-[#525466]'} text-[13px]`}
                  >
                    {item.title}
                  </h1>
                </button>
                {item.title === 'ALL' && (
                  <div className="bg-[#52546648] h-[33px] w-[1px] ml-[20px] mr-[9px]" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[32px] flex gap-[11px] mb-[27px]">
            {STATUS.map((item) => (
              <div key={item.title} className="flex">
                <button
                  onClick={() => {
                    setStatus(item.en);
                  }}
                  className={`  h-[32px] px-[13px]  rounded-[10px] cursor-pointer ${status === item.en ? 'bg-[#BDCFFF]' : 'bg-[#EAECF5] '}`}
                >
                  <h1
                    className={` ${status === item.en ? 'text-white' : 'text-[#525466]'} text-[13px]`}
                  >
                    {item.title}
                  </h1>
                </button>
                {item.title === 'ALL' && (
                  <div className="bg-[#52546648] h-[33px] w-[1px] ml-[20px] mr-[9px]" />
                )}
              </div>
            ))}
          </div>
        )}
        {seePage ? (
          <div className="overflow-y-auto max-h-[570px] flex flex-col gap-[29px]  custom-scrollbar mr-[13px] pr-[19px]">
            {matchingProjectList?.map((item) => (
              <div key={item.projectId}>
                <MatchingCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[570px] flex flex-col gap-[29px]  custom-scrollbar mr-[13px] pr-[19px]">
            {projectList?.map((item) => (
              <div key={item.projectId}>
                <ApplyDetailCard {...item} />
              </div>
            ))}
          </div>
        )}{' '}
      </div>
      <button
        onClick={() => setSeePage(!seePage)}
        className={`w-[full] font-bold mr-[40px] relative h-[31px] flex justify-end text-[14px] ${seePage ? 'text-[#7484FF]' : 'text-black'} cursor-pointer`}
      >
        {seePage ? '신청 프로젝트 목록 >' : '지원 가능 프로젝트 >'}
      </button>
    </div>
  );
}
