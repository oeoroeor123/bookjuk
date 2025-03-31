package com.bookjuk.user.repository;




import org.springframework.data.jpa.repository.JpaRepository;


import com.bookjuk.user.domain.User;



public interface UserRepository extends JpaRepository<User, Integer> {
  

  //이메일로 사용자 조회
  User findByUserEmail(String userEmail);
  
  // 닉네임이 존재하는지 사용자 조회
  boolean existsByUserNickname(String userNickname);
  
  void deleteByUserEmail(String userEmail);
}
