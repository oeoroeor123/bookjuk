import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getKakaoToken, postKakao } from '../../../api/socialAPI';
import axios from 'axios';
import { setIdFromSessionStorage } from '../../../common/settings';
import { UserContext } from '../../common/UserContext';

const KakaoRedirectComp = () => {

  const navigate = useNavigate();
  const effectRan = useRef(false);
  const [urlParams] = useSearchParams();
  const { setLoginFlag } = useContext(UserContext);
  const code = urlParams.get('code');
  console.log('----- KakaoRedirectComp -----');
  console.log(code);

  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;

    postKakao(code)
      .then((response) => {
        console.log("----- token From Kakao -----");
        console.log(response);    

        getKakaoToken(response.access_token)
        .then(jsonData => {
          if(jsonData.type === 'login') {
            alert('로그인이 되었습니다.');
            setLoginFlag(true);
            console.log(jsonData);
            setIdFromSessionStorage(jsonData.easyLoginUser);
            navigate("/");
          } else {
            alert('회원가입이 필요합니다.');
            navigate({
              pathname: '/user/easySignup',
              search: `?email=${jsonData.email}&nickname=${jsonData.nickname}`,
            });
          }
        })
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
    <div>
    </div>
  );

};

export default KakaoRedirectComp;