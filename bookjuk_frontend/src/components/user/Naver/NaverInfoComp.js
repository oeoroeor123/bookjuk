import React, { useEffect, useState } from 'react';
import { getIdFromSessionStorage } from '../../../common/settings';

const NaverInfoComp = () => {
  const [user, setUser] = useState(null);

  useEffect (() => {
    const socialUser = getIdFromSessionStorage('user');
  if(socialUser) {
    setUser(JSON.parse(socialUser));
  }
  }, []);

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div>
      <h2>네이버 로그인 완료!</h2>
      <p>이메일: {user.email}</p>
      <p>닉네임: {user.nickname}</p>
    </div>
  );
};

export default NaverInfoComp;