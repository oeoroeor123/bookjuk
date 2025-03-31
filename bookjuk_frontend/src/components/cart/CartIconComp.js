import React, { useEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { getCartUserDetail } from '../../api/cartAPI';
import CartNavigate from "../../hooks/CartNavigate";
import { getIdFromSessionStorage } from "../../common/settings";

const CartIconComp = () => {

  const { goToCartDetailPage } = CartNavigate();

  // 삭제 필요!!! (데모용)
  // const userId = 1;
  const userId = getIdFromSessionStorage() !== null ? getIdFromSessionStorage() : 0;

  // 장바구니 아이템 개수
  const [itemCount, setItemCount] = useState(0);

  // API에서 장바구니 데이터 가져오기
  useEffect(() => {
    if(userId !== 0) {
    getCartUserDetail(userId)
      .then((jsonData) => {
        setItemCount(jsonData.results.cart.cartItems.length);
      })
      .catch((error) => {
        console.error("장바구니 데이터를 불러오는 중 오류 발생:", error);
      });
    }
  }, [userId]);

  return (
    <div className="cart" style={{ position: "relative" }}>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <button
          onClick={() => { goToCartDetailPage(userId) }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            position: "relative"
          }}
        >
          <BsCart2 size="30" title="장바구니" color="rgb(95, 0, 128)" />

          {/* 장바구니 아이템 개수를 표시하는 영역 */}
          {itemCount > 0 ? (
            <p
              style={{
                position: "absolute",
                top: "-3px",
                right: "-13px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "18px",          // 너비 키우기
                height: "18px",         // 높이 키우기
                borderRadius: "50%",
                padding: "3px",         // padding도 필요에 맞춰 조정
                fontSize: "10px",       // 글자 크기 키우기
                fontWeight: 600,
                color: "#fff",
                backgroundColor: "rgb(95, 0, 128)",
              }}
            >
              {itemCount}
            </p>
          ) : null}
        </button>
      </div>
    </div>
  );
};

export default CartIconComp;
