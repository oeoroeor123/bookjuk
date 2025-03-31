import { useState } from "react";
import { userApi } from "../../../api/baseApi";

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// 최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/; 
// 01011111111 , '-'빼고 입력하기
export const phoneRegex = /^010\d{4}\d{4}$/; 
export const nicknameRegex =  /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_-]{3,10}$/;

const SignupValidation = () => {
  const [userEmail, setUserEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [userPw, setUserPw] = useState("");
  const [userPwConfirm, setUserPwConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [userBirthdate, setUserBirthdate] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [nonNicknameDuplication, setNonNicknameDuplication] = useState(false);




  const validateEmail = (value) => {
    setUserEmail(value);
    if (value === "") return { message: "", color: "black" };
    if (emailRegex && emailRegex.test(value)) {
      setValidEmail(true);
      return { message: "올바른 이메일 형식입니다.", color: "green" };
    } else {
      setValidEmail(false);
      return { message: "올바른 이메일 형식이 아닙니다.", color: "red" };
    }
  };

  const validatePassword = (value) => {
    setUserPw(value);
    if (value === "") return { message: "", color: "black" };
    if (passwordRegex && !passwordRegex.test(value)) return { message: "최소 8자 이상, 최소한 하나의 대문자와 소문자,  숫자 또는 특수문자를 포함해야하며 공백은 사용하지 않습니다.", color: "red" };
    return { message: "사용할 수 있는 비밀번호 입니다.", color: "green" };
  };

  const validatePasswordConfirm = (value) => {
    setUserPwConfirm(value);
    if (value === "") return { message: "", color: "black" };
    return value === userPw ? { message: "비밀번호가 일치합니다.", color: "green" } : { message: "비밀번호가 일치하지 않습니다.", color: "red" };
  };

  const validateBirthdate = (value) => {
    const today = new Date();
    const birthDate = new Date(value);
    setUserBirthdate(value);
    if(value === "") return { message: "", color: "black" };
    if(birthDate > today) {
      return { message: "생년월일을 올바르게 입력하세요.", color: "red" };
    }
    return { message: "생년월일을 올바르게 입력했습니다. ", color: "green" };
  };

  const validatePhone = (value) => {
    setUserPhone(value);
    if(value === "") return { message: "", color: "black" };
    if(!phoneRegex.test(value)) {
      return { message: "올바른 전화번호가 아닙니다.", color: "red" };
    }
    return { message: "올바른 전화번호가 맞습니다.", color: "green" };
  };

  const validateNickname = async (value) => {
    setUserNickname(value);

    if (value === "") return { message: "", color: "black" };
    if (!nicknameRegex.test(value)) {

      return { message: "사용할 수 없는 닉네임 입니다.", color: "red" };
    }
    // 중복 검사 API 호출
    try {
      const response = await userApi.post("/checkNickname", { nickname: value });
      const { isAvailable } = response.data;
      if (isAvailable) {

        setNonNicknameDuplication(true);

        return { message: "사용 가능한 닉네임입니다.", color: "green" };
      } else {
        setNonNicknameDuplication(false);
        return { message: "이미 사용 중인 닉네임입니다.", color: "red" };
      }
    } catch (error) {
      console.error("닉네임 중복 검사 실패:", error);
      return { message: "중복 검사 중 오류가 발생했습니다.", color: "red" };
    }
  };

  return {
    userEmail, setUserEmail, validateEmail, validEmail, emailRegex,
    userPw, setUserPw, validatePassword, passwordRegex,
    userPwConfirm, setUserPwConfirm, validatePasswordConfirm,
    userName, setUserName,
    userBirthdate, setUserBirthdate, validateBirthdate,
    userPhone, setUserPhone, validatePhone,
    userNickname, setUserNickname,setNicknameMessage, validateNickname,
    nonNicknameDuplication, setNonNicknameDuplication,
  };
};

export default SignupValidation;