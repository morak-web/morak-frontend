import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// 홈페이지
import HomePage from '../pages/HomePage';

// 로그인, 회원가입 페이지
import Login from '../pages/Login';
import SignUpPage from '../pages/SignUpPage';

// Client 페이지
import ClientPage from '../pages/Client/ClientPage';
import RequestListPage from '../pages/Client/RequestList/RequestListPage';
// 거래 내역 페이지
import PaymentListPage from '../pages/Client/Payment/PaymentListPage';
// 의뢰 작성 페이지 (카테고리-직접 작성-AI-요약-완료)
import ChooseCategoryPage from '../pages/request-write/ChooseCategoryPage';
import RequestWritePage from '../pages/request-write/RequestWritePage';
import AIRequestPage from '../pages/request-write/AIRequestPage';
import RequirementSummaryPage from '../pages/request-write/RequirementSummaryPage';
import RequestWriteCompletePage from '../pages/request-write/RequestWriteCompletePage';

// 의뢰 목록 페이지
import WritingPage from '../pages/Client/RequestList/WritingPage';
import MatchingPage from '../pages/Client/RequestList/MatchingPage';
import ProgressingPage from '../pages/Client/RequestList/ProgressingPage';
import CompletePage from '../pages/Client/RequestList/CompletePage';
// 의뢰 목록 페이지 - 완료
import FinalFeedbackPage from '../pages/request-list/FinalFeedback/FinalFeedbackPage';

// Designer 페이지
import DesignerPage from '../pages/Designer/DesignerPage';
import ProjectMatchingList from '../pages/Designer/matching/ProjectMatchingList';
import MyWorkListPage from '../pages/Designer/MyWorkListPage';
import DesignerRequestDoingPage from '../pages/Designer/DesignerRequestDoingPage';
import DesignerRequestCompletePage from '../pages/Designer/DesignerRequestCompletePage';
import DesignerRegisterPage from '../pages/Designer/DesignerRegisterPage';
export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUpPage />} />
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
          <Route path="request-list" element={<RequestListPage />}>
            <Route path="writing" element={<WritingPage />} />
            <Route path="matching" element={<MatchingPage />} />
            <Route path="progressing" element={<ProgressingPage />} />
            <Route path="complete" element={<CompletePage />} />
          </Route>
          <Route path="payment-list" element={<PaymentListPage />} />
        </Route>
        <Route
          path="/client-page/request-list/complete/final-feedback"
          element={<FinalFeedbackPage />}
        />

        {/* designer */}
        <Route path="/designer-page" element={<DesignerPage />}>
          <Route index element={<Navigate to="register" replace />} />
          <Route
            path="project-matching-wait"
            element={<ProjectMatchingList />}
          />
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
