/**
 * 상품 페이지 이동 네비게이터
 */

import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';

const ProductNavigate = () => {
  // useNavigate() : 페이지 이동 Hooks
  const navigate = useNavigate();

  // useSearchParams() : Query String(쿼리 스트링)으로 전달되는 요청 파라미터 처리
  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));

  // 상품 리스트로 이동
  const goToProductListPage = (pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'productId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString();
    } else {
      const sort = 'productId,desc';
      queryString = createSearchParams({ page, size, sort }).toString();
    }
    navigate({
      pathname: `/product/list`,
      search: queryString,
    });
  };

  // 상품 상세 페이지로 이동
  const goToProductDetailPage = (productId, pageParam) => {
    let queryString = '';

    if (pageParam) {
      const sort = !pageParam.sort ? 'productId,desc' : pageParam.sort;
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      queryString = createSearchParams({ page, size, sort }).toString();
    } else {
      const sort = 'productId,desc';
      queryString = createSearchParams({ page, size, sort }).toString(); // `page=${page}&size=${size}&sort=${sort}`
    }
    navigate({
      pathname: `/product/detail/${productId}`,
      search: queryString,
    });
  };

  // 상품 좋아요 페이지로 이동
  const goToProductLikePage = (userId) => {
   navigate(`/user/wish/${userId}`, {
    state: {
      userId: userId,
      } 
     })
   };


  return {
    goToProductListPage, // 상품 리스트
    goToProductDetailPage, // 상품 상세
    goToProductLikePage,
  };
};
export default ProductNavigate;
