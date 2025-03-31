import axios from 'axios';
import { adminApi, userApi } from './baseApi';

// 로그인
export const postUserLogin = async (user) => {
  const response = await userApi.post(`/login`, user);
  return response.data;
}

// 로그아웃
export const postUserLogout = async (user) => {
  const response = await userApi.post(`/logout`, user);
  return response;
}

// 회원가입
export const postUserSignup = async (user) => {
  const response = await userApi.post(`/signup`, user);
  return response.data;
}

// 기존 유저 정보 불러오기
export const getUserInformation = async (user, parameters) => {
  const response = await userApi.get(user, {
    params: parameters,
  });
  const jsonData = await response.data;
  return jsonData;
}

// 마이페이지 유저정보 불러오기
export const getMyPage = async (user, parameters) => {
  const response = await userApi.get(`/checklogin`, user,{
    params: parameters,
  });
  return response.data;
}

// 회원 탈퇴
export const deleteUser = async (user) => {
  const response = await userApi.delete(`/delete`, {user} );
  return response.data;
}

// 회원정보 수정
export const putUpdate = async (updateUser) => {
  const response = await userApi.put(`/update`, updateUser);
  return response.data;
}

// 비밀번호 재확인
export const postRecheck = async (userEmail, rawPassword) => {

  const response = await userApi.post(`/verifyPassword`, 
    { email: userEmail, password: rawPassword }
  );
  return response;
}

// 닉네임 중복 검사 
export const nickNameCheck = async (nickname) => {

  const response = await userApi.post(`/checkNickname`, nickname);
  
  return response;
}

// 권한 변경 API 함수
export const putUpdateRole = (userEmail, updatedUser) => {
  return userApi
    .put(`/${userEmail}/role`, updatedUser)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("권한 변경 실패:", error);
      throw error;
    });
};

// 모든 유저 정보를 가져오는 API 함수
export const getAllUsers = () => {
  return axios
    .get("http://localhost:8080/api/users")
    .then((response) => response.data)
    .catch((error) => {
      console.error("유저 정보 불러오기 실패:", error);
      throw error;
    });
};
