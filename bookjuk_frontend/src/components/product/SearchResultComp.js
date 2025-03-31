import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CustomNavigate from "../../hooks/CustomNavigate";
import { searchApi, cartApi, userApi } from "../../api/baseApi";
import { getIdFromSessionStorage, alert, confirm } from "../../common/settings";
import { UserContext } from "../common/UserContext";
import OrderNavigate from "../../hooks/OrderNavigate";
import PageComp from "../common/PageComp";
import QuillViewer from "../secondhand/QuillViewer";

const SearchResultComp = () => {
  const userId = getIdFromSessionStorage();
  const { cartItemCount, setCartItemCount } = useContext(UserContext);
  const { goToProductListDetailPage } = CustomNavigate();
  const { goToOrderUserPage } = OrderNavigate();
  const navigate = useNavigate();
  
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const size = parseInt(searchParams.get("size")) || 5;

  // 검색 결과 상태 관리
  const [serverData, setServerData] = useState({
    status: 0,
    message: "",
    results: {
      products: [],
      pageList: [],
      pageDto: {},
    },
  });

  // 좋아요 상태 관리
  const [likeProducts, setLikeProducts] = useState({});
  
  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const params = { query, page, size };
        const response = await searchApi.get(`/results`, { params });

        setServerData({
          status: response.data.status,
          message: response.data.message,
          results: {
            products: response.data.results.products || [],
            pageList: response.data.results.pageList || [],
            pageDto: response.data.results.pageDto || {},
          },
        });
      } catch (error) {
        console.error("검색 결과 반환 실패", error);
      }
    };

    if (query) {
      getSearchResults();
    }
  }, [query, page, size]);

  // 좋아요 기능
  const handleLikeButtonClick = async (productId) => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const liked = likeProducts[productId];

      if (liked) {
        await userApi.delete(`/wish/${productId}`);
        alert("상품이 찜 목록에서 삭제되었습니다.");
        setLikeProducts((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          return updated;
        });
      } else {
        await userApi.post(`/wish/add`, { productId, userId, productQuantity: 1 });
        alert("상품이 찜 목록에 추가되었습니다.");
        setLikeProducts((prev) => ({ ...prev, [productId]: true }));
      }
    } catch (error) {
      console.error("찜 추가 실패:", error);
      alert("찜 추가/삭제 중 오류가 발생했습니다.");
    }
  };

  // 장바구니 추가 기능
  const handleProductCartButtonClick = async (productId) => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await cartApi.post(
        `/cartItems`,
        { product: { productId }, productQuantity: 1 },
        { params: { userId } }
      );
      alert("상품이 장바구니에 담겼습니다.");
      setCartItemCount(cartItemCount + 1);
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      alert("장바구니 추가 중 오류가 발생했습니다.");
    }
  };

  // 바로 구매 기능
  const handleProductOrderButtonClick = async (productId) => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await cartApi.post(`/cartItems?userId=${encodeURIComponent(userId)}`, {
        product: { productId },
        productQuantity: 1,
      });

      const cartItem = response.data.results.cartItem;
      goToOrderUserPage(userId, [cartItem.cartItemId]);
    } catch (error) {
      console.error("바로 구매 실패:", error);
    }
  };

  return (
    <div className="search-results">
      <div className="search-results-title">🔍검색 결과</div>
      <div className="search-results-explanation">검색어를 통해 조회된 도서 리스트입니다.</div>

      {serverData.results.products && serverData.results.products.length > 0 ? (
        <div className="productList">
          {serverData.results.products.map((product) => (
            <div key={product.productId} className="product-item">
              <img
                src={product.productImage}
                alt={product.productName}
                className="product-image"
                onClick={() => goToProductListDetailPage(product.productId)}
              />
              <div
                className="product-details"
                onClick={(e) => {
                  if (e.target.closest("button")) return;
                  goToProductListDetailPage(product.productId);
                }}
              >
                <h3 className="product-title">{product.productName}</h3>
                <p className="description"><QuillViewer>{product.description}</QuillViewer></p>
                <p className="publication">{product.publicationDate}</p>
                <p className="author">{product.author?.authorName}</p>
                <p className="publisher">{product.publisher?.publisherName}</p>
                <p className="price">{product.productPrice.toLocaleString()}원</p>
              </div>
              <div className="product-btn">
                <button
                  className="cart-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductCartButtonClick(product.productId);
                  }}
                >
                  장바구니
                </button>
                <button
                  className="sale-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductOrderButtonClick(product.productId);
                  }}
                >
                  바로구매
                </button>
                <button
                  className="like-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikeButtonClick(product.productId);
                  }}
                >
                  {likeProducts[product.productId] ? "찜 완료❤" : "찜 추가"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}

      <PageComp serverData={serverData} />
    </div>
  );
};

export default SearchResultComp;
