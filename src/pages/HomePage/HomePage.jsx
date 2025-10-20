import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-6 pt-32 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-sky-100 rounded-full">
              <svg className="w-4 h-4 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sky-900 font-semibold text-sm">AI 기반 디자인 외주</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
              완벽한 디자이너를
              <br />
              <span className="text-sky-600">AI가 찾아드립니다</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-neutral-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              의뢰서 작성부터 디자이너 매칭까지 모든 과정을 AI가 자동으로 처리합니다
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="request/category"
                className="group px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <span>무료로 시작하기</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                to="/designer-page"
                className="px-8 py-4 bg-white border-2 border-neutral-200 hover:border-sky-600 text-neutral-900 rounded-xl font-semibold text-lg transition-all"
              >
                디자이너로 시작하기
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 mt-12 border-t border-neutral-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-neutral-900 mb-1">-</div>
                <div className="text-neutral-600 text-sm">완료된 프로젝트</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-neutral-900 mb-1">2</div>
                <div className="text-neutral-600 text-sm">전문 디자이너</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-neutral-900 mb-1">100%</div>
                <div className="text-neutral-600 text-sm">고객 만족도</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              AI가 만드는 차이
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              모락은 AI 기술로 디자인 프로젝트의 모든 과정을 간편하게 만듭니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'AI 매칭',
                description: '프로젝트에 완벽하게 맞는 디자이너를 AI가 자동으로 추천해드립니다',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'AI 의뢰서',
                description: '간단한 질문에 답하면 전문적인 의뢰서가 자동으로 완성됩니다',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
              },
              {
                title: 'AI 검토',
                description: '프로젝트 진행 상황을 AI가 실시간으로 분석하고 피드백합니다',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 bg-neutral-50 rounded-2xl hover:bg-sky-50 transition-all border border-neutral-200 hover:border-sky-200"
              >
                <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              3단계로 시작하기
            </h2>
            <p className="text-lg text-neutral-600">
              복잡한 과정 없이 빠르게 시작하세요
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: '의뢰서 작성',
                description: 'AI가 질문하면 답변만 하세요',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: '매칭 완료',
                description: 'AI가 최적의 디자이너를 찾아드려요',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: '프로젝트 시작',
                description: '실시간 소통하며 작업을 진행하세요',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white p-8 rounded-2xl border border-neutral-200">
                  <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <div className="text-sm font-bold text-sky-600 mb-2">{item.step}</div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg className="w-8 h-8 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 bg-gradient-to-br from-sky-500 to-indigo-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-lg text-white/90 mb-8">
            3분이면 의뢰서 작성 완료. 무료로 시작하세요.
          </p>
          <Link
            to="request/category"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            <span>무료로 시작하기</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
