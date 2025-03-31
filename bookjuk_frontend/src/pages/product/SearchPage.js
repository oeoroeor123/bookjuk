/**
 * 통합 검색 페이지
 * 
 * Developer : 이수정
 */

import React from 'react';
import SearchComp from '../../components/product/SearchComp';

const SearchPage = () => {
  
  // SearchComp에서 props로 받는 userId 선언하기
  // const {userId} = useParams();
  // const parsedUserId = userId && !isNaN(userId) ? Number(userId) : null;

  // console.log('유저아이디', userId);

  return (
    <div>
      <SearchComp/>
    </div>
  );
};

export default SearchPage;