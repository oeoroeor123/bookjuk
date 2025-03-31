import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../common/UserContext';
import { postNaver } from '../../../api/socialAPI';
import { setIdFromSessionStorage } from '../../../common/settings';
import axios from 'axios';

const NaverRedirectComp = () => {

  const navigate = useNavigate();
  const effectRan = useRef(false);
  const [urlParams1] = useSearchParams();
  const { setLoginFlag } = useContext(UserContext);
  const code = urlParams1.get('code');
  const state = urlParams1.get('state');

  console.log('----- NaverRedirectComp -----');
  console.log(code);
  console.log(state);

  useEffect(() => {
    if(!code || !state) return;

    if (effectRan.current) return;
    effectRan.current = true;

    postNaver(code, state)
        .then(response => {
          const data = response.data;
          console.log("유저데이터:", data);

          if(data.type === 'login') {
            alert('로그인이 되었습니다.');
            setLoginFlag(true);
            console.log(data);
            setIdFromSessionStorage(data.naverLoginUser);
            navigate("/");

          } else {
            alert('회원가입이 필요합니다.');
            navigate({
              pathname: '/user/naverSignup',
              search: `?email=${data.email}&nickname=${data.nickname}`,
            });
          }
        })     
      .catch((error) => {
        if (error.response) {
          // 서버에서 보낸 오류 메시지
          console.error(" 서버 응답 상태 코드:", error.response.status);
          console.error(" 서버 응답 데이터:", error.response.data);
        } else if (error.request) {
            // 서버에 요청은 했으나 응답이 없을 경우
            console.error("서버 응답 없음:", error.request);
          } else {
            // 기타 오류
            console.error("Axios 오류:", error.message);
          }            
      }); 
    }, []);

  return (
    <div></div>
  );
};

export default NaverRedirectComp;