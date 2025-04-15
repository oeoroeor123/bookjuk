# 1. OpenJDK 17 기반의 공식 자바 이미지를 베이스로 사용
FROM openjdk:17

# .env에서 받은 ARG 값들을 정의
ARG IMGBB_APP_KEY
ARG KAKAO_CLIENT_ID
ARG KAKAO_CLIENT_SECRET
ARG NAVER_CLIENT_ID
ARG NAVER_CLIENT_SECRET
ARG PORTONE_SECRET_API
ARG PORTONE_SECRET_WEBHOOK

# ARG -> ENV로 변환
ENV IMGBB_APP_KEY=$IMGBB_APP_KEY
ENV KAKAO_CLIENT_ID=$KAKAO_CLIENT_ID
ENV KAKAO_CLIENT_SECRET=$KAKAO_CLIENT_SECRET
ENV NAVER_CLIENT_ID=$NAVER_CLIENT_ID
ENV NAVER_CLIENT_SECRET=$NAVER_CLIENT_SECRET
ENV PORTONE_SECRET_API=$PORTONE_SECRET_API
ENV PORTONE_SECRET_WEBHOOK=$PORTONE_SECRET_WEBHOOK


# 2. 컨테이너 내 작업 디렉토리 설정 (/bookjuk_backend)
WORKDIR /bookjuk_backend

# 3. 호스트의 모든 파일을 작업 디렉토리로 복사
COPY . .

# 4. Maven Wrapper(mvnw)에 실행 권한 부여
RUN chmod u+x mvnw

# 5. Maven을 사용해 프로젝트 빌드 및 패키징 (clean + package)
RUN ./mvnw clean package

# 6. 생성된 JAR 파일 이름을 app.jar로 변경 (단순화 목적)
RUN mv target/*.jar app.jar

# 7. wait-for-it.sh 스크립트 다운로드 (DB 연결 대기용)
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh

# 8. 다운로드한 스크립트에 실행 권한 부여
RUN chmod u+x /wait-for-it.sh

# 9. 컨테이너에서 8080 포트 노출 (Spring Boot 기본 포트)
EXPOSE 8080

# 10. 컨테이너 실행 시 최초로 실행할 명령어 설정
#    - wait-for-it.sh로 DB(3306)가 준비될 때까지 대기
#    - DB 준비 후 java -jar 명령어 실행
ENTRYPOINT ["/wait-for-it.sh", "db:3306", "--", "java", "-jar", "app.jar"]