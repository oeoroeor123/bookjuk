import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import {useNavigate, useSearchParams } from 'react-router-dom';
import { postNaverSignup } from '../../../api/socialAPI';

const NaverEasySignup = () => {
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const email = urlParams.get('email');
  const nickname = urlParams.get('nickname');
  const [password, setPassword] = useState("");

  const handleSetPassword = () => {
    postNaverSignup ({ email, nickname, password })
    .then((jsonData) => {
      console.log(jsonData);
      alert("회원가입 완료! 다시 로그인해주세요.");
      navigate("/");
    }).catch((error) => {
      alert("비밀번호 설정 실패");
      console.error(error);
    });
  };

  return (
    <div>
      <p>이메일: {email}</p>
      <p>닉네임: {nickname}</p>
     
      <input type="password" name="userPw" value={password} placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)}/>
      <span>  </span>
      <Button variant="light" onClick={handleSetPassword}>설정 완료</Button>
    </div>
  );
};

export default NaverEasySignup;