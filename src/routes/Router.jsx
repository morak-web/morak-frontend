import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RequestListPage from '../pages/request-list/RequestListPage';
import ChooseCategoryPage from '../pages/request-write/ChooseCategoryPage';
import Login from '../pages/Login';
import SignUpPage from '../pages/SignUpPage';
import RequestWritePage from '../pages/request-write/RequestWritePage';
import RequestWriteCompletePage from '../pages/request-write/RequestWriteCompletePage';
import AIRequestPage from '../pages/request-write/AIRequestPage';
import RequirementSummaryPage from '../pages/request-write/RequirementSummaryPage';
import FinalFeedbackPage from '../pages/request-list/FinalFeedback/FinalFeedbackPage';
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
        <Route path="/request-list" element={<RequestListPage />} />
        <Route
          path="/request-list/final-feedback"
          element={<FinalFeedbackPage />}
        />
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
