# GreenIT Final - Spring Boot Project

### 프로젝트 환경 설정
    - 스프링 서버 실행 : bookjuk_backend
    - 리액트 서버 실행 : bookjuk_frontend
    - node.js v22.14.0 다운로드 및 설치
    - npm 설치: npm install npx -g
    - 노드 모듈 설치 : 프로젝트 경로로 이동 후 npm install 실행
    - 부트스트랩 사용법 참고 : https://react-bootstrap.github.io/docs/getting-started/introduction
    - 서버 실행 : npm start
    - DB 정보(db_final) : 리소스 폴더내에 schema.sql 파일과 data.sql 파일 실행 후 사용해주세요
    - Swagger 페이지 : http://localhost:8080/swagger-ui/index.html

### 프로젝트 구조
    - 기본 패키지 (com.bookjuk) 하위에 메뉴(기능)별로 패키지를 생성
    - ex) com.bookjuk.user, com.bookjuk.cart, com.bookjuk.product 등등
    - 각 패키지 하위에 controller, domain(entity), dto, repository, service 생성
    - 복잡한 조인 or 쿼리로 인해 JPA로 구현하기 어려운 경우 mapper 패키지 및 매퍼 인터페이스스 추가 후 resource/mappers/xxxMapper.xml 파일 생성하여 마이바티스 사용
    - 공통 클래스는 com.bookjuk 하위에 생성 후 사용
    - ex) com.bookjuk.config, com.bookjuk.model, com.bookjuk.util 등등