/**
 * 공지사항 URL 매핑 관리
 *
 * Developer : 김민희
 */

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Loading = <div className="loading">Loading...</div>

const NoticePage = lazy(() => import('../pages/notice/NoticePage'));
const NoticeRegistPage = lazy(() => import('../pages/notice/NoticeRegistPage'));
const NoticeDetailPage = lazy(() => import('../pages/notice/NoticeDetailPage'));
const NoticeModifyPage = lazy(() => import('../pages/notice/NoticeModifyPage'));

const NoticeRoutes = () => {
  return (
    <Suspense fallback={Loading}>
      <Routes>
        <Route path="/" element={<NoticePage />} />
        <Route path="/regist" element={<NoticeRegistPage />} />
        <Route path="/detail/:id" element={<NoticeDetailPage />} />
        <Route path="/modify/:id" element={<NoticeModifyPage />} />
      </Routes>
    </Suspense>
  );
};

export default NoticeRoutes;
