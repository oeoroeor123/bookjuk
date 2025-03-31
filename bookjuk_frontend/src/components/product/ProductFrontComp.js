/**
 * 상품 메인
 * 
 * Developer : 이수정
 */

import { useState } from 'react';
import ProductNewComp from './ProductNewComp';
import ProductPopularComp from './ProductPopularComp';

const ProductFrontComp = () => {

  // 탭에 따라 신상, 인기 도서 노출(초기값 : 신상 도서)
  const [selectedTab, setSelectedTab] = useState('new');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
  <div className='tabs'>
    <button className={`tab-btn ${selectedTab === 'new' ? 'active' : ''}`}
    onClick={() => handleTabClick('new')}>신상 도서</button>

    <button className={`tab-btn ${selectedTab === 'popular' ? 'active' : ''}`}
    onClick={() => handleTabClick('popular')}>인기 도서</button>
  </div>

  <div className='comp'>
    {selectedTab === 'new' && <ProductNewComp />}
    {selectedTab === 'popular' && <ProductPopularComp />}
  </div>
    </>
  );
};

export default ProductFrontComp;