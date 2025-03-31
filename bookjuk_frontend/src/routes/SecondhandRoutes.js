/**
 * 중고상품 URL 매핑 관리
 *
 * Developer : 김민희
 */

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Loading = <div className="loading">Loading...</div>

const SecondHandPage = lazy(() => import('../pages/secondhand/SecondHandPage'))
const SecondHandRegistPage = lazy(() => import('../pages/secondhand/SecondHandRegistPage'))
const SecondHandDetailPage = lazy(() => import('../pages/secondhand/SecondHandDetailPage'))
const SecondHandModifyPage = lazy(() => import('../pages/secondhand/SecondHandModifyPage'))

const SecondhandRoutes = () => {
  return (
    <Suspense fallback={Loading}>
      <Routes>
        <Route path="/" element={<SecondHandPage />} />
        <Route path="/regist" element={<SecondHandRegistPage />} />
        <Route path="/detail/:id" element={<SecondHandDetailPage />} />
        <Route path="/modify/:id" element={<SecondHandModifyPage />} />
      </Routes>
    </Suspense>
  );
};

export default SecondhandRoutes;
