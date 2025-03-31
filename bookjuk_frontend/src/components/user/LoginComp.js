/**
 * 로그인
 *
 * Developer : 김재찬
 */

import { NavLink, useNavigate } from 'react-router-dom';
import { postUserLogin } from '../../api/userAPI';
import { alert, clearIdFromSessionStorage, setIdFromSessionStorage } from '../../common/settings';
import { useContext } from 'react';
import { UserContext } from '../common/UserContext';
import KakaoLogin from './AuthorizationCode/KakaoLogin';
import NaverLogin from './AuthorizationCode/NaverLogin';

const LoginComp = () => {
  const navigate = useNavigate();
  const { setLoginFlag } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 스프링 시큐리티에서 로그인 폼에 대한 설정을 포함하므로 반드시 폼으로 전송해야 합니다.      
    const loginForm = new FormData(document.getElementById('loginForm')); 
    postUserLogin(loginForm).then((response) => {
      //console.log(response);

      if (response.isAuthenticated) {
        alert('로그인 성공');
        setLoginFlag(true);
       // console.log('로그인 데이터:', response.user);
        setIdFromSessionStorage(response.user); // localStorage에 로그인 정보 저장
        navigate('/');
      }
    }).catch(error => {
      console.log('로그인 에러: ', error);
      alert("아이디나 비밀번호가 일치하지 않습니다.");
      clearIdFromSessionStorage();
      setLoginFlag(false);

      if (error.response) {
        console.log('응답 데이터:', error.response.data);
        console.log('응답 상태:', error.response.status);
      } else {
        console.log('로그인 에러:', error.message);
 
      }
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h3 className="text-center mb-4" >로그인</h3>

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" name="userEmail" className="form-control" placeholder="이메일" />
          </div>
          <div className="mb-3">
            <input type="password" name="userPw" className="form-control" placeholder="비밀번호" />
          </div>
          <button type="submit" className="btn btn-light w-100">로그인</button>
        </form>
        <div className="mt-3 text-center">
          <span>회원가입이 필요하신가요?</span>
          <NavLink to="/user/signup"><button className="btn btn-link">회원가입</button></NavLink>
        </div>
        <hr/>
        <div className="d-flex justify-content-center gap-5">
          <div className="w-48">
            <NaverLogin/>
          </div>
          <div className="w-48">
            <KakaoLogin/>
          </div>
        </div>
      </div>    
    </div>
  );
};

export default LoginComp;
