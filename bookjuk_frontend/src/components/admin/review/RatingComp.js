/**
 * 관리자 - 리뷰 평점
 *
 * Developer : 김리예
 */

import React from 'react';
import { PiStarFill } from 'react-icons/pi';

const RatingComp = ({ rating }) => {
  return (
    <>
      {Array.from({ length: rating }, (_, index) => (
        <PiStarFill key={index} />
      ))}
    </>
  );
};

export default RatingComp;
