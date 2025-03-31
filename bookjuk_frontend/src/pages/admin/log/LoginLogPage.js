/**
 * 관리자 - 로그인 회원 로그 조회 페이지
 *
 * Developer : 김리예
 */

import React from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginLogComp from "../../../components/admin/log/LoginLogComp";

const LoginLogPage = () => {
  return (
    <>
      <LoginLogComp />
    </>
  );
};

export default LoginLogPage;
