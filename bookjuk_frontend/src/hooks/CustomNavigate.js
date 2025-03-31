/**
 * 공통 - 페이지 이동 네비게이터
 */

import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';

const CustomNavigate = () => {
  // useNavigate() : 페이지 이동 Hooks
  const navigate = useNavigate();

  // useSearchParams() : Query String(쿼리 스트링)으로 전달되는 요청 파라미터 처리
  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page')); // 요청 파라미터 page가 없으면 page=1 사용
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size')); // 요청 파라미터 size가 없으면 size=10 사용
  const sort = !queryParams.get('sort') ? 'id,desc' : queryParams.get('sort'); // 요청 파라미터 sort가 없으면 sort=id,desc 사용

  const defaultQueryString = createSearchParams({ page, size, sort }).toString(); // `page=${page}&size=${size}&sort=${sort}`

  // 중고거래 목록 페이지로 이동
  const goToSecondhandListPage = (pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'secondhandId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString(); //`page=${page}&size=${size}&sort=${sort}`
    } else {
      const sort = 'secondhandId,desc';
      queryString = createSearchParams({ page, size, sort }).toString(); // `page=${page}&size=${size}&sort=${sort}`
    }

    navigate({
      pathname: `/secondhand`,
      search: queryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };

  // 중고거래 상세 페이지로 이동
  const goToSecondhandDetailPage = (id) => {
    navigate({
      pathname: `/secondhand/detail/${id}`,
      search: defaultQueryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };

  // 중고거래 수정 페이지로 이동
  const goToSecondhandModifyPage = (id) => {
    navigate({
      pathname: `/secondhand/modify/${id}`,
      search: defaultQueryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };


  // Product 신규 도서 목록 페이지 이동
  const goToNewProductListPage = () => {
    navigate({
      pathname: `/product`
    });
  }  

  // Product 일반용 상세 페이지 이동
  const goToProductListDetailPage = (productId) => {
    navigate({
      pathname: `/product/detail/${productId}`
    });
  }

  // Product 좋아요 페이지 이동
  const goToProductLikePage = (userId) => {
    navigate({
      pathname: `/user/wish/${userId}`
    });
  }

  // 공지사항 목록 페이지로 이동
  const goToNoticeListPage = (pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'noticeId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString(); //`page=${page}&size=${size}&sort=${sort}`
    } else {
      const size = 20;
      const sort = 'noticeId,desc';
      queryString = createSearchParams({ page, size, sort }).toString(); // `page=${page}&size=${size}&sort=${sort}`
    }

    navigate({
      pathname: `/notice`,
      search: queryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };
  
  // 공지사항 상세 페이지로 이동
  const goToNoticeDetailPage = (id) => {
    navigate({
      pathname: `/notice/detail/${id}`,
      search: defaultQueryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };

  // 공지사항 등록 페이지로 이동
  const goToNoticeRegistPage = () => {
    navigate({
      pathname: `/notice/regist`,
      search: defaultQueryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });  
  };    

  // 공지사항 수정 페이지로 이동
  const goToNoticeModifyPage = (id) => {
    navigate({
      pathname: `/notice/modify/${id}`,
      search: defaultQueryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };

  // faq 목록 페이지로 이동
  const goToFaqListPage = (pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'faqId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString(); //`page=${page}&size=${size}&sort=${sort}`
    } else {
      const size = 20;
      const sort = 'faqId,desc';
      queryString = createSearchParams({ page, size, sort }).toString(); // `page=${page}&size=${size}&sort=${sort}`
    }

    navigate({
      pathname: `/faq`,
      search: queryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };
  
  // faq 상세 페이지로 이동
  const goToFaqDetailPage = (id) => {
    navigate({
      pathname: `/faq/detail/${id}`,
      search: defaultQueryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };
  
  // faq 등록 페이지로 이동
  const goToFaqRegistPage = () => {
    navigate({
      pathname: `/faq/regist`,
      search: defaultQueryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });  
  };    

  // faq 수정 페이지로 이동
  const goToFaqModifyPage = (id) => {
    navigate({
      pathname: `/faq/modify/${id}`,
      search: defaultQueryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };
  
  // qna 목록 페이지로 이동
  const goToQnaListPage = (pageParam) => {
    let queryString = '';
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 10 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? 'qnaId,desc' : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString(); //`page=${page}&size=${size}&sort=${sort}`
    } else {
      const size = 20;
      const sort = 'qnaId,desc';
      queryString = createSearchParams({ page, size, sort }).toString(); // `page=${page}&size=${size}&sort=${sort}`
    }

    navigate({
      pathname: `/qna`,
      search: queryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };
   
  // qna 상세 페이지로 이동
  const goToQnaDetailPage = (id) => {
    navigate({
      pathname: `/qna/detail/${id}`,
      search: defaultQueryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };

  // qna 등록 페이지로 이동
  const goToQnaRegistPage = () => {
    navigate({
      pathname: `/qna/regist`,
      search: defaultQueryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });  
  }; 
  
  // qna 수정 페이지로 이동
  const goToQnaModifyPage = (id) => {
    navigate({
      pathname: `/qna/modify/${id}`,
      search: defaultQueryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };  
  
    // 마이페이지 qna 상세 페이지로 이동
    const goToQnaDetailMypagePage = (id) => {
      navigate({
        pathname: `/user/qna/detail/${id}`,
        search: defaultQueryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
      });
    };

  return {

    goToSecondhandListPage,   // 중고거래 목록 페이지 이동
    goToSecondhandDetailPage, // 중고거래 상세 페이지 이동
    goToSecondhandModifyPage, // 중고거래 수정 페이지 이동

    goToNewProductListPage,  // Product 신규 도서 목록 페이지 이동
    goToProductListDetailPage, // Product 일반용 상세 페이지 이동
    goToProductLikePage, // Product 좋아요 페이지 이동

    goToNoticeListPage,       // 공지사항 목록 페이지로 이동
    goToNoticeDetailPage,     // 공지사항 상세 페이지로 이동
    goToNoticeRegistPage,     // 공지사항 등록 페이지로 이동    
    goToNoticeModifyPage,     // 공지사항 수정 페이지로 이동

    goToFaqListPage,          // faq 목록 페이지로 이동
    goToFaqDetailPage,        // faq 상세 페이지로 이동
    goToFaqRegistPage,        // faq 등록 페이지로 이동
    goToFaqModifyPage,        // faq 수정 페이지로 이동

    goToQnaListPage,          // qna 목록 페이지로 이동
    goToQnaDetailPage,        // qna 상세 페이지로 이동
    goToQnaRegistPage,        // qna 등록 페이지로 이동
    goToQnaModifyPage,        // qna 수정 페이지로 이동
    goToQnaDetailMypagePage,  // 마이페이지 qna 상세 페이지로 이동
  };
};

export default CustomNavigate;
