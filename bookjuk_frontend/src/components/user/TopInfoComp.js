import React, { useContext, useState } from 'react';
import { UserContext } from '../common/UserContext';
import { useNavigate } from 'react-router-dom';
import { getUserNicknameFromSessionStorage } from '../../common/settings';
import "../../css/user/TopInfoComp.css";

const TopInfoComp = () => {
  const { loginFlag, setLoginFlag } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const nickname = getUserNicknameFromSessionStorage();
  return (  
    <div className="my-info-container">
      {loginFlag ? (
        <div 
          className="user-menu"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span className='nickname'>{nickname}</span>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => navigate("/user/")}>마이페이지</button>
              <button className="dropdown-item" onClick={() => navigate("/user/logout")}>로그아웃</button>

            </div>
          )}
        </div>
      ) : (
        <div className="auth-buttons">
          <button className="btn btn-light mx-2" onClick={() => navigate("/user/login")}>로그인</button>
          <button className="btn btn-light" onClick={() => navigate("/user/signupTerms")}>회원가입</button>
        </div>
      )}
    </div>
  );
};

export default TopInfoComp;