import React from 'react';
import { useParams } from 'react-router-dom';
import QnaDetailComp from '../../components/qna/QnaDetailComp';

const QnaDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <QnaDetailComp id={id} />
    </div>
  );
};

export default QnaDetailPage;