import React from 'react';
import MyInfoComp from '../../components/user/MyInfoComp';

const MyInfoPage = ({setAuthenticated}) => {
  return (
    <>
      <MyInfoComp setAuthenticated={setAuthenticated}/>
    </>
  );
};

export default MyInfoPage;