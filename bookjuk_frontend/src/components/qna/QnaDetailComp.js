import { useEffect, useState } from 'react';
import { getQnaDetail, getQnaDelete } from '../../api/qnaAPI';
import CustomNavigate from '../../hooks/CustomNavigate';
import { alert, confirm, getIdFromSessionStorage, getUserRoleFromSessionStorage } from '../../common/settings';

import QuillViewer from '../secondhand/QuillViewer';

import { Button } from 'react-bootstrap';

const QnaDetailComp = ({ id }) => {

  const { goToQnaListPage, goToQnaModifyPage } = CustomNavigate();

  const [contentShow, setContentShow] = useState(false);  // 버튼 숨김여부
  const [qna, setQnaData] = useState({
    qnaId: 0, 
    user: {
      userId: 0, 
      userName: '', 
      userNickname: '',
    },
    qnaTitle: '', 
    qnaContent: '', 
    qnaCreateDt: '', 
    qnaUpdateDt: '',    
    qnaReplyYn: '',
  });

  useEffect(() => {
    //console.log(id);
    getQnaDetail(id)
      .then(jsonData => {
        //console.log(jsonData);
        setQnaData(jsonData.results.qna);

        // 수정, 삭제 버튼 보이기
        if(getIdFromSessionStorage() === qna.user.userId || getUserRoleFromSessionStorage() === "ADMIN") {
          setContentShow(!contentShow);
        }
      })
  }, [id]);

  const onClickModify = async () => {
    if(getIdFromSessionStorage() === qna.user.userId || getUserRoleFromSessionStorage() === "ADMIN") {
      //console.log(id);
      goToQnaModifyPage(id);
    } else {
      alert("수정 권한이 없습니다.");
    }
  }
  const onClickDelete = async () => {
    if(getIdFromSessionStorage() === qna.user.userId || getUserRoleFromSessionStorage() === "ADMIN") {
      confirm('게시물을 삭제하시겠습니까?', ()=>{
        getQnaDelete(id)
        .then(jsonData => {
          alert(jsonData.message);
          goToQnaListPage();
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
          <div className="col-8 question-title"><b>{qna?.qnaTitle}</b></div>
          <div className="col-4 question-writer bold">{qna?.user?.userNickname}</div>
        </div>
        <hr />
        <pre dangerouslySetInnerHTML={{__html: qna?.qnaContent}}></pre>
        <hr />
        <div>{qna?.qnaCreateDt?.replace('T', ' ')}</div>
        <div>{qna?.qnaUpdateDt?.replace('T', ' ')}</div>
        <div>{qna?.qnaReplyYn}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Button variant="warning" onClick={onClickModify} className="me-2" style={{ minWidth: '120px' }}>
          수정
        </Button>
        <Button variant="danger" onClick={onClickDelete} className="me-2" style={{ minWidth: '120px' }}>
          삭제
        </Button>
        <Button variant="secondary" onClick={() => { goToQnaListPage() }} style={{ minWidth: '120px' }}>
          목록
        </Button>
      </div>
    </>
  );
};

export default QnaDetailComp;