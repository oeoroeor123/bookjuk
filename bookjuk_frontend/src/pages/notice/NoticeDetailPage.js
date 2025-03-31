/**
 * 공지사항
 *
 * Developer : 김민희
 */

import React from 'react';
import NoticeDetailComp from '../../components/notice/NoticeDetailComp';
import { useParams } from 'react-router-dom';

const NoticeDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <NoticeDetailComp id={id}/>
    </div>
  );
};

export default NoticeDetailPage;