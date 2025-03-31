//  ************************************************
//  *****MyOrderComp.jsx 에서 사용되는 컴포넌트*****
//  ************************************************
// ReviewToggleButton.jsx
// 이 컴포넌트는 리뷰가 작성되었는지에 따라 버튼 텍스트를 변경하며,
// 버튼 클릭 시 부모에게 리뷰 입력/표시 영역을 토글하도록 요청합니다.
import React from "react";

const ReviewToggleButton = ({ review, onToggle }) => {
  const buttonLabel = review ? "리뷰보기" : "리뷰 작성";
  return (
    <button
      className={`btn ${review ? "btn-secondary" : "btn-primary"}`}
      onClick={onToggle}
      style={{ cursor: "pointer" }}
    >
      {buttonLabel}
    </button>
  );
};

export default ReviewToggleButton;
