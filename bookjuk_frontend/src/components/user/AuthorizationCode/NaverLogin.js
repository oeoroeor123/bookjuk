
const NaverLogin = () => {
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URL = process.env.REACT_APP_NAVER_CALLBACK_URI;
  const STATE = btoa(String(Math.random() * 1000000));
  const naverToken = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URL}`;


  return (
    <>
      <div className='handleNvaerLogin'>
        <a href={naverToken}>
          <img src="https://cdn.ypbooks.co.kr/front_web/assets/img/naver.png"/>
          <p>네이버</p>
        </a>
      </div> 
    </>
  );
};

export default NaverLogin;