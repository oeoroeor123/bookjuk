import React from 'react';
import { useParams } from 'react-router-dom';
import QnaModifyComp from '../../components/qna/QnaModifyComp';

const QnaModifyPage = () => {
  const { id } = useParams();

  return (
    <div>
      <QnaModifyComp id={id} />
    </div>
  );
};

export default QnaModifyPage;