import React, { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";

const AddressSearchComp = ({ onAddressSelect, onClose, initialAddress }) => {
  // 초기 주소 정보와 추가 필드를 설정합니다.
  const [address, setAddress] = useState({
    postcode: initialAddress?.postcode || "",
    roadAddress: initialAddress?.roadAddress || "",
    jibunAddress: initialAddress?.jibunAddress || "",
    extraAddress: initialAddress?.extraAddress || "",
    detailAddress: initialAddress?.detailAddress || "",
    deliveryRequest: initialAddress?.deliveryRequest || "",
    addrName: initialAddress?.addrName || "",
    receiverPhone: initialAddress?.receiverPhone || "",
    primaryAddr: initialAddress?.primaryAddr || false,
  });

  // 에러 상태: 수취인 이름, 전화번호, 상세주소, 우편번호, 도로명주소 필드에 대한 검증
  const [errors, setErrors] = useState({
    addrName: false,
    receiverPhone: false,
    detailAddress: false,
    postcode: false,
    roadAddress: false,
  });

  // 우편번호 찾기 컴포넌트의 표시 여부
  const [isOpen, setIsOpen] = useState(false);

  // 초기 값 변경 시 상태를 업데이트합니다.
  useEffect(() => {
    setAddress({
      postcode: initialAddress?.postcode || "",
      roadAddress: initialAddress?.roadAddress || "",
      jibunAddress: initialAddress?.jibunAddress || "",
      extraAddress: initialAddress?.extraAddress || "",
      detailAddress: initialAddress?.detailAddress || "",
      deliveryRequest: initialAddress?.deliveryRequest || "",
      addrName: initialAddress?.addrName || "",
      receiverPhone: initialAddress?.receiverPhone || "",
      primaryAddr: initialAddress?.primaryAddr || false,
    });
  }, [initialAddress]);

  // DaumPostcode를 통해 선택한 주소 데이터를 가공합니다.
  const handleComplete = (data) => {
    let roadAddr = data.roadAddress;
    let extraRoadAddr = "";
    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
      extraRoadAddr += data.bname;
    }
    if (data.buildingName !== "" && data.apartment === "Y") {
      extraRoadAddr += extraRoadAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
    }
    if (extraRoadAddr !== "") {
      extraRoadAddr = ` (${extraRoadAddr})`;
    }
    setAddress((prev) => ({
      ...prev,
      postcode: data.zonecode,
      roadAddress: roadAddr,
      jibunAddress: data.jibunAddress,  // 내부 값은 유지 (비노출)
      extraAddress: extraRoadAddr,       // 도로명주소 옆에 표시할 참고항목 값
      detailAddress: prev.detailAddress, // 사용자가 입력한 상세주소는 유지
    }));
    // 주소 선택 시 우편번호와 도로명주소에 대한 에러 상태 해제
    setErrors((prev) => ({ ...prev, postcode: false, roadAddress: false }));
    setIsOpen(false);
  };

  // 저장 버튼 클릭 시 필수 입력값 검증 후 부모 컴포넌트로 전달합니다.
  const handleSave = () => {
    const newErrors = {
      addrName: address.addrName.trim() === "",
      receiverPhone: address.receiverPhone.trim() === "",
      detailAddress: address.detailAddress.trim() === "",
      postcode: address.postcode.trim() === "",
      roadAddress: address.roadAddress.trim() === "",
    };

    setErrors(newErrors);

    // 필수 입력값이 누락된 경우 저장 동작 중단
    if (
      newErrors.addrName ||
      newErrors.receiverPhone ||
      newErrors.detailAddress ||
      newErrors.postcode ||
      newErrors.roadAddress
    ) {
      return;
    }

    if (onAddressSelect) {
      onAddressSelect(address);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="m-3 position-relative">
      {/* 제목과 우편번호 찾기 버튼 */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">주소 검색</h2>
        <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(true)}>
          우편번호 찾기
        </button>
      </div>

      {/* 배송지 이름 */}
      <div className="row align-items-center mb-1">
        <label htmlFor="addrName" className="col-sm-3 col-form-label">
          수취인 이름:
        </label>
        <div className="col-sm-9 position-relative">
          <input
            type="text"
            id="addrName"
            className={`form-control ${errors.addrName ? 'is-invalid' : ''}`}
            value={address.addrName}
            onChange={(e) => {
              setAddress({ ...address, addrName: e.target.value });
              if (e.target.value.trim() !== "") {
                setErrors((prev) => ({ ...prev, addrName: false }));
              }
            }}
            placeholder="배송지 이름 입력"
          />
          {errors.addrName && (
            <span
              className="text-danger small"
              style={{
                position: "absolute",
                right: "40px",
                top: "50%",
                transform: "translateY(-50%)",
                paddingLeft: "20px",
              }}
            >
              -필수 입력값입니다
            </span>
          )}
        </div>
      </div>

      {/* 수취인 전화번호 */}
      <div className="row align-items-center mb-0">
        <label htmlFor="receiverPhone" className="col-sm-3 col-form-label">
          수취인 전화번호:
        </label>
        <div className="col-sm-9 position-relative">
          <input
            type="text"
            id="receiverPhone"
            className={`form-control ${errors.receiverPhone ? 'is-invalid' : ''}`}
            value={address.receiverPhone}
            onChange={(e) => {
              setAddress({ ...address, receiverPhone: e.target.value });
              if (e.target.value.trim() !== "") {
                setErrors((prev) => ({ ...prev, receiverPhone: false }));
              }
            }}
            placeholder="전화번호 입력"
          />
          {errors.receiverPhone && (
            <span
              className="text-danger small"
              style={{
                position: "absolute",
                right: "40px",
                top: "50%",
                transform: "translateY(-50%)",
                paddingLeft: "20px",
              }}
            >
              -필수 입력값입니다
            </span>
          )}
        </div>
      </div>

      {/* 우편번호 (읽기 전용) */}
      <div className="row align-items-center mb-0">
        <label htmlFor="postcode" className="col-sm-3 col-form-label">
          우편번호:
        </label>
        <div className="col-sm-9 position-relative">
          <p className="form-control-plaintext" id="postcode">
            {address.postcode || "-"}
          </p>
          {errors.postcode && (
            <span
              className="text-danger small"
              style={{
                position: "absolute",
                right: "40px",
                top: "50%",
                transform: "translateY(-50%)",
                paddingLeft: "20px",
              }}
            >
              -필수 입력값입니다
            </span>
          )}
        </div>
      </div>

      {/* 도로명주소 및 참고항목 */}
      <div className="row align-items-center mb-1">
        <label htmlFor="roadAddress" className="col-sm-3 col-form-label">
          도로명주소:
        </label>
        <div className="col-sm-9 position-relative">
          <p className="form-control-plaintext" id="roadAddress">
            {address.roadAddress}
            {address.extraAddress && ` ${address.extraAddress}`}
          </p>
          {errors.roadAddress && (
            <span
              className="text-danger small"
              style={{
                position: "absolute",
                right: "40px",
                top: "50%",
                transform: "translateY(-50%)",
                paddingLeft: "20px",
              }}
            >
              -필수 입력값입니다
            </span>
          )}
        </div>
      </div>

      {/* 상세주소 */}
      <div className="row align-items-center mb-1">
        <label htmlFor="detailAddress" className="col-sm-3 col-form-label">
          상세주소:
        </label>
        <div className="col-sm-9 position-relative">
          <input
            type="text"
            id="detailAddress"
            className={`form-control ${errors.detailAddress ? 'is-invalid' : ''}`}
            value={address.detailAddress}
            onChange={(e) => {
              setAddress({ ...address, detailAddress: e.target.value });
              if (e.target.value.trim() !== "") {
                setErrors((prev) => ({ ...prev, detailAddress: false }));
              }
            }}
            placeholder="상세주소 입력"
          />
          {errors.detailAddress && (
            <span
              className="text-danger small"
              style={{
                position: "absolute",
                right: "40px",
                top: "50%",
                transform: "translateY(-50%)",
                paddingLeft: "20px",
              }}
            >
              -필수 입력값입니다
            </span>
          )}
        </div>
      </div>

      {/* 배송 요청사항 */}
      <div className="row align-items-center mb-3">
        <label htmlFor="deliveryRequest" className="col-sm-3 col-form-label">
          배송 요청사항:
        </label>
        <div className="col-sm-9">
          <input
            type="text"
            id="deliveryRequest"
            className="form-control"
            value={address.deliveryRequest}
            onChange={(e) => setAddress({ ...address, deliveryRequest: e.target.value })}
            placeholder="배송 요청사항 입력"
          />
        </div>
      </div>

      {/* 대표배송지 여부 */}
      <div className="row align-items-center mb-1">
        <label htmlFor="primaryAddr" className="col-sm-4 col-form-label">
          대표배송지 여부:
        </label>
        <div className="col-sm-7">
          <div className="form-check">
            <input
              type="checkbox"
              id="primaryAddr"
              className="form-check-input"
              checked={address.primaryAddr}
              onChange={(e) => setAddress({ ...address, primaryAddr: e.target.checked })}
            />
            <label htmlFor="primaryAddr" className="form-check-label">
              예
            </label>
          </div>
        </div>
      </div>

      {/* 내부적으로 필요한 지번주소 값은 hidden 처리 */}
      <input type="hidden" value={address.jibunAddress} />

      {/* 우편번호 찾기 팝업 영역 */}
      {isOpen && (
        <div
          className="position-absolute bg-white p-2"
          style={{ top: "-50px", left: "0", zIndex: 100, width: "100%", border: "5px solid #ccc" }}
        >
          <DaumPostcode onComplete={handleComplete} />
          <div className="text-center mt-2">
            <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 저장 및 닫기 버튼 */}
      <div className="d-flex justify-content-end mt-4">
        <button type="button" className="btn btn-primary me-2" onClick={handleSave}>
          저장
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default AddressSearchComp;
