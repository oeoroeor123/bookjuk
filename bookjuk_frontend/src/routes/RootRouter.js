import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Loading
const Loading = <div className="loading">Loading...</div>

// BasicLayout
const BasicLayout = lazy(() => import('../layouts/BasicLayout'))

// 관리자
const AdminRoutes = lazy(() => import('./AdminRoutes'))

// 장바구니
const CartUserPage = lazy(() => import('../pages/cart/CartUserPage'))

// 각 페이지별 라우터
const IndexPage = lazy(() => import('../pages/IndexPage'))
const ProductRoutes = lazy(() => import('./ProductRoutes'))
const SecondhandRoutes = lazy(() => import('./SecondhandRoutes'))
const NoticeRoutes = lazy(() => import('./NoticeRoutes'))
const FaqRoutes = lazy(() => import('./FaqRoutes'))
const QnaRoutes = lazy(() => import('./QnaRoutes'))
const OrderRoutes = lazy(() => import('./OrderRoutes'))
const UserRoutes = lazy(() => import('./UserRoutes'))
const SearchRoutes = lazy(() => import('./SearchRoutes'))

const RootRouter = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={Loading}>
        <Routes>
          <Route element={<BasicLayout/>}>
            <Route path="/"             element={<IndexPage/>} />
            <Route path="/admin/*"      element={<AdminRoutes/>} />
            <Route path="/product/*"    element={<ProductRoutes/>} />
            <Route path="/secondhand/*" element={<SecondhandRoutes/>} />
            <Route path="/notice/*"     element={<NoticeRoutes/>} />
            <Route path="/faq/*"        element={<FaqRoutes/>} />
            <Route path="/qna/*"        element={<QnaRoutes/>} />
            <Route path="/order/*"      element={<OrderRoutes/>} />
            <Route path="/user/*"       element={<UserRoutes/>} />
            <Route path="/carts/user"   element={<CartUserPage/>} />
            <Route path="/search/*"     element={<SearchRoutes/>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );

}

export default RootRouter;