/**
 * 공통 함수 모음
 *   host 주소 구하기
 *   메인 이동
 *   alert, confirm 커스텀
 *   로그인 User 정보 확인
 *
 * Developer : 김리예
 */

// sweetalert2
import Swal from 'sweetalert2';

/* 프로젝트 host 구하기 */
export function getHost() {
  return window.location.origin; // http://localhost or http://localhost:8080
}

/* 프로젝트 ContextPath 구하기 */
export function getContextPath() {
  const url = window.window.location.href; // http://localhost:8080/myapp/main.do
  const host = window.location.host; // localhost:8080
  const begin = url.indexOf(host) + host.length; // 7 + 14 = 21 : contextPath 의 시작 인덱스
  const end = url.indexOf('/', begin + 1); // 27 : 22 부터 / 가 나오는 인덱스. Mapping의 시작 인덱스
  const contextPath = url.substring(begin, end); // 인덱스 begin부터 인덱스 end 이전까지 : /myapp
  return contextPath;
}

/* 메인 이동 */
export function goToMain() {
  window.location.href = getContextPath();
}

/*
  swal 사용법 참고
  swal('내용');
  swal('제목','내용');
  icon : success, error, warning, info, question
  swal('제목','내용','success');

 alert은 기존과 동일하게 사용
 confirms('메시지', fn, fn); : true 일때 실행할 함수, false 일때 실행할 함수 전달
 ex) confirms('확인창', () => { alert('OK') }, () => { alert('NO') });
*/

/**
 * Custom Alert
 *
 * @param {*} msg  출력할 메시지
 * @param {*} icon 없으면 디폴트는 'success' 아이콘, 다른 아이콘 출력시에는 'error', 'warning', 'info', 'question'  전달
 */
export const alert = function (msg, icon) {
  Swal.fire({
    //title : '알림',
    text: msg,
    icon: icon == null ? 'success' : icon,
    //type : type,
    //timer : 1500,
    //customClass : 'sweet- size',
    //showConfirmButton : false
  });
};

/**
 * Custom Confirm
 *
 * @param {*} msg 컨펌창에 출력할 메시지
 * @param {*} successCallback 확인 클릭시 실행할 함수
 * @param {*} denyCallback 아니오 클릭시 실행할 함수. 아무것도 안할때에는 빈 함수 전달
 * @param {*} icon 없으면 디폴트는 'question' 아이콘, 다른 아이콘 출력시에는 'success', 'error', 'info', 'warning', 'question'  전달
 */
export const confirm = function (msg, successCallback, denyCallback, icon) {
  var confirm = false;
  Swal.fire({
    //title: "Are you sure?",
    text: msg,
    icon: icon == null ? 'question' : icon,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '예',
    cancelButtonText: '아니오',
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      successCallback();
    } else {
      denyCallback();
    }
  });
};

// ========================================== 서버에서 주는 방식 & 저장 방식 미정
/* localStorage 에 user 정보 저장하기 */
// export function setIdFromLocalStorage(userInfo) {
//   const userString = JSON.stringify(userInfo);
//   // const userObj = JSON.parse(userInfo);

//   window.localStorage.setItem('user', userString);
// }

/* localStorage 에 저장된 user 정보 지우기 */
// export function clearIdFromLocalStorage() {
//   window.localStorage.removeItem('user');
// }

/* localStorage 에 저장된 userId 의 값 가져오기 */
// export function getIdFromLocalStorage() {
//   const userObj = JSON.parse(localStorage.getItem('user'));
//   // console.log(userObj);
//   if (!userObj) return null;

//   return userObj?.user?.userId;
// }

/* localStorage 에 저장된 user의 권한 확인하기 */
// export function getUserRoleFromLocalStorage() {
//   const userObj = JSON.parse(localStorage.getItem('user'));
//   // console.log(userObj);
//   if (!userObj) return null;

//   return userObj?.user?.userRole;
// }

/* sessionStorage 에 user 정보 저장하기 */
export function setIdFromSessionStorage(userInfo) {
  const userString = JSON.stringify(userInfo);

  window.sessionStorage.setItem('user', userString);
}

/* sessionStorage 에 저장된 user 정보 지우기 */
export function clearIdFromSessionStorage() {
  window.sessionStorage.removeItem('user');
}

/* sessionStorage 에 저장된 userId 의 값 가져오기 */
export function getIdFromSessionStorage() {
  const userObj = JSON.parse(sessionStorage.getItem('user'));
  if (!userObj) return null;

  return userObj?.userId;
}

/* sessionStorage 에 저장된 userEmail 의 값 가져오기 */
export function getUserEmailFromSessionStorage() {
  const userObj = JSON.parse(sessionStorage.getItem('user'));
  if (!userObj) return null;

  return userObj?.userEmail;
}

/* sessionStorage 에 저장된 userName 의 값 가져오기 */
export function getUserNameFromSessionStorage() {
  const userObj = JSON.parse(sessionStorage.getItem('user'));
  if (!userObj) return null;

  return userObj?.userName;
}

/* sessionStorage 에 저장된 userNickname 의 값 가져오기 */
export function getUserNicknameFromSessionStorage() {
  const userObj = JSON.parse(sessionStorage.getItem('user'));
  if (!userObj) return null;

  return userObj?.userNickname;
}

/* sessionStorage 에 저장된 user의 권한 확인하기 */
export function getUserRoleFromSessionStorage() {
  const userObj = JSON.parse(sessionStorage.getItem('user'));
  if (!userObj) return null;

  return userObj?.userRole;
}

/**
 * sessionStorage 에 저장된 user의 권한 확인하기
 *
 * ex) 아래처럼 확인할 키를 입력해서 호출
 * getUserFromSessionStorage('userName')
 * getUserFromSessionStorage('userNickname')
 * getUserFromSessionStorage('userEmail')
 * getUserFromSessionStorage('userPhone')
 * getUserFromSessionStorage('userRole')
 * getUserFromSessionStorage('profileImg')
 *
 * @param {*} value user 가 가지고 있는 key 값 전달
 * @returns
 */
export function getUserFromSessionStorage(key) {
  const userObj = JSON.parse(sessionStorage.getItem('user'));
  if (!userObj) return null;

  return userObj?.[key];
}

/* 로그인 여부 확인 isLogin() 호출시 -> true/false 반환 */
export function isLogin() {
  const obj = JSON.parse(sessionStorage.getItem('user'));
  if (!obj) return null;

  return obj?.isAuthenticated;
}

// ========================================== 서버에서 주는 방식 & 저장 방식 미정
