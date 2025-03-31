/**
 * 관리자 - 중고상품 상세 확인
 *
 * Developer : 김리예
 */

import { useEffect, useState, useRef } from 'react'; // useRef 추가
import { useParams, useSearchParams } from 'react-router-dom';
import AdminNavigate from '../../../hooks/AdminNavigate';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { getSecondhandDetail, getSecondhandSalesChange } from '../../../api/adminAPI';
import '../../../css/admin/secondhand.css';
import { toast } from 'react-toastify';

const AdminSecondHandListComp = () => {
  const { secondhandId } = useParams();
  const { goToSecondHandListPage } = AdminNavigate();
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      secondhand: {
        user: {},
        genre: {},
        publisher: {},
        author: {},
        attachList: [],
      },
    },
  });

  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));
  const sort = !queryParams.get('sort') ? 'secondhandId,desc' : queryParams.get('sort');

  // 이전 salesYn 값을 저장하기 위한 useRef
  const prevSalesYn = useRef(serverData?.results?.secondhand?.salesYn);

  useEffect(() => {
    getSecondhandDetail(secondhandId, queryParams).then((jsonData) => {
      setServerData(jsonData);
      // 초기 salesYn 값을 설정
      prevSalesYn.current = jsonData?.results?.secondhand?.salesYn;
    });
  }, [secondhandId]);

  // 상태 변경 감지
  useEffect(() => {
    const currentSalesYn = serverData?.results?.secondhand?.salesYn;

    // 이전 값과 현재 값이 다를 때만 실행
    if (prevSalesYn.current !== currentSalesYn) {
      getSecondhandSalesChange(serverData?.results?.secondhand)
        .then((jsonData) => {
          toast(jsonData.message);
        })
        .catch((error) => {
          toast(error.message);
        });

      // 이전 값을 현재 값으로 업데이트
      prevSalesYn.current = currentSalesYn;
    }
  }, [serverData?.results?.secondhand?.salesYn]);

  const onChangeHandler = (e) => {
    setServerData({
      ...serverData,
      results: {
        ...serverData?.results,
        secondhand: {
          ...serverData?.results?.secondhand,
          secondhandId: secondhandId,
          salesYn: e?.currentTarget?.value,
          user: {
            ...serverData?.results?.secondhand?.user,
          },
          genre: {
            ...serverData?.results?.secondhand?.genre,
          },
          publisher: {
            ...serverData?.results?.secondhand?.publisher,
          },
          author: {
            ...serverData?.results?.secondhand?.genre?.author,
          },
          attachList: [...serverData?.results?.secondhand?.attachList],
        },
      },
    });
  };

  return (
    <>
      <Table>
        {serverData?.results?.secondhand?.length === 0 ? (
          <caption>조회된 상품이 없습니다.</caption>
        ) : (
          <thead>
            <tr>
              <th nowrap="true">상품번호</th>
              <th nowrap="true">판매상품명</th>
              <th nowrap="true">판매상태</th>
              <th nowrap="true">판매자</th>
              <th nowrap="true">가격</th>
              <th nowrap="true">출판사</th>
              <th nowrap="true">작가</th>
              <th nowrap="true">장르</th>
              <th nowrap="true">등록일</th>
            </tr>
          </thead>
        )}
        <tbody>
          {
            <tr>
              <td>{serverData?.results?.secondhand?.secondhandId}</td>
              <td>{serverData?.results?.secondhand?.secondhandName}</td>
              <td>
                <select onChange={onChangeHandler}>
                  {serverData?.results?.secondhand?.salesYn === 'Y' ? (
                    <>
                      <option value="Y" selected="true">
                        판매중
                      </option>
                      <option value="N">판매중지</option>
                    </>
                  ) : (
                    <>
                      <option value="Y">판매중</option>
                      <option value="N" selected="true">
                        판매중지
                      </option>
                    </>
                  )}
                </select>
              </td>
              <td>{serverData?.results?.secondhand?.user?.userNickname}</td>
              <td>{serverData?.results?.secondhand?.secondhandPrice}</td>
              <td>{serverData?.results?.secondhand?.publisher?.publisherName}</td>
              <td>{serverData?.results?.secondhand?.author?.authorName}</td>
              <td>{serverData?.results?.secondhand?.genre?.genreName}</td>
              <td>{serverData?.results?.secondhand?.createDt?.replace('T', ' ')}</td>
            </tr>
          }
        </tbody>
      </Table>
      <Button onClick={goToSecondHandListPage} className="listBtn">
        목록
      </Button>
    </>
  );
};

export default AdminSecondHandListComp;
