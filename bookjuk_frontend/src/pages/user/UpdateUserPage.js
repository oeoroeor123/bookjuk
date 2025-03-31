import React from 'react';
import UpdateUserComp from '../../components/user/UpdateUserComp';

const UpdateUserPage = ({setAuthenticated}) => {
  return (
    <>
      < UpdateUserComp setAuthenticated={setAuthenticated}/>
    </>
  );
};

export default UpdateUserPage;