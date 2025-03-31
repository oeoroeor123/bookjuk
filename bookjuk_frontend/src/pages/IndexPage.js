/**
 * 메인 페이지
 *
 * Developer : 김리예
 */

import React from 'react';
import NewProductComp from '../components/main/NewProductComp';
import PopularProductComp from '../components/main/PopularProductComp';
import RecommendedProductComp from '../components/main/RecommendedProductComp';

const IndexPage = () => {
  return (
    <>
      <RecommendedProductComp />
      <NewProductComp />
      <PopularProductComp />
    </>
  );
};

export default IndexPage;
