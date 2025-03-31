/**
 * FAQ
 *
 * Developer : 김민희
 */

import { useEffect, useState } from 'react';
import { getFaqDelete, getFaqDetail } from '../../api/faqAPI ';
import CustomNavigate from '../../hooks/CustomNavigate';
import { alert, confirm, getIdFromSessionStorage, getUserRoleFromSessionStorage } from '../../common/settings';

import QuillViewer from '../secondhand/QuillViewer';

import { Button } from 'react-bootstrap';


const FAQDetailComp = ({ id }) => {

  const { goToFaqListPage, goToFaqModifyPage } = CustomNavigate();

  const [contentShow, setContentShow] = useState(false);  // 버튼 숨김여부
  const [faq, setFaqData] = useState({
    faqId: 0, 
    user: {
      userId: 0, 
      userName: '', 
      userNickname: '',
    },    faqTitle: '', 
    faqContent: '', 
    faqCreateDt: '', 
    faqUpdateDt: '',    
  });

  useEffect(() => {
    //console.log(id);
    getFaqDetail(id)
      .then(jsonData => {
        //console.log(jsonData);
        setFaqData(jsonData.results.faq);

        // 수정, 삭제 버튼 보이기
        if(getIdFromSessionStorage() === faq.user.userId || getUserRoleFromSessionStorage() === "ADMIN") {
          setContentShow(!contentShow);
        }
      })
  }, [id]);

  const onClickModify = async () => {
    if(getIdFromSessionStorage() === faq.user.userId || getUserRoleFromSessionStorage() === "ADMIN") {
      //console.log(id);
      goToFaqModifyPage(id);
    } else {
      alert("수정 권한이 없습니다.");
    }
  }
  const onClickDelete = async () => {
    if(getIdFromSessionStorage() === faq.user.userId || getUserRoleFromSessionStorage() === "ADMIN") {
      confirm('게시물을 삭제하시겠습니까?', ()=>{
        getFaqDelete(id)
        .then(jsonData => {
          alert(jsonData.message);
          goToFaqListPage();
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
          <div className="col-8 question-title"><b>{faq?.faqTitle}</b></div>
          <div className="col-4 question-writer bold">{faq?.user?.userNickname}</div>
        </div>
        <hr />
        <pre dangerouslySetInnerHTML={{__html: faq?.faqContent}}></pre>
        <hr />
        <div>{faq?.faqCreateDt?.replace('T', ' ')}</div>
        <div>{faq?.faqUpdateDt?.replace('T', ' ')}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Button variant="warning" onClick={onClickModify} className="me-2" style={{ minWidth: '120px' }}>
          수정
        </Button>
        <Button variant="danger" onClick={onClickDelete} className="me-2" style={{ minWidth: '120px' }}>
          삭제
        </Button>
        <Button variant="secondary" onClick={() => { goToFaqListPage() }} style={{ minWidth: '120px' }}>
          목록
        </Button>
      </div>
    </>
  );
};

export default FAQDetailComp;