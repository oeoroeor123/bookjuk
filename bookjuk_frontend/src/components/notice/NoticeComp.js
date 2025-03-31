/**
 * 공지사항
 *
 * Developer : 김민희
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { alert, confirm, getUserRoleFromSessionStorage } from '../../common/settings';
import { getnoticeList } from '../../api/noticeAPI';
import CustomNavigate from '../../hooks/CustomNavigate';

import { FcList } from "react-icons/fc";
import { Button } from 'react-bootstrap';
import Table from "react-bootstrap/Table";


const NoticeComp = () => {

  const { goToNoticeDetailPage, goToNoticeRegistPage } = CustomNavigate();

  const [btnShow, setBtnShow] = useState(false);  // 등록버튼 숨김여부
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      noticeList: [],
      pageList: [],
      pageDto: {},
    }
  })

  const [ queryParams ] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));  // 요청 파라미터 page가 없으면 page=1 사용
  const size = !queryParams.get('size') ? 20 : parseInt(queryParams.get('size'));  // 요청 파라미터 size가 없으면 size=2 사용
  const sort = !queryParams.get('sort') ? 'noticeId,desc' : queryParams.get('sort');    // 요청 파라미터 sort가 없으면 sort=id,desc 사용

  useEffect(() => {
    getnoticeList({ page, size, sort })
      .then(jsonData => {
        //console.log(jsonData);
        setServerData(jsonData);
      })

      if(getUserRoleFromSessionStorage() == "ADMIN") {
        setBtnShow(!btnShow);
      }
  }, [page, size, sort]);

  const onClickRegist = () => {
    if(getUserRoleFromSessionStorage() != "ADMIN") {
      alert("관리자만 등록 가능합니다.");
    } else {
      goToNoticeRegistPage();
    }
  };


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FcList style={{ marginRight: '10px', fontSize: '2rem' }} />
          <div><h2>공지사항</h2></div>
        </div>
        <div>
          <Button onClick={onClickRegist} hidden={!btnShow}>공지사항 등록</Button>
        </div>
      </div>
      <br />
      <div>
        <Table hover>
          <thead>
            <tr>
              <th nowrap="true">번호</th>
              <th nowrap="true" style={{ width: '50%' }}>제목</th>
              <th nowrap="true">작성자</th>
              <th nowrap="true">등록일</th>
              {/* <th nowrap="true">수정일</th> */}
            </tr>
          </thead>
          <tbody>
            {
              serverData.results.noticeList.length === 0 ?
              <></> :
              serverData.results.noticeList.map(notice =>
                <tr key={notice.noticeId} style={{ cursor: 'pointer' }} 
                  onClick={() => { goToNoticeDetailPage(notice.noticeId); }}
                >
                  <td style={{ textAlign: 'center' }}>{notice.noticeId}</td> 
                  <td style={{ textAlign: 'center' }}>{notice.noticeTitle}</td>
                  <td style={{ textAlign: 'center' }}>{notice.user.userNickname}</td>
                  <td style={{ textAlign: 'center' }}>{notice.noticeCreateDt.replace('T', ' ')}</td>
                  {/* <td style={{ textAlign: 'center' }}>{notice.noticeUpdateDt.replace('T', ' ')}</td> */}
                </tr>
              )
            }
          </tbody>
          <tfoot>
          </tfoot>
        </Table>
      </div>
    </>
  );
};

export default NoticeComp;