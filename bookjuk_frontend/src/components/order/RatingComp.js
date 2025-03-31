/**
 * 1. 클릭 가능한 별점 컴포넌트 (RatingComp.jsx)
 * 별 1개부터 5개까지 표시하며, 현재 선택된 별점보다 작거나 같은 별은 노란색(금색)으로,
 *  그 외에는 회색으로 표시됩니다. 
 * 또한 clickable 속성을 true로 설정하면 별을 클릭하여 별점이 변경되도록 합니다.
 */

import React from 'react';
import { PiStarFill } from 'react-icons/pi';

const RatingComp = ({ rating, onRatingChange, clickable = false }) => {
  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            onClick={clickable ? () => onRatingChange(starValue) : undefined}
            style={{ cursor: clickable ? "pointer" : "default", fontSize: "1.5rem" }}
          >
            <PiStarFill color={starValue <= rating ? "gold" : "gray"} />
          </span>
        );
      })}
    </div>
  );
};

export default RatingComp;
