import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
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
export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/home" element={<Home />} />
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
