USE db_final;

-- 1. tbl_cancel_definition (취소사유 정의)
INSERT IGNORE INTO tbl_cancel_definition (cancel_reason_definition) VALUES ('고객 변심');
INSERT IGNORE INTO tbl_cancel_definition (cancel_reason_definition) VALUES ('재고 부족');
INSERT IGNORE INTO tbl_cancel_definition (cancel_reason_definition) VALUES ('배송 지연');

-- 2. tbl_author (작가)
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

-- 3. tbl_publisher (출판사)
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

-- 4. tbl_genre (장르)
INSERT IGNORE INTO tbl_genre (genre_name) VALUES ('문학'), ('자기계발'), ('사회역사'), ('여행'), ('요리'), ('어린이'), ('예술'), ('과학'), ('경제'), ('IT');

-- 5. tbl_order_status (주문 상태)
INSERT IGNORE INTO tbl_order_status (status_name) VALUES ('결제완료'), ('배송중'), ('배송완료'), ('환불완료');

-- cancel_status_id (취소 상태)
INSERT IGNORE INTO tbl_cancel_status (status_name) VALUES ('취소완료'), ('취소요청'), ('취소거부'), ('취소철회');

-- 6. tbl_user (회원)
INSERT IGNORE INTO tbl_user (user_email, user_pw, user_name, user_birthdate, user_phone, user_nickname, profile_img, session_id, user_role, create_dt)
VALUES ('admin@gmail.com', '$2a$12$Df6Yvwla0mGiDTxrT.lp5OTWnCMYGdjLjiFNZYPrbcc2uAyLAPfqW', '김관리', '1979-07-25', '01011112222', '북적북적 관리자', 'admin.jpg', 'session3', 'ADMIN', '2000-01-01 00:00:00');
INSERT IGNORE INTO tbl_user (user_email, user_pw, user_name, user_birthdate, user_phone, user_nickname, profile_img, session_id, user_role, create_dt)
VALUES ('test@gmail.com', '$2a$12$rlnFIyEUl3ZLaR3JzhixvO/KWWTu/JxT0PJ9uYDaCKWMeWq9uGLD.', '테스터', '1994-02-11', '01022223333', '임시 관리자', 'text.jpg', 'session4', 'ADMIN', NOW());
INSERT IGNORE INTO tbl_user (user_email, user_pw, user_name, user_birthdate, user_phone, user_nickname, profile_img, session_id, user_role, create_dt)
VALUES ('user1@example.com', '$2a$12$OtXALorHKn2UBC5kgtawt.IaFssjJkd0yWWSWmt.QXNntOg6yQ7QO', '홍길동', '1990-07-25', '01012345678', '길동이', 'profile1.jpg', 'session1', 'USER', NOW());
INSERT IGNORE INTO tbl_user (user_email, user_pw, user_name, user_birthdate, user_phone, user_nickname, profile_img, session_id, user_role, create_dt)
VALUES ('user2@example.com', '$2a$12$VX5VHZgL2YpfWZOD23OByeWRuiFfzFDih0RR5xB4W329YNlsO6A8e', '김철수', '1994-01-12', '01087654321', '철수', 'profile2.jpg', 'session2', 'USER', NOW());
INSERT IGNORE INTO tbl_user (user_email, user_pw, user_name, user_birthdate, user_phone, user_nickname, profile_img, session_id, user_role, create_dt)
VALUES ('admin', '$2a$10$8LsR9DlkIYM4RkNBV0YOAegGhRHCcdORETVWH2vPdQpGol3JLLuA2', '임금희', '2000-01-01', '01012345678', '관리자입니다', 'profile5.jpg', 'session5', 'ADMIN', NOW());
INSERT IGNORE INTO tbl_user (user_email, user_pw, user_name, user_birthdate, user_phone, user_nickname, profile_img, session_id, user_role, create_dt)
VALUES ('test', '$2a$12$LBeyFvjUwOY29/BlTRlXTeDg8UlhE1Qgl6G6Mr3jwN6LOuWOv/xPC', '김삿갓', '2000-01-01', '01012345678', '방랑자', 'profile5.jpg', 'session5', 'USER', NOW());
INSERT IGNORE INTO tbl_user (user_email, user_pw, user_name, user_birthdate, user_phone, user_nickname, profile_img, session_id, user_role, create_dt)
VALUES ('oeoroeor@naver.com', '$2a$10$4ZtVddG3WMKcAlgX1dnn0e1PpxtwN2/RD8wxkzPo0T9znQb76Q.DO', '이수정', '2025-03-10', '010-1234-5678', '이수정', NULL, NULL, 'USER', '2025-03-10 18:58:20');
INSERT IGNORE INTO tbl_user (user_email, user_pw, user_name, user_birthdate, user_phone, user_nickname, profile_img, session_id, user_role, create_dt)
VALUES ('cccc', '$2a$10$.xyKXdKxMzJq4PRZSqr/3OffPCpKUWVSRedmksrolZYSjrJCs6vqq', '홍길동', '2025-02-25', '010-9999-9999', 'cccc', NULL, NULL, 'USER', '2025-03-10 19:23:38');
INSERT IGNORE INTO tbl_user (user_email, user_pw, user_name, user_birthdate, user_phone, user_nickname, profile_img, session_id, user_role, create_dt)
VALUES ('qwer@gmail.com', '$2a$10$hUTLd322/gODh4i8r6S.xeMcekXEKNLDc/WvCoHpOaAbYSZGpMNQW', '김성율', '2025-03-22', '01012345678', '김성율최고관리위원', NULL, NULL, 'ADMIN', '2025-03-22 17:55:30');

-- 7. tbl_search (검색어 로그)
INSERT IGNORE INTO tbl_search (search_id, search, user_id, search_count, search_dt) VALUES (1, '자바 프로그래밍', 1, 10, NOW());
INSERT IGNORE INTO tbl_search (search_id, search, user_id, search_count, search_dt) VALUES (2, '파이썬 입문', 2, 5, NOW());
INSERT IGNORE INTO tbl_search (search_id, search, user_id, search_count, search_dt) VALUES (3, '데이터베이스 설계', 7, 3, NOW());

-- 8. tbl_delivery_address (배송지 정보)
INSERT IGNORE INTO tbl_delivery_address (user_id, road_address, jibun_address, detail_address, extra_address, postcode, addr_name, receiver_phone, primary_addr, delivery_request)
VALUES (1, '서울시 강남구 테헤란로', '999-999', '101동 101호', '현관비번 1111', '06123', '홍길동', '01012345678', 1, '문앞');
INSERT IGNORE INTO tbl_delivery_address (user_id, road_address, jibun_address, detail_address, extra_address, postcode, addr_name, receiver_phone, primary_addr, delivery_request)
VALUES (2, '경기도 수원시 팔달구', '888-888', '202동 202호', '현관비번 2222', '16423', '김철수', '01087654321', 1, '초인종금지');
INSERT IGNORE INTO tbl_delivery_address (user_id, road_address, jibun_address, detail_address, extra_address, postcode, addr_name, receiver_phone, primary_addr, delivery_request)
VALUES (1, '서울시 강서구 화곡동', '777-777', '303동 303호', '현관비번 3333', '07543', '홍길동', '01012345678', 0, '현관앞');
INSERT IGNORE INTO tbl_delivery_address (user_id, road_address, jibun_address, detail_address, extra_address, postcode, addr_name, receiver_phone, primary_addr, delivery_request)
VALUES ('5', '서울 강남구 테헤란로 127', '', '123', ' (역삼동)', '06133', '관리자', '010-1234-5678', '0', '524호로 부탁합니다');
INSERT IGNORE INTO tbl_delivery_address (user_id, road_address, jibun_address, detail_address, extra_address, postcode, addr_name, receiver_phone, primary_addr, delivery_request)
VALUES ('5', '서울 서초구 나루터로 15', '서울 서초구 잠원동 54-5', '2', ' (잠원동)', '06517', '학원', '010-9999-9999', '0', '교장실로 부탁합니다');

-- 9. tbl_order (주문)
INSERT IGNORE INTO tbl_order (user_id, addr_id, total_price, create_dt) VALUES (1, 1, 30000, "2025-02-18 15:36:33");
INSERT IGNORE INTO tbl_order (user_id, addr_id, total_price, create_dt) VALUES (2, 2, 45000, "2025-03-18 15:36:33");
INSERT IGNORE INTO tbl_order (user_id, addr_id, total_price, create_dt) VALUES (1, 3, 20000, NOW());

-- 10. tbl_pay (결제)
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt)
VALUES ('imp_123456', 1, 30000, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt)
VALUES ('imp_654321', 2, 45000, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt)
VALUES ('imp_987654', 3, 20000, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_1', 4, 9100, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_2', 5, 8000, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_3', 6, 18600, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_4', 7, 7700, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_5', 8, 15400, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_6', 9, 6400, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_7', 10, 11000, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_8', 11, 11000, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_9', 12, 13600, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_10', 13, 10200, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_11', 14, 25000, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_12', 15, 14300, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_13', 16, 16300, '결제완료', NOW(), NOW());
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_14', 17, 17100, '결제완료', "2025-02-18 15:36:33", "2025-02-18 15:36:33");
INSERT IGNORE INTO tbl_pay (imp_uid, order_id, amount, pay_status, create_dt, modify_dt) VALUES ('imp_new_15', 18, 11000, '결제완료', "2025-03-18 15:36:33", "2025-03-18 15:36:33");

-- 11. tbl_product (상품)
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

-- 12. tbl_secondhand (중고상품)
INSERT IGNORE INTO tbl_secondhand (user_id, genre_id, publisher_id, author_id, secondhand_name, secondhand_image, secondhand_description, secondhand_price, secondhand_date, create_dt)
VALUES (3, 1, 1, 1, '중고 자바의 정석', 'used_java.jpg', '약간 사용감 있음', 15000, '2023-01-01', NOW());
INSERT IGNORE INTO tbl_secondhand (user_id, genre_id, publisher_id, author_id, secondhand_name, secondhand_image, secondhand_description, secondhand_price, secondhand_date, create_dt)
VALUES (4, 2, 2, 2, '중고 파이썬 코딩의 기술', 'used_python.jpg', '깨끗한 상태', 12000, '2023-02-15', NOW());
INSERT IGNORE INTO tbl_secondhand (user_id, genre_id, publisher_id, author_id, secondhand_name, secondhand_image, secondhand_description, secondhand_price, secondhand_date, create_dt)
VALUES (3, 3, 3, 3, '중고 역사의 이해', 'used_history.jpg', '페이지 약간 훼손', 10000, '2023-03-10', NOW());

-- 13. tbl_like (좋아요)
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

-- 14. tbl_order_item (주문 상세 항목)
INSERT IGNORE INTO tbl_order_item (order_id, product_id, order_status_id, quantity, price, modify_dt) VALUES (1, 1, 1, 1, 100, NOW());
INSERT IGNORE INTO tbl_order_item (order_id, product_id, order_status_id, quantity, price, modify_dt) VALUES (2, 2, 2, 2, 110, NOW());
INSERT IGNORE INTO tbl_order_item (order_id, product_id, order_status_id, quantity, price, modify_dt) VALUES (3, 3, 3, 1, 120, NOW());


-- 15. tbl_cart (장바구니) (트리거 자동생성) 수정(2025-03-01)

-- 15-1. tbl_cart_item (장바구니 아이탬) 신규 추가(2025-03-01)
INSERT IGNORE INTO tbl_cart_item (cart_id, product_id, product_quantity, cart_item_created_dt, cart_item_updated_dt) VALUES (1, 1, 1, NOW(), NOW());
INSERT IGNORE INTO tbl_cart_item (cart_id, product_id, product_quantity, cart_item_created_dt, cart_item_updated_dt) VALUES (1, 2, 1, NOW(), NOW());
INSERT IGNORE INTO tbl_cart_item (cart_id, product_id, product_quantity, cart_item_created_dt, cart_item_updated_dt) VALUES (2, 3, 2, NOW(), NOW());
INSERT IGNORE INTO tbl_cart_item (cart_id, product_id, product_quantity, cart_item_created_dt, cart_item_updated_dt) VALUES (1, 4, 3, NOW(), NOW());
INSERT IGNORE INTO tbl_cart_item (cart_id, product_id, product_quantity, cart_item_created_dt, cart_item_updated_dt) VALUES (1, 5, 4, NOW(), NOW());
INSERT IGNORE INTO tbl_cart_item (cart_id, product_id, product_quantity, cart_item_created_dt, cart_item_updated_dt) VALUES (1, 6, 5, NOW(), NOW());
INSERT IGNORE INTO tbl_cart_item (cart_id, product_id, product_quantity, cart_item_created_dt, cart_item_updated_dt) VALUES (1, 7, 6, NOW(), NOW());
INSERT IGNORE INTO tbl_cart_item (cart_id, product_id, product_quantity, cart_item_created_dt, cart_item_updated_dt) VALUES ('5', '12', '1', '2025-03-13 01:16:49', '2025-03-13 01:16:49');
INSERT IGNORE INTO tbl_cart_item (cart_id, product_id, product_quantity, cart_item_created_dt, cart_item_updated_dt) VALUES ('5', '15', '1', '2025-03-13 01:16:57', '2025-03-13 01:16:57');

-- 16. tbl_cancel_reason (취소 사유 상세)
INSERT IGNORE INTO tbl_cancel_reason (cancel_definition_id, order_item_id, quantity, cancel_reason, return_reason, cancel_status_id, create_dt, modify_dt) VALUES (1, 1, 1, '고객 변심', '', '1', NOW(), NOW());
INSERT IGNORE INTO tbl_cancel_reason (cancel_definition_id, order_item_id, quantity, cancel_reason, return_reason, cancel_status_id, create_dt, modify_dt) VALUES (2, 2, 1, '재고 부족', '', '2', NOW(), NOW());
INSERT IGNORE INTO tbl_cancel_reason (cancel_definition_id, order_item_id, quantity, cancel_reason, return_reason, cancel_status_id, create_dt, modify_dt) VALUES (3, 3, 1, '배송 지연', '배송출발', '3', NOW(), NOW());

-- 17. tbl_product_inq (상품 문의)
INSERT IGNORE INTO tbl_product_inq (product_id, user_id, inquiry_title, inquiry_content, inquiry_image, create_dt, modify_dt, inquiry_reply_yn)
VALUES (1, 1, '배송 문의', '언제 도착하나요?', NULL, NOW(), NOW(), 'Y');
INSERT IGNORE INTO tbl_product_inq (product_id, user_id, inquiry_title, inquiry_content, inquiry_image, create_dt, modify_dt, inquiry_reply_yn)
VALUES (2, 2, '상품 상태 문의', '새 상품인가요?', NULL, NOW(), NOW(), 'N');
INSERT IGNORE INTO tbl_product_inq (product_id, user_id, inquiry_title, inquiry_content, inquiry_image, create_dt, modify_dt, inquiry_reply_yn)
VALUES (3, 3, '교환 문의', '색상 교환 가능한가요?', NULL, NOW(), NOW(), 'N');

-- 18. tbl_product_inq_reply (상품 문의 답변)
INSERT IGNORE INTO tbl_product_inq_reply (inquiry_id, user_id, inquiry_reply_content, inquiry_reply_dt) VALUES (1, 1, '2일 내로 도착 예정입니다.', NOW());
INSERT IGNORE INTO tbl_product_inq_reply (inquiry_id, user_id, inquiry_reply_content, inquiry_reply_dt) VALUES (2, 1, '네, 새 상품입니다.', NOW());
INSERT IGNORE INTO tbl_product_inq_reply (inquiry_id, user_id, inquiry_reply_content, inquiry_reply_dt) VALUES (3, 1, '색상 교환 가능합니다.', NOW());

-- 19. tbl_review (후기)
INSERT IGNORE INTO tbl_review (user_id, product_id, order_item_id, review_rating, review_comment, create_dt) VALUES (1, 1, 1, 5, '좋은 상품입니다.', NOW());
INSERT IGNORE INTO tbl_review (user_id, product_id, order_item_id, review_rating, review_comment, create_dt) VALUES (2, 2, 2, 4, '만족스러워요.', NOW());
INSERT IGNORE INTO tbl_review (user_id, product_id, order_item_id, review_rating, review_comment, create_dt) VALUES (3, 3, 3, 3, '보통입니다.', NOW());

-- 20. tbl_notice (공지사항)
INSERT IGNORE INTO tbl_notice (user_id, notice_title, notice_content, notice_create_dt, notice_update_dt)
VALUES (1, '시스템 점검 안내', '6월 1일 새벽 2시 ~ 4시 점검 예정입니다.', NOW(), NOW());
INSERT IGNORE INTO tbl_notice (user_id, notice_title, notice_content, notice_create_dt, notice_update_dt)
VALUES (2, '배송 지연 안내', '날씨 영향으로 배송이 지연됩니다.', NOW(), NOW());
INSERT IGNORE INTO tbl_notice (user_id, notice_title, notice_content, notice_create_dt, notice_update_dt)
VALUES (3, '이벤트 안내', '6월 한 달간 할인 이벤트 진행합니다.', NOW(), NOW());

-- 21. tbl_qna (Q&A)
INSERT IGNORE INTO tbl_qna (user_id, qna_title, qna_content, qna_create_dt, qna_update_dt, qna_reply_yn)
VALUES (1, '회원가입 문의', '회원가입이 안 됩니다.', NOW(), NULL, 'Y');
INSERT IGNORE INTO tbl_qna (user_id, qna_title, qna_content, qna_create_dt, qna_update_dt, qna_reply_yn)
VALUES (2, '결제 문의', '결제 오류가 발생했습니다.', NOW(), NULL, 'Y');
INSERT IGNORE INTO tbl_qna (user_id, qna_title, qna_content, qna_create_dt, qna_update_dt, qna_reply_yn)
VALUES (3, '배송 문의', '배송지를 변경하고 싶습니다.', NOW(), NOW(), 'Y');
INSERT IGNORE INTO tbl_qna (user_id, qna_title, qna_content, qna_create_dt, qna_update_dt)
VALUES (4, '배송 문의', '배송 언제 되나요?', NOW(), NULL);
INSERT IGNORE INTO tbl_qna (user_id, qna_title, qna_content, qna_create_dt, qna_update_dt)
VALUES (4, '제품 문의', '찢어진 책이 왔습니다!!!', NOW(), NULL);
INSERT IGNORE INTO tbl_qna (user_id, qna_title, qna_content, qna_create_dt, qna_update_dt)
VALUES (2, '제품 문의', '신간 도서 언제 들어오나요??', NOW(), NULL);

-- 22. tbl_qna_reply (Q&A 답글)
INSERT IGNORE INTO tbl_qna_reply (qna_id, user_id, qna_reply_contents, create_dt)
VALUES (1, 3, '회원가입 문제 해결되었습니다.', NOW());
INSERT IGNORE INTO tbl_qna_reply (qna_id, user_id, qna_reply_contents, create_dt)
VALUES (2, 3, '결제 오류 해결 방법을 안내드립니다.', NOW());
INSERT IGNORE INTO tbl_qna_reply (qna_id, user_id, qna_reply_contents, create_dt)
VALUES (3, 3, '배송지 변경 방법을 안내드립니다.', NOW());

-- 23. tbl_faq (FAQ)
INSERT IGNORE INTO tbl_faq (user_id, faq_title, faq_content, faq_create_dt, faq_update_dt)
VALUES (1, '회원가입 방법', '회원가입은 어떻게 하나요?', NOW(), NOW());
INSERT IGNORE INTO tbl_faq (user_id, faq_title, faq_content, faq_create_dt, faq_update_dt)
VALUES (2, '결제 방법', '결제는 어떻게 하나요?', NOW(), NOW());
INSERT IGNORE INTO tbl_faq (user_id, faq_title, faq_content, faq_create_dt, faq_update_dt)
VALUES (3, '배송 문의', '배송 기간은 얼마나 걸리나요?', NOW(), NOW());

-- 24. tbl_attatch (첨부 파일)
INSERT IGNORE INTO tbl_attatch (file_path, original_filename, filesystem_name, product_id)
VALUES ('/uploads/product1', 'image1.jpg', 'product1_image.jpg', 1);
INSERT IGNORE INTO tbl_attatch (file_path, original_filename, filesystem_name, product_id)
VALUES ('/uploads/product2', 'image2.jpg', 'product2_image.jpg', 2);
INSERT IGNORE INTO tbl_attatch (file_path, original_filename, filesystem_name, product_id)
VALUES ('/uploads/product3', 'image3.jpg', 'product3_image.jpg', 3);

-- 25. tbl_delete_user_log (탈퇴 회원 로그)
INSERT IGNORE INTO tbl_delete_user_log (user_id, user_name, user_nickname, user_email, withdrawal_reason, delete_dt)
VALUES (1, '홍길동', '길동이', 'user1@example.com', '서비스 불만', NOW());
INSERT IGNORE INTO tbl_delete_user_log (user_id, user_name, user_nickname, user_email, withdrawal_reason, delete_dt)
VALUES (2, '김철수', '철수', 'user2@example.com', '개인 사정', NOW());
INSERT IGNORE INTO tbl_delete_user_log (user_id, user_name, user_nickname, user_email, withdrawal_reason, delete_dt)
VALUES (3, '관리자', 'admin', 'admin@example.com', '계정 통합', NOW());
INSERT IGNORE INTO tbl_delete_user_log (user_id, user_name, user_nickname, user_email, withdrawal_reason, delete_dt)
VALUES
(10, 'dddd', 'dddd', 'dddd', '사용자 탈퇴', '2025-03-13 15:28:42'),
(11, 'ffff', 'ffffff', 'ffff', '사용자 탈퇴', '2025-03-13 15:28:45');

-- 26. tbl_login_log (사용자 로그인 로그)
INSERT IGNORE INTO tbl_login_log (user_id, login_dt, login_browser, ip_addr)
VALUES (1, NOW(), 'Chrome', '192.168.0.1');
INSERT IGNORE INTO tbl_login_log (user_id, login_dt, login_browser, ip_addr)
VALUES (2, NOW(), 'Safari', '192.168.0.2');
INSERT IGNORE INTO tbl_login_log (user_id, login_dt, login_browser, ip_addr)
VALUES (3, NOW(), 'Firefox', '192.168.0.3');
INSERT IGNORE INTO tbl_login_log (user_id, login_dt, login_browser, ip_addr)
VALUES
(5, '2025-03-13 15:20:31', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'User-2024ESJHXX/192.168.10.118'),
(5, '2025-03-13 15:30:05', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'User-2024ESJHXX/192.168.10.118'),
(8, '2025-03-13 15:40:42', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'User-2024GIKUBN/192.168.10.113'),
(8, '2025-03-13 15:55:11', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'User-2024GIKUBN/192.168.10.113'),
(8, '2025-03-13 15:59:27', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'User-2024GIKUBN/192.168.10.113'),
(8, '2025-03-13 16:07:08', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'User-2024GIKUBN/192.168.10.113');

-- 27. tbl_secondhand_attatch (중고상품 첨부)
INSERT IGNORE INTO tbl_secondhand_attatch (secondhand_id, secondhand_file_path, secondhand_org_filename, secondhand_sys_filename)
VALUES (1, '/uploads/secondhand', 'used_image1.jpg', 'secondhand1_image.jpg');
INSERT IGNORE INTO tbl_secondhand_attatch (secondhand_id, secondhand_file_path, secondhand_org_filename, secondhand_sys_filename)
VALUES (2, '/uploads/secondhand', 'used_image2.jpg', 'secondhand2_image.jpg');
INSERT IGNORE INTO tbl_secondhand_attatch (secondhand_id, secondhand_file_path, secondhand_org_filename, secondhand_sys_filename)
VALUES (3, '/uploads/secondhand', 'used_image3.jpg', 'secondhand3_image.jpg');
INSERT IGNORE INTO tbl_secondhand_attatch (secondhand_id, secondhand_file_path, secondhand_org_filename, secondhand_sys_filename)
VALUES (2, '/uploads/secondhand', 'used_image1.jpg', 'secondhand1_image.jpg');
INSERT IGNORE INTO tbl_secondhand_attatch (secondhand_id, secondhand_file_path, secondhand_org_filename, secondhand_sys_filename)
VALUES (3, '/uploads/secondhand', 'used_image5.jpg', 'secondhand5_image.jpg');
INSERT IGNORE INTO tbl_secondhand_attatch (secondhand_id, secondhand_file_path, secondhand_org_filename, secondhand_sys_filename)
VALUES (3, '/uploads/secondhand', 'used_image4.jpg', 'secondhand4_image.jpg');
