# 1. Node.js 16 버전을 빌드 스테이지용 베이스 이미지로 사용
FROM node:16 AS build

# 2. 컨테이너 내 작업 디렉토리 설정 (프론트엔드 소스 위치)
WORKDIR /bookjuk_frontend

# 3. 호스트의 package.json과 package-lock.json을 컨테이너로 복사
COPY package*.json ./

# 4. 프로젝트 의존성 설치
RUN npm install

# 5. 호스트의 모든 소스 코드를 컨테이너로 복사 (node_modules 제외)
COPY . .

# 6. 메모리 제한을 2GB로 설정하고 프로덕션 빌드 수행
RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

# ------------------------------------------------------------
# 7. nginx:alpine 이미지를 런타임용 베이스 이미지로 사용
FROM nginx:alpine

# 8. 빌드 스테이지에서 생성된 빌드 결과물을 nginx 웹 루트로 복사
COPY --from=build /bookjuk_frontend/build /usr/share/nginx/html

# 9. 커스텀 nginx 설정 파일을 기본 설정 위치에 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf