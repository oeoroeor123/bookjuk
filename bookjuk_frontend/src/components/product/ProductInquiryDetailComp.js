/**
 * 상품문의 상세 확인
 *
 * Developer : 김리예
 */

import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import ProductNavigate from '../../hooks/ProductNavigate';
import { getInquiryDetail } from '../../api/productRestAPI';
import { Button } from 'react-bootstrap';
import '../../css/admin/qna.css';
import { getIdFromSessionStorage } from '../../common/settings';

const ProductInquiryDetailComp = () => {
  // 경로 변수(Path Variable)를 처리하는 useParams()
  const { inquiryId } = useParams();

  // 페이지 이동 함수
  const { goToProductDetailPage } = ProductNavigate();

  // serverData
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      inquiry: {
        inquiryId: 0,
        productId: 0,
        inquiryTitle: '',
        inquiryContent: '',
        inquiryImage: '',
        createDt: '',
        modifyDt: '',
        inquiryReplyYn: '',
        user: {},
        product: {},
        inquiryReply: {
          inquiryReplyId: 0,
          user: {},
          inquiryReplyContent: '',
          inquiryReplyDt: '',
        },
      },
    },
  });

  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));
  const sort = !queryParams.get('sort') ? 'inquiryId,desc' : queryParams.get('sort');

  useEffect(() => {
    getInquiryDetail(inquiryId).then((jsonData) => {
      setServerData(jsonData);
    });
  }, [inquiryId]);

  // 답변 입력시 serverData - inquiryReply 값 저장
  const onChangeHandler = (e) => {
    setServerData({
      ...serverData,
      results: {
        ...serverData.results,
        inquiry: {
          ...serverData.results.inquiry,
          user: {
            ...serverData.results.inquiry.user,
          },
          inquiryReply: {
            user: { userId: getIdFromSessionStorage() },
            inquiryReplyId: inquiryId,
            inquiryReplyContent: e.target.value,
            inquiryReplyDt: '',
          },
        },
      },
    });
  };

  return (
    <>
      {serverData?.results?.inquiry?.length === 0 ? (
        <caption>상품 문의 내역이 없습니다.</caption>
      ) : (
        <div className="box">
          <div className="question">
            <div className="row">
              <div className="col-8 question-title">{serverData?.results?.inquiry?.inquiryTitle}</div>
              <div className="col-4 question-writer bold">{serverData?.results?.inquiry?.user?.userNickname}</div>
            </div>
            <hr />
            <div className="row">
              <div className="col-4 productName">{serverData?.results?.inquiry?.product?.productName}</div>
              <div className="col-8 productImg">
                <img className="" src={serverData?.results?.inquiry?.product?.productImage} alt={serverData?.results?.inquiry?.product?.productName} />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-8" dangerouslySetInnerHTML={{__html: serverData?.results?.inquiry?.inquiryContent}}></div>
              <div className="col-4 date">{serverData?.results?.inquiry?.createDt?.replace('T', ' ')}</div>
            </div>
          </div>
          <div className="answer">
            {serverData?.results?.inquiry?.inquiryReplyYn === 'N' ? (
              <>등록된 답변이 없습니다.</>
            ) : (
              <div>
                <div className="row">
                  <div className="col-8 answer-content">[RE] {serverData?.results?.inquiry?.inquiryTitle}</div>
                  <div className="col-4 answer-writer bold">{serverData?.results?.inquiry?.inquiryReply?.user?.userNickname}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-8" dangerouslySetInnerHTML={{__html: serverData?.results?.inquiry?.inquiryReply?.inquiryReplyContent}}></div>
                  <div className="col-4 date">{serverData?.results?.inquiry?.inquiryReply?.inquiryReplyDt?.replace('T', ' ')}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {
        <Button onClick={goToProductDetailPage} className="listBtn">
          목록
        </Button>
      }
    </>
  );
};

export default ProductInquiryDetailComp;
