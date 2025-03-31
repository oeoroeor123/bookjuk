import React, { useContext, useState,  } from 'react';
import { alert, clearIdFromSessionStorage, confirm,  } from '../../common/settings';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../common/UserContext';
import { postUserLogout } from '../../api/userAPI';


const LogoutComp = () => {
  const { setLoginFlag } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState();

    const handleLogout = async () => {
      confirm('정말 로그아웃하시겠습니까?', () => {
        postUserLogout(user).then((response) => {
          if(response.status === 200) {
            alert('로그아웃 성공');
            localStorage.clear();
            clearIdFromSessionStorage();
            setLoginFlag(false);
            navigate('/');
          } 
        }).catch(error => {
          console.log('로그아웃 실패:', error);
        });
      }, () => {});
    };
    handleLogout();

  return <div></div>;
};

export default LogoutComp;