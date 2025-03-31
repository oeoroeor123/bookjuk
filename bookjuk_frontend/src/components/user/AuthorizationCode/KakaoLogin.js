import { NavLink } from "react-router-dom";

const KakaoLogin = () => {

  const REST_API_KEY = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const kakaoToken = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  
  return (    
      <div>
        <NavLink to={kakaoToken}>
          <img src="https://cdn.ypbooks.co.kr/front_web/assets/img/kakao.png"/>
          <p>카카오</p>
        </NavLink>
      </div>    
  );

};

export default KakaoLogin;