import React, { useState, useEffect, useRef } from 'react';
import { Button, Table } from 'react-bootstrap';
import { getAllUsers, putUpdateRole, updateUserRole } from '../../api/userAPI';  // API 호출 함수
import { useNavigate } from 'react-router-dom';
import { clearIdFromSessionStorage, confirm } from '../../common/settings';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // 모든 유저 목록
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 유저
  const [userRole, setUserRole] = useState(""); // 선택된 유저의 권한
  const effectRan = useRef(false);

  // 유저 정보 조회 (관리자만 접근 가능)
  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;

    getAllUsers()
      .then((jsonData) => {
        console.log("모든 유저 정보 불러오기:", jsonData);
        if (jsonData && Array.isArray(jsonData)) {
          setUsers(jsonData); // 유저 목록을 상태에 저장
        } else {
          console.error("유저 정보가 유효하지 않습니다.");
        }
      })
      .catch((error) => {
        console.log("유저 정보 불러오기 에러:", error);
        clearIdFromSessionStorage();
      });
  }, []);

  // 유저 선택
  const handleUserSelect = (e) => {
    const selectedUserEmail = e.target.value;
    const user = users.find((user) => user.userEmail === selectedUserEmail);
    setSelectedUser(user);
    setUserRole(user ? user.userRole : "");
  };

  // 권한 변경 처리
  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userRole) {
      alert("권한을 선택해주세요.");
      return;
    }

    if (!selectedUser) {
      alert("유저를 선택해주세요.");
      return;
    }

    const updatedUser = {
      userRole, // 변경된 권한 값
    };

    putUpdateRole(selectedUser.userEmail, updatedUser)
    .then((response) => {
      if (response) {
        alert("권한이 성공적으로 변경되었습니다.");
        navigate("/"); // 변경 후 홈으로 이동
      }
    })
    .catch((error) => {
      console.log("권한 변경 실패", error);
      alert("권한 변경에 실패했습니다.");
    });
  };

    // 취소 버튼
    const handleCancel = () => {
      confirm("변경을 취소하시겠습니까?", () => {
        navigate("/");
      }, () => {});
    };

    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
        <div className="card p-4" style={{ width: "100%", maxWidth: "450px" }}>
          <h3 className="text-center mb-4">유저 권한 변경</h3>
          <form onSubmit={handleSubmit}>
            {/* 유저 선택 */}
            <div className="mb-3">
              <label>유저 선택:</label>
              <select onChange={handleUserSelect} className="form-control">
                <option value="">유저를 선택하세요</option>
                {users.map((user) => (
                  <option key={user.userEmail} value={user.userEmail}>
                    {user.userEmail} - {user.userName} - {user.userRole}
                  </option>
                ))}
              </select>
            </div>
  
            {/* 선택된 유저 정보 표시 */}
            {selectedUser && (
              <>
                <div className="mb-3">
                  <label>이메일:</label>
                  <input type="email" value={selectedUser.userEmail} disabled className="form-control" />
                </div>
                <div className="mb-3">
                  <label>이름:</label>
                  <input type="text" value={selectedUser.userName} disabled className="form-control" />
                </div>
  
                {/* 권한 선택 */}
                <div className="mb-3">
                  <label>권한:</label>
                  <select name="userRole" value={userRole} onChange={handleRoleChange} className="form-control">
                    <option value="">권한을 선택하세요</option>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </>
            )}
  
            <div className="d-flex justify-content-between mt-4">
              <Button variant="warning" type="submit">권한 변경</Button>
              <Button variant="primary" onClick={handleCancel}>뒤로가기</Button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default AdminPanel;