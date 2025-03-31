// 로그인 상태 관리 컴포넌트
import { createContext, useState } from 'react';

export const UserContext = createContext({
  loginFlag: false, // 로그인 상태
  setLoginFlag: () => {}, // 로그인 상태를 업데이트하는 함수
  cartItemCount: 0, // 장바구니 아이템 개수
  setCartItemCount: () => {}, // 장바구니 아이템 개수를 업데이트하는 함수  
});