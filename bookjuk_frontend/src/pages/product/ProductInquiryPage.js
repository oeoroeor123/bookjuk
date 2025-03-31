import React from 'react';
import { useParams } from 'react-router-dom';
import ProductInquiryWriteComp from '../../components/product/ProductInquiryWriteComp';

const ProductInquiryPage = () => {

   // 경로 변수 처리
   const { productId } = useParams();
  
  return (
    <div>
      <ProductInquiryWriteComp Id={productId} /> 
    </div>
  );
};

export default ProductInquiryPage;