-- 테스트용 더미데이터는 곧 삽입하지 않을 예정입니다.
-- 테스트 데이터 필요시 data_all.sql 파일 실행해주세요
-- 개발 완료 후 테스트시에는 필수 & 기본적인 항목들만 삽입 후 진행해주세요

USE db_final;

-- tbl_cancel_definition (취소사유 정의)
INSERT IGNORE INTO tbl_cancel_definition (cancel_reason_definition) VALUES ('고객 변심');
INSERT IGNORE INTO tbl_cancel_definition (cancel_reason_definition) VALUES ('재고 부족');
INSERT IGNORE INTO tbl_cancel_definition (cancel_reason_definition) VALUES ('배송 지연');

-- tbl_author (작가)
INSERT IGNORE INTO tbl_author (author_name, author_birth, biography, major_works) VALUES
('김영하', '1968-07-11', '한국의 소설가이자 영화감독.', '살인자의 기억법, 너의 목소리가 들려'),
('한강', '1970-11-27', '한국의 소설가로, 채식주의자로 유명.', '채식주의자, 흰'),
('조정래', '1943-08-21', '한국의 대표적인 역사 소설가.', '태백산맥, 아리랑'),
('공지영', '1963-01-31', '한국의 소설가이자 여성운동가.', '우리들의 행복한 시간, 고등어'),
('김훈', '1948-01-05', '한국의 소설가이자 칼럼니스트.', '칼의 노래, 남한산성'),
('은희경', '1959-01-20', '한국의 소설가로, 현대문학의 대표 작가.', '빈처, 아내의 상자'),
('박완서', '1931-10-20', '한국의 소설가로, 전쟁과 가족을 주제로 한 작품이 많음.', '그 많던 싱아는 누가 다 먹었을까, 미망'),
('김연수', '1970-05-25', '한국의 소설가로, 현대적인 감성을 담은 작품이 특징.', '사랑을 놓치다, 빛의 제국'),
('정유정', '1966-07-26', '한국의 소설가로, 스릴러와 미스터리 작품이 유명.', '내 인생의 스프링캠프, 28'),
('이외수', '1946-05-05', '한국의 소설가이자 화가.', '천년의 사랑, 깃발없는 기수');

-- tbl_publisher (출판사)
INSERT IGNORE INTO tbl_publisher (publisher_name, website) VALUES
('한빛미디어', 'https://www.hanbit.co.kr'),
('위키북스', 'https://www.wikibook.co.kr'),
('길벗', 'https://www.gilbut.co.kr'),
('민음사', 'https://www.minumsa.com'),
('문학동네', 'https://www.munhak.com'),
('창비', 'https://www.changbi.com'),
('웅진지식하우스', 'https://www.woongjin.com'),
('RHK', 'https://www.rhk.co.kr'),
('알에이치코리아', 'https://www.rhk.co.kr'),
('북하우스', 'https://www.bookhouse.co.kr'),
('흐름출판', 'https://www.flowpress.co.kr'),
('클', 'https://www.kl.kr'),
('열린책들', 'https://www.openbooks.co.kr');

-- tbl_genre (장르)
INSERT IGNORE INTO tbl_genre (genre_name) VALUES ('문학'), ('자기계발'), ('사회역사'), ('여행'), ('요리'), ('어린이'), ('예술'), ('과학'), ('경제'), ('IT');

-- tbl_order_status (주문 상태)
INSERT IGNORE INTO tbl_order_status (status_name) VALUES ('결제완료'), ('배송중'), ('배송완료'), ('환불완료');

-- cancel_status_id (취소 상태)
INSERT IGNORE INTO tbl_cancel_status (status_name) VALUES ('취소완료'), ('취소요청'), ('취소거부'), ('취소철회');

-- tbl_user (회원)
INSERT IGNORE INTO tbl_user (user_email, user_pw, user_name, user_birthdate, user_phone, user_nickname, profile_img, session_id, user_role, create_dt)
VALUES ('admin@gmail.com', '$2a$12$Df6Yvwla0mGiDTxrT.lp5OTWnCMYGdjLjiFNZYPrbcc2uAyLAPfqW', '김관리', '1979-07-25', '01011112222', '북적북적 관리자', 'admin.jpg', 'session3', 'ADMIN', '2000-01-01 00:00:00');
INSERT IGNORE INTO tbl_user (user_email, user_pw, user_name, user_birthdate, user_phone, user_nickname, profile_img, session_id, user_role, create_dt)
VALUES ('test@gmail.com', '$2a$12$rlnFIyEUl3ZLaR3JzhixvO/KWWTu/JxT0PJ9uYDaCKWMeWq9uGLD.', '테스터', '1994-02-11', '01022223333', '임시 관리자', 'text.jpg', 'session4', 'ADMIN', NOW());
INSERT IGNORE INTO tbl_user (user_email, user_pw, user_name, user_birthdate, user_phone, user_nickname, profile_img, session_id, user_role, create_dt)
VALUES ('admin', '$2a$10$8LsR9DlkIYM4RkNBV0YOAegGhRHCcdORETVWH2vPdQpGol3JLLuA2', '임금희', '2000-01-01', '01012345678', '관리자입니다', 'profile5.jpg', 'session5', 'ADMIN', NOW());
INSERT IGNORE INTO tbl_user (user_email, user_pw, user_name, user_birthdate, user_phone, user_nickname, profile_img, session_id, user_role, create_dt)
VALUES ('test', '$2a$12$LBeyFvjUwOY29/BlTRlXTeDg8UlhE1Qgl6G6Mr3jwN6LOuWOv/xPC', '김삿갓', '2000-01-01', '01012345678', '방랑자', 'profile5.jpg', 'session5', 'USER', NOW());

-- tbl_product (상품)
INSERT IGNORE INTO tbl_product (user_id, genre_id, publisher_id, author_id, product_name, product_image, description, product_price, stock, create_dt, publication_date, total_pages, sales_yn)
VALUES
(1, 1, 1, 1, '살인자의 기억법', 'https://i.ibb.co/F4Rd57HK/murderer-memory.jpg', '김영하 작가의 소설로, 기억을 잃은 살인자의 이야기.', 100, 50, NOW(), '2013-08-30', 288, 'Y'),
(1, 2, 2, 2, '채식주의자', 'https://i.ibb.co/Kjmk2DWz/vegetarian.jpg', '한강 작가의 소설로, 채식주의를 선택한 여성의 삶을 그린 작품.', 110, 60, NOW(), '2007-10-20', 176, 'Y'),
(1, 3, 3, 3, '태백산맥', 'https://i.ibb.co/jSPJCsL/taebaek-mountains.jpg', '조정래 작가의 대하소설로, 한국 현대사를 배경으로 한 작품.', 120, 30, NOW(), '1989-01-01', 1500, 'Y'),
(1, 1, 4, 4, '우리들의 행복한 시간', 'https://i.ibb.co/HLvyMkN1/happy-time.jpg', '공지영 작가의 소설로, 사형수와 여성의 특별한 만남.', 1000, 40, NOW(), '2005-08-25', 320, 'Y'),
(1, 2, 5, 5, '칼의 노래', 'https://i.ibb.co/1YtFVLR8/song-of-sword.jpg', '김훈 작가의 소설로, 이순신 장군의 삶을 그린 역사 소설.', 16000, 20, NOW(), '2001-05-10', 400, 'Y'),
(1, 2, 2, 2, '아몬드', 'https://i.ibb.co/n8gZ1nWn/almond.jpg', '손원평 작가의 소설로, 감정을 느끼지 못하는 소년의 성장 이야기.', 14000, 80, NOW(), '2017-03-31', 280, 'Y'),
(1, 2, 5, 5, '피프티 피플', 'https://i.ibb.co/FkR5YSh3/fifty-people.jpg', '정세랑 작가의 소설로, 50명의 인물을 통해 본 인간 군상.', 15000, 60, NOW(), '2016-05-20', 400, 'Y'),
(2, 3, 6, 6, '타워', 'https://i.ibb.co/tPQ7MzCw/tower.jpg', '배명훈 작가의 SF 소설로, 초고층 빌딩에서 벌어지는 이야기.', 16000, 50, NOW(), '2009-07-15', 480, 'Y'),
(1, 1, 7, 7, '죽고 싶지만 떡볶이는 먹고 싶어', 'https://i.ibb.co/Cp33mfQ8/tteokbokki.jpg', '백세희 작가의 에세이로, 삶의 고민과 위로를 담은 책.', 11000, 120, NOW(), '2018-06-22', 240, 'Y'),
(1, 2, 8, 8, '완전한 행복', 'https://i.ibb.co/rG3gghxz/perfect-happiness.jpg', '정유정 작가의 소설로, 가족의 비밀을 파헤치는 이야기.', 14500, 85, NOW(), '2020-09-10', 360, 'Y'),
(1, 3, 9, 9, '파과', 'https://i.ibb.co/pvMLH4Vx/pagwa.jpg', '구병모 작가의 소설로, 인간의 욕망과 파괴를 그린 작품.', 15500, 75, NOW(), '2016-11-25', 300, 'Y'),
(2, 1, 10, 10, '작별하지 않는다', 'https://i.ibb.co/NHJQDMr/no-goodbye.jpg', '한강 작가의 소설로, 사랑과 이별을 담은 이야기.', 12500, 95, NOW(), '2021-07-30', 200, 'N'),
(1, 2, 1, 2, '불편한 편의점', 'https://i.ibb.co/hRrFrc8b/inconvenient-store.jpg', '김호연 작가의 소설로, 편의점에서 벌어지는 따뜻한 이야기.', 14000, 110, NOW(), '2021-04-12', 280, 'Y'),
(1, 3, 2, 3, '달러구트 꿈 백화점', 'https://i.ibb.co/8g0YqZcz/dream-store.jpg', '이미예 작가의 소설로, 꿈을 파는 백화점의 판타지 이야기.', 15000, 65, NOW(), '2020-07-08', 320, 'Y'),
(1, 1, 3, 4, '미드나잇 라이브러리', 'https://i.ibb.co/VWk638b7/midnight-library.jpg', '매트 헤이그 작가의 소설로, 인생의 선택을 다룬 이야기.', 16000, 55, NOW(), '2020-09-29', 288, 'Y'),
(1, 2, 4, 5, '해리포터와 마법사의 돌', 'https://i.ibb.co/93WtH6t5/harry-potter.jpg', 'J.K. 롤링 작가의 판타지 소설.', 17000, 45, NOW(), '1997-06-26', 332, 'Y'),
(1, 3, 5, 6, '어린 왕자', 'https://i.ibb.co/1trBHmtW/little-prince.jpg', '앙투안 드 생텍쥐페리의 명작.', 9000, 200, NOW(), '1943-04-06', 96, 'Y'),
(1, 1, 6, 7, '데미안', 'https://i.ibb.co/ymHfsdbg/demian.jpg', '헤르만 헤세의 성장 소설.', 11000, 85, NOW(), '1919-01-01', 176, 'Y'),
(2, 2, 7, 8, '노르웨이의 숲', 'https://i.ibb.co/3973rS12/norwegian-wood.jpg', '무라카미 하루키의 사랑과 상실의 이야기.', 13000, 75, NOW(), '1987-09-04', 400, 'Y'),
(1, 3, 8, 9, '백년 동안의 고독', 'https://i.ibb.co/C5hDJx0N/one-hundred-years.jpg', '가브리엘 가르시아 마르케스의 마술적 리얼리즘 소설.', 14000, 65, NOW(), '1967-05-30', 448, 'N'),
(1, 1, 9, 10, '파우스트', 'https://i.ibb.co/20H3fRPc/faust.jpg', '요한 볼프강 폰 괴테의 희곡.', 12000, 95, NOW(), '1808-01-01', 320, 'Y'),
(1, 3, 1, 2, '오만과 편견', 'https://i.ibb.co/XkLfgMrg/pride-prejudice.jpg', '제인 오스틴의 로맨스 소설.', 11500, 90, NOW(), '1813-01-28', 279, 'Y'),
(2, 1, 2, 3, '위대한 개츠비', 'https://i.ibb.co/zVCJCtXQ/great-gatsby.jpg', 'F. 스콧 피츠제럴드의 미국 꿈을 다룬 소설.', 12500, 80, NOW(), '1925-04-10', 180, 'Y'),
(1, 2, 3, 4, '1984', 'https://i.ibb.co/9ktdy3zB/1984.jpg', '조지 오웰의 디스토피아 소설.', 13000, 70, NOW(), '1949-06-08', 328, 'Y'),
(1, 1, 5, 6, '동물농장', 'https://i.ibb.co/twCCR8VG/animal-farm.jpg', '조지 오웰의 풍자 소설.', 10000, 105, NOW(), '1945-08-17', 112, 'Y');

-- tbl_secondhand (중고상품)
INSERT IGNORE INTO tbl_secondhand (user_id, genre_id, publisher_id, author_id, secondhand_name, secondhand_image, secondhand_description, secondhand_price, secondhand_date, create_dt)
VALUES (4, 1, 1, 1, '중고 자바의 정석', 'used_java.jpg', '약간 사용감 있음', 15000, '2023-01-01', NOW());
INSERT IGNORE INTO tbl_secondhand (user_id, genre_id, publisher_id, author_id, secondhand_name, secondhand_image, secondhand_description, secondhand_price, secondhand_date, create_dt)
VALUES (4, 2, 2, 2, '중고 파이썬 코딩의 기술', 'used_python.jpg', '깨끗한 상태', 12000, '2023-02-15', NOW());
INSERT IGNORE INTO tbl_secondhand (user_id, genre_id, publisher_id, author_id, secondhand_name, secondhand_image, secondhand_description, secondhand_price, secondhand_date, create_dt)
VALUES (4, 3, 3, 3, '중고 역사의 이해', 'used_history.jpg', '페이지 약간 훼손', 10000, '2023-03-10', NOW());

-- tbl_like (좋아요) - 메인에서 출력할 리스트를 조회할때 필요
INSERT IGNORE INTO tbl_like VALUES (NULL, 1, 1), (NULL, 2, 2), (NULL, 3, 3), (NULL, 4, 4);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);
INSERT IGNORE INTO tbl_like (user_id, product_id) VALUES (FLOOR(RAND() * 4) + 1, FLOOR(RAND() * 25) + 1);

-- tbl_cancel_reason (취소 사유 상세)
INSERT IGNORE INTO tbl_cancel_reason (cancel_definition_id, order_item_id, quantity, cancel_reason, return_reason, cancel_status_id, create_dt, modify_dt) VALUES (1, 1, 1, '고객 변심', '', '1', NOW(), NOW());
INSERT IGNORE INTO tbl_cancel_reason (cancel_definition_id, order_item_id, quantity, cancel_reason, return_reason, cancel_status_id, create_dt, modify_dt) VALUES (2, 2, 1, '재고 부족', '', '2', NOW(), NOW());
INSERT IGNORE INTO tbl_cancel_reason (cancel_definition_id, order_item_id, quantity, cancel_reason, return_reason, cancel_status_id, create_dt, modify_dt) VALUES (3, 3, 1, '배송 지연', '배송출발', '3', NOW(), NOW());

-- 2tbl_notice (공지사항)
INSERT IGNORE INTO tbl_notice (user_id, notice_title, notice_content, notice_create_dt, notice_update_dt)
VALUES (1, '시스템 점검 안내', '6월 1일 새벽 2시 ~ 4시 점검 예정입니다.', NOW(), NOW());
INSERT IGNORE INTO tbl_notice (user_id, notice_title, notice_content, notice_create_dt, notice_update_dt)
VALUES (2, '배송 지연 안내', '날씨 영향으로 배송이 지연됩니다.', NOW(), NOW());
INSERT IGNORE INTO tbl_notice (user_id, notice_title, notice_content, notice_create_dt, notice_update_dt)
VALUES (3, '이벤트 안내', '6월 한 달간 할인 이벤트 진행합니다.', NOW(), NOW());
