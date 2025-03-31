/**
 * Q&A (마이페이지)
 * 
 * Developer : 김민희
 */

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getIdFromSessionStorage, getUserRoleFromSessionStorage } from '../../common/settings';
import { getQnAList } from '../../api/qnaAPI';
import CustomNavigate from '../../hooks/CustomNavigate';

import { FcList } from "react-icons/fc";
import { Button } from 'react-bootstrap';
import Table from "react-bootstrap/Table";


const QnAMypageComp = ({ userId }) => {
  const { goToQnaDetailMypagePage } = CustomNavigate();

  const [btnShow, setBtnShow] = useState(false);  // 등록버튼 숨김여부
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      qnaList: [],
      pageList: [],
      pageDto: {},
    }
  })

  const [ queryParams ] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));  // 요청 파라미터 page가 없으면 page=1 사용
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));  // 요청 파라미터 size가 없으면 size=2 사용
  const sort = !queryParams.get('sort') ? 'qnaId,desc' : queryParams.get('sort');    // 요청 파라미터 sort가 없으면 sort=id,desc 사용

  useEffect(() => {
    getQnAList({ page, size, sort })
      .then(jsonData => {
        //console.log(jsonData);
        setServerData(jsonData);
      })

      if(getUserRoleFromSessionStorage() == "ADMIN") {
        setBtnShow(!btnShow);
      }
  }, [page, size, sort]);

  const navigate = useNavigate();
  const onClickRegist = () => {
    if(getIdFromSessionStorage() != null) {
      navigate('/qna/regist');
    } else {
      alert("로그인이 필요합니다.");
      navigate('/user/login');
    }    
  };


  return (
    <>
      <div>
        <Table hover>
          <thead>
            <tr>
              <th nowrap="true">번호</th>
              <th nowrap="true" style={{ width: '50%' }}>제목</th>
              <th nowrap="true">작성자</th>
              <th nowrap="true">등록일</th>
              {/* <th nowrap="true">수정일</th> */}
              <th nowrap="true">응답상태</th>
            </tr>
          </thead>
          <tbody>
            {
              serverData.results.qnaList.length === 0 ?
              <></> :
              serverData.results.qnaList.map(qna => {
                // console.log(userId);
                // console.log(qna.user.userId);                                
                 if(userId == qna.user.userId) {
                  return (
                    <tr key={qna.qnaId} style={{ cursor: 'pointer' }}
                      onClick={() => { goToQnaDetailMypagePage(qna.qnaId); }}
                    >
                      <td style={{ textAlign: 'center' }}>{qna?.qnaId}</td> 
                      <td style={{ textAlign: 'center' }}>{qna?.qnaTitle}</td>
                      <td style={{ textAlign: 'center' }}>{qna?.user?.userNickname}</td>
                      <td style={{ textAlign: 'center' }}>{qna?.qnaCreateDt?.replace('T', ' ')}</td>
                      {/* <td style={{ textAlign: 'center' }}>{qna?.qnaUpdateDt?.replace('T', ' ')}</td> */}
                      <td style={{ textAlign: 'center' }}>{qna?.qnaReplyYn}</td>                    
                    </tr>
                  );
                } 
                return null;
              })
            }
          </tbody>
          <tfoot>
          </tfoot>
        </Table>
      </div>
    </>
  );
};

export default QnAMypageComp;