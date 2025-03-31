import React from 'react';
import { useParams } from 'react-router-dom';
import SecondHandDetailComp from '../../components/secondhand/SecondHandDetailComp';

const SecondHandDetailPage = () => {

  // 경로 변수(Path Variable)를 처리하는 useParams()
  const { id } = useParams();

  return (
    <>
      <SecondHandDetailComp id={id} />
    </>
  );
};

export default SecondHandDetailPage;