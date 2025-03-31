/**
 * 마이페이지
 *
 * Developer : 김재찬
 */
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../css/user/MyPageComp.css';
import { getIdFromSessionStorage } from '../../common/settings';

const MyPageComp = () => {
  const userId = getIdFromSessionStorage();
  return (
    <>
      <div className="row user-container">
        <div className="user-left">
          <p className="user-menu"><Link to="/user/verify">내 정보</Link></p>
          <p className="user-menu"><Link to="/user/order/myOrder">주문 내역</Link></p>
          <p className="user-menu"><Link to= {`/user/wish/${userId}`}>찜목록</Link></p>
          <p className="user-menu"><Link to= {`/user/secondhand/${userId}`}>등록한 중고상품</Link></p>
          <p className="user-menu"><Link to= {`/user/qna/${userId}`}>등록한 Q&A</Link></p>
        </div>
        <div className="user-right">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MyPageComp;