import MainLayout from '../../../components/layout/MainLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import folderImg from '../../../assets/RequestWrite/folder.png';
import { useProject } from '../../../context/ProjectContext';
import { useState } from 'react';

export default function RequirementSummaryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { responseData, patchNewProject } = useProject();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startDate = new Date(); // 예: 2025-09-23T23:10:00+09:00

  // 숫자만 뽑기
  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  const pad = (n) => String(n).padStart(2, '0');
  const ymdDot = `${year}. ${pad(month)}. ${pad(day)}`;

  const CATEGORY = {
    1: '웹사이트',
    2: '앱',
    3: '쇼핑몰/스마트스토어',
    4: '키오스크/POS',
    5: '그래픽/영상',
    6: '기타',
  };

  const onSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await patchNewProject(id);
      navigate('/request/write/complete');
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
      return null;
    }
  };

  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-br via-white py-12 px-4" style={{ backgroundImage: 'linear-gradient(to bottom right, #F0F9FF, white, #F0F9FF)' }}>
        <div className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-200/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r px-10 py-8" style={{ backgroundImage: 'linear-gradient(to right, #0284C7, #0369A1)' }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">의뢰 내용 확인</h1>
                <p className="text-base mt-1" style={{ color: '#E0F2FE' }}>작성하신 내용을 최종 확인해주세요</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-10 py-8">
            <div className="overflow-y-auto custom-scrollbar max-h-[calc(100vh-400px)] space-y-6 mb-8">
              {/* 프로젝트 기본 정보 */}
              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E0F2FE' }}>
                    <svg className="w-5 h-5" style={{ color: '#0284C7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  프로젝트 기본 정보
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-neutral-200">
                      <p className="text-sm font-medium text-neutral-500 mb-1">프로젝트 제목</p>
                      <p className="text-base font-semibold text-neutral-900">{responseData?.title}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-neutral-200">
                      <p className="text-sm font-medium text-neutral-500 mb-1">카테고리</p>
                      <p className="text-base font-semibold" style={{ color: '#0284C7' }}>{CATEGORY[responseData?.categoryId]}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-neutral-200">
                      <p className="text-sm font-medium text-neutral-500 mb-1">예산</p>
                      <p className="text-lg font-bold text-neutral-900">{responseData?.budgetEstimate.toLocaleString()} <span className="text-sm font-normal">원</span></p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-neutral-200">
                      <p className="text-sm font-medium text-neutral-500 mb-1">프로젝트 기간</p>
                      <p className="text-base font-semibold text-neutral-900">{ymdDot} ~ {responseData?.dueDate.replaceAll('-', '.')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 상세 요구 사항 */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-200 shadow-sm">
                <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  상세 요구 사항
                </h2>
                <div className="bg-white rounded-xl p-5 border border-blue-200">
                  <p className="text-base text-neutral-700 leading-relaxed whitespace-pre-wrap">{responseData?.userRequirements}</p>
                </div>
              </div>

              {/* 모집 요건 */}
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-200 shadow-sm">
                <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  모집 요건
                </h2>
                <div className="bg-white rounded-xl p-5 border border-purple-200">
                  <p className="text-base text-neutral-700 leading-relaxed whitespace-pre-wrap">{responseData?.designerRequirements}</p>
                </div>
              </div>

              {/* 참고 자료 */}
              <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-6 border border-amber-200 shadow-sm">
                <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  참고 자료
                </h2>
                <div className="bg-white rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center gap-3 text-neutral-600">
                    <img src={folderImg} alt="folder" className="w-5 h-5" />
                    <p className="text-sm">퍼스널 헬스케어 플랫폼 레퍼런스.zip</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-400 mt-3 text-right">내용을 수정하려면 이전으로 돌아가주세요.</p>
              </div>

              {/* AI 요약 */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-200 shadow-sm">
                <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  AI 요약
                </h2>
                <p className="text-sm text-neutral-600 mb-3">의뢰 내용을 바탕으로 AI가 요약했습니다</p>
                <textarea
                  className="w-full h-52 bg-white rounded-xl resize-none p-5 text-neutral-800 text-base border-2 border-green-200 outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all leading-relaxed"
                  placeholder="AI 요약 내용이 여기에 표시됩니다..."
                ></textarea>
                <p className="text-xs text-neutral-400 mt-3 text-right">요약문을 확인하고 제출 버튼을 눌러주세요.</p>
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="flex justify-between items-center pt-6 border-t border-neutral-200">
              <Link
                to={`/request/AI-question/${id}`}
                className="text-neutral-600 hover:text-neutral-900 font-semibold transition-colors flex items-center gap-2 group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                이전
              </Link>
              <button
                onClick={onSubmit}
                disabled={isSubmitting}
                style={!isSubmitting ? { backgroundColor: '#0284C7', color: '#FFFFFF' } : { backgroundColor: '#D4D4D4', color: '#404040' }}
                className={`px-10 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 shadow-lg hover:shadow-xl ${
                  isSubmitting ? 'cursor-not-allowed' : 'hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-neutral-500 border-t-neutral-800 rounded-full animate-spin"></div>
                    <span>제출 중...</span>
                  </>
                ) : (
                  <>
                    <span>제출하기</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
