/**
 * 파일 구조
 * 
 * src/
 *  └── components/
 *       ├── order/
 *       │     ├── MyOrderComp.jsx         // 전체 주문 내역 및 기능을 관리하는 메인 컴포넌트
 *       │     ├── OrderCancellation.jsx   // 주문 취소 철회 요청 처리 컴포넌트
 *       │     ├── CancelRequestModal.jsx  // 주문 취소 요청 모달 UI 컴포넌트
 *       │     ├── ReviewToggleButton.jsx  // 리뷰 작성/표시 토글 버튼 컴포넌트
 *       │     └── ReviewSection.jsx       // 리뷰 작성 및 삭제 기능 컴포넌트
 *       └── common/
 *             └── ErrorModal.jsx          // 에러/알림 메시지를 화면에 노출하는 모달 컴포넌트
 */

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// 주문 내역 데이터 조회 및 취소 요청 API 호출에 사용되는 함수들
import { 
  getMyOrderData, 
  getAllCancelStatus, 
  sendCancelRequest 
} from "../../api/orderAPI";
// 페이징 컴포넌트
import PageComp from "../common/PageComp";
// 주문 취소 철회 요청 컴포넌트 (OrderCancellation.jsx)
import OrderCancellation from "./OrderCancellation";
// 주문 취소 요청 모달 컴포넌트 (CancelRequestModal.jsx)
import CancelRequestModal from "./CancelRequestModal";
// 리뷰 토글 버튼 컴포넌트 (ReviewToggleButton.jsx)
import ReviewToggleButton from "./ReviewToggleButton";
// 리뷰 작성/삭제 컴포넌트 (ReviewSection.jsx)
import ReviewSection from "./ReviewSection";
// 커스텀 페이지 이동 관련 훅
import OrderNavigate from "../../hooks/OrderNavigate";
// 상품 상세 페이지 이동 관련 커스텀 훅
import CustomNavigate from "../../hooks/CustomNavigate";
// 주문 관련 CSS
import "../../css/order/order.css";
// 공통 설정 파일
import { alert } from "../../common/settings";
// 세션 스토리지에서 사용자 ID를 가져오는 함수 (공통 설정 파일)
import { getIdFromSessionStorage } from "../../common/settings";

const MyOrderComp = () => {
  // 주문 상세보기 및 목록 페이지 이동을 위한 커스텀 훅 (OrderNavigate.jsx)
  const { goToOrderDetailPage, goToMyOrderListPage } = OrderNavigate();
  // 상품 상세보기 페이지 이동을 위한 커스텀 훅 (CustomNavigate.jsx)
  const { goToProductListDetailPage } = CustomNavigate();

  const userId = getIdFromSessionStorage() || 0;
  const [orders, setOrders] = useState([]);
  const [pageDto, setPageDto] = useState(null);
  const [pageList, setPageList] = useState([]);
  // 주문 취소 요청 모달을 위한 상태 변수 (CancelRequestModal.jsx)
  const [cancelModalOrder, setCancelModalOrder] = useState(null);
  // 주문 취소 상태 정보를 저장 (OrderCancellation.jsx 및 CancelRequestModal.jsx에서 사용)
  const [cancelRequestStatus, setCancelRequestStatus] = useState(null);
  // 데이터 재조회 트리거를 위한 refreshKey
  const [refreshKey, setRefreshKey] = useState(0);

  // URL의 쿼리 파라미터를 통해 페이지, 사이즈, 정렬 조건을 처리합니다.
  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 5;
  const sort = queryParams.get("sort") || "orderId,desc";

  // 주문 데이터를 API를 통해 조회합니다.
  useEffect(() => {
    getMyOrderData({ userId, page, size, sort })
      .then((jsonData) => {
        const results = jsonData.results;
        setOrders(results.orderList);
        setPageDto(results.pageDto);
        setPageList(results.pageList);
      })
      .catch((error) => {
        console.error("주문 데이터를 불러오는데 실패했습니다.", error);
      });
  }, [userId, page, size, sort, refreshKey]);

  // 주문 취소 상태 정보를 API를 통해 조회합니다.
  useEffect(() => {
    getAllCancelStatus()
      .then((jsonData) => {
        const statuses = jsonData.results.cancelStatus;
        if (statuses) {
          const cancelReqStatus = statuses.find(
            (status) => status.statusName === "취소요청"
          );
          if (cancelReqStatus) {
            setCancelRequestStatus(cancelReqStatus);
          }
        }
      })
      .catch((error) => {
        console.error("취소 상태 조회에 실패했습니다.", error);
      });
  }, []);

  // 날짜 문자열을 'YYYY-MM-DD HH:mm:ss' 형식으로 포맷팅하는 함수입니다.
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  };

  // 각 주문 아이템별 리뷰 입력/표시 영역 토글 상태를 관리합니다.
  const [openReview, setOpenReview] = useState({});
  const toggleReviewSection = (orderItemId) => {
    setOpenReview((prev) => ({
      ...prev,
      [orderItemId]: !prev[orderItemId],
    }));
  };

  // 주문 취소 모달 열기 및 닫기 함수입니다.
  const handleOpenCancelModal = (order) => setCancelModalOrder(order);
  const handleCloseCancelModal = () => setCancelModalOrder(null);

  // 데이터 재조회 트리거 함수
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // 선택된 주문 항목에 대해 취소 요청 API를 호출합니다.
  const handleCancelRequestSubmit = (
    selectedItemsArray,
    cancelDefinition,
    customReason
  ) => {
    const cancelRequests = selectedItemsArray
      .map((item) => {
        const orderItem = cancelModalOrder.orderItems.find(
          (oi) =>
            oi.product.productId === parseInt(item.productId) &&
            oi.orderStatus.statusName === "결제완료"
        );
        if (!orderItem) return null;
        // 불필요한 필드 제외 후 주문 항목 데이터 구성 (OrderCancellation.jsx 참고)
        const { cancelReasons, ...orderItemData } = orderItem;
        return {
          orderItem: orderItemData,
          quantity: item.quantity,
          cancelDefinition: {
            cancelDefinitionId: parseInt(cancelDefinition),
          },
          cancelReason: customReason ? customReason : "",
          cancelStatus: cancelRequestStatus || {
            cancelStatusId: "2",
            statusName: "취소요청",
          },
        };
      })
      .filter((x) => x !== null);

    console.log("취소 요청 제출 payload:", cancelRequests);

    sendCancelRequest(cancelRequests)
      .then((response) => {
        const orderId = cancelModalOrder.orderId;
        setCancelModalOrder(null);
        alert("취소 요청이 완료되었습니다. 주문번호: " + orderId, "success");
        const orderElem = document.getElementById(`order-${orderId}`);
        if (orderElem) {
          orderElem.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        handleRefresh();
      })
      .catch((error) => {
        console.error("취소 요청 실패:", error);
        alert("취소 요청 처리 중 오류가 발생했습니다.", "error");
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">주문 내역</h2>
      {orders.length === 0 ? (
        <div className="alert alert-info" role="alert">
          주문 내역이 존재하지 않습니다.
        </div>
      ) : (
        orders.map((order) => (
          <div
            className="card mb-4"
            key={order.orderId}
            id={`order-${order.orderId}`}
          >
            {/* 카드 헤더: 주문번호 및 주문 생성일시, 상세보기 버튼 */}
            <div className="card-header">
              <div className="row">
                <div className="col-md-6 d-flex align-items-center">
                  <h5>주문번호: {order.orderId}</h5>
                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                  <h6>{formatDate(order.createDt)}</h6>
                  <button
                    className="btn btn-link order-detail-btn"
                    onClick={() => goToOrderDetailPage(order.orderId)}
                  >
                    주문 상세보기
                  </button>
                </div>
              </div>
            </div>
            {/* 카드 바디: 주문 항목에 대한 정보 및 각 항목의 기능 (주문취소, 리뷰 등) */}
            <div className="card-body">
              {order.orderItems && order.orderItems.length > 0 ? (
                order.orderItems.map((item, idx) => {
                  const isAlreadyCancelled =
                    item.cancelReasons &&
                    item.cancelReasons.some(
                      (cr) =>
                        (cr.cancelStatus &&
                          cr.cancelStatus.cancelStatusId ===
                            cancelRequestStatus?.cancelStatusId) ||
                        cr.cancelStatusId === cancelRequestStatus?.cancelStatusId
                    );
                  return (
                    <div
                      className="row mb-2 align-items-center"
                      key={idx}
                      style={
                        isAlreadyCancelled ? { backgroundColor: "#ffe6f2" } : {}
                      }
                    >
                      {/* 상품 이미지 및 상세보기로 이동하는 영역 */}
                      <div
                        className="col-md-2 clickable"
                        onClick={() =>
                          goToProductListDetailPage(item.product.productId)
                        }
                      >
                        <img
                          src={item.product.productImage}
                          alt={item.product.productName}
                          className="order-product-img"
                        />
                      </div>
                      <div className="col-md-8">
                        <div
                          className="clickable"
                          onClick={() =>
                            goToProductListDetailPage(item.product.productId)
                          }
                        >
                          <h4>{item.product.productName}</h4>
                        </div>
                        <div className="row align-items-center">
                          <div className="col-md-3">{item.quantity} 개</div>
                          <div className="col-md-3">
                            총 {(item.quantity * item.price).toLocaleString()} 원
                          </div>
                          <div className="col-md-3">
                            {item.orderStatus.statusName}
                          </div>
                          <div className="col-md-3">
                            {/* 이미 취소 요청된 경우 OrderCancellation 컴포넌트를 노출 */}
                            {isAlreadyCancelled && (
                              <OrderCancellation
                                orderId={order.orderId}
                                userId={order.user.userId}
                                orderItemId={item.orderItemId}
                                onRefresh={handleRefresh}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      {/* 배송완료 상태일 때 리뷰 토글 버튼 (ReviewToggleButton.jsx) 표시 */}
                      {item.orderStatus.statusName === "배송완료" && (
                        <div className="col-md-2 d-flex align-items-center justify-content-center">
                          <ReviewToggleButton
                            review={item.review}
                            onToggle={() => toggleReviewSection(item.orderItemId)}
                          />
                        </div>
                      )}
                      {/* 리뷰 영역 토글: ReviewSection.jsx 컴포넌트를 사용 */}
                      {openReview[item.orderItemId] && (
                        <div className="col-md-12">
                          <ReviewSection
                            orderItem={item}
                            onReviewUpdated={(updatedReview) => {
                              console.log("리뷰 업데이트:", updatedReview);
                              // 리뷰 삭제 시(updatedReview가 null인 경우) 주문 항목의 리뷰 정보를 업데이트하고, 리뷰 영역을 닫습니다.
                              setOrders((prevOrders) =>
                                prevOrders.map((order) => ({
                                  ...order,
                                  orderItems: order.orderItems.map((orderItem) =>
                                    orderItem.orderItemId === item.orderItemId
                                      ? { ...orderItem, review: updatedReview }
                                      : orderItem
                                  ),
                                }))
                              );
                              if (updatedReview === null) {
                                setOpenReview((prev) => ({
                                  ...prev,
                                  [item.orderItemId]: false,
                                }));
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="card-text">현재는 판매되지 않는 상품입니다.</p>
              )}
            </div>
            {/* 카드 풋터: 주문 합계 및 취소 버튼 */}
            <div className="card-footer d-flex justify-content-between align-items-center">
              <div className="low">
                합계 :{" "}
                {order.totalPrice} 원
              </div>
              {order.orderItems.some(
                (item) => item.orderStatus.statusName === "결제완료"
              ) && (
                <button
                  className="btn btn-warning"
                  onClick={() => handleOpenCancelModal(order)}
                >
                  주문취소
                </button>
              )}
            </div>
          </div>
        ))
      )}
      {/* 페이지 컴포넌트: PageComp.jsx를 사용하여 페이징 처리 */}
      {orders.length !== 0 && pageDto && pageList.length !== 0 && (
        <PageComp
          serverData={{ results: { pageDto, pageList } }}
          goToListPage={goToMyOrderListPage}
          size={size}
          sort={sort}
        />
      )}
      {/* 주문 취소 요청 모달 (CancelRequestModal.jsx) */}
      {cancelModalOrder && (
        <CancelRequestModal
          order={cancelModalOrder}
          onClose={handleCloseCancelModal}
          onSubmit={handleCancelRequestSubmit}
          cancelRequestStatus={cancelRequestStatus}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
};

export default MyOrderComp;
