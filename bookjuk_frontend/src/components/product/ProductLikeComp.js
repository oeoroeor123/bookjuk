import { useEffect, useState} from 'react';
import { alert } from '../../common/settings';
import { useNavigate } from 'react-router-dom';
import '../../css/product/product.css';
import { userApi } from '../../api/baseApi';
import QuillViewer from '../secondhand/QuillViewer';

const ProductLikeComp = ({userId}) => {

  const navigate = useNavigate();

  // 찜 리스트 상태 관리
  const [LikeList, setLikeList] = useState([]);

  const [seletedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    if (!userId) {
      console.error('userId가 없습니다.');
      return;
    }


    // 찜 목록 데이터 가져오기 (조회_GET)
    const fetchLikeList = async () => {
      try {
        const response = await userApi.get(`/wish/${userId}`);
        console.log('찜 목록 응답 데이터:', response.data);
        if(Array.isArray(response.data.results.like)) {
          setLikeList(response.data.results.like);
        }
      } catch (error) {
        console.error('찜 목록을 불러오는 중 오류 발생', error);
        setLikeList([]);
      }
    };

    // 좋아요 목록 업데이트
    fetchLikeList();
  }, [userId]);

  // 체크박스
  const toggleSelectItem = (likeId) => {
    setSelectedItems((prevSeleted) => {
      const newSelected = new Set(prevSeleted);
      if(newSelected.has(likeId)) {
        newSelected.delete(likeId);
      } else {
        newSelected.add(likeId);
      }
      return newSelected;
    });
  };

  const toggleSelectAll = () => {
    if(
      LikeList.length > 0 &&
      LikeList.every((item) => seletedItems.has(item.likeId))
    ) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(LikeList.map((item) => item.likeId)));
    }
  }

  // 개별 찜 상품 삭제
  const handleDeleteItem = async (likeId) => {
    try {
      await userApi.delete(`/wish/${likeId}`);
      setLikeList((prevList) => prevList.filter((item) => item.likeId !== likeId));
      setSelectedItems((prevSeleted) => {
        const newSelected = new Set(prevSeleted);
        newSelected.delete(likeId);
        return newSelected;
      });
    } catch (error) {
      console.log('삭제 중 오류 발생', error);
    }
  };

  // 선택 찜 상품 삭제
  const handleDeleteSeleted = async () => {
    if(seletedItems.size === 0) {
      alert('삭제할 상품을 선택하세요.');
      return;
    }

  try {
    await Promise.all([...seletedItems].map((likeId) =>
      userApi.delete(`/wish/${likeId}`)
  ));

  setLikeList((prevList) => prevList.filter((item) => !seletedItems.has(item.likeId)));
  setSelectedItems(new Set());
  } catch (error) {
    console.log('선택 상품 삭제 중 오류 발생', error);
  }
};

const handleProductDetail= (productId) => {
  navigate(`/product/detail/${productId}`);
}

  return (
    <>
    <div className='container-like-list'>
      {/* 전체 체크박스 */}
      <input type="checkbox" className="checkbox-all"
      checked={LikeList.length > 0 && LikeList.every((item) => seletedItems.has(item.likeId))}
      onChange={toggleSelectAll} />
      <div className='productTitle'> 찜 목록 </div>

      <div className='check-top'>
        <button className="btn-delete-selected" onClick={handleDeleteSeleted}>선택 삭제</button>
      </div>

      <div className='like-productList'>
        {LikeList.length > 0 ? (
          LikeList.map((likeItem) => (
            <div key={likeItem.likeId} className='like-product-item'>
              {/* 개별 체크박스 */}
              <input type="checkbox" className="item-checkbox"
              checked={seletedItems.has(likeItem.likeId)}
              onChange={() => toggleSelectItem(likeItem.likeId)}
              />

              <img src={likeItem.product.productImage}
              alt={likeItem.product.productName}
              className='product-img'
              onClick={() => handleProductDetail(likeItem.product.productId)} />

              <div className="item-info">
                <h3 className="product-name">{likeItem.product.productName}</h3>
                <p className="product-price">가격: {likeItem.product.productPrice.toLocaleString()}원</p>
                <p className="product-description"><QuillViewer>{likeItem.product.description}</QuillViewer></p>
              </div>

                <button className='btn-remove' onClick={() => handleDeleteItem(likeItem.likeId)}>X</button>
            </div>
          ))
        ) : (
          <p>찜 목록이 없습니다.</p>
        )}
      </div>
    </div>
    </>
      );
    };


export default ProductLikeComp;
