package com.bookjuk.user.service.impl;


import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookjuk.model.dto.UserRole;
import com.bookjuk.user.domain.User;
import com.bookjuk.user.dto.UserDto;
import com.bookjuk.user.repository.UserRepository;
import com.bookjuk.user.service.UserService;

import lombok.RequiredArgsConstructor;


@Transactional
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
  private final ModelMapper modelMapper;
  private final UserRepository userRepository;

  
 @Override
 public void saveUser(UserDto userDto) {
   //비밀번호 암호화
   userDto.setUserPw(encoder.encode(userDto.getUserPw()));
   
   //유저 저장
   userRepository.save(modelMapper.map(userDto, User.class));
 }

 // 이메일 중복 검사 
 @Override
 public void isEmailAvailable(String userEmail) {
   
   // 이메일로 사용자 조회
   User findEmail = userRepository.findByUserEmail(userEmail);
   if(findEmail != null) {
     throw new IllegalStateException("이미 가입된 회원입니다.");
   }
 }
 
 // 사용자 정보 조회
  @Transactional(readOnly = true)
  @Override
  public UserDto findByUserEmail(String userEmail) {
    User foundUser = userRepository.findByUserEmail(userEmail);
    System.out.println("로그인 시도 : " + userEmail);
    if(foundUser == null)
      throw new IllegalArgumentException("사용자를 찾을 수가 없습니다." + userEmail);
    return modelMapper.map(foundUser, UserDto.class);
  }
  
  
  //모든 사용자 정보 조회
  public List<UserDto> findAllUsers() {
    List<User> users = userRepository.findAll(); // 모든 유저를 DB에서 가져옵니다.

    // User 객체를 UserDto로 변환하여 반환
    return users.stream()
                .map(user -> new UserDto(user.getUserEmail(), user.getUserName(), user.getUserRole())) // UserDto에 값 채우기
                .collect(Collectors.toList());
  }
  
  
  // 닉네임 중복 검사 구현
  @Override
  public boolean isNicknameAvailable(String userNickname) {
    return !userRepository.existsByUserNickname(userNickname);  // 중복되지 않으면 true 반환
  }
  
  // 회원 탈퇴
  @Transactional
  @Override
  public void deleteByUserEmail(String userEmail) {
    User deleteUser = userRepository.findByUserEmail(userEmail);
    if(deleteUser == null)
      throw new IllegalArgumentException("사용자를 찾을 수가 없습니다." + userEmail);
    System.out.println("회원 탈퇴 시도 : " + userEmail);
    
    userRepository.delete(deleteUser);
    
    System.out.println("회원 탈퇴 완료 : " + userEmail);        
  }

  
  // 회원정보 수정
  @Transactional
  @Override
  public void updateUser(String userEmail, UserDto userDto) {
    User user = userRepository.findByUserEmail(userEmail);
    
    if(user == null) {
      throw new IllegalArgumentException("사용자를 찾을 수 없습니다.:" + userEmail);      
    }
    
    //새로운 정보 업데이트
    if (userDto.getUserName() != null) {
      user.setUserName(userDto.getUserName());
    }
    if (userDto.getUserBirthdate() != null) {
      user.setUserBirthdate(userDto.getUserBirthdate());
    }
    if (userDto.getUserPhone() != null) {
      user.setUserPhone(userDto.getUserPhone());
    }
    if (userDto.getUserNickname() != null) {
      user.setUserNickname(userDto.getUserNickname());
    }
    if (userDto.getUserPw() != null && !userDto.getUserPw().isEmpty()) {
      user.setUserPw(encoder.encode(userDto.getUserPw()));
    }
    
    // 변경된 날짜 업데이트
    user.setChangeDt(LocalDateTime.now());
    userRepository.save(user);  
  }
  
  //비밀번호 재확인
  @Override
  public boolean verifyPassword(String userEmail, String rawPassword) {
    
      // 사용자 이메일을 기준으로 DB에서 유저 조회
      User user = userRepository.findByUserEmail(userEmail);
      
      if(user == null) {
        throw new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다." + userEmail);
      }

      //  입력된 비밀번호와 저장된 암호화된 비밀번호 비교
      return encoder.matches(rawPassword, user.getUserPw());
  }
  
  
  // 권한등급 부여
  @Transactional
  public void updateUserRole(String userEmail, String userRole) {
      User user = userRepository.findByUserEmail(userEmail); // 유저를 이메일로 찾습니다.
      if (user == null) {
          throw new IllegalArgumentException("유저를 찾을 수 없습니다.");
      }

      // 문자열을 UserRole enum으로 변환
      UserRole role = UserRole.valueOf(userRole); // String을 UserRole로 변환
      user.setUserRole(role); // 권한을 변경합니다.
      userRepository.save(user); // 변경된 정보를 DB에 저장
  }
  
  
 
  
}
