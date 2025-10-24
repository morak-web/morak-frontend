import { Link, useNavigate } from 'react-router-dom';
import writingPencilIcon from '../../../assets/RequestList/writing-pencil-icon.png';
import { useEffect, useMemo } from 'react';
// api
import { useProject } from '../../../context/ProjectContext';

const CATEGORY = {
  1: '웹사이트',
  2: '앱',
  3: '쇼핑몰/스마트스토어',
  4: '키오스크/POS',
  5: '그래픽/영상',
  6: '기타',
};

export default function WritingPage() {
  const navigate = useNavigate();
  const {
    projectList = [],
    fetchProjectList,
    listVersion, // ✅ 제출 후 자동 리패치 트리거
    error,
    loading,
  } = useProject();

  // 마운트 + listVersion 변경 시 최신 DRAFT 목록 재조회
  useEffect(() => {
    fetchProjectList('DRAFT');
  }, [fetchProjectList, listVersion]); // ✅ 중요

  // 안전 필터 (status 또는 projectStatus 둘 다 대응)
  const writingData = useMemo(
    () =>
      (projectList || []).filter(
        (item) => (item?.status || item?.projectStatus) === 'DRAFT'
      ),
    [projectList]
  );

  const handleContinue = (item) => {
    const pid = String(item?.id ?? item?.projectId ?? '');
    if (!pid) return;

    // 이어쓰기 위해 로컬 상태 보강
    try {
      localStorage.setItem('draftProjectId', pid);
      if (item?.categoryId) {
        localStorage.setItem('draftCategoryId', String(item.categoryId));
      }
      localStorage.setItem('draftSavedAt', new Date().toISOString());
    } catch {}

    // 작성 페이지로 이동 (라우팅 정책에 맞게 변경 가능)
    navigate('/request/write');
    // navigate(`/request/write/${pid}`); // id 기반 라우팅이면 이 라인 사용
  };

  if (loading && writingData.length === 0) {
    return (
      <div className="w-full h-[470px] flex items-center justify-center text-[#8b90a0]">
        작성중 의뢰를 불러오는 중…
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[470px] flex items-center justify-center text-red-500">
        작성중 목록을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (!writingData.length) {
    return (
      <div className="w-full h-[470px] flex flex-col items-center justify-center text-[#8b90a0] gap-2">
        <p>작성중인 의뢰가 없습니다.</p>
        <Link
          to="/request/category"
          className="text-[#525466] text-[13px] font-semibold bg-[#DFE1ED] py-[10px] px-4 rounded-[19px]"
        >
          새 의뢰 시작하기
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-[15px]">
      {writingData.map((item) => {
        const pid = item?.id ?? item?.projectId;
        const title = item?.title || '미정';
        const categoryName = CATEGORY[item?.categoryId] || '미정';
        const summary = item?.userRequirements
          ? item.userRequirements.length > 80
            ? `${item.userRequirements.slice(0, 80)}…`
            : item.userRequirements
          : '작성 중..';

        return (
          <div
            key={pid}
            className="w-[100%] min-h-[230px] py-[16px] px-[10px] bg-[#F7F8FC] rounded-[30px] flex"
          >
            {/* left content */}
            <div className="w-[38%] py-[10px] px-[6%] flex flex-col items-center  border-r-[1px] border-[#D9D9D9]">
              <img
                src={writingPencilIcon}
                alt="writingPencilIcon"
                className="w-[76px] h-[76px] mb-[14px]"
              />
              <div className="text-[#525466] text-[12px] mb-[19px] flex flex-col items-center">
                <p>작성이 완료되지 않은 의뢰입니다.</p>
                <p>의뢰서 작성을 완료해주세요!</p>
              </div>

              {/* 기존: to="/request/category" → 수정: 초안 이어쓰기 */}
              <button
                onClick={() => handleContinue(item)}
                className="text-[#525466] text-[13px] font-semibold bg-[#DFE1ED] py-[10px] rounded-[19px] w-[100%] text-center cursor-pointer"
              >
                작성 이어가기
              </button>
            </div>

            {/* right content */}
            <div className="flex-1 px-[24px] py-[6px]">
              <div className="flex justify-between mb-[14px]">
                <div className="flex flex-col gap-[7px]">
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    프로젝트 제목
                  </h1>
                  <p className="text-[#525466] text-[13px]">{title}</p>
                </div>
                <div className="flex flex-col gap-[7px] items-end">
                  <h1 className="text-[#525466] text-[14px] font-semibold">
                    프로젝트 카테고리
                  </h1>
                  <p className="text-[#525466] text-[13px]">{categoryName}</p>
                </div>
              </div>

              <div className="flex flex-col gap-[7px]">
                <h1 className="text-[#525466] text-[14px] font-semibold">
                  요구사항 요약
                </h1>
                <p className="text-[#525466] text-[13px]">{summary}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
