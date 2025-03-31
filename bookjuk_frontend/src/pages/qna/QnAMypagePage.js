/**
 * Q&A (마이페이지)
 * 
 * Developer : 김민희
 */

import React from 'react';
import QnAMypageComp from '../../components/qna/QnAMypageComp';
import { useParams } from 'react-router-dom';

const QnAMypagePage = () => {

  const {userId} = useParams();

  return (
    <div>
      <QnAMypageComp userId={userId} />
    </div>
  );
};

export default QnAMypagePage;