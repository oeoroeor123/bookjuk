import React, { useState, useEffect, useRef } from 'react';
import { alert, clearIdFromSessionStorage, confirm } from '../../common/settings';
import { useNavigate } from 'react-router-dom';
import { putUpdate, getUserInformation, nickNameCheck } from '../../api/userAPI';
import { Button } from 'react-bootstrap';
import UpdateVaildate from './validate/UpdateVaildate';

const UpdateUserComp = () => {
  const navigate = useNavigate();
  const effectRan = useRef(false);
  const {
    validateBirthdate,
    validatePhone, 
    validateNickname,
  } = UpdateVaildate();

  // 유효성 검사 메시지 상태 추가
  const [birthDateError, setBirthDateError] = useState({message: "", color: "black"});
  const [phoneError, setPhoneError] = useState({message: "", color: "black"});
  const [nicknameError, setNicknameError] = useState({message: "", color: "black"});

  const [user, setUser] = useState({
    userEmail: '',
    userName: '',
    userBirthdate: '',
    userPhone: '',
    userNickname: '',
    changeDt: '',
  });

  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;

  // 기존 정보 불러오기
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
       [name]: value,
    });
    switch (name) {
      case "userBirthdate":
        setBirthDateError(validateBirthdate(value));
        break;
      case "userPhone":
        setPhoneError(validatePhone(value));
        break;
      case "userNickname":
        handleNicknameCheck(value);
        break;
      default:
        break;
    }
  };

  const handleNicknameCheck = async () => {
    const result = await validateNickname(user.userNickname);
    setNicknameError(result);
  };

  
  const validateForm = async () => {
   if (birthDateError.color === "red" || !user.userBirthdate) {
    return false
    };

   if (phoneError.color === "red" || !user.userPhone) {
    return false
   };

   // 유효성 검사와 중복 검사 결과가 모두 통과해야 함
   if (nicknameError.color === "red" || !user.userNickname) {
      return false
    };

    // 닉네임 중복 검사 API 호출 (비동기 처리 필요)
    
      nickNameCheck({ nickname: user.userNickname })
      .then((response) => {
        const { isAvailable } = response.data;
        if (!isAvailable) {
          console.log("닉네임 중복 검사 실패");
          return false;
        }
      })
      
      .catch (error => {
        console.error("닉네임 중복 검사 실패:", error);
        return false;
      })
      console.log("모든 유효성 검사 통과");
      return true;
      
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();  //  비동기 함수 호출로 유효성 검사
    if (isValid) {
      console.log("폼 제출 가능");
     } else {
        console.log("폼 유효성 검사 실패");
        alert('올바른 회원수정 요청이 아닙니다.');
      return;
    }
    
    const updateUser = {
      userEmail: user.userEmail,
      userName: user.userName,
      userBirthdate: user.userBirthdate,
      userPhone: user.userPhone,
      userNickname: user.userNickname,
      changeDt: user.changeDt,
    };

    putUpdate(updateUser)
      .then((response) => {
        if(response.isModified) {
          console.log(response);
          alert("수정이 완료되었습니다.");
          navigate("/user/myinfo");
        }
        setIsModified(response?.isModified);
      })
      .catch(error => {
          console.log('수정 실패', error.response.data);
          alert('수정에 실패했습니다.');
        });
  };

  const handleMyPage = () =>  {
      confirm('취소하시겠습니까?', () => {
        navigate('/user/');
      }, () => {});
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
      <div  className="card p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h3 className="text-center mb-4">회원정보 수정</h3>
        <form name='updateUser' onSubmit={handleSubmit}>
          {/*이메일*/}
          <div className="mb-3">
            <label>이메일:</label>
            <input type="email" name="userEmail" value={user.userEmail} disabled  className="form-control"/>
          </div>

          {/*이름*/}
          <div className="mb-3">
            <label>이름:</label>
            <input type="text" name="userName" value={user.userName} onChange={handleChange} className="form-control"/>
          </div>

          {/*생년월일*/}
          <div className="mb-3">
            <label>생년월일:</label>
            <input type="date" name="userBirthdate" value={user.userBirthdate} onChange={handleChange}  className="form-control"/>
            <span style = {{ color: birthDateError.color, fontSize: '0.875rem' }}>{birthDateError.message}</span>
          </div>

          {/*전화번호*/} 
          <div className="mb-3">
            <label>전화번호:</label>
            <input type="text" name="userPhone" value={user.userPhone} onChange={handleChange} className="form-control"/>
            <span style={{ color: phoneError.color, fontSize: '0.875rem' }}>{phoneError.message}</span>
          </div>

          {/*닉네임*/}
          <div className="mb-3">
            <label>닉네임:</label>
            <input type="text" name="userNickname" value={user.userNickname} onChange={handleChange} className="form-control"/>
            <button type="button" onClick={handleNicknameCheck}> 중복 확인 </button>
            <span style={{ color: nicknameError.color, fontSize: '0.875rem' }}>{nicknameError.message}</span>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <Button variant="warning" type="submit">수정하기</Button>
            <Button variant="primary" onClick={handleMyPage}>뒤로가기</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserComp;