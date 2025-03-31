/**
 * 관리자 URL 매핑 관리
 *
 * Developer : 김리예
 */

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Loading = <div className="loading">Loading...</div>;

const AdminPage = lazy(() => import('../pages/admin/AdminPage'));
const AdminPanelPage = lazy(() => import('../pages/user/AdminPanelPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const LoginLogPage = lazy(() => import('../pages/admin/log/LoginLogPage'));
const DeleteLogPage = lazy(() => import('../pages/admin/log/DeleteLogPage'));
const AdminProductListPage = lazy(() => import('../pages/admin/product/AdminProductListPage'));
const AdminProductRegistPage = lazy(() => import('../pages/admin/product/AdminProductRegistPage'));
const AdminProductDetailPage = lazy(() => import('../pages/admin/product/AdminProductDetailPage'));
const AdminProductEditPage = lazy(() => import('../pages/admin/product/AdminProductEditPage'));
const AdminSecondHandListPage = lazy(() => import('../pages/admin/secondhand/AdminSecondHandListPage'));
const AdminSecondHandDetailPage = lazy(() => import('../pages/admin/secondhand/AdminSecondHandDetailPage'));
const AdminQnAListPage = lazy(() => import('../pages/admin/qna/AdminQnAListPage'));
const AdminQnADetailPage = lazy(() => import('../pages/admin/qna/AdminQnADetailPage'));
const AdminInquiryListPage = lazy(() => import('../pages/admin/inquiry/AdminInquiryListPage'));
const AdminInquiryDetailPage = lazy(() => import('../pages/admin/inquiry/AdminInquiryDetailPage'));
const AdminReviewListPage = lazy(() => import('../pages/admin/review/AdminReviewListPage'));
const AdminReviewDetailPage = lazy(() => import('../pages/admin/review/AdminReviewDetailPage'));
const AdminOrderListPage = lazy(() => import('../pages/admin/order/AdminOrderListPage'));
const AdminOrderDetailPage = lazy(() => import('../pages/admin/order/AdminOrderDetailPage'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={Loading}>
      <Routes>
        <Route path="/" element={<AdminPage />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="/loginlog" element={<LoginLogPage />} />
          <Route path="/deletelog" element={<DeleteLogPage />} />
          <Route path="/product/list" element={<AdminProductListPage />} />
          <Route path="/product/regist" element={<AdminProductRegistPage />} />
          <Route path="/secondhand" element={<AdminSecondHandListPage />} />
          <Route path="/secondhand/:secondhandId" element={<AdminSecondHandDetailPage />} />
          <Route path="/product/detail/:productId" element={<AdminProductDetailPage />} />
          <Route path="/product/edit/:productId" element={<AdminProductEditPage />} />
          <Route path="/qna" element={<AdminQnAListPage />} />
          <Route path="/qna/:qnaId" element={<AdminQnADetailPage />} />
          <Route path="/inquiry" element={<AdminInquiryListPage />} />
          <Route path="/inquiry/:inquiryId" element={<AdminInquiryDetailPage />} />
          <Route path="/review" element={<AdminReviewListPage />} />
          <Route path="/review/:reviewId" element={<AdminReviewDetailPage />} />
          <Route path="/order" element={<AdminOrderListPage />} />
          <Route path="/order/:orderId" element={<AdminOrderDetailPage />} />
          <Route path="/userSetting" element={<AdminPanelPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
