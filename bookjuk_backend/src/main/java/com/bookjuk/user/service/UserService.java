package com.bookjuk.user.service;




import java.util.List;
import com.bookjuk.user.dto.UserDto;


public interface UserService {

  void saveUser(UserDto userDto);
  
  void isEmailAvailable(String userEmail);
  
  UserDto findByUserEmail(String userEmail);
  
  List<UserDto> findAllUsers();
  
  boolean isNicknameAvailable(String userNickname);

  void deleteByUserEmail(String userEmail);

  void updateUser(String userEmail, UserDto userDto);

  boolean verifyPassword(String userName, String rawPassword);
  
  void updateUserRole(String userEmail, String nweRole);

}
