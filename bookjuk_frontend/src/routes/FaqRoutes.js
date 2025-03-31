/**
 * FAQ URL 매핑 관리
 *
 * Developer : 김민희
 */

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Loading = <div className="loading">Loading...</div>

const FAQPage = lazy(() => import('../pages/faq/FAQPage'));
const FAQRegistPage = lazy(() => import('../pages/faq/FAQRegistPage'));
const FAQDetailPage = lazy(() => import('../pages/faq/FAQDetailPage'));
const FAQModifyPage = lazy(() => import('../pages/faq/FAQModifyPage'));

const FaqRoutes = () => {
  return (
    <Suspense fallback={Loading}>
      <Routes>
        <Route path="/" element={<FAQPage />} />
        <Route path="/regist" element={<FAQRegistPage />} />
        <Route path="/detail/:id" element={<FAQDetailPage />} />
        <Route path="/modify/:id" element={<FAQModifyPage />} />
      </Routes>
    </Suspense>
  );
};

export default FaqRoutes;
