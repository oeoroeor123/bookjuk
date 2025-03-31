import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import {useNavigate, useSearchParams } from 'react-router-dom';
import { postKakaoSignup } from '../../../api/socialAPI';

const KakaoEasySignup = () => {
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const email = urlParams.get('email');
  const nickname = urlParams.get('nickname');

  const [password, setPassword] = useState("");

  const handleSetPassword = () => {
    postKakaoSignup({ email, nickname, password })
    .then((jsonData) => {
      console.log(jsonData);
      alert("회원가입 완료! 로그인되었습니다.");
      navigate("/"); // 로그인 후 메인 페이지 이동
    }).catch((error) => {
      alert("비밀번호 설정 실패");
      console.error(error);
    });

  };

  return (
    <div>
      <p>이메일: {email}</p>
      <p>닉네임: {nickname}</p>
      <label>비밀번호:</label>
      <input type="password" name="userPw" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <span>  </span>
      <Button variant="light" onClick={handleSetPassword}>설정 완료</Button>
    </div>
  );
};

export default KakaoEasySignup;