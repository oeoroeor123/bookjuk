import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderDetailData, getAllCancelStatus } from "../../api/orderAPI"; // 취소 상태 API 함수 추가
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/order/order.css";

const OrderDetailComp = () => {
  const location = useLocation();
  const [orderId] = useState(location.state?.orderId || null);
  const [order, setOrder] = useState(null);
  const [cancelStatuses, setCancelStatuses] = useState([]); // 취소 상태 목록을 저장할 상태 변수
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const prevUrl = new URLSearchParams(location.search).get("prev");

  // 주문 상세 데이터와 취소 상태 데이터를 병렬로 로드합니다.
  useEffect(() => {
    if (!orderId) {
      console.error("주문 번호가 없습니다.");
      setError("주문 번호가 없습니다.");
      setLoading(false);
      return;
    }

    Promise.all([getOrderDetailData(orderId), getAllCancelStatus()])
      .then(([orderData, cancelStatusData]) => {
        if (orderData.results && orderData.results.order) {
          setOrder(orderData.results.order);
        } else {
          setError("주문 정보를 찾을 수 없습니다.");
        }
        if (cancelStatusData.results && cancelStatusData.results.cancelStatus) {
          setCancelStatuses(cancelStatusData.results.cancelStatus);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("데이터 로드 실패", err);
        setError("주문 상세 데이터를 불러오는데 실패했습니다.");
        setLoading(false);
      });
  }, [orderId]);

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

  // cancelStatusId를 기반으로 해당 상태명을 찾아 반환하는 함수
  const getStatusName = (cancelStatusId) => {
    const statusObj = cancelStatuses.find(
      (status) => status.cancelStatusId === cancelStatusId
    );
    return statusObj ? statusObj.statusName : "알 수 없음";
  };

  // 각 취소 사유 항목을 접었다 폈다 할 수 있는 컴포넌트
  const CancelReasonItem = ({ reason }) => {
    const [expanded, setExpanded] = useState(false);
    const statusName = reason.cancelStatus && reason.cancelStatus.cancelStatusId
      ? getStatusName(reason.cancelStatus.cancelStatusId)
      : "알 수 없음";

    // 상태에 따라 배경색 지정
    let bgColor;
    if (statusName === "취소요청") {
      bgColor = "#ffe6f2"; // 옅은 분홍색
    } else if (statusName === "취소거부") {
      bgColor = "#ffe6e6"; // 옅은 빨간색
    } else {
      bgColor = "#f2f2f2"; // 옅은 회색
    }

    return (
      <div
        style={{
          backgroundColor: bgColor,
          marginBottom: "10px",
          borderRadius: "4px",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <div>
            <strong>진행 상태:</strong> {statusName}
          </div>
          <div>{expanded ? "▲" : "▼"}</div>
        </div>
        {expanded && (
          <div style={{ marginTop: "10px" }}>
            <p>
              <strong>요청 날짜:</strong> {formatDate(reason.createDt)}
            </p>
            <p>
              <strong>취소 히스토리:</strong> {reason.cancelReason}
            </p>
            {reason.returnReason && (
              <p>
                <strong>관리자 답변:</strong> {reason.returnReason}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderStars = (rating) => {
    const maxStars = 5;
    let stars = "";
    for (let i = 1; i <= maxStars; i++) {
      stars += i <= rating ? "★" : "☆";
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">로딩중...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">주문 상세 내역</h2>
        </div>
        <div className="col-md-6 top-layout">
          <button
            className="btn btn-secondary back-btn"
            onClick={() => navigate(prevUrl || "/myOrderList")}
          >
            뒤로가기
          </button>
        </div>
      </div>

      {/* 주문 정보 영역 */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">주문 정보</div>
        <div className="card-body">
          <p>
            <strong>주문 번호:</strong> {order.orderId}
          </p>
          <p>
            <strong>총 주문 금액:</strong> {order.totalPrice.toLocaleString()} 원
          </p>
          <p>
            <strong>주문 일시:</strong> {formatDate(order.createDt)}
          </p>
          {order.modifyDt && (
            <p>
              <strong>수정 일시:</strong> {formatDate(order.modifyDt)}
            </p>
          )}
        </div>
      </div>

      {/* 배송 정보 영역 */}
      <div className="card mb-4">
        <div className="card-header bg-secondary text-white">배송 정보</div>
        <div className="card-body">
          <p>
            <strong>주소명:</strong> {order.deliAddr.addrName}
          </p>
          <p>
            <strong>도로명 주소:</strong> {order.deliAddr.roadAddress}
          </p>
          <p>
            <strong>지번 주소:</strong> {order.deliAddr.jibunAddress}
          </p>
          <p>
            <strong>상세 주소:</strong> {order.deliAddr.detailAddress}
          </p>
          {order.deliAddr.extraAddress && (
            <p>
              <strong>추가 주소:</strong> {order.deliAddr.extraAddress}
            </p>
          )}
          <p>
            <strong>우편번호:</strong> {order.deliAddr.postcode}
          </p>
          <p>
            <strong>수령인 연락처:</strong> {order.deliAddr.receiverPhone}
          </p>
          {order.deliAddr.deliveryRequest && (
            <p>
              <strong>배송 요청사항:</strong> {order.deliAddr.deliveryRequest}
            </p>
          )}
        </div>
      </div>

      {/* 주문 상품 내역 영역 */}
      <div className="card mb-4">
        <div className="card-header bg-info text-white">주문 상품 내역</div>
        <div className="card-body">
          {order.orderItems && order.orderItems.length > 0 ? (
            order.orderItems.map((item) => (
              <div
                key={item.orderItemId}
                className="order-item mb-4 p-3 border rounded"
              >
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={item.product.productImage}
                      alt={item.product.productName}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-9">
                    <h5>{item.product.productName}</h5>
                    <p>{item.product.description}</p>
                    <p>
                      <strong>상품 가격:</strong> {item.price.toLocaleString()} 원
                    </p>
                    <p>
                      <strong>주문 상태:</strong> {item.orderStatus.statusName}
                    </p>
                    <p>
                      <strong>수량:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>상품 총액:</strong> {(item.price * item.quantity).toLocaleString()} 원
                    </p>
                    <p>
                      <strong>수정 일시:</strong> {formatDate(item.modifyDt)}
                    </p>
                  </div>
                </div>
                {/* 리뷰 영역 */}
                {item.review && (
                  <div className="review-section mt-3 p-3 bg-light border rounded">
                    <h6>리뷰</h6>
                    <p>
                      <strong>평점:</strong> {renderStars(item.review.reviewRating)}
                    </p>
                    <p>
                      <strong>리뷰 내용:</strong> {item.review.reviewComment}
                    </p>
                    <p>
                      <strong>작성 일시:</strong> {formatDate(item.review.createDt)}
                    </p>
                  </div>
                )}
                {/* 취소 사유 영역 */}
                {item.cancelReasons && item.cancelReasons.length > 0 && (
                  <div className="cancel-reasons-section mt-3">
                    <h6>취소 사유</h6>
                    {item.cancelReasons.map((reason, index) => (
                      <CancelReasonItem key={index} reason={reason} />
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>현재는 판매되지 않는 상품입니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailComp;
