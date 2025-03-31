import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCartUserDetail } from "../../api/cartAPI";
import {
  getDeliAddrData,
  createDeliAddr,
  deleteDeliAddr,
  modifyDeliAddr,
} from "../../api/deliAddrAPI";
import AddressSearchComp from "./AddressSearchComp";
import { IamportApp } from "./IamportApp";
import { alert, confirm } from "../../common/settings";

/**
 * OrderUserComp 컴포넌트는 사용자의 주문 페이지에서 배송지 정보와 주문 상품 정보를 보여주며,
 * CartDetailComp와 같이 좌측(8)과 우측(2) 영역으로 나누어, 좌측에는 상세 정보를,
 * 우측에는 결제 요약 및 결제 방식을 선택하고 결제 버튼을 배치하도록 구성하였습니다.
 */
const OrderUserComp = () => {
  // 페이지 이동 시 전달된 userId와 선택된 장바구니 항목들을 상태로 저장
  const location = useLocation();
  const [userId] = useState(location.state?.userId);
  const [selectedItems] = useState(location.state?.selectedCartItems || []);

  // 장바구니 정보 초기 상태
  const [cart, setCart] = useState({
    cartId: 0,
    userId: 0,
    cartCreatedDt: "",
    cartUpdatedDt: null,
    cartItems: [],
  });

  // 배송지 리스트와 선택된 배송지 상태 관리
  const [deliAddrList, setDeliAddrList] = useState([]);
  const [selectedDeliAddr, setSelectedDeliAddr] = useState({
    addrId: 0,
    userId: {},
    roadAddress: "",
    jibunAddress: "",
    detailAddress: "",
    extraAddress: "",
    postcode: "",
    addrName: "",
    receiverPhone: "",
    primaryAddr: false,
    deliveryRequest: "",
  });

  // 주소 추가/수정 모드 및 모달 표시 제어 상태
  const [editingAddress, setEditingAddress] = useState(null);
  const [showAddressList, setShowAddressList] = useState(false);
  const [showAddressSearch, setShowAddressSearch] = useState(false);
  const [deliveryRequest, setDeliveryRequest] = useState("");
  const [showIamportModal, setShowIamportModal] = useState(false);

  // 추가: 결제 방식을 선택하기 위한 상태 (기본값: "kakao")
  const [paymentMethod, setPaymentMethod] = useState("kakao");

  // 모달 스타일 (배송지 리스트 및 주소 검색 모달에 사용)
  const modalStyle = {
    position: "fixed",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
    border: "3px solid #ccc",
    padding: "15px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    zIndex: 1000,
  };

  /**
   * fetchCartData 함수는 사용자의 장바구니 정보를 서버로부터 가져와 상태 변수 'cart'에 저장합니다.
   */
  const fetchCartData = useCallback(() => {
    getCartUserDetail(userId)
      .then((jsonData) => {
        setCart(jsonData.results.cart);
      })
      .catch((error) => {
        console.error("장바구니 데이터를 불러오는 중 오류 발생:", error);
      });
  }, [userId]);

  /**
   * fetchDeliAddrData 함수는 사용자의 배송지 정보를 서버로부터 가져와 상태 변수 'deliAddrList'에 저장하고,
   * 기본 배송지를 선택하여 'selectedDeliAddr'에 설정합니다.
   */
  const fetchDeliAddrData = () => {
    getDeliAddrData(userId)
      .then((jsonData) => {
        const addresses = jsonData.results.deliAddr;
        setDeliAddrList(addresses);
        const primary = Array.isArray(addresses)
          ? addresses.find((addr) => addr.primaryAddr) || addresses[0]
          : addresses;
        if (primary) {
          setSelectedDeliAddr(primary);
        }
      })
      .catch((error) => {
        console.error("배송지 데이터를 불러오는 중 오류 발생:", error);
      });
  };

  // 컴포넌트 마운트 시 또는 userId 변경 시 데이터 불러오기
  useEffect(() => {
    if (userId) {
      fetchCartData();
      fetchDeliAddrData();
    }
  }, [userId, fetchCartData]);

  // 선택된 배송지의 배송 요청사항 변경 시 상태 반영
  useEffect(() => {
    setDeliveryRequest(selectedDeliAddr.deliveryRequest || "");
  }, [selectedDeliAddr.deliveryRequest]);

  // 장바구니에서 선택한 항목만 필터링하여 배열 생성
  const selectedCartItems = cart.cartItems.filter((item) =>
    selectedItems.includes(item.cartItemId)
  );

  // 선택된 상품들의 총 결제 금액 계산
  const totalProductValue = selectedCartItems.reduce((total, item) => {
    return total + item.product.productPrice * item.productQuantity;
  }, 0);

  // 배송지 변경 버튼 클릭 시 배송지 리스트 모달 표시
  const handleChangeDeliAddr = () => {
    setShowAddressList(true);
  };

  // 배송지 리스트에서 특정 주소 선택 시 처리
  const handleSelectAddress = (address) => {
    setSelectedDeliAddr(address);
    setShowAddressList(false);
  };

  // 주소 수정 버튼 클릭 시 수정 모드 전환
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddressList(false);
    setShowAddressSearch(true);
  };

  // 배송지 삭제 처리 (사용자 확인 후 API 호출)
  const handleDeleteAddress = async (addrId) => {
    // if (window.confirm("정말로 삭제하시겠습니까?")) {
    //   try {
    //     await deleteDeliAddr(addrId);
    //     if (selectedDeliAddr.addrId === addrId) {
    //       setSelectedDeliAddr({});
    //     }
    //     fetchDeliAddrData();
    //   } catch (error) {
    //     console.error("배송지 삭제 중 오류 발생:", error);
    //   }
    // }
    confirm(
      "정말로 삭제하시겠습니까?",
      async () => {
        try {
          await deleteDeliAddr(addrId);
          if (selectedDeliAddr.addrId === addrId) {
            setSelectedDeliAddr({});
          }
          fetchDeliAddrData();
        } catch (error) {
          console.error("배송지 삭제 중 오류 발생:", error);
        }
      },
      () => {}
    );
  };

  // 주소 검색 모달에서 저장 버튼 클릭 시 처리 (신규 추가 또는 수정)
  const handleSaveAddress = async (addressData) => {
    try {
      if (editingAddress) {
        await modifyDeliAddr(editingAddress.addrId, userId, addressData);
      } else {
        await createDeliAddr(userId, addressData);
      }
      fetchDeliAddrData();
    } catch (error) {
      console.error("주소 저장 실패:", error);
    } finally {
      setShowAddressSearch(false);
      setShowAddressList(true);
      setEditingAddress(null);
    }
  };

  /**
   * 결제하기 버튼 클릭 시, 선택된 배송지의 배송 요청사항을 서버에 업데이트하고 결제 로직으로 진행합니다.
   */
  const handlePayment = async () => {
    try {
      if (selectedDeliAddr && selectedDeliAddr.addrId) {
        const updatedAddressData = {
          roadAddress: selectedDeliAddr.roadAddress,
          jibunAddress: selectedDeliAddr.jibunAddress,
          detailAddress: selectedDeliAddr.detailAddress,
          extraAddress: selectedDeliAddr.extraAddress,
          postcode: selectedDeliAddr.postcode,
          addrName: selectedDeliAddr.addrName,
          receiverPhone: selectedDeliAddr.receiverPhone,
          primaryAddr: selectedDeliAddr.primaryAddr,
          deliveryRequest: deliveryRequest,
        };
        await modifyDeliAddr(
          selectedDeliAddr.addrId,
          userId,
          updatedAddressData
        );
        setSelectedDeliAddr((prev) => ({ ...prev, deliveryRequest }));
      }
    } catch (error) {
      console.error("배송 요청사항 저장 실패:", error);
      alert("배송 요청사항 저장에 실패했습니다.");
    }
  };

  return (
    <div className="container mt-4">
      {/* 8:2 레이아웃을 위한 Flex 컨테이너 */}
      <div className="d-flex" style={{ gap: "20px" }}>
        {/* 좌측 영역 (8) */}
        <div style={{ flex: 8 }}>
          {/* 배송지 정보 영역 */}
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>배송지 정보</span>
              <button
                className="btn btn-secondary"
                onClick={handleChangeDeliAddr}
              >
                배송지 변경
              </button>
            </div>
            <div className="card-body">
              {selectedDeliAddr.roadAddress ? (
                <div>
                  <p>
                    <strong>{selectedDeliAddr.addrName}</strong>님
                  </p>
                  <p>
                    {selectedDeliAddr.roadAddress}{" "}
                    {selectedDeliAddr.jibunAddress}{" "}
                    {selectedDeliAddr.detailAddress}{" "}
                    {selectedDeliAddr.extraAddress}
                  </p>
                  <p>우편번호: {selectedDeliAddr.postcode}</p>
                  <p>연락처: {selectedDeliAddr.receiverPhone}</p>
                </div>
              ) : (
                <p>등록된 배송지가 없습니다.</p>
              )}
            </div>
            <div className="card-header">배송 요청사항</div>
            <div className="card-body">
              <textarea
                className="form-control"
                rows="1"
                placeholder="배송 요청사항을 입력하세요."
                value={deliveryRequest}
                onChange={(e) => setDeliveryRequest(e.target.value)}
              />
            </div>
          </div>

          {/* 주문 상품 정보 영역 */}
          <div className="card mb-4">
            <div className="card-header">주문 상품 정보</div>
            <div className="card-body">
              {selectedCartItems.length === 0 ? (
                <p>선택된 상품이 없습니다.</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>상품 No</th>
                      <th>상품명</th>
                      <th>수량</th>
                      <th>합계</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCartItems.map((item, index) => (
                      <tr key={item.cartItemId}>
                        <td>{index + 1}</td>
                        <td>{item.product.productName}</td>
                        <td>{item.productQuantity}</td>
                        <td>
                          {(
                            item.product.productPrice * item.productQuantity
                          ).toLocaleString()}{" "}
                          원
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3">
                        <strong>총 결제 금액</strong>
                      </td>
                      <td>
                        <strong>{totalProductValue.toLocaleString()}원</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        {/* 우측 영역 (2) */}
        <div
          style={{
            flex: 2,
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            height: "fit-content",
          }}
        >
          <div className="mb-3">
            <p>총 결제 금액</p>
            <h5>{totalProductValue.toLocaleString()}원</h5>
          </div>
          {/* 결제 방식 선택 라디오 버튼 그룹 */}
          <div className="mb-3">
            <div className="form-check">
              <input
                type="radio"
                id="paymentKakao"
                name="paymentMethod"
                value="kakao"
                className="form-check-input"
                checked={paymentMethod === "kakao"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="paymentKakao" className="form-check-label">
                카카오페이
              </label>
            </div>
            {/* <div className="form-check">
              <input
                type="radio"
                id="paymentNaver"
                name="paymentMethod"
                value="naver"
                className="form-check-input"
                checked={paymentMethod === "naver"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="paymentNaver" className="form-check-label">
                네이버페이
              </label>
            </div> */}
            <div className="form-check">
              <input
                type="radio"
                id="paymentKG"
                name="paymentMethod"
                value="kg"
                className="form-check-input"
                checked={paymentMethod === "kg"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="paymentKG" className="form-check-label">
                일반결제 (KG이니스)
              </label>
            </div>
          </div>
          {/* 결제하기 버튼 영역 */}
          <div className="d-grid">
            <IamportApp
              selectedCartItems={selectedCartItems}
              handlePayment={handlePayment}
              paymentMethod={paymentMethod}
              userId={userId}
              shippingAddressId={selectedDeliAddr.addrId}
            />
          </div>
        </div>
      </div>

      {/* 배송지 리스트 모달 */}
      {showAddressList && (
        <div style={modalStyle}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h5 style={{ margin: 0, fontSize: "2rem" }}>배송지 리스트</h5>
            <div style={{ marginLeft: "auto" }}>
              <button
                className="btn btn-secondary btn-sm me-2"
                onClick={() => {
                  setEditingAddress(null);
                  setShowAddressList(false);
                  setShowAddressSearch(true);
                }}
              >
                배송지 추가
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setShowAddressList(false)}
              >
                닫기
              </button>
            </div>
          </div>
          <div
            style={{ marginTop: "10px", maxHeight: "400px", overflowY: "auto" }}
          >
            {deliAddrList.length === 0 ? (
              <p>등록된 배송지가 없습니다.</p>
            ) : (
              deliAddrList.map((address) => (
                <div key={address.addrId} className="mb-3 p-2 border">
                  <p>
                    <strong>{address.addrName}</strong>님
                  </p>
                  <p>
                    {address.roadAddress} {address.jibunAddress}{" "}
                    {address.detailAddress} {address.extraAddress}
                  </p>
                  <p>우편번호: {address.postcode}</p>
                  <p>연락처: {address.receiverPhone}</p>
                  <p>배송요청사항: {address.deliveryRequest}</p>
                  <p>대표배송지: {address.primaryAddr ? "YES" : "NO"}</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleSelectAddress(address)}
                      >
                        선택
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleEditAddress(address)}
                      >
                        주소수정
                      </button>
                    </div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteAddress(address.addrId)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 주소 검색 모달 */}
      {showAddressSearch && (
        <div style={modalStyle}>
          <AddressSearchComp
            initialAddress={editingAddress}
            onAddressSelect={handleSaveAddress}
            onClose={() => {
              setShowAddressSearch(false);
              setShowAddressList(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default OrderUserComp;
