# GreenIT Final - React Project

### 프로젝트 환경 설정
    - 스프링 서버 실행 : bookjuk_backend
    - 리액트 서버 실행 : bookjuk_frontend
    - node.js v22.14.0 다운로드 및 설치
    - npm 설치: npm install npx -g
    - 노드 모듈 설치 : 프로젝트 경로로 이동 후 npm install 실행 (package.json 파일 dependencies 에 추가되어 있는 모듈들을 한번에 설치합니다.)
    - 부트스트랩 사용법 참고 : https://react-bootstrap.github.io/docs/getting-started/introduction
    - 서버 실행 : npm start

### 리액트 버전 다운그레이드
    - npm install react@18.2.0 react-dom@18.2.0

### 프로젝트 구조
    - api : 각 메뉴(기능)별 axios 통신을 하는 모듈 모음
    - components : 각 메뉴(기능)별 화면 출력에 필요한 axios 호출 및 결과를 받아 사용하는 컴포넌트 모음
    - hooks : useNavigate() 등의 리액트 훅 사용을 공통 모듈화한 모음
    - layouts : 홈페이지 기본 레이아웃 틀 설정 파일
    - pages : 각 메뉴(기능)별 화면을 출력하는 페이지
    - IndexPage : 메인 페이지
    - App.js : <BasicLayout /> 을 출력. 새로운 페이지를 작성시 <Route path="/URL" element={<XXXPage />} /> 내용 추가 후 사용
    - index.js : 가장 최상위 페이지를 출력 하는 스크립트 (<App /> 출력중)
