import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const OrderNavigate = () => {
  // useNavigate() : 페이지 이동 Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // useSearchParams() : Query String(쿼리 스트링)으로 전달되는 요청 파라미터 처리
  const [queryParams] = useSearchParams();
  const page = !queryParams.get("page") ? 1 : parseInt(queryParams.get("page")); // 요청 파라미터 page가 없으면 page=1 사용
  const size = !queryParams.get("size")
    ? 10
    : parseInt(queryParams.get("size")); // 요청 파라미터 size가 없으면 size=2 사용
  const sort = !queryParams.get("sort") ? "id,desc" : queryParams.get("sort"); // 요청 파라미터 sort가 없으면 sort=id,desc 사용

  const defaultQueryString = createSearchParams({
    page,
    size,
    sort,
  }).toString(); // `page=${page}&size=${size}&sort${sort}`

  // 유저 주문 결제 페이지로 이동(주문전)
  const goToOrderUserPage = (userId, selectedCartItems) => {
    navigate(`/order/user`, {
      state: {
        userId: userId,
        selectedCartItems: selectedCartItems,
      },
    });
  };

  // 주문리스트 - 목록이동 (구매내역)
  const goToMyOrderListPage = (pageParam) => {
    let queryString = "";
    if (pageParam) {
      const page = !pageParam.page ? 1 : parseInt(pageParam.page);
      const size = !pageParam.size ? 5 : parseInt(pageParam.size);
      const sort = !pageParam.sort ? "orderId,desc" : pageParam.sort;
      queryString = createSearchParams({ page, size, sort }).toString(); //`page=${page}&size=${size}&sort=${sort}`
    } else {
      const sort = "orderId,desc";
      queryString = createSearchParams({ page, size, sort }).toString(); // `page=${page}&size=${size}&sort=${sort}`
    }
    navigate({
      pathname: `/user/order/myOrder`,
      search: queryString, // 요청 파라미터 (쿼리 스트링 형태로 추가)
    });
  };

  // 유저 주문페이지로 이동(구매내역상세)
  const goToOrderDetailPage = (orderId) => {
    // 현재 페이지의 경로와 쿼리스트링을 조합합니다.
    const currentPath = location.pathname + location.search;
    // 이전 페이지 정보를 'prev'라는 쿼리 파라미터에 담아 전달합니다.
    navigate(`/order/detail?prev=${encodeURIComponent(currentPath)}`, {
      state: {
        orderId: orderId,
      },
    });
  };

  return {
    goToOrderUserPage,
    goToMyOrderListPage,
    goToOrderDetailPage,
  };
};

export default OrderNavigate;
