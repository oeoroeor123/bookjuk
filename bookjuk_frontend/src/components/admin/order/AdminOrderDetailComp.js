import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminNavigate from "../../../hooks/AdminNavigate";
import {
  getOrderDetail,
  getOrderStatusList,
  updateOrderItem,
} from "../../../api/adminAPI";
import { modifyDeliAddr } from "../../../api/deliAddrAPI"; // 배송지 수정 API
import { getAllCancelStatus } from "../../../api/orderAPI";
import AddressSearchComp from "../../order/AddressSearchComp";
import { Button, Modal, Form } from "react-bootstrap";
import "../../../css/admin/order.css";
import "../../../css/order/order.css";
import { toast } from "react-toastify";
import { confirm } from "../../../common/settings"; // 공통 confirm 함수 가져오기

// [추가] 취소요청 정의ID별 표시용 (예시)
const getCancelReasonDefinitionName = (cancelDefinitionId) => {
  switch (cancelDefinitionId) {
    case 1:
      return "취소요청 정의1";
    case 2:
      return "취소요청 정의2";
    default:
      return "기타 사유";
  }
};

const AdminOrderDetailComp = () => {
  const { orderId } = useParams();
  const { goToOrderListPage } = AdminNavigate();

  const [serverData, setServerData] = useState(null);
  const [orderItemList, setOrderItemList] = useState([]);
  const [orderStatusList, setOrderStatusList] = useState([]);
  const [cancelStatuses, setCancelStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 주문 항목 수정 모달 상태 및 입력값 상태
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [editReasonList, setEditReasonList] = useState([]);
  const [editSelectedReasonId, setEditSelectedReasonId] = useState(null);
  const [editOrderStatus, setEditOrderStatus] = useState("");
  const [editCancelStatus, setEditCancelStatus] = useState("");
  const [editCancelQuantity, setEditCancelQuantity] = useState(0);
  const [editReturnReason, setEditReturnReason] = useState("");

  // 배송지 수정 모달 및 배송지 정보 상태
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);

  // 취소 요청 히스토리 펼침 여부 (orderItemId별)
  const [expandedCancelHistory, setExpandedCancelHistory] = useState({});

  // 데이터 병렬 로드
  useEffect(() => {
    if (!orderId) {
      setError("주문 번호가 없습니다.");
      setLoading(false);
      return;
    }

    Promise.all([
      getOrderDetail(orderId),
      getOrderStatusList(),
      getAllCancelStatus(),
    ])
      .then(([orderData, orderStatusData, cancelStatusData]) => {
        if (orderData?.results?.order) {
          setServerData(orderData);
          setOrderItemList(orderData.results.order.orderItems);
          if (orderData.results.order.deliAddr) {
            setShippingAddress(orderData.results.order.deliAddr);
          }
        } else {
          setError("주문 정보를 찾을 수 없습니다.");
        }
        if (orderStatusData?.results?.orderStatusList) {
          setOrderStatusList(orderStatusData.results.orderStatusList);
        }
        if (cancelStatusData?.results?.cancelStatus) {
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

  // 주문 항목 목록과 서버 데이터 동기화
  useEffect(() => {
    if (
      orderItemList.length > 0 &&
      serverData &&
      JSON.stringify(orderItemList) !==
        JSON.stringify(serverData.results.order.orderItems)
    ) {
      setServerData((prevData) => ({
        ...prevData,
        results: {
          ...prevData.results,
          order: {
            ...prevData.results.order,
            orderItems: orderItemList,
          },
        },
      }));
    }
  }, [orderItemList, serverData]);

  const getCancelStatusName = (cancelStatusId) => {
    const statusObj = cancelStatuses.find(
      (status) => status.cancelStatusId === cancelStatusId
    );
    return statusObj ? statusObj.statusName : "알 수 없음";
  };

  const toggleCancelHistory = (orderItemId) => {
    setExpandedCancelHistory((prev) => ({
      ...prev,
      [orderItemId]: !prev[orderItemId],
    }));
  };

  const handleEditClick = (item) => {
    setSelectedOrderItem(item);
    setEditOrderStatus(item.orderStatus.orderStatusId || "");
    const reasons = item.cancelReasons || [];
    setEditReasonList(reasons);

    if (reasons.length > 0) {
      const pendingRequest = reasons.find(
        (r) => r.cancelStatus?.cancelStatusId === 2
      );
      if (pendingRequest) {
        setEditSelectedReasonId(pendingRequest.cancelReasonId);
      } else {
        setEditSelectedReasonId(reasons[reasons.length - 1].cancelReasonId);
      }
    } else {
      setEditSelectedReasonId(null);
    }

    setShowEditModal(true);
  };

  const handleChangeCancelReasonId = (newReasonId) => {
    setEditSelectedReasonId(Number(newReasonId));
  };

  useEffect(() => {
    if (!editSelectedReasonId || editReasonList.length === 0) {
      setEditCancelStatus("");
      setEditCancelQuantity(0);
      setEditReturnReason("");
      return;
    }

    const selectedReasonObj = editReasonList.find(
      (r) => r.cancelReasonId === editSelectedReasonId
    );
    if (!selectedReasonObj) return;

    setEditCancelStatus(selectedReasonObj?.cancelStatus?.cancelStatusId || "");
    setEditCancelQuantity(selectedReasonObj?.quantity || 0);
    setEditReturnReason(selectedReasonObj?.returnReason || "");
  }, [editSelectedReasonId, editReasonList]);

  const handleModalClose = () => {
    setShowEditModal(false);
    setSelectedOrderItem(null);
    setEditReasonList([]);
    setEditSelectedReasonId(null);
    setEditOrderStatus("");
    setEditCancelStatus("");
    setEditCancelQuantity(0);
    setEditReturnReason("");
  };

  const handleModalSave = () => {
    if (!selectedOrderItem) return;

    // 주문 상태명 찾기
    const matchedOrderStatus = orderStatusList.find(
      (status) => status.orderStatusId === Number(editOrderStatus)
    );

    // 추가: 만약 선택된 주문 항목 수량이 0이면 취소 요청 수량은 무조건 0으로 설정
    if (selectedOrderItem.quantity === 0) {
      setEditCancelQuantity(0);
    }

    // 취소 수량은 이미 입력 필드에서 max로 제한되지만 추가 확인
    if (parseInt(editCancelQuantity, 10) > selectedOrderItem.quantity) {
      toast.error("취소 요청 수량이 주문 수량보다 큽니다.");
      return;
    }

    // 상태 일관성 검증: 주문 상태와 취소 상태가 서로 맞아야 함.
    const selectedOrderStatus = orderStatusList.find(
      (s) => s.orderStatusId === Number(editOrderStatus)
    );
    const selectedCancelStatus = cancelStatuses.find(
      (s) => s.cancelStatusId === Number(editCancelStatus)
    );

    // 업데이트를 진행하는 로직을 별도 함수로 정의
    const proceedWithUpdate = () => {
      // 현재 선택된 cancelReasonId에 해당하는 객체 찾기 (업데이트 시)
      const reasonObj = editReasonList.find(
        (r) => r.cancelReasonId === editSelectedReasonId
      );

      // 취소 사유(cancelReason) 파트 구성
      let cancelReasonPayload = null;
      if (reasonObj) {
        // 기존 취소 요청 업데이트
        cancelReasonPayload = {
          cancelReasonId: reasonObj.cancelReasonId,
          cancelDefinition: {
            cancelDefinitionId: reasonObj.cancelDefinitionId,
            cancelReasonDefinition: getCancelReasonDefinitionName(
              reasonObj.cancelDefinitionId
            ),
          },
          quantity: parseInt(editCancelQuantity, 10),
          returnReason: editReturnReason || "",
          cancelStatus: editCancelStatus
            ? {
                cancelStatusId: Number(editCancelStatus),
                statusName: getCancelStatusName(Number(editCancelStatus)),
              }
            : null,
        };
      } else {
        // 신규 생성
        cancelReasonPayload = {
          cancelReasonId: null,
          cancelDefinition: {
            cancelDefinitionId: 1,
            cancelReasonDefinition: "취소요청 정의1",
          },
          quantity: parseInt(editCancelQuantity, 10),
          returnReason: editReturnReason || "",
          cancelStatus: editCancelStatus
            ? {
                cancelStatusId: Number(editCancelStatus),
                statusName: getCancelStatusName(Number(editCancelStatus)),
              }
            : null,
        };
      }

      // 최종 payload 구성
      const payloadData = {
        order: { orderId: serverData.results.order.orderId },
        orderItem: {
          orderItemId: selectedOrderItem.orderItemId,
          orderStatus: {
            orderStatusId: Number(editOrderStatus),
            statusName: matchedOrderStatus
              ? matchedOrderStatus.statusName
              : "알 수 없음",
          },
        },
      };

      // 취소 관련 데이터가 있을 경우 payload에 cancelReason 추가
      if (parseInt(editCancelQuantity, 10) > 0 || editCancelStatus) {
        payloadData.cancelReason = cancelReasonPayload;
      }

      updateOrderItem(payloadData)
        .then((jsonData) => {
          toast(jsonData.message || "수정 완료");
          return getOrderDetail(orderId);
        })
        .then((orderData) => {
          setServerData(orderData);
          setOrderItemList(orderData.results.order.orderItems);
          handleModalClose();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };

    // 상태 일관성 체크: 주문 상태가 "환불완료"이면 취소 상태는 "취소완료"여야 하고,
    // 반대로 취소 상태가 "취소완료"이면 주문 상태는 "환불완료"여야 합니다.
    if (selectedOrderStatus && selectedCancelStatus) {
      if (
        (selectedOrderStatus.statusName === "환불완료" &&
          selectedCancelStatus.statusName !== "취소완료") ||
        (selectedCancelStatus.statusName === "취소완료" &&
          selectedOrderStatus.statusName !== "환불완료")
      ) {
        confirm(
          "주문 상태와 취소 상태가 일치하지 않습니다. 수정하시겠습니까(환불완료/취소완료)?",
          () => {
            proceedWithUpdate();
          },
          () => {
            return;
          },
          "warning"
        );
      } else {
        proceedWithUpdate();
      }
    } else {
      proceedWithUpdate();
    }
  };

  const handleAddressModalOpen = () => {
    setShowAddressModal(true);
  };

  const handleAddressModalClose = () => {
    setShowAddressModal(false);
  };

  const handleAddressSelect = (address) => {
    const userId = serverData.results.order.user?.userId;
    modifyDeliAddr(shippingAddress.addrId, userId, address)
      .then(() => {
        toast("배송지가 수정되었습니다.");
        setShippingAddress(address);
        setServerData((prev) => ({
          ...prev,
          results: {
            ...prev.results,
            order: {
              ...prev.results.order,
              deliAddr: address,
            },
          },
        }));
        setShowAddressModal(false);
      })
      .catch((error) => {
        toast.error("배송지 수정에 실패했습니다.");
        console.error(error);
      });
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

  if (
    error ||
    !serverData ||
    !serverData.results ||
    !serverData.results.order
  ) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error || "주문 정보를 불러올 수 없습니다."}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-order-detail container mt-5">
      <h2 className="mb-4">주문 상세 정보</h2>

      {/* 주문 기본 정보 */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row mb-2">
            <div className="col-md-4">
              <strong>주문 번호:</strong>
            </div>
            <div className="col-md-8">{serverData.results.order.orderId}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <strong>총 결제 금액:</strong>
            </div>
            <div className="col-md-8">
              {serverData.results.order.totalPrice} 원
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <strong>주문 생성일:</strong>
            </div>
            <div className="col-md-8">
              {new Date(serverData.results.order.createDt).toLocaleString()}
            </div>
          </div>
          {serverData.results.order.modifyDt && (
            <div className="row mb-2">
              <div className="col-md-4">
                <strong>수정 일시:</strong>
              </div>
              <div className="col-md-8">
                {new Date(serverData.results.order.modifyDt).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 배송지 정보 */}
      <div className="card mb-4">
        <div className="card-header bg-secondary text-white">배송지 정보</div>
        <div className="card-body">
          {serverData.results.order.deliAddr ? (
            <div className="row">
              <div className="col-md-8">
                <p>
                  <strong>{serverData.results.order.deliAddr.addrName}</strong>
                  님
                </p>
                <p>
                  <strong>연락처:</strong>{" "}
                  {serverData.results.order.deliAddr.receiverPhone}
                </p>
                <p>
                  <strong>우편번호:</strong>{" "}
                  {serverData.results.order.deliAddr.postcode}{" "}
                  <strong>주소:</strong>{" "}
                  {serverData.results.order.deliAddr.roadAddress}{" "}
                  {serverData.results.order.deliAddr.detailAddress}{" "}
                  {serverData.results.order.deliAddr.extraAddress}
                </p>
                {serverData.results.order.deliAddr.deliveryRequest && (
                  <p>
                    <strong>배송 요청사항:</strong>{" "}
                    {serverData.results.order.deliAddr.deliveryRequest}
                  </p>
                )}
              </div>
              <div className="col-md-4 d-flex align-items-center justify-content-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleAddressModalOpen}
                >
                  주소 수정
                </Button>
              </div>
            </div>
          ) : (
            <p>배송지 정보가 없습니다.</p>
          )}
        </div>
      </div>

      {/* 주문 항목 목록 */}
      <div className="mb-4">
        <h3 className="mb-3">주문 항목</h3>
        {orderItemList.map((item) => (
          <div key={item.orderItemId} className="card mb-3">
            <div className="card-body">
              <div className="row">
                {/* 상품 이미지 */}
                <div className="col-md-3">
                  <img
                    src={item.product.productImage}
                    alt={item.product.productName}
                    className="order-product-img img-fluid rounded"
                  />
                </div>
                {/* 상품 정보 */}
                <div className="col-md-9">
                  <div className="row mb-2">
                    <div className="col-md-4">
                      <strong>상품명:</strong>
                    </div>
                    <div className="col-md-8">{item.product.productName}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-4">
                      <strong>주문 상태:</strong>
                    </div>
                    <div className="col-md-8">
                      {item.orderStatus.statusName}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-4">
                      <strong>수량:</strong>
                    </div>
                    <div className="col-md-8">{item.quantity}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-4">
                      <strong>가격:</strong>
                    </div>
                    <div className="col-md-8">{item.price} 원</div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-end">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEditClick(item)}
                      >
                        수정
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 취소 요청 영역 */}
              {item.cancelReasons && item.cancelReasons.length > 0 && (
                <div
                  className="row mt-3"
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                >
                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <div
                      className={
                        item.cancelReasons.some(
                          (r) =>
                            getCancelStatusName(
                              r.cancelStatus.cancelStatusId
                            ) === "취소요청"
                        )
                          ? "pink-background"
                          : ""
                      }
                    >
                      <strong>취소 히스토리:</strong>
                      {item.cancelReasons.some(
                        (r) =>
                          getCancelStatusName(r.cancelStatus.cancelStatusId) ===
                          "취소요청"
                      ) && (
                        <>
                          {" "}
                          (요청 건수:{" "}
                          {
                            item.cancelReasons.filter(
                              (r) =>
                                getCancelStatusName(
                                  r.cancelStatus.cancelStatusId
                                ) === "취소요청"
                            ).length
                          }
                          )
                        </>
                      )}
                    </div>
                    <div>
                      <Button
                        variant="link"
                        onClick={() => toggleCancelHistory(item.orderItemId)}
                      >
                        {expandedCancelHistory[item.orderItemId] ? "▲" : "▼"}
                      </Button>
                    </div>
                  </div>
                  {expandedCancelHistory[item.orderItemId] && (
                    <div className="col-12 mt-2">
                      {item.cancelReasons.map((reason, index) => (
                        <div
                          key={index}
                          className="border-bottom mb-2 pb-2"
                          style={{
                            backgroundColor:
                              getCancelStatusName(
                                reason.cancelStatus.cancelStatusId
                              ) === "취소요청"
                                ? "#ffe6e6"
                                : "#e6e6e6",
                            padding: "5px",
                            borderRadius: "3px",
                          }}
                        >
                          <div className="row">
                            <div className="col-md-4">
                              <strong>요청 번호:</strong>
                            </div>
                            <div className="col-md-8">
                              {reason.cancelReasonId}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <strong>진행 상태:</strong>
                            </div>
                            <div className="col-md-8">
                              {getCancelStatusName(
                                reason.cancelStatus.cancelStatusId
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <strong>요청 날짜:</strong>
                            </div>
                            <div className="col-md-8">
                              {new Date(reason.createDt).toLocaleString()}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <strong>취소 사유:</strong>
                            </div>
                            <div className="col-md-8">
                              {reason.cancelReason}
                            </div>
                          </div>
                          {reason.returnReason && (
                            <div className="row">
                              <div className="col-md-4">
                                <strong>관리자 답변:</strong>
                              </div>
                              <div className="col-md-8">
                                {reason.returnReason}
                              </div>
                            </div>
                          )}
                          <div className="row">
                            <div className="col-md-4">
                              <strong>요청 수량:</strong>
                            </div>
                            <div className="col-md-8">{reason.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 주문 항목 수정 모달 */}
      <Modal show={showEditModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>주문 항목 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrderItem && (
            <Form>
              {editReasonList.length > 0 && (
                <Form.Group className="mb-3">
                  <Form.Label>취소 요청 번호 선택</Form.Label>
                  <Form.Select
                    value={editSelectedReasonId || ""}
                    onChange={(e) => handleChangeCancelReasonId(e.target.value)}
                  >
                    <option value="">(신규 취소 요청 생성)</option>
                    {editReasonList.map((r) => (
                      <option key={r.cancelReasonId} value={r.cancelReasonId}>
                        요청번호 {r.cancelReasonId}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>주문 상태</Form.Label>
                <Form.Select
                  value={editOrderStatus}
                  onChange={(e) => setEditOrderStatus(e.target.value)}
                >
                  {orderStatusList &&
                    orderStatusList.map((status) => (
                      <option
                        key={status.orderStatusId}
                        value={status.orderStatusId}
                      >
                        {status.statusName}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>취소 상태</Form.Label>
                <Form.Select
                  value={editCancelStatus}
                  onChange={(e) => setEditCancelStatus(e.target.value)}
                >
                  <option value="">(선택 안함)</option>
                  {cancelStatuses &&
                    cancelStatuses.map((status) => (
                      <option
                        key={status.cancelStatusId}
                        value={status.cancelStatusId}
                      >
                        {status.statusName}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>취소(요청) 수량</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max={selectedOrderItem.quantity}
                  value={editCancelQuantity}
                  onChange={(e) =>
                    setEditCancelQuantity(
                      Math.min(
                        parseInt(e.target.value, 10) || 0,
                        selectedOrderItem.quantity
                      )
                    )
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>관리자 답변(메모)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="관리자 답변 입력"
                  value={editReturnReason}
                  onChange={(e) => setEditReturnReason(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 배송지 수정 모달 */}
      <Modal show={showAddressModal} onHide={handleAddressModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>배송지 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {shippingAddress && (
            <AddressSearchComp
              initialAddress={shippingAddress}
              onAddressSelect={handleAddressSelect}
              onClose={handleAddressModalClose}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminOrderDetailComp;
