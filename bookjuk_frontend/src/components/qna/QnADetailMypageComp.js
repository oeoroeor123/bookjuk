/**
 * Q&A (마이페이지)
 * 
 * Developer : 김민희
 */

import { useEffect, useState } from 'react';
import AdminNavigate from '../../hooks/AdminNavigate';
import { useSearchParams } from 'react-router-dom';
import { getIdFromSessionStorage } from '../../common/settings';
import { getQnaReplyDetail } from '../../api/qnaAPI';


const QnADetailMypageComp = ({ qnaId }) => {
  // 페이지 이동 함수
  const { goToQnAListPage } = AdminNavigate();

  // serverData
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      qna: {
        qnaId: 0,
        qnaTitle: '',
        qnaContent: '',
        qnaCreateDt: '',
        qnaUpdateDt: '',
        qnaReplyYn: '',
        user: {},
        qnaReply: {
          qnaReplyId: 0,
          user: {},
          qnaReplyContents: '',
          createDt: '',
        },
      },
    },
  });

  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));
  const sort = !queryParams.get('sort') ? 'qnaId,desc' : queryParams.get('sort');

  useEffect(() => {
    // Q&A 상세 + 답변 요청
    getQnaReplyDetail(qnaId).then((jsonData) => {
      setServerData(jsonData);
      //console.log(jsonData);
    });
  }, [qnaId, serverData?.results?.qna?.qnaReplay]);

  // 답변 입력시 serverData - qnaReply 값 저장
  const onChangeHandler = (e) => {
    setServerData({
      ...serverData,
      results: {
        ...serverData.results,
        qna: {
          ...serverData.results.qna,
          user: {
            ...serverData.results.qna.user,
          },
          qnaReply: {
            user: { userId: getIdFromSessionStorage() },
            qnaId: qnaId,
            qnaReplyContents: e.target.value,
          },
        },
      },
    });
  };

  return (
    <>
      {serverData?.results?.qna?.length === 0 ? (
        <caption>Q&A 내역이 없습니다.</caption>
      ) : (
        <div className="box">
          <div className="question">
            <div className="row">
              <div className="col-8 question-title">{serverData?.results?.qna?.qnaTitle}</div>
              <div className="col-4 question-writer bold">{serverData?.results?.qna?.user?.userNickname}</div>
            </div>
            <hr />
            <pre dangerouslySetInnerHTML={{__html: serverData?.results?.qna?.qnaContent}}></pre>
            <hr />
            <div>{serverData?.results?.qna?.qnaCreateDt?.replace('T', ' ')}</div>
          </div>
          <div className="answer">
            {serverData?.results?.qna?.qnaReplyYn === 'N' ? (
              <></>
            ) : (
              <div>
                <div className="row">
                  <div className="col-8 answer-content">[RE] {serverData?.results?.qna?.qnaTitle}</div>
                  <div className="col-4 answer-writer bold">{serverData?.results?.qna?.qnaReply?.user?.userNickname}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-8">{serverData?.results?.qna?.qnaReply?.qnaReplyContents}</div>
                  <div className="col-4 date">{serverData?.results?.qna?.qnaReply?.createDt?.replace('T', ' ')}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default QnADetailMypageComp;