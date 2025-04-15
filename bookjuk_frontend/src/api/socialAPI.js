import axios from "axios";

const API_HOST = 'http://localhost:8080/api';

// 카카오 간편 가입
export const postKakaoSignup = async (user) => {

  const response = await axios.post(`${API_HOST}/user/easySignup`, user);
  return response;
}

// 네이버 간편 가입
export const postNaverSignup = async (user) => {
  const response = await axios.post(`${API_HOST}/user/naverSignup`, user);
  return response;
}

//카카오 간편 로그인
export const postKakao = async (code) => {
  const header = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    withCredentials : false
  }
  const params = {
    grant_type: 'authorization_code',
    client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    code: code,
    client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
  }
  const response = await axios.post('https://kauth.kakao.com/oauth/token', params, header);
  const data = response.data;
  return data;
}

export const getKakaoToken = async (access_token) => {
  const response = await axios.get(`${API_HOST}/user/kakao?accessToken=${access_token}`);
  return response.data;
}

// 네이버 간편 로그인
export const postNaver = (code, state) => {
  const header = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials : false
  }
  return axios
  .post(`${API_HOST}/user/naver`, {code, state}, header)
  .then(tokenResponse => {
    console.log("네이버 토큰 응답:", tokenResponse);
    return tokenResponse;
  })
  .catch(error => {
    console.error("네이버 토큰 요청 실패:", error);
    throw error;
  });
};