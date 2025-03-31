import PortOne from "@portone/browser-sdk/v2";
import { useEffect, useState } from "react";
import { alert } from "../../common/settings";
import OrderNavigate from "../../hooks/OrderNavigate";

/**
 * IamportApp 컴포넌트
 *
 * [퀵 가이드]
 * - 퀵 가이드 내용을 포함한 포트원 결제 연동 샘플 프로젝트는 GitHub 저장소에서 추가로 확인할 수 있습니다.
 *
 * [브라우저 측]
 * - 포트원 브라우저 SDK를 불러옵니다.
 * - 아래 명령어로 브라우저 SDK를 설치합니다.
 *     npm install --save @portone/browser-sdk
 *
 * [상품 정보 구성]
 * - OrderUserComp 컴포넌트에서 전달받은 selectedCartItems 배열을 활용하여 주문 정보를 구성합니다.
 * - 주문명(orderName)은 선택한 상품들의 이름을 결합하여 생성합니다.
 * - 총 결제 금액(totalProductValue)은 각 상품의 가격과 수량을 곱한 값을 합산합니다.
 * - 대표 상품(representativeItem)은 배열의 첫 번째 항목을 사용하여 이미지 등 간략한 정보를 표시합니다.
 *
 * [결제 요청]
 * - 포트원 브라우저 SDK의 requestPayment 함수를 사용하여 결제를 요청합니다.
 *   - storeId: 상점 아이디 (관리자 콘솔 > 연동 정보 우측 상단에서 확인)
 *   - channelKey: 채널키 (관리자 콘솔에서 발급받은 키)
 *   - paymentId: 고객 주문 고유 번호 (직접 생성, 영문 대소문자, 숫자, -, _만 허용하며 6~64자)
 *   - orderName: 주문명 (상품 이름들을 조합)
 *   - totalAmount: 결제 금액 (정수, 통화의 최소 단위 기준 – KRW는 1배)
 *   - currency: "KRW" (원화만 지원)
 *   - payMethod: 결제 수단 (예: "EASY_PAY")
 *   - customData: 추가 주문 정보를 전달합니다.
 *
 * [결제 오류 처리]
 * - SDK의 반환 값에 code 필드가 존재하면 결제 실패로 간주하고, message 필드의 내용을 표시합니다.
 *
 * [서버 측 결제 완료 요청]
 * - 결제 완료 후, 서버의 /api/payment/complete 엔드포인트로 POST 요청을 보내 결제 상태를 동기화합니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {Array} props.selectedCartItems - 선택된 장바구니 상품 배열 (각 item은 product 정보 포함)
 * @param {Function} props.handlePayment - 결제 처리 함수
 * @param {String} props.paymentMethod - 선택한 결제 방식 (예: "kakao", "kg", "naver")
 * @param {Number} props.userId - 부모로부터 전달받은 사용자 ID
 * @param {Number} props.shippingAddressId - 부모로부터 전달받은 배송지 아이디 (addrId
 */
export function IamportApp({
  selectedCartItems,
  handlePayment,
  paymentMethod,
  userId,
  shippingAddressId,
}) {
  const { goToMyOrderListPage } = OrderNavigate();

  // 결제 상태 관리: "IDLE", "PENDING", "FAILED", "PAID"
  const [paymentStatus, setPaymentStatus] = useState({ status: "IDLE" });

  // 결제 방식에 따른 채널키 매핑
  const channelKeyMap = {
    kakao: process.env.REACT_APP_PORT_ONE_KACAO_CHANNELKEY,
    kg: process.env.REACT_APP_PORT_ONE_KG_CHANNELKEY,
    // 필요 시 "naver" 등 다른 결제 방식도 추가할 수 있습니다.
  };

  // 결제 방식에 따른 실제 결제 수단 매핑 객체 정의
  const payMethodMapping = {
    kakao: "EASY_PAY",
    naver: "EASY_PAY",
    kg: "CARD",
  };

  // 주문 DTO 생성: 선택한 상품들의 이름을 조건에 맞게 구성
  const orderName =
    selectedCartItems.length > 1
      ? `${selectedCartItems[0].product.productName} 외 ${
          selectedCartItems.length - 1
        }개`
      : selectedCartItems.length === 1
      ? selectedCartItems[0].product.productName
      : "주문 결제";

  // 총 결제 금액 계산: 각 상품의 가격과 수량을 곱한 후 합산 (상품별 총금액)
  const totalProductValue = selectedCartItems.reduce((total, item) => {
    return total + item.product.productPrice * item.productQuantity;
  }, 0);

  // 전체 주문의 최종 결제 금액 계산
  const finalTotalAmount = selectedCartItems.reduce((acc, item) => {
    return acc + item.product.productPrice * item.productQuantity;
  }, 0);

  /**
   * 랜덤 결제 ID 생성 함수
   * - crypto.getRandomValues를 사용하여 안전한 고유 결제 ID를 생성합니다.
   */
  function randomId() {
    return [...crypto.getRandomValues(new Uint32Array(2))]
      .map((word) => word.toString(16).padStart(8, "0"))
      .join("");
  }

  /**
   * handleSubmit 함수
   * - 결제 폼 제출 시 호출되어 포트원 브라우저 SDK의 requestPayment 함수를 통해 결제를 요청합니다.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentId = randomId();
    // 배송지 정보가 없으면 경고 알럿 후 결제 진행 중단
    if (!shippingAddressId) {
      alert("배송지 입력이 필요합니다.", "warning");
      return;
    }
    setPaymentStatus({ status: "PENDING" });

    // 각 상품 item에 결제 관련 정보를 추가 (부모에서 전달받은 userId와 shippingAddressId 사용)
    const productIds = selectedCartItems.map((item) => {
      const productId = item.product.productId; // 상품 번호
      const quantity = item.productQuantity; // 상품 수량
      const price = item.product.productPrice; // 상품 가격
      const cartItemId = item.cartItemId; // 장바구니 아이디

      return {
        paymentInfo: {
          cartItemId,
          productId,
          quantity,
          price,
          total: finalTotalAmount,
          userId, // 부모로부터 전달받은 userId
          shippingAddressId, // 부모로부터 전달받은 배송지 아이디
          paymentId,
        },
      };
    });

    let payment;
    console.log("productIds**********", productIds);
    // 결제 방식에 따라 요청할 결제 정보를 분기 처리
    if (paymentMethod === "kakao") {
      // 카카오페이 결제 요청
      payment = await PortOne.requestPayment({
        storeId: process.env.REACT_APP_PORT_ONE_STOREID, // 상점 아이디 (관리자 콘솔에서 확인)
        channelKey: channelKeyMap[paymentMethod], // 채널키 (관리자 콘솔에서 발급)
        paymentId, // 고유 주문 번호 (중복 사용 시 오류 발생)
        orderName, // 주문명 (상품 이름들을 조합)
        totalAmount: totalProductValue, // 결제 금액 (정수, 통화의 최소 단위 기준)
        currency: "KRW", // 결제 통화 (원화만 지원)
        payMethod: payMethodMapping[paymentMethod], // 결제 수단 (예: 카드 결제)
        customData: {
          item: productIds, // 추가 주문 정보 (상품 정보)
        },
      });
    } else if (paymentMethod === "naver") {
      // 네이버페이 결제 요청
      payment = await PortOne.requestPayment({
        storeId: process.env.REACT_APP_PORT_ONE_STOREID,
        channelKey: channelKeyMap[paymentMethod], // 네이버 전용 채널키
        paymentId,
        orderName,
        totalAmount: totalProductValue,
        currency: "KRW",
        payMethod: payMethodMapping[paymentMethod], // 네이버페이도 EASY_PAY 방식으로 진행 (필요 시 값 변경)
        customData: {
          item: productIds,
        },
      });
    } else if (paymentMethod === "kg") {
      // 일반결제 (KG이니스) 결제 요청
      payment = await PortOne.requestPayment({
        storeId: process.env.REACT_APP_PORT_ONE_STOREID,
        channelKey: channelKeyMap[paymentMethod], // KG이니스 전용 채널키
        paymentId,
        orderName,
        totalAmount: totalProductValue,
        currency: "KRW",
        payMethod: payMethodMapping[paymentMethod], // 일반결제 방식 (필요 시 값 변경)
        customer: {
          fullName: "포트원",
          phoneNumber: "01012341234",
          email: "example@portone.io",
        },
        customData: {
          item: productIds,
        },
      });
    }

    // 반환된 payment 객체에 오류 코드가 있으면 결제 실패 처리
    if (payment.code !== undefined) {
      setPaymentStatus({
        status: "FAILED",
        message: payment.message,
      });
      return;
    }

    // 결제 완료 후, 서버에 결제 완료 상태를 전달 (POST 요청)
    const completeResponse = await fetch(
      "http://localhost:8080/api/payment/complete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: payment.paymentId,
        }),
      }
    );
    if (completeResponse.ok) {
      const paymentComplete = await completeResponse.json();
      setPaymentStatus({
        status: paymentComplete.status,
      });
    } else {
      setPaymentStatus({
        status: "FAILED",
        message: await completeResponse.text(),
      });
    }
  };

  // 결제 요청 중이면 버튼 비활성화
  const isWaitingPayment = paymentStatus.status !== "IDLE";

  // 결제 결과 다이얼로그 닫기 핸들러
  const handleClose = () =>
    setPaymentStatus({
      status: "IDLE",
    });

  // 결제 성공 시 자동으로 alert 호출 후 페이지 이동 처리
  useEffect(() => {
    if (paymentStatus.status === "PAID") {
      alert("결제에 성공했습니다.", "success");
      goToMyOrderListPage(userId);
    }
  }, [paymentStatus.status, userId, goToMyOrderListPage]);

  return (
    <>
      {/** 추가: 인라인 CSS 스타일 정의 (한 파일에 모두 포함) */}
      <style>{`
        .custom-dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translateX(-50%);
          max-width: 500px;
          width: 90%;
          background-color: #ffffff;
          border: none;
          border-radius: 0.5rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          padding: 1.5rem;
          z-index: 1050;
        }
        .custom-close-btn {
          font-size: 0.875rem;
          padding: 0.375rem 0.75rem;
        }
      `}</style>
      <main>
        {/* 결제 요청 폼 */}
        <form onSubmit={handleSubmit}>
          <div className="d-grid">
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              aria-busy={isWaitingPayment}
              disabled={isWaitingPayment}
              onClick={handlePayment}
            >
              결제하기
            </button>
          </div>
        </form>
      </main>
      {/* 결제 실패 시 다이얼로그 */}
      {paymentStatus.status === "FAILED" && (
        <dialog open className="custom-dialog">
          <header>
            <h1>결제 실패</h1>
          </header>
          <p>{paymentStatus.message}</p>
          {/** 추가: 커스텀 닫기 버튼 클래스 적용 */}
          {/** 추가: 버튼을 가운대로 정렬 */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-primary custom-close-btn"
            >
              닫기
            </button>
          </div>
        </dialog>
      )}
      {/* 결제 성공 시 다이얼로그 */}
      {/* <dialog open={paymentStatus.status === "PAID"}>
        <header>
          <h1>결제 성공</h1>
        </header>
        <p>결제에 성공했습니다.</p>
        <button type="button" onClick={handleClose}>
          닫기
        </button>
      </dialog> */}
    </>
  );
}
