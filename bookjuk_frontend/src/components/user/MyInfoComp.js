import { useContext, useEffect, useRef, useState } from 'react';
import AnonymousPage from '../../pages/user/AnonymousPage';
import UserPage from '../../pages/user/UserPage';
import { UserContext } from '../common/UserContext';
import { getMyPage } from '../../api/userAPI';
import { getIdFromSessionStorage } from '../../common/settings';
import NaverInfoComp from './Naver/NaverInfoComp';

const MyInfoComp = () => {
  const { loginFlag, setLoginFlag } = useContext(UserContext);
  const [isNaverUser, setIsNaverUser] = useState(false);
  const effectRan = useRef(false);

  
  // 기존 API 호출 (이전에 로그인했던 사용자 확인)
  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;
    
    // sessionStorage에서 로그인 정보 확인
    const socialUser = getIdFromSessionStorage('user');
    if(socialUser) {
      const user = JSON.parse(socialUser);
      setLoginFlag(true);
      if (user.isNaver) {
        setIsNaverUser(true);
      }
      return;
    }

    getMyPage()
      .then((response) => {
        console.log('API 응답:', response);
          setLoginFlag(response.isAuthenticated);
      })
      .catch((error) => {
        console.error('로그인 체크 실패:', error);
      });
  }, []);

  if (!loginFlag) return <AnonymousPage />;
  if (isNaverUser) return <NaverInfoComp />;

  return (
    <div>
      <UserPage />
    </div>
  );
};

export default MyInfoComp;
