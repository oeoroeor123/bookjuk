/**
 * 공통 - 페이징 버튼 처리
 */
import React from 'react';

const PageComp = (props) => {
  const { serverData, goToListPage, size, sort } = props;

  return (
    <div className="paging" style={{ display: 'flex' }}>
      {/* 이전 블록 Prev */}
      {serverData?.results?.pageDto?.beginPage === 1 ? (
        <div style={{ color: 'silver' }}>Prev</div>
      ) : (
        // prettier-ignore
        <div className="pointer" onClick={() => { goToListPage({page: serverData?.results?.pageDto?.beginPage - 1, size, sort}) }}>Prev</div>
      )}
      {/* 1 2 3 4 5 6 7 8 9 10 */}
      {serverData?.results?.pageList?.length === 0 ? (
        <></>
      ) : (
        serverData?.results?.pageList?.map((p) =>
          // prettier-ignore
          <div key={p} className="pointer" onClick={() => { goToListPage({page: p, size, sort}) }} style={{color: p === serverData?.results?.pageDto?.page ? 'black' : 'gray', fontWeight:'700'}}>
                      {p}
                    </div>
        )
      )}
      {/* 다음 블록 Next */}
      {
        // prettier-ignore
        serverData?.results?.pageDto?.endPage === serverData?.results?.pageDto?.pageCount ?
                  <div style={{color: 'silver'}}>Next</div> :
                  // prettier-ignore
                  <div className="pointer" onClick={() => { goToListPage({page: serverData?.results?.pageDto?.endPage + 1, size, sort}) }}>Next</div>
      }
    </div>
  );
};

export default PageComp;
