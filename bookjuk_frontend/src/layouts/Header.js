/**
 * 사이트 상단
 *
 * Developer : 김리예
 */

import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SearchComp from '../components/product/SearchComp';
import CartIconComp from '../components/cart/CartIconComp';
import NaviBar from './NaviBar';
import { UserContext } from '../components/common/UserContext';
import TopInfoPage from '../pages/user/TopInfoPage';


const Header = () => {
  
  const { loginFlag, cartItemCount } = useContext(UserContext);

  useEffect(() => {}, [loginFlag, cartItemCount]);

  return (
    <div className="header" key={cartItemCount}>
      <NavLink to="/">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} className="logo" />
      </NavLink>
      <SearchComp />
      <CartIconComp />
      <TopInfoPage/>
      <NaviBar />
    </div>
  );
};

export default Header;
