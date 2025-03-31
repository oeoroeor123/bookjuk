//  ************************************************
//  *****MyOrderComp.jsx 에서 사용되는 컴포넌트*****
//  ************************************************
// OrderCancellation.jsx
// 이 컴포넌트는 주문 취소 철회 요청을 처리합니다.
// 주문 상세정보에서 취소 사유를 확인한 후, 취소 철회 요청 API를 호출합니다.
import React, { useEffect, useState } from "react";
import { alert, confirm } from "../../common/settings";
import { getOrderDetailData, cancelCancelRequest } from "../../api/orderAPI";

const OrderCancellation = ({ orderId, userId, orderItemId, onRefresh }) => {
  const CANCEL_REQUEST_STATUS = 2;
  const CANCEL_WITHDRAWAL_STATUS = 4;

  const [cancelReasonDto, setCancelReasonDto] = useState(null);
  const [loading, setLoading] = useState(true);

  // 주문 상세정보를 조회하여 현재 취소 요청 중인 항목을 확인합니다.
  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const data = await getOrderDetailData(orderId);
        let targetOrderItem = orderItemId
          ? data.results.order.orderItems.find(
              (item) => item.orderItemId === orderItemId
            )
          : data.results.order.orderItems[0];
        if (
          targetOrderItem &&
          targetOrderItem.cancelReasons &&
          targetOrderItem.cancelReasons.length > 0
        ) {
          const found = targetOrderItem.cancelReasons.find(
            (cr) => cr.cancelStatus?.cancelStatusId === CANCEL_REQUEST_STATUS
          );
          if (found) {
            setCancelReasonDto(found);
          }
        }
        console.log("cancelReasons:", targetOrderItem.cancelReasons);
      } catch (error) {
        console.error("주문 상세 정보 조회 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId, orderItemId]);

  // 취소 철회 요청을 처리하는 함수입니다.
  const handleCancelWithdrawal = () => {
    confirm(
      "정말 취소 철회를 진행하시겠습니까?",
      async () => {
        if (cancelReasonDto) {
          try {
            const updatedCancelReasonDto = {
              cancelReasonId: cancelReasonDto.cancelReasonId,
              cancelStatus: {
                cancelStatusId: "4",
                statusName: "취소철회",
              },
            };
            console.log("취소 철회 요청 payload:", updatedCancelReasonDto);
            await cancelCancelRequest(updatedCancelReasonDto);
            alert("취소 철회 요청이 성공적으로 처리되었습니다.");
            onRefresh(); // 부모 컴포넌트에 재조회 요청
          } catch (error) {
            console.error("취소 철회 요청 처리 중 오류 발생:", error);
            alert("취소 철회 요청 처리 중 오류가 발생했습니다.", "error");
          }
        }
      },
      () => {},
      "question"
    );
  };

  if (loading) return <div>로딩중...</div>;
  if (!cancelReasonDto) return null;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "8px" }}>취소요청</span>
      <button
        className="btn btn-danger m-0 btn-sm"
        type="button"
        onClick={handleCancelWithdrawal}
      >
        ×
      </button>
    </div>
  );
};

export default OrderCancellation;
