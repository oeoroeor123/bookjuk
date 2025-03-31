/**
 * 관리자 - 상품문의 목록 확인
 *
 * Developer : 김리예
 */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import AdminNavigate from '../../../hooks/AdminNavigate';
import { getInquiryList } from '../../../api/adminAPI';
import PageComp from '../../common/PageComp';

const AdminInquiryListComp = () => {
  // 페이지 이동 함수
  const { goToInquiryListPage, goToInquiryDetailPage } = AdminNavigate();

  // serverData
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      inquiryList: [],
      pageList: [],
      pageDto: {},
    },
  });

  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));
  const sort = !queryParams.get('sort') ? 'inquiryId,desc' : queryParams.get('sort');

  useEffect(() => {
    getInquiryList({ page, size, sort }).then((jsonData) => {
      setServerData(jsonData);
    });
  }, [page, size, sort]);

  return (
    <>
      <Table hover>
        {serverData?.results?.inquiryList?.length === 0 ? (
          <div>문의 내역이 없습니다.</div>
        ) : (
          <thead>
            <tr>
              <th nowrap="true"></th>
              <th nowrap="true">상품</th>
              <th nowrap="true">문의 제목</th>
              <th nowrap="true">닉네임</th>
              <th nowrap="true">문의 일자</th>
              <th nowrap="true">답변</th>
            </tr>
          </thead>
        )}
        <tbody>
          {serverData?.results?.inquiryList?.map((inquiry) => (
            <tr
              key={inquiry?.inquiryId}
              onClick={() => {
                goToInquiryDetailPage(inquiry?.inquiryId, queryParams);
              }}>
              <td>{inquiry?.inquiryId}</td>
              <td>{inquiry?.product?.productName}</td>
              <td>{inquiry?.inquiryTitle}</td>
              <td>{inquiry?.user?.userNickname}</td>
              <td>{inquiry?.createDt.replace('T', ' ')}</td>
              <td>{inquiry?.inquiryReplyYn === 'N' ? '미답변' : '답변'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {serverData?.results?.inquiryList?.length !== 0 ? <PageComp serverData={serverData} goToListPage={goToInquiryListPage} size={size} sort={sort} /> : null}
    </>
  );
};

export default AdminInquiryListComp;
