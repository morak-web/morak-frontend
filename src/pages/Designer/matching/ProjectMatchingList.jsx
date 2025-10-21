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
    <div className="bg-white w-[95%] min-h-[710px] rounded-xl shadow-sm py-8 px-10">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-900">
          {seePage ? '지원 가능 프로젝트' : '내가 신청한 프로젝트'}
        </h1>
        <button
          onClick={() => setSeePage(!seePage)}
          className="px-5 py-2 rounded-lg border text-sm font-medium transition-colors"
          style={{
            borderColor: '#0284C7',
            color: seePage ? '#4F46E5' : '#171717',
            backgroundColor: seePage ? 'transparent' : '#F0F9FF'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0F9FF'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = seePage ? 'transparent' : '#F0F9FF'}
        >
          {seePage ? '신청 프로젝트 목록' : '지원 가능 프로젝트'}
        </button>
      </div>
      {seePage ? (
        <div className="flex gap-3 mb-8 flex-wrap">
          {TYPE.map((item) => (
            <div key={item.title} className="flex items-center">
              <button
                onClick={() => setCheckedCategory(item.id)}
                className={`h-10 px-4 rounded-lg font-medium text-sm transition-all ${
                  checkedCategory === item.id
                    ? 'text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                style={checkedCategory === item.id ? { backgroundColor: '#0284C7' } : {}}
              >
                {item.title}
              </button>
              {item.title === 'ALL' && (
                <div className="bg-neutral-200 h-8 w-px ml-4 mr-2" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-3 mb-8">
          {STATUS.map((item) => (
            <div key={item.title} className="flex items-center">
              <button
                onClick={() => {
                  setStatus(item.en);
                }}
                className={`h-10 px-4 rounded-lg font-medium text-sm transition-all ${
                  status === item.en
                    ? 'text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                style={status === item.en ? { backgroundColor: '#0284C7' } : {}}
              >
                {item.title}
              </button>
              {item.title === 'ALL' && (
                <div className="bg-neutral-200 h-8 w-px ml-4 mr-2" />
              )}
            </div>
          ))}
        </div>
      )}
      {seePage ? (
        <div className="overflow-y-auto max-h-[570px] flex flex-col gap-6 custom-scrollbar pr-4">
          {matchingProjectList?.map((item) => (
            <div key={item.projectId}>
              <MatchingCard {...item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-y-auto max-h-[570px] flex flex-col gap-6 custom-scrollbar pr-4">
          {projectList?.map((item) => (
            <div key={item.projectId}>
              <ApplyDetailCard {...item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
