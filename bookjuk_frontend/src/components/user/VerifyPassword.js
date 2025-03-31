import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { postRecheck } from '../../api/userAPI';
import { alert, getUserEmailFromSessionStorage } from '../../common/settings';

// 비밀번호 재확인
const VerifyPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = getUserEmailFromSessionStorage();

    if (!password) {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }

    postRecheck(email, password)
    .then((response)=> {
      if(response.data.success) {
        alert("비밀번호 확인이 되었습니다.");
        navigate('/user/myinfo');
      }
    })
    .catch(error => {
      console.log('비밀번호 재확인 에러: ', error);

      if (error.response) {
        console.error('서버 응답 에러 데이터: ', error.response.data);
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        alert("서버와의 통신 중 문제가 발생했습니다.");
      }
    })
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
      <div className="card p-4"style={{ width: '100%', maxWidth: '500px' }}>
        <h4 className="text-center mb-3">비밀번호 확인</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">현재 비밀번호:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/>
          </div>
          <button type="submit" className="btn btn-light w-100">확인</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyPassword;