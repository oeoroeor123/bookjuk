/**
 * Q&A (마이페이지)
 * 
 * Developer : 김민희
 */

import React from 'react';
import QnADetailMypageComp from '../../components/qna/QnADetailMypageComp';
import { useParams } from 'react-router-dom';

const QnADetailMypagePage = () => {

  const {qnaId} = useParams();

  return (
    <div>
      <QnADetailMypageComp qnaId={qnaId} />
    </div>
  );
};

export default QnADetailMypagePage;