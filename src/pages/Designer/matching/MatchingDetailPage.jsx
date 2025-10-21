import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProject } from '../../../context/ProjectContext';
import { useDesigner } from '../../../context/DesignerContext';

import backIcon from '../../../assets/RequestList/RequestDetail/back-icon.png';
import moneyIcon from '../../../assets/Designer/matching/money.png';
import timeIcon from '../../../assets/Designer/matching/time.png';
import lockIcon from '../../../assets/Designer/matching/lock.png';
export default function MatchingDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apply, setApply] = useState(false);
  const { designerInfo, projectApply } = useDesigner();
  const { projectDetail, fetchProjectDetail } = useProject();
  useEffect(() => {
    fetchProjectDetail(id);
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const designerId = designerInfo?.id;
    console.log(designerId);
    try {
      const crated = await projectApply(id, { designerId: designerId });
      alert('지원하기 완료');
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  const start = new Date(projectDetail?.createdAt);
  const end = new Date(projectDetail?.expectedEndDate);
  const ms = end - start;
  const daysFloor = Math.floor(ms / 86400000);
  return (
    <div className="w-[95%] min-h-[710px]">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors group"
      >
        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium">프로젝트 목록으로 돌아가기</span>
      </button>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
        {/* Header Section */}
        <div className="px-10 py-8" style={{ backgroundImage: 'linear-gradient(to right, #0284C7, #0369A1)' }}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-4">{projectDetail?.title}</h1>
              <div className="flex items-center gap-3 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>등록일: {projectDetail?.createdAt.slice(0, 10).replaceAll('-', '.')}</span>
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setApply(true);
                onSubmit(e);
              }}
              disabled={apply}
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
              style={apply ? { backgroundColor: '#D4D4D4', color: '#737373', cursor: 'not-allowed' } : { backgroundColor: '#FFFFFF', color: '#0284C7' }}
            >
              {apply ? (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>지원 완료</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>지원하기</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="px-10 py-8 bg-gradient-to-b from-neutral-50 to-white border-b border-neutral-200">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F0FDF4' }}>
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-medium mb-1">예산</p>
                  <p className="text-2xl font-bold text-neutral-900">{projectDetail?.budgetEstimate.toLocaleString()}<span className="text-base font-normal ml-1">원</span></p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-medium mb-1">예상 기간</p>
                  <p className="text-2xl font-bold text-neutral-900">{daysFloor}<span className="text-base font-normal ml-1">일</span></p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-red-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FEF2F2' }}>
                  <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-medium mb-1">마감일</p>
                  <p className="text-lg font-bold text-neutral-900">2025.08.19</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-10 py-8 overflow-y-auto custom-scrollbar max-h-[500px]">
          {/* 업무 내용 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F0F9FF' }}>
                <svg className="w-6 h-6" style={{ color: '#0284C7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">업무 내용</h2>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
              <p className="text-base text-neutral-700 leading-relaxed whitespace-pre-wrap">{projectDetail?.userRequirements}</p>
            </div>
          </div>

          {/* 모집 요건 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F0FDF4' }}>
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">모집 요건</h2>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border-2 border-green-200">
              <p className="text-base text-neutral-700 leading-relaxed whitespace-pre-wrap">{projectDetail?.designerRequirements}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 bg-neutral-50 border-t border-neutral-200 flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-neutral-600 hover:text-neutral-900 font-semibold transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            목록으로
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setApply(true);
              onSubmit(e);
            }}
            disabled={apply}
            className="px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
            style={apply ? { backgroundColor: '#D4D4D4', color: '#737373', cursor: 'not-allowed' } : { backgroundColor: '#0284C7', color: '#FFFFFF' }}
          >
            {apply ? (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>지원 완료</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>지원하기</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
