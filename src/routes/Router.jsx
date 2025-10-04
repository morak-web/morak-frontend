import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// 홈페이지
import HomePage from '../pages/HomePage/HomePage';

// 채팅
import ChatPage from '../pages/ChatPage/ChatPage.jsx';
// 로그인, 회원가입 페이지
import SocialLoginPage from '../pages/SocialLoginPage/SocialLoginPage.jsx';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import AuthKakaoCallback from '../pages/Auth/AuthKakaoCallback.jsx';

// Client 페이지
import ClientPage from '../pages/Client/ClientPage';
import RequestListPage from '../pages/Client/RequestListPage/RequestListPage';
// 거래 내역 페이지
import PaymentListPage from '../pages/Client/PaymentPage/PaymentListPage.jsx';
// 의뢰 작성 페이지 (카테고리-직접 작성-AI-요약-완료)
import ChooseCategoryPage from '../pages/Client/RequestWritePage/ChooseCategoryPage';
import RequestWritePage from '../pages/Client/RequestWritePage/RequestWritePage';
import AIRequestPage from '../pages/Client/RequestWritePage/AIRequest/AIRequestPage.jsx';
import RequirementSummaryPage from '../pages/Client/RequestWritePage/RequirementSummaryPage';
import RequestWriteCompletePage from '../pages/Client/RequestWritePage/RequestWriteCompletePage';

// 의뢰 목록 페이지
import WritingPage from '../components/RequestList/Writing/WritingPage';
import MatchingPage from '../components/RequestList/Matching/MatchingPage';
import ProgressingPage from '../components/RequestList/Progressing/ProgressingPage';
import CompletePage from '../components/RequestList/Complete/CompletePage';
// 의뢰 목록 페이지 - 완료
import FinalFeedbackPage from '../pages/Client/RequestListPage/FinalFeedbackPage/FinalFeedbackPage.jsx';

// Designer 페이지
import DesignerPage from '../pages/Designer/DesignerPage';
import ProjectMatchingList from '../pages/Designer/matching/ProjectMatchingList';
import MyWorkListPage from '../pages/Designer/MyWorkList/MyWorkListPage.jsx';
import DesignerRequestDoingPage from '../pages/Designer/MyWorkList/DesignerRequestDoingPage.jsx';
import DesignerRequestCompletePage from '../pages/Designer/MyWorkList/DesignerRequestCompletePage.jsx';
import DesignerRegisterPage from '../pages/Designer/DesignerRegisterPage';
import MatchingDetailPage from '../pages/Designer/matching/MatchingDetailPage';

import MatchingSeeDetailPage from '../components/RequestList/Matching/MatchingSeeDetailPage';

import ProgressingSeeDetailPage from '../components/RequestList/Progressing/ProgressingSeeDetailPage.jsx';
import DesignerPortfolioPage from '../components/RequestList/portfolio/DesignerPortfolioPage.jsx';

export default function Router() {
  const hasToken = () => !!localStorage.getItem('accessToken');

  // "/" 진입 시: 토큰 있으면 홈, 없으면 로그인
  const AuthSwitch = () =>
    hasToken() ? <HomePage /> : <Navigate to="/login" replace />;
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AuthSwitch />} />
        <Route path="/login" element={<SocialLoginPage />} />
        <Route path="/auth/kakao/callback" element={<AuthKakaoCallback />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/request/category" element={<ChooseCategoryPage />} />
        <Route path="/request/write" element={<RequestWritePage />} />

        <Route path="/request/AI-question" element={<AIRequestPage />} />
        <Route
          path="/request/requirement-summary"
          element={<RequirementSummaryPage />}
        />
        <Route
          path="/request/write/complete"
          element={<RequestWriteCompletePage />}
        />

        {/* client  */}
        <Route path="/client-page" element={<ClientPage />}>
          <Route index element={<Navigate to="request-list" replace />} />
          {/* request-list */}
          <Route path="request-list" element={<RequestListPage />}>
            <Route index element={<Navigate to="writing" replace />} />
            <Route path="writing" element={<WritingPage />} />
            <Route path="matching" element={<MatchingPage />} />
            <Route path="progressing" element={<ProgressingPage />} />
            <Route path="complete" element={<CompletePage />} />
          </Route>
          {/* matching-detail */}
          <Route
            path="matching-detail/:id"
            element={<MatchingSeeDetailPage />}
          />
          {/* progressing-deatil */}
          <Route
            path="designer-portfolio/:id"
            element={<DesignerPortfolioPage />}
          />
          <Route
            path="working-detail/:id"
            element={<ProgressingSeeDetailPage />}
          />
          <Route path="payment-list" element={<PaymentListPage />} />
        </Route>
        <Route
          path="/client-page/request-list/complete/final-feedback/:id"
          element={<FinalFeedbackPage />}
        />

        {/* designer */}
        <Route path="/designer-page" element={<DesignerPage />}>
          <Route index element={<Navigate to="register" replace />} />
          <Route
            path="project-matching-wait"
            element={<ProjectMatchingList />}
          />
          {/* <Route path="project/:id" element={<MatchingDetailPage />} /> */}
          <Route path="project/:id" element={<MatchingDetailPage />} />
          <Route path="my-work-list" element={<MyWorkListPage />} />
          <Route
            path="request-doing/:id"
            element={<DesignerRequestDoingPage />}
          />
          <Route
            path="request-complete/:id"
            element={<DesignerRequestCompletePage />}
          />
          <Route path="register" element={<DesignerRegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
