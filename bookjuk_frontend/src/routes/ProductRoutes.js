/**
 * 상품 URL 매핑 관리
 *
 * Developer : 이수정
 */

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Loading = <div className="loading">Loading...</div>

const ProductPage = lazy(() => import('../pages/product/ProductPage'))
const ProductInquiryPage = lazy(() => import('../pages/product/ProductInquiryPage'))
const ProductInquiryDetailPage = lazy(() => import('../pages/product/ProductInquiryDetailPage'))
const ProductDetailPage = lazy(() => import('../pages/product/ProductDetailPage'))

const ProductRoutes = () => {
  return (
    <Suspense fallback={Loading}>
      <Routes>
        {/* 상품 신상도서, 인기도서 페이지 */}
        <Route path="/" element={<ProductPage />} />

        {/* 상품 상세 페이지 */}
        <Route path="/detail/:productId" element={<ProductDetailPage />} />

        {/* 상품 문의 상세 페이지 */}
        <Route path="/inquiry/:inquiryId" element={<ProductInquiryDetailPage />} />

        {/* 상품 문의 등록 페이지 */}
        <Route path="/inquiry/regist/:productId" element={<ProductInquiryPage />} />
      </Routes>
    </Suspense>
  );
};

export default ProductRoutes;
