/**
 * Q&A URL 매핑 관리
 *
 * Developer : 김민희
 */

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Loading = <div className="loading">Loading...</div>

const QnAPage = lazy(() => import('../pages/qna/QnAPage'));
const QnARegistPage = lazy(() => import('../pages/qna/QnARegistPage'));
const QnaDetailPage = lazy(() => import('../pages/qna/QnaDetailPage'));
const QnaModifyPage = lazy(() => import('../pages/qna/QnaModifyPage'));

const QnaRoutes = () => {
  return (
    <Suspense fallback={Loading}>
      <Routes>
        <Route path="/" element={<QnAPage />} />
        <Route path="/regist" element={<QnARegistPage />} />
        <Route path="/detail/:id" element={<QnaDetailPage />} />
        <Route path="/modify/:id" element={<QnaModifyPage />} />
      </Routes>
    </Suspense>
  );
};

export default QnaRoutes;
