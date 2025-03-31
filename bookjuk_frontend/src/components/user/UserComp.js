import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alert, confirm, clearIdFromSessionStorage } from '../../common/settings';
import { UserContext } from '../common/UserContext';
import { Button } from 'react-bootstrap';
import { deleteUser, getUserInformation, postUserLogout } from '../../api/userAPI';


const UserComp = () => {
  const navigate = useNavigate();
  const effectRan = useRef(false);
  const { setLoginFlag } = useContext(UserContext);

  const [user, setUser] = useState({
    userEmail: '',
    userPw: '',
    userName: '',
    userBirthdate: '',
    userPhone: '',
    userNickname: '',
    userRole: '',
    createDt: '',
  });

  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;

    getUserInformation()
    .then((jsonData) => {
      console.log('getUserInformation:', jsonData);
      setUser(jsonData);
    })
    . catch ((error) => {
      console.log('유저 정보 불러오기 에러:', error.jsonData);
      clearIdFromSessionStorage();
    });
  }, []);

  const handleLogout = async () => {
    confirm('정말 로그아웃하시겠습니까?', () => {
      postUserLogout(user).then((response) => {
        if(response.status === 200) {
          alert('로그아웃 성공');
          clearIdFromSessionStorage();
          localStorage.clear();
          setLoginFlag(false);
          navigate('/user/login');
        }
      }).catch (error => {
        console.log('로그아웃 실패:', error);
      });
    }, () => {});

  };

  const handleDelete = async () => {
    confirm('정말 탈퇴하시겠습니까?', () => {
      deleteUser(user).then((response) => {
        if(response.isConfirmed) {
          alert(response.message)
          navigate("/");
        }
      }).catch(error => {
        console.log("회원탈퇴 실패:", error.response?.data?.error || error.message);
          alert("회원 탈퇴에 실패했습니다.");
      });
    }, () => {});
  };

  const handleUpdate = () => {
    navigate('/user/update');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h3 className="text-center mb-4"> 내 정보</h3>
        <div className="mb-3">
          <strong>아이디: </strong> {user.userEmail}
        </div>
        <div className="mb-3">
          <strong>비밀번호: </strong> {'**********'}
        </div>
        <div className="mb-3">
          <strong>성명: </strong> {user.userName}
        </div>
        <div className="mb-3">
          <strong>생년월일: </strong> {user.userBirthdate}
        </div>
        <div className="mb-3">
          <strong>전화번호: </strong> {user.userPhone}
        </div>
        <div className="mb-3">
          <strong>닉네임: </strong> {user.userNickname}
        </div>
        <div className="mb-3">
          <strong>권한등급: </strong> {user.userRole}
        </div>
        <div className="mb-3">
          <strong>가입일: </strong> {user.createDt.replace('T', ' ')}
        </div>

        <div className="d-flex justify-content-between gap-2 mt-4">
          <Button variant="primary" onClick={handleLogout}>로그아웃</Button>

          <Button variant="danger" onClick={handleDelete}>회원탈퇴</Button>

          <Button variant="warning" onClick={handleUpdate}>회원정보 수정</Button>
        </div>

      </div>
    </div>
  );
};

export default UserComp;
