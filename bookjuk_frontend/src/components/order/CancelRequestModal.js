//  ************************************************
//  *****MyOrderComp.jsx 에서 사용되는 컴포넌트*****
//  ************************************************
// CancelRequestModal.jsx
// 이 모달 컴포넌트는 주문 취소 요청 시 사용자가 취소 가능한 상품을 선택하고,
// 취소 사유 및 추가 사유를 입력할 수 있도록 UI를 구성합니다.
import React, { useEffect, useState } from "react";
import "../../common/settings";
import { getAllCancelDefinitions } from "../../api/orderAPI";
import ErrorModal from "./ErrorModal";

const CancelRequestModal = ({
  order,
  onClose,
  onSubmit,
  cancelRequestStatus,
  onRefresh,
}) => {
  // 주문 내 모든 상품 데이터를 가져옵니다.
  const orderItems = order.orderItems;

  const [selectedItems, setSelectedItems] = useState({});
  const [selectedCancelDefinitionId, setSelectedCancelDefinitionId] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [cancelDefinitions, setCancelDefinitions] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // API 호출을 통해 취소 사유 목록을 가져옵니다.
  useEffect(() => {
    getAllCancelDefinitions()
      .then((jsonData) => {
        const definitions = jsonData.results.cancelDefinitions;
        setCancelDefinitions(definitions);
      })
      .catch((error) => {
        console.error("취소 사유 조회에 실패했습니다.", error);
      });
  }, []);

  // 체크박스 선택 및 해제 처리 함수입니다.
  const handleCheckboxChange = (productId, maxQuantity) => {
    setSelectedItems((prev) => {
      if (prev.hasOwnProperty(productId)) {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      } else {
        return { ...prev, [productId]: maxQuantity };
      }
    });
  };

  // 취소 불가능한 상품에 대한 선택을 제한합니다.
  const handleCheckboxClick = (e, productId, maxQuantity, isCancellable) => {
    if (!isCancellable) {
      e.preventDefault();
      setShowErrorModal(true);
      setTimeout(() => setShowErrorModal(false), 3000);
    } else {
      handleCheckboxChange(productId, maxQuantity);
    }
  };

  // 선택한 상품의 수량을 변경하는 함수입니다.
  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  // 제출 시 선택한 상품, 취소 사유, 추가 사유를 부모 콜백으로 전달합니다.
  const handleSubmit = () => {
    if (Object.keys(selectedItems).length === 0) {
      alert("취소할 상품을 선택해주세요.");
      return;
    }
    if (!selectedCancelDefinitionId) {
      alert("취소 사유를 선택해주세요.");
      return;
    }
    const selectedItemsArray = Object.keys(selectedItems).map((productId) => ({
      productId,
      quantity: selectedItems[productId],
    }));
    onSubmit(selectedItemsArray, selectedCancelDefinitionId, customReason);
    onClose();
    onRefresh();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div>
          <h4>취소 가능한 상품 목록</h4>
          <div
            className="cancel-items-container"
            style={{ maxHeight: "150px", overflowY: "auto" }}
          >
            {orderItems.map((item) => {
              const productId = item.product.productId;
              // 이미 취소 요청된 상품인지 확인
              const isAlreadyCancelled =
                item.cancelReasons &&
                item.cancelReasons.some(
                  (cr) =>
                    (cr.cancelStatus &&
                      cr.cancelStatus.cancelStatusId ===
                        cancelRequestStatus?.cancelStatusId) ||
                    cr.cancelStatusId === cancelRequestStatus?.cancelStatusId
                );
              // 주문 상태가 "결제완료"이고 아직 취소 요청이 없는 경우에만 취소 가능
              const isCancellable =
                item.orderStatus.statusName === "결제완료" &&
                !isAlreadyCancelled;

              const orderStatusDisplay =
                item.orderStatus.statusName !== "결제완료" ? (
                  <span style={{ color: "blue", marginLeft: "8px" }}>
                    {item.orderStatus.statusName}
                  </span>
                ) : null;

              let cancelStatusDisplay = null;
              if (item.cancelReasons && item.cancelReasons.length > 0) {
                const statusName =
                  item.cancelReasons[0].cancelStatus?.statusName || "";
                if (statusName) {
                  cancelStatusDisplay = (
                    <span style={{ color: "red", marginLeft: "8px" }}>
                      {statusName}
                    </span>
                  );
                }
              }

              const rowStyle = !isCancellable
                ? { backgroundColor: "#ffe6f2" }
                : {};

              return (
                <div key={productId} className="cancel-item" style={rowStyle}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="checkbox"
                        className="form-check-input custom-checkbox me-2"
                        onClick={(e) =>
                          handleCheckboxClick(
                            e,
                            productId,
                            item.quantity,
                            isCancellable
                          )
                        }
                        onChange={() => {}}
                        checked={selectedItems.hasOwnProperty(productId)}
                        disabled={!isCancellable}
                      />
                      <span>{item.product.productName}</span>
                      {orderStatusDisplay}
                      {cancelStatusDisplay}
                    </div>
                    {selectedItems.hasOwnProperty(productId) && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <span style={{ marginRight: "10px" }}>
                          {(
                            item.price *
                            (selectedItems[productId] || item.quantity)
                          ).toLocaleString()}{" "}
                          원
                        </span>
                        <input
                          type="number"
                          min="1"
                          max={item.quantity}
                          value={selectedItems[productId] || 1}
                          onChange={(e) =>
                            handleQuantityChange(
                              productId,
                              Math.min(
                                Math.max(parseInt(e.target.value) || 1, 1),
                                item.quantity
                              )
                            )
                          }
                          style={{ width: "60px" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cancel-field">
            <label>취소 사유 선택:</label>
            <select
              value={selectedCancelDefinitionId}
              onChange={(e) => setSelectedCancelDefinitionId(e.target.value)}
              className="cancel-select"
            >
              <option value="">-- 사유 선택 --</option>
              {cancelDefinitions.map((cancelDef) => (
                <option
                  key={cancelDef.cancelDefinitionId}
                  value={cancelDef.cancelDefinitionId}
                >
                  {cancelDef.cancelReasonDefinition}
                </option>
              ))}
            </select>
          </div>
          <div className="cancel-field">
            <label>취소 사유 작성:</label>
            <textarea
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="추가 사유를 작성해주세요 (선택 사항)"
              className="cancel-textarea"
            />
          </div>
          <div className="cancel-btn-group">
            <button
              className="btn btn-secondary cancel-btn-margin"
              onClick={onClose}
            >
              취소
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              취소 요청
            </button>
          </div>
        </div>
        {showErrorModal && (
          <ErrorModal
            message="취소요청이 진행중인 상품은 취소요청 불가능합니다"
            onClose={() => setShowErrorModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CancelRequestModal;
