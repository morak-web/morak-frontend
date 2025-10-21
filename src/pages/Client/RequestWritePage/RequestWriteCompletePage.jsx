import MainLayout from '../../../components/layout/MainLayout';
import completeIcon from '../../../assets/RequestWrite/request-write-complete-icon.png';
import { useNavigate } from 'react-router-dom';

export default function RequestWriteCompletePage() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4" style={{ backgroundImage: 'linear-gradient(to bottom right, #F0F9FF, white, #F0FDF4)' }}>
        <div className="w-full max-w-3xl">
          {/* Success Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-200/50 overflow-hidden">
            {/* Animated Header */}
            <div className="px-10 py-12 text-center relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(to right, #0284C7, #0369A1)' }}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="relative">
                {/* Success Icon with Animation */}
                <div className="mx-auto w-32 h-32 mb-8 relative">
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="relative bg-white rounded-full p-6 shadow-xl">
                    <img
                      src={completeIcon}
                      alt="완료"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
                  의뢰서 작성 완료!
                </h1>
                <p className="text-xl text-white/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  성공적으로 제출되었습니다
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="px-10 py-12">
              {/* Info Cards */}
              <div className="grid gap-6 mb-10">
                {/* Next Steps */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border-2 border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E0F2FE' }}>
                      <svg className="w-6 h-6" style={{ color: '#0284C7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">디자이너 매칭 진행 중</h3>
                      <p className="text-neutral-600 leading-relaxed">
                        곧 최적의 디자이너를 매칭해드릴게요. 디자이너가 지원하면 알림으로 안내해드립니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border-2 border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F0FDF4' }}>
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">다음 단계</h3>
                      <ul className="space-y-2 text-neutral-600">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          <span>의뢰 목록에서 지원한 디자이너 확인</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          <span>마음에 드는 디자이너 선택 및 채팅</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          <span>프로젝트 진행 및 피드백</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/client-page/request-list')}
                  className="flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  style={{ backgroundColor: '#0284C7', color: '#FFFFFF' }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>의뢰 목록 보기</span>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/request/category')}
                  className="flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all border-2 border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 hover:border-neutral-400"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>새 의뢰 작성</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
