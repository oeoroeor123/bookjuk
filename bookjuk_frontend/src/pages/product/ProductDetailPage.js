/**
 * 상품 상세 페이지
 * 
 * Developer : 이수정
 */

import React from 'react';
import ProductDetailComp from '../../components/product/ProductDetailComp';
import { useParams } from 'react-router-dom';
import ProductInquiryListComp from '../../components/product/ProductInquiryListComp';
import ProductReviewComp from '../../components/product/ProductReviewComp';

const ProductDetailPage = () => {

  // 경로 변수 처리
  const { productId } = useParams();
  
  return (
    <>
    <h2>📖 상품 상세 정보</h2>
    <ProductDetailComp id={productId} />
    <hr />
    <ProductInquiryListComp id={productId}/>
    <hr />
    <ProductReviewComp id={productId}/>
  </>
  );
};

export default ProductDetailPage;