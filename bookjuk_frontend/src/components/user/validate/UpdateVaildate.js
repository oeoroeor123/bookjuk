import { userApi } from '../../../api/baseApi';


// 01011111111 , '-'빼고 입력하기
export const phoneRegex = /^010\d{4}\d{4}$/; 

export const nicknameRegex =  /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_-]{3,10}$/;

const UpdateVaildate = () => {

  const validateBirthdate = (value) => {
    const today = new Date();
    const birthDate = new Date(value);

    if(value === "") return { message: "", color: "black" };
    if(birthDate > today) {
      return { message: "생년월일을 올바르게 입력하세요.", color: "red" };
    }
    return { message: "생년월일을 올바르게 입력했습니다. ", color: "green" };
  };

  const validatePhone = (value) => {
    if(value === "") return { message: "", color: "black" };
    if(!phoneRegex.test(value)) {
      return { message: "올바른 전화번호가 아닙니다. '-'빼고 입력해주세요.", color: "red" };
    }
    return { message: "올바른 전화번호가 맞습니다.", color: "green" };
  };

  const validateNickname = async (value) => {
    if (value === "") return { message: "", color: "black" };
    if (!nicknameRegex.test(value)) {
      return { message: "특수기호를 사용할 수 없습니다. 영어, 숫자, 한글, '-'와 '_'만 가능합니다.", color: "red" };
    }
    // 중복 검사 API 호출
    try {
      const response = await userApi.post("/checkNickname", { nickname: value });
      const { isAvailable } = response.data;

      if (isAvailable) {
        return { message: "사용 가능한 닉네임입니다.", color: "green" };
      } else {
        return { message: "이미 사용 중인 닉네임입니다.", color: "red" };
      }
    } catch (error) {
      console.error("닉네임 중복 검사 실패:", error);
      return { message: "중복 검사 중 오류가 발생했습니다.", color: "red" };
    }
  };

  return {
    validateBirthdate,
    validatePhone, 
    validateNickname,
  };

};

export default UpdateVaildate;