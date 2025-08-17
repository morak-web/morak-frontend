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
import CreateRequestPage from '../pages/Client/CreateRequest/CreateRequestPage';
import ChooseCategoryPage from '../pages/request-write/ChooseCategoryPage';
import RequestWritePage from '../pages/request-write/RequestWritePage';
import AIRequestPage from '../pages/request-write/AIRequestPage';
import RequirementSummaryPage from '../pages/request-write/RequirementSummaryPage';
import RequestWriteCompletePage from '../pages/request-write/RequestWriteCompletePage';

// 의뢰 목록 페이지
import DraftPage from '../pages/Client/RequestList/DraftPage';
import MatchingPage from '../pages/Client/RequestList/MatchingPage';
import WorkingPage from '../pages/Client/RequestList/WorkingPage';
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
import MatchingDetailPage from '../pages/Designer/matching/MatchingDetailPage';
import RequestDetailNoDesignerPage from '../pages/request-list/components/RequestDetailNoDesignerPage';
import RequestDetailPage from '../pages/request-list/components/RequestDetailPage';
import DesignerPortfolioPage from '../pages/request-list/components/DesignerPortfolioPage';

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        {/* create-request */}
        <Route path="/create-request" element={<CreateRequestPage />} />
        {/* <Route path="/request/category" element={<ChooseCategoryPage />} />
        <Route path="/request/write" element={<RequestWritePage />} />

        <Route path="/request/AI-question" element={<AIRequestPage />} />
        <Route
          path="/request/requirement-summary"
          element={<RequirementSummaryPage />}
        />
        <Route
          path="/request/write/complete"
          element={<RequestWriteCompletePage />}
        /> */}

        {/* client  */}
        <Route path="/client-page" element={<ClientPage />}>
          <Route index element={<Navigate to="request-list" replace />} />
          {/* request-list */}
          <Route path="request-list" element={<RequestListPage />}>
            <Route index element={<Navigate to="draft" replace />} />
            <Route path="draft" element={<DraftPage />} />
            <Route path="matching" element={<MatchingPage />} />
            <Route path="working" element={<WorkingPage />} />
            <Route path="complete" element={<CompletePage />} />
          </Route>
          {/* matching-detail */}
          <Route
            path="matching-detail"
            element={<RequestDetailNoDesignerPage />}
          />
          {/* progressing-deatil */}
          <Route
            path="designer-portfolio"
            element={<DesignerPortfolioPage />}
          />
          <Route path="request-detail" element={<RequestDetailPage />} />
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
          {/* <Route path="project/:id" element={<MatchingDetailPage />} /> */}
          <Route path="project" element={<MatchingDetailPage />} />
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
