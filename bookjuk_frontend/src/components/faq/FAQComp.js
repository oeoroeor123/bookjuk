/**
 * 관리자 - FAQ 목록
 *
 * Developer : 김민희
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUserRoleFromSessionStorage } from '../../common/settings';
import { alert, confirm } from '../../common/settings';
import { getFaqList } from '../../api/faqAPI ';
import CustomNavigate from '../../hooks/CustomNavigate';

import { FcList } from "react-icons/fc";
import { Button } from 'react-bootstrap';
import Table from "react-bootstrap/Table";


const FAQComp = () => {

  const { goToFaqDetailPage, goToFaqRegistPage } = CustomNavigate();

  const [btnShow, setBtnShow] = useState(false);  // 숨김 표시 여부 상태
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      faqList: [],
      pageList: [],
      pageDto: {},
    }
  })

  const [ queryParams ] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));  // 요청 파라미터 page가 없으면 page=1 사용
  const size = !queryParams.get('size') ? 20 : parseInt(queryParams.get('size'));  // 요청 파라미터 size가 없으면 size=2 사용
  const sort = !queryParams.get('sort') ? 'faqId,desc' : queryParams.get('sort');    // 요청 파라미터 sort가 없으면 sort=id,desc 사용

  useEffect(() => {
    getFaqList({ page, size, sort })
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
      goToFaqRegistPage();
    }
  };


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FcList style={{ marginRight: '10px', fontSize: '2rem' }} />
          <div><h2>FAQ</h2></div>
        </div>
        <div>
          <Button onClick={onClickRegist} hidden={!btnShow}>FAQ 등록</Button>
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
              serverData.results.faqList.length === 0 ?
              <></> :
              serverData.results.faqList.map(faq =>
                <tr key={faq.faqId} style={{ cursor: 'pointer' }}
                  onClick={() => { goToFaqDetailPage(faq.faqId); }}
                >
                  <td style={{ textAlign: 'center' }}>{faq.faqId}</td> 
                  <td style={{ textAlign: 'center' }}>{faq.faqTitle}</td>
                  <td style={{ textAlign: 'center' }}>{faq.user.userNickname}</td>
                  <td style={{ textAlign: 'center' }}>{faq.faqCreateDt.replace('T', ' ')}</td>
                  {/* <td style={{ textAlign: 'center' }}>{faq.faqUpdateDt.replace('T', ' ')}</td> */}
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

export default FAQComp;