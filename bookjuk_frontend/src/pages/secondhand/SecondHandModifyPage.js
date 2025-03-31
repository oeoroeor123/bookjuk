import React from 'react';
import { useParams } from 'react-router-dom';
import SecondHandModifyComp from '../../components/secondhand/SecondHandModifyComp';

const SecondHandModifyPage = () => {

  // 경로 변수(Path Variable)를 처리하는 useParams()
  const { id } = useParams();

  return (
    <>
      <SecondHandModifyComp id={id} />
    </>
  );
};

export default SecondHandModifyPage;