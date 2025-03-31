/**
 * 상품 좋아요 페이지
 * 
 * Developer : 이수정
 */

import React from 'react';
import ProductLikeComp from '../../components/product/ProductLikeComp';
import { useParams } from 'react-router-dom';

const LikePage = () => {
  
  // ProductLikeComp에서 props로 받는 userId 선언하기
  const {userId} = useParams();

  return (
      <>
      <ProductLikeComp userId={userId}/>
      </>
  );
};

export default LikePage;