/**
 * 검색 URL 매핑 관리
 *
 * Developer : 이수정
 */

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Loading = <div className="loading">Loading...</div>;

const SearchResultPage = lazy(() => import('../pages/product/SearchResultPage'));

const SearchRoutes = () => {
  return (
    <Suspense fallback={Loading}>
      <Routes>
        <Route path="/results" element={<SearchResultPage />} />
      </Routes>
    </Suspense>
  );
};

export default SearchRoutes;
