/**
 * 관리자 화면
 *
 * Developer : 김리예
 */
import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import CustomNavigate from '../../hooks/CustomNavigate';
import '../../css/admin/admin.css';

const AdminComp = () => {
  // 페이지 이동 함수
  const { goToEditPage } = CustomNavigate();

  return (
    <>
      <div className="row admin-container">
        <div className="admin-left">
          <p className="admin-menu"><NavLink to="/admin/loginlog" className={({ isActive }) => isActive ? "active-menu" : ""}>회원 로그인 기록 조회</NavLink></p>
          <p className="admin-menu"><NavLink to="/admin/deletelog" className={({ isActive }) => isActive ? "active-menu" : ""}>탈퇴 회원 기록 조회</NavLink></p>
          <p className="admin-menu"><NavLink to="/admin/product/list" className={({ isActive }) => isActive ? "active-menu" : ""}>판매 상품 관리</NavLink></p>
          <p className="admin-menu"><NavLink to="/admin/secondhand" className={({ isActive }) => isActive ? "active-menu" : ""}>중고 상품 관리</NavLink></p>
          <p className="admin-menu"><NavLink to="/admin/qna" className={({ isActive }) => isActive ? "active-menu" : ""}>Q&A 확인</NavLink></p>
          <p className="admin-menu"><NavLink to="/admin/inquiry" className={({ isActive }) => isActive ? "active-menu" : ""}>상품문의 확인</NavLink></p>
          <p className="admin-menu"><NavLink to="/admin/review" className={({ isActive }) => isActive ? "active-menu" : ""}>리뷰 확인</NavLink></p>
          <p className="admin-menu"><NavLink to="/admin/order" className={({ isActive }) => isActive ? "active-menu" : ""}>주문 상태 관리</NavLink></p>
          <p className="admin-menu"><NavLink to="/admin/userSetting" className={({ isActive }) => isActive ? "active-menu" : ""}>회원권한변경</NavLink></p>
        </div>
        <div className="admin-right">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminComp;
