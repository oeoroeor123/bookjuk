/**
 * 공지사항
 * 
 * Developer : 김민희
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import NoticeModifyComp from '../../components/notice/NoticeModifyComp';

const NoticeModifyPage = () => {
  const { id } = useParams();

  return (
    <div>
      <NoticeModifyComp id={id} />
    </div>
  );
};

export default NoticeModifyPage;