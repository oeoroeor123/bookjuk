/**
 * 중고 거래 (마이페이지)
 * 
 * Developer : 김민희
 */

import React from 'react';
import SecondhandMypageComp from '../../components/secondhand/SecondhandMypageComp';
import { useParams } from 'react-router-dom';

const SecondhandMypagePage = () => {

  const {userId} = useParams();

  return (
    <div>
      <SecondhandMypageComp userId={userId} />
    </div>
  );
};

export default SecondhandMypagePage;