/**
 * 관리자 페이지 이동 네비게이터
 */

import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';

const AdminNavigate = () => {
  // useNavigate() : 페이지 이동 Hooks
  const navigate = useNavigate();

  // useSearchParams() : Query String(쿼리 스트링)으로 전달되는 요청 파라미터 처리
  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page')); // 요청 파라미터 page가 없으면 page=1 사용
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size')); // 요청 파라미터 size가 없으면 size=10 사용

  // 관리자 - 회원 로그인 로그 목록 페이지로 이동
  const goToLoginLogListPage = (pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'loginDt,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString();
    } else {
      const sort = 'loginDt,desc';
      queryString = createSearchParams({ page, size, sort }).toString();
    }
    navigate({
      pathname: `/admin/loginlog`,
      search: queryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };

    // 관리자 - 회원 탈퇴 로그 목록 페이지로 이동
    const goToDeleteLogListPage = (pageParam) => {
      let queryString = '';
      if (pageParam) {
        const page = !pageParam.page ? 1 : parseInt(pageParam.page);
        const size = !pageParam.size ? 10 : parseInt(pageParam.size);
        const sort = !pageParam.sort ? 'deleteDt,desc' : pageParam.sort;
        queryString = createSearchParams({ page, size, sort }).toString();
      } else {
        const sort = 'deleteDt,desc';
        queryString = createSearchParams({ page, size, sort }).toString();
      }
      navigate({
        pathname: `/admin/deletelog`,
        search: queryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
      });
    };

  // 관리자 - Q&A 목록 페이지로 이동
  const goToQnAListPage = (pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'qnaId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString();
    } else {
      const sort = 'qnaId,desc';
      queryString = createSearchParams({ page, size, sort }).toString();
    }
    navigate({
      pathname: `/admin/qna`,
      search: queryString,
    });
  };

  // 관리자 - Q&A 상세 페이지로 이동
  const goToQnADetailPage = (qnaId, pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'qnaId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString();
    } else {
      const sort = 'qnaId,desc';
      queryString = createSearchParams({ page, size, sort }).toString();
    }
    navigate({
      pathname: `/admin/qna/${qnaId}`,
      search: queryString,
    });
  };

  // 관리자 - 중고 상품관리 리스트로 이동
  const goToSecondHandListPage = (pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'secondhandId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString();
    } else {
      const sort = 'secondhandId,desc';
      queryString = createSearchParams({ page, size, sort }).toString();
    }
    navigate({
      pathname: `/admin/secondhand`,
      search: queryString,
    });
  };

  // 관리자 - 상품관리 상세로 이동
  const goToSecondhandDetailPage = (secondhandId, pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'secondhandId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString();
    } else {
      const sort = 'secondhandId,desc';
      queryString = createSearchParams({ page, size, sort }).toString();
    }
    navigate({
      pathname: `/admin/secondhand/${secondhandId}`,
      search: queryString,
    });
  };

  // 관리자 - 상품문의 리스트로 이동
  const goToInquiryListPage = (pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'inquiryId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString();
    } else {
      const sort = 'inquiryId,desc';
      queryString = createSearchParams({ page, size, sort }).toString();
    }
    navigate({
      pathname: `/admin/inquiry`,
      search: queryString,
    });
  };

  // 관리자 - 상품문의 상세 페이지로 이동
  const goToInquiryDetailPage = (inquiryId, pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'inquiryId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString();
    } else {
      const sort = 'inquiryId,desc';
      queryString = createSearchParams({ page, size, sort }).toString();
    }
    navigate({
      pathname: `/admin/inquiry/${inquiryId}`,
      search: queryString,
    });
  };

  // 관리자 - 상품 상세 페이지로 이동
  const goToAdminProductDetailPage = (productId, pageParam) => {
    let queryString = '';

    const page = !pageParam.get('page') ? 1 : pageParam.get('page');
    const size = !pageParam.get('size') ? 10 : pageParam.get('size');
    const sort = !pageParam.get('sort') ? 'productId,desc' : pageParam.get('sort');

    queryString = createSearchParams({ page, size, sort }).toString();
    navigate({
      pathname: `/admin/product/detail/${productId}`,
      search: queryString,
    });
  };

  // 관리자 - 리뷰 리스트로 이동
  const goToReviewListPage = (pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'reviewId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString();
    } else {
      const sort = 'reviewId,desc';
      queryString = createSearchParams({ page, size, sort }).toString();
    }
    navigate({
      pathname: `/admin/review`,
      search: queryString,
    });
  };

  // 관리자 - 리뷰 상세로 이동
  const goToReviewDetailPage = (reviewId, pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'reviewId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString();
    } else {
      const sort = 'reviewId,desc';
      queryString = createSearchParams({ page, size, sort }).toString();
    }
    navigate({
      pathname: `/admin/review/${reviewId}`,
      search: queryString,
    });
  };

  // 관리자 - 주문 리스트로 이동
  const goToOrderListPage = (pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'orderId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString();
    } else {
      const sort = 'orderId,desc';
      queryString = createSearchParams({ page, size, sort }).toString();
    }
    navigate({
      pathname: `/admin/order`,
      search: queryString,
    });
  };

  // 관리자 - 주문 상세로 이동
  const goToOrderDetailPage = (orderid, pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'orderid,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString();
    } else {
      const sort = 'orderid,desc';
      queryString = createSearchParams({ page, size, sort }).toString();
    }
    navigate({
      pathname: `/admin/order/${orderid}`,
      search: queryString,
    });
  };

  return {
    goToLoginLogListPage, // Admin 회원 로그인 로그 목록
    goToSecondHandListPage, //Admin 중고 상품 목록
    goToSecondhandDetailPage, //Admin 중고 상품 상세
    goToQnAListPage, // Admin Q&A 목록
    goToQnADetailPage, // Admin Q&A 상세
    goToInquiryListPage, // Admin 상품문의 목록
    goToInquiryDetailPage, // Admin 상품문의 상세
    goToReviewListPage, // Admin 리뷰 목록
    goToReviewDetailPage, // Admin 리뷰 상세
    goToAdminProductDetailPage, // 관리자 Product 상세
    goToOrderListPage, // 관리자 Order 목록
    goToOrderDetailPage, // 관리자 Order 상세
  };
};

export default AdminNavigate;
