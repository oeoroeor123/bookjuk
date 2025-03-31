import React, { useContext, useEffect, useState } from "react";
import {
  deleteCartItem,
  getCartUserDetail,
  modifyCartItem,
} from "../../api/cartAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import OrderNavigate from "../../hooks/OrderNavigate";
import { useLocation } from "react-router-dom";
import { UserContext } from "../common/UserContext";
import { alert, confirm } from "../../common/settings";
import CustomNavigate from "../../hooks/CustomNavigate";
import "../../css/cart/cart.css"; // 변경된 CSS 경로 임포트

const CartDetailComp = () => {
  const { setCartItemCount } = useContext(UserContext);
  const location = useLocation();
  const [userId, setUserId] = useState(location.state?.userId);
  const { goToOrderUserPage } = OrderNavigate();
  const { goToProductListDetailPage } = CustomNavigate();

  // 장바구니 상태 관리
  const [cart, setCart] = useState({
    cartId: 0,
    userId: 0,
    cartCreatedDt: "",
    cartUpdatedDt: null,
    cartItems: [],
  });

  // 품절이 아닌 상품은 기본 선택, 품절 상품은 선택되지 않도록 함
  const [selectedItems, setSelectedItems] = useState(new Set());

  // 장바구니 데이터 가져오기
  const fetchCartData = () => {
    getCartUserDetail(userId)
      .then((jsonData) => {
        setCart(jsonData.results.cart);
        setSelectedItems(
          new Set(
            jsonData.results.cart.cartItems
              .filter((item) => item.product.salesYn !== "N")
              .map((item) => item.cartItemId)
          )
        );
        // 장바구니 수량 업데이트
        setCartItemCount(jsonData?.results?.cart?.cartItems?.length);
      })
      .catch((error) => {
        console.error("Error fetching cart details:", error);
      });
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // 개별 체크박스 선택/해제
  const toggleSelectItem = (cartItemId) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(cartItemId)) {
        newSelected.delete(cartItemId);
      } else {
        newSelected.add(cartItemId);
      }
      return newSelected;
    });
  };

  // 전체 선택 체크박스 토글 (품절 상품은 선택되지 않도록)
  const toggleSelectAll = () => {
    const nonSoldOutItems = cart.cartItems.filter(
      (item) => item.product.salesYn !== "N"
    );
    if (
      nonSoldOutItems.length > 0 &&
      nonSoldOutItems.every((item) => selectedItems.has(item.cartItemId))
    ) {
      const newSelected = new Set(selectedItems);
      nonSoldOutItems.forEach((item) => newSelected.delete(item.cartItemId));
      setSelectedItems(newSelected);
    } else {
      const newSelected = new Set(selectedItems);
      nonSoldOutItems.forEach((item) => newSelected.add(item.cartItemId));
      setSelectedItems(newSelected);
    }
  };

  // 수량 입력 변경 처리: 입력값이 빈 값이면 1로, 0이면 경고 후 1로 처리하며, 재고가 0인 경우 0으로 고정
  const handleQuantityChange = (cartItemId, value) => {
    const currentItem = cart.cartItems.find(
      (item) => item.cartItemId === cartItemId
    );
    if (!currentItem) return;
    
    // 상품 재고가 0이면 수량은 0으로 고정
    if (currentItem.product.stock === 0) {
      setCart((prevCart) => ({
        ...prevCart,
        cartItems: prevCart.cartItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, productQuantity: 0 }
            : item
        ),
      }));
      return;
    }

    if (value === "") {
      setCart((prevCart) => ({
        ...prevCart,
        cartItems: prevCart.cartItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, productQuantity: 1 }
            : item
        ),
      }));
      return;
    }
    
    const newQuantity = parseInt(value, 10);
    if (newQuantity === 0) {
      alert("수량은 0으로 입력할 수 없습니다. 최소 1개 이상 주문 가능합니다.");
      setCart((prevCart) => ({
        ...prevCart,
        cartItems: prevCart.cartItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, productQuantity: 1 }
            : item
        ),
      }));
      return;
    }
    
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setCart((prevCart) => ({
        ...prevCart,
        cartItems: prevCart.cartItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, productQuantity: newQuantity }
            : item
        ),
      }));
    }
  };

  const handleModifyCartItem = async (cartItemId, newQuantity) => {
    const cartItem = cart.cartItems.find(
      (item) => item.cartItemId === cartItemId
    );
    if (!cartItem) {
      alert("장바구니 항목 정보가 없습니다.");
      return;
    }
    
    // 상품 재고가 0이면 수정 진행하지 않고 알림
    if (cartItem.product.stock === 0) {
      alert("해당 상품은 재고가 없어 판매중단 상태입니다.");
      return;
    }

    const maxStock = cartItem.product.stock;
    if (newQuantity > maxStock) {
      alert(
        `선택하신 상품의 재고가 부족하여 최대 ${maxStock}개 주문가능합니다.`
      );
      newQuantity = maxStock;
    }

    try {
      const payload = {
        productQuantity: newQuantity,
      };
      await modifyCartItem(cartItemId, payload);
      console.log(`Cart item ${cartItemId} updated to quantity ${newQuantity}`);
      fetchCartData();
    } catch (error) {
      console.error("장바구니 아이템 수정 실패:", error);
    }
  };

  const handleDeleteItem = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      fetchCartData();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  // 선택된 상품들의 총 가격 계산
  const totalPrice = cart.cartItems.reduce((total, item) => {
    return selectedItems.has(item.cartItemId)
      ? total + item.product.productPrice * item.productQuantity
      : total;
  }, 0);

  const selectedCartItems = cart.cartItems.filter((item) =>
    selectedItems.has(item.cartItemId)
  );

  return (
    <div className="container mt-4">
      {cart.cartItems.length === 0 ? (
        <p className="alert alert-warning">장바구니가 비어 있습니다.</p>
      ) : (
        <>
          {/* 전체 선택 헤더 */}
          <div className="row mb-3 align-items-center cart-header">
            <div className="col d-flex align-items-center">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input custom-checkbox me-2"
                  checked={
                    cart.cartItems.filter(
                      (item) => item.product.salesYn !== "N"
                    ).length > 0 &&
                    cart.cartItems
                      .filter((item) => item.product.salesYn !== "N")
                      .every((item) =>
                        selectedItems.has(item.cartItemId)
                      )
                  }
                  onChange={toggleSelectAll}
                />
              </div>
              <h2 className="mb-0">장바구니</h2>
            </div>
          </div>

          {/* 상품 목록 영역 */}
          <div className="cart-content">
            {/* 좌측: 상품 정보 영역 */}
            <div className="cart-items">
              {cart.cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className={`row mb-3 align-items-center cart-item ${
                    item.product.salesYn === "N" || item.product.stock === 0
                      ? "sold-out"
                      : ""
                  }`}
                >
                  {/* 체크박스 영역 */}
                  <div className="col-md-1">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input custom-checkbox"
                        checked={selectedItems.has(item.cartItemId)}
                        onChange={() => toggleSelectItem(item.cartItemId)}
                        disabled={
                          item.product.salesYn === "N" || item.product.stock === 0
                        }
                      />
                    </div>
                  </div>

                  {/* 상품 이미지 */}
                  <div className="col-md-2">
                    <div
                      className="product-image-container"
                      onClick={() =>
                        goToProductListDetailPage(item.product.productId)
                      }
                    >
                      <img
                        src={item.product.productImage}
                        alt={item.product.productName}
                        className="img-fluid product-image"
                      />
                    </div>
                  </div>

                  {/* 상품 정보 */}
                  <div className="col-md-9">
                    <div className="d-flex justify-content-between">
                      <div
                        className="clickable"
                        onClick={() =>
                          goToProductListDetailPage(item.product.productId)
                        }
                      >
                        {item.product.salesYn === "N" || item.product.stock === 0 ? (
                          <>
                            <del>{item.product.productName}</del>{" "}
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              (판매중단)
                            </span>
                          </>
                        ) : (
                          item.product.productName
                        )}
                      </div>
                      <div>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteItem(item.cartItemId)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                    <div
                      className="mt-2 clickable"
                      onClick={() =>
                        goToProductListDetailPage(item.product.productId)
                      }
                    >
                      {item.product.description}
                    </div>
                    <div className="row mt-2">
                      <div className="col">
                        가격 : {item.product.productPrice.toLocaleString()}원
                      </div>
                      <div className="col d-flex align-items-center">
                        <span className="me-2">수량</span>
                        <input
                          type="number"
                          className="form-control text-center quantity-input"
                          // 재고가 0이면 강제로 0을 보여주고 수정 불가능하게 함
                          value={
                            item.product.stock === 0
                              ? 0
                              : item.productQuantity
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            handleQuantityChange(item.cartItemId, value);
                            // 재고가 있을 때에만 수정 요청 실행
                            if (item.product.stock > 0) {
                              handleModifyCartItem(
                                item.cartItemId,
                                parseInt(value, 10)
                              );
                            }
                          }}
                          disabled={item.product.stock === 0}
                        />
                      </div>
                      <div className="col">
                        합계 :{" "}
                        {(
                          item.product.productPrice * item.productQuantity
                        ).toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 우측: 선택된 상품 요약 및 주문 영역 */}
            <div className="cart-summary">
              <h4 className="mb-3">✔️선택한 상품</h4>
              <div className="selected-items">
                {selectedCartItems.length === 0 ? (
                  <p>선택된 상품이 없습니다.</p>
                ) : (
                  selectedCartItems.map((item) => (
                    <div key={item.cartItemId} className="mb-2">
                      <div style={{ fontWeight: "bold" }}>
                        {item.product.productName}
                      </div>
                      <div>
                        합계:{" "}
                        {(
                          item.product.productPrice * item.productQuantity
                        ).toLocaleString()}원
                      </div>
                    </div>
                  ))
                )}
              </div>
              <hr />
              <div className="mb-3">
                <h5>총 결제액: {totalPrice.toLocaleString()}원</h5>
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={() => {
                  goToOrderUserPage(userId, Array.from(selectedItems));
                }}
              >
                주문하기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDetailComp;
