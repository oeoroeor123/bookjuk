/**
 * 공지사항
 *
 * Developer : 김민희
 */

import { useEffect, useState } from 'react';
import { getNoticeDetail, getNoticeDelete } from '../../api/noticeAPI';
import CustomNavigate from '../../hooks/CustomNavigate';
import { alert, confirm, getIdFromSessionStorage, getUserRoleFromSessionStorage } from '../../common/settings';

import QuillViewer from '../secondhand/QuillViewer';

import { Button } from 'react-bootstrap';


const NoticeDetailComp = ({ id }) => {

  const { goToNoticeListPage, goToNoticeModifyPage } = CustomNavigate();

  const [contentShow, setContentShow] = useState(false);  // 버튼 숨김여부
  const [notice, setNoticeData] = useState({
    noticeId: 0, 
    user: {
      userId: 0, 
      userName: '', 
      userNickname: '',
    },
    noticeTitle: '', 
    noticeContent: '', 
    noticeCreateDt: '', 
    noticeUpdateDt: '',    
  });

  useEffect(() => {
    //console.log(id);
    getNoticeDetail(id)
      .then(jsonData => {
        //console.log(jsonData);
        setNoticeData(jsonData.results.notice);

        // 수정, 삭제 버튼 보이기
        if(getIdFromSessionStorage() === notice.user.userId || getUserRoleFromSessionStorage() === "ADMIN") {
          setContentShow(!contentShow);
        }
      })
  }, [id]);

  const onClickModify = async () => {
    if(getIdFromSessionStorage() === notice.user.userId || getUserRoleFromSessionStorage() === "ADMIN") {
      //console.log(id);
      goToNoticeModifyPage(id);
    } else {
      alert("수정 권한이 없습니다.");
    }
  }
  const onClickDelete = async () => {
    if(getIdFromSessionStorage() === notice.user.userId || getUserRoleFromSessionStorage() === "ADMIN") {
      confirm('게시물을 삭제하시겠습니까?', ()=>{
        getNoticeDelete(id)
        .then(jsonData => {
          alert(jsonData.message);
          goToNoticeListPage();
        })
      }, ()=>{});
    } else {
      alert("삭제 권한이 없습니다.");
    }
  }


  return (
    <>
      <br/>
      <br/>
      <div >
        <div className="row">
          <div className="col-8 question-title"><b>{notice?.noticeTitle}</b></div>
          <div className="col-4 question-writer bold">{notice?.user?.userNickname}</div>
        </div>
        <hr />
        <pre dangerouslySetInnerHTML={{__html: notice?.noticeContent}}></pre>
        <hr />
        <div>{notice?.noticeCreateDt?.replace('T', ' ')}</div>
        <div>{notice?.noticeUpdateDt?.replace('T', ' ')}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Button variant="warning" onClick={onClickModify} className="me-2" style={{ minWidth: '120px' }}>
          수정
        </Button>
        <Button variant="danger" onClick={onClickDelete} className="me-2" style={{ minWidth: '120px' }}>
          삭제
        </Button>
        <Button variant="secondary" onClick={() => { goToNoticeListPage() }} style={{ minWidth: '120px' }}>
          목록
        </Button>
      </div>
    </>
  );
};

export default NoticeDetailComp;