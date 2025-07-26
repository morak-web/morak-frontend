import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import HomePage from '../pages/HomePage';
import RequestListPage from '../pages/request-list/RequestListPage';
import ChooseCategoryPage from '../pages/request-write/ChooseCategoryPage';
import Login from '../pages/Login';

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/request/category" element={<ChooseCategoryPage />} />
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
