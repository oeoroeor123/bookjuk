/**
 * 회원 URL 매핑 관리
 *
 * Developer : 김재찬
 */

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Loading = <div className="loading">Loading...</div>

const LoginPage = lazy(() => import('../pages/user/LoginPage'));
const LogoutPage = lazy(() => import('../pages/user/LogoutPage'));
const SignUpPage = lazy(() => import('../pages/user/SignUpPage'));
const MyPage = lazy(() => import('../pages/user/MyPage'));
const UpdateUserPage = lazy(() => import('../pages/user/UpdateUserPage'));
const KakaoRedirectComp = lazy(() => import('../components/user/Kakao/KakaoRedirectComp'));
const KakaoEasySignup = lazy(() => import('../components/user/Kakao/KakaoEasySignup'));
const ProductLikePage = lazy(() => import('../pages/product/ProductLikePage'));
const CartUserPage = lazy(() => import('../pages/cart/CartUserPage'));
const OrderUserPage = lazy(() => import('../pages/order/OrderUserPage'));
const MyOrderPage = lazy(() => import('../pages/order/MyOrderPage'));
const OrderDetailPage = lazy(() => import('../pages/order/OrderDetailPage'));
const NaverRedirectComp = lazy(() => import('../components/user/Naver/NaverRedirectComp'));
const MyInfoPage = lazy(() => import('../pages/user/MyInfoPage'));
const AnonymousPage = lazy(() => import('../pages/user/AnonymousPage'));
const NaverEasySignup = lazy(() => import('../components/user/Naver/NaverEasySignup'));
const VerifyPassword = lazy(() => import('../components/user/VerifyPassword'));
const SecondhandMypagePage = lazy(() => import('../pages/secondhand/SecondhandMypagePage'));
const QnAMypagePage = lazy(() => import('../pages/qna/QnAMypagePage'));
const QnADetailMypagePage = lazy(() => import('../pages/qna/QnADetailMypagePage'));
const SignupTermsPage = lazy(() => import('../pages/user/SignupTermsPage'));

const UserRoutes = () => {
  return (
    <Suspense fallback={Loading}>
      <Routes>
          <Route path="/" element={<MyPage />}>
            <Route path="/myinfo" element={<MyInfoPage />}/>
            <Route path="/verify" element={<VerifyPassword />} />
            <Route path="/order/myOrder" element={<MyOrderPage />} />
            <Route path="/wish/:userId" element={<ProductLikePage />} />
            <Route path="/secondhand/:userId" element={<SecondhandMypagePage />} />
            <Route path="/qna/:userId" element={<QnAMypagePage />} />
            <Route path="/qna/detail/:qnaId" element={<QnADetailMypagePage />} />
          </Route>
            <Route path="/carts/user" element={<CartUserPage />} />
            <Route path="/order/Detail" element={<OrderDetailPage />} />
            <Route path="/order/user" element={<OrderUserPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signupTerms" element={<SignupTermsPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/update" element={<UpdateUserPage />} />
            <Route path="/anonymouspage" element={<AnonymousPage />}/>
            <Route path="/kakaoLogin" element={<KakaoRedirectComp />} />
            <Route path="/NaverLogin" element={<NaverRedirectComp />} />
            <Route path="/easySignup" element={<KakaoEasySignup />} />
            <Route path="/naverSignup" element={<NaverEasySignup />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
