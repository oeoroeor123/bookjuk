/**
 * 검색 결과 페이지
 * 
 * Developer : 이수정
 */

import React from 'react';
import SearchResultComp from '../../components/product/SearchResultComp';

const SearchResultPage = () => {

  // 검색 결과 받아오기
  // const {searchQuery} = useParams();

  return (
    <div>
      <SearchResultComp />
    </div>
  );
};

export default SearchResultPage;