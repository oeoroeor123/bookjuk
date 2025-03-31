/**
 * 주문 URL 매핑 관리
 *
 * Developer : 조범희
 */

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Loading = <div className="loading">Loading...</div>

const OrderUserPage = lazy(() => import('../pages/order/OrderUserPage'));
const MyOrderPage = lazy(() => import('../pages/order/MyOrderPage'));
const OrderDetailPage = lazy(() => import('../pages/order/OrderDetailPage'));

const OrderRoutes = () => {
  return (
    <Suspense fallback={Loading}>
      <Routes>
        <Route path="/user" element={<OrderUserPage />} />
        <Route path="/myOrder" element={<MyOrderPage />} />
        <Route path="/Detail" element={<OrderDetailPage />} />
      </Routes>
    </Suspense>
  );
};

export default OrderRoutes;
