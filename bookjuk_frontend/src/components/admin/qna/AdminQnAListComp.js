/**
 * 관리자 - Q&A 목록 확인
 *
 * Developer : 김리예
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import AdminNavigate from '../../../hooks/AdminNavigate';
import { getQnAList } from '../../../api/adminAPI';
import PageComp from '../../common/PageComp';

const AdminQnAListComp = () => {
  // 페이지 이동 함수
  const { goToQnAListPage, goToQnADetailPage } = AdminNavigate();

  // serverData
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      qnaList: [],
      pageList: [],
      pageDto: {},
    },
  });

  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));
  const sort = !queryParams.get('sort') ? 'qnaId,desc' : queryParams.get('sort');

  useEffect(() => {
    getQnAList({ page, size, sort }).then((jsonData) => {
      setServerData(jsonData);
    });
  }, [page, size, sort]);

  return (
    <>
      <Table hover>
        {serverData?.results?.qnaList?.length === 0 ? (
          <caption>Q&A 내역이 없습니다.</caption>
        ) : (
          <thead>
            <tr>
              <th nowrap="true"></th>
              <th nowrap="true">Q&A 제목</th>
              <th nowrap="true">닉네임</th>
              <th nowrap="true">문의 일자</th>
              <th nowrap="true">답변</th>
            </tr>
          </thead>
        )}
        <tbody>
          {serverData?.results?.qnaList?.map((qna) => (
            <tr
              key={qna?.qndId}
              onClick={() => {
                goToQnADetailPage(qna?.qnaId, queryParams);
              }}>
              <td>{qna.qnaId}</td>
              <td>{qna?.qnaTitle}</td>
              <td>{qna?.user?.userNickname}</td>
              <td>{qna?.qnaCreateDt?.replace('T', ' ')}</td>
              <td>{qna?.qnaReplyYn === 'N' ? '미답변' : '답변'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {serverData?.results?.qnaList?.length !== 0 ? <PageComp serverData={serverData} goToListPage={goToQnAListPage} size={size} sort={sort} /> : null}
    </>
  );
};

export default AdminQnAListComp;
