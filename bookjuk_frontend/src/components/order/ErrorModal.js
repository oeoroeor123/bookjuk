//  ************************************************
//  *****MyOrderComp.jsx 에서 사용되는 컴포넌트*****
//  ************************************************
// ErrorModal.jsx
// 이 컴포넌트는 에러나 알림 메시지를 잠시 화면 중앙에 노출하는 역할을 합니다.
// 3초 후 자동으로 사라지며, onClose 콜백을 통해 부모 컴포넌트에 종료 이벤트를 전달합니다.
import React, { useEffect } from "react";

const ErrorModal = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3초 후 모달 자동 닫힘
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="error-modal"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1050,
        padding: "20px",
        backgroundColor: "rgba(255,255,255,0.9)",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    >
      {message}
    </div>
  );
};

export default ErrorModal;
