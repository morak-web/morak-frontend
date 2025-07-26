import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import RequestListPage from '../pages/request-list/RequestListPage';
import ChooseCategoryPage from '../pages/request-write/ChooseCategoryPage';
import RequestWritePage from '../pages/request-write/RequestWritePage';

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request/category" element={<ChooseCategoryPage />} />
        <Route path="/request/write" element={<RequestWritePage />} />
        <Route path="/request-list" element={<RequestListPage />}>
          {/* <Route path="/reques/t-detail" /> */}
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
