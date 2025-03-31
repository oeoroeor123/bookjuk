/**
 * 사이트 상단 네비게이션 메뉴 바
 *
 * Developer : 김리예
 */

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getUserFromSessionStorage } from '../common/settings';
import { Link } from 'react-router-dom';

const NaviBar = () => {
  return (
    <Nav variant="pills" className="navbar">
      <Nav.Item><Nav.Link as={Link} to="/product">상품</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link as={Link} to="/secondhand">중고거래</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link as={Link} to="/notice">공지사항</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link as={Link} to="/faq">FAQ</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link as={Link} to="/qna">Q&A</Nav.Link></Nav.Item>
      {getUserFromSessionStorage('userRole') === 'ADMIN' && (
        <Nav.Item><Nav.Link as={Link} to="/admin">관리</Nav.Link></Nav.Item>
      )}

    </Nav>
  );
};

export default NaviBar;
