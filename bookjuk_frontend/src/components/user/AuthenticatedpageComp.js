import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/baseApi';

const AuthenticatedpageComp = () => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminApi.get('', {});
        if(response.status === 200) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.log('관리자가 아닙니다.');
      }
    }
    fetchData();
  }, []);

  const HandeleAdminPage = () => {
    navigate('/admin');
  }
  const HandeleUserPage = () => {
    navigate('../../pages/user/UserPage');
  }

  return (
    <div>
      {
        isAdmin ? 
        <button onClick={HandeleAdminPage}></button> :
        <button onClick={HandeleUserPage}></button>
      }
    </div>
  );
};

export default AuthenticatedpageComp;