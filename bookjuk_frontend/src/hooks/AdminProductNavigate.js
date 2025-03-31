/**
 * 관리자 상품 관련 페이지 이동 네비게이터
 * 
 * 김성율꺼
 */


import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

const AdminProductNavigate = () => {

  // useNavigate() : 페이지 이동 Hooks
  const navigate = useNavigate();

  // useSearchParams() : Query String(쿼리 스트링)으로 전달되는 요청 파라미터 처리
  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page')); // 요청 파라미터 page가 없으면 page=1 사용
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size')); // 요청 파라미터 size가 없으면 size=10 사용
  const sort = !queryParams.get('sort') ? 'id,desc' : queryParams.get('sort'); // 요청 파라미터 sort가 없으면 sort=id,desc 사용

  const defaultQueryString = createSearchParams({ page, size, sort }).toString(); // `page=${page}&size=${size}&sort=${sort}`

  // 관리자 - (목록) 상품 리스트로 이동
  const goToProductListPage = (pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'productId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString(); //`page=${page}&size=${size}&sort=${sort}`
    } else {
      const sort = 'productId,desc';
      queryString = createSearchParams({ page, size, sort }).toString(); // `page=${page}&size=${size}&sort=${sort}`
    }
    navigate({
      pathname: `/admin/product/list`,
      search: queryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };

  // 관리자 - 상품 상세 페이지 이동동
  const goToProductDetailPage = (productId, pageParam) => {

    // pageParam이 undefined일 경우 기본값 설정
    const page = !pageParam?.get('page') ? 1 : pageParam.get('page');
    const size = !pageParam?.get('size') ? 10 : pageParam.get('size');
    const sort = !pageParam?.get('sort') ? 'productId,desc' : pageParam.get('sort');

    // 쿼리 문자열 생성
    const queryString = createSearchParams({ page, size, sort }).toString();

    // 네비게이션
    navigate({
      pathname: `/admin/product/detail/${productId}`,
      search: queryString,
    });
  };
  
// 관리자 - 상품 수정 페이지로 이동
const goToProductRegistPage = () => {
  navigate('/admin/product/regist');
};

  // 관리자 - 상품 수정 페이지로 이동
  const goToProductEditPage = (productId) => {
    navigate({
      pathname: `/admin/product/edit/${productId}`,
      search: defaultQueryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };


  return {

    goToProductListPage, // Product 목록 이동 페이지
    goToProductRegistPage, // Product 등록 이동 페이지지
    goToProductDetailPage, // Product 상세 이동 페이지
    goToProductEditPage, // Product 수정 이동 페이지


  };
};

export default AdminProductNavigate;