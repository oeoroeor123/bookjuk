package com.bookjuk.secondhand.service.impl;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.bookjuk.admin.domain.Author;
import com.bookjuk.admin.domain.Genre;
import com.bookjuk.admin.domain.Publisher;
import com.bookjuk.admin.dto.AuthorDto;
import com.bookjuk.admin.dto.GenreDto;
import com.bookjuk.admin.dto.PublisherDto;
import com.bookjuk.admin.repository.AuthorRepository;
import com.bookjuk.admin.repository.GenreRepository;
import com.bookjuk.admin.repository.PublisherRepository;
import com.bookjuk.model.dto.PageDto;
import com.bookjuk.secondhand.domain.Secondhand;
import com.bookjuk.secondhand.domain.SecondhandAttatch;
import com.bookjuk.secondhand.domain.SecondhandInsert;
import com.bookjuk.secondhand.dto.SecondhandDto;
import com.bookjuk.secondhand.dto.SecondhandInsertDto;
import com.bookjuk.secondhand.mapper.SecondhandMapper;
import com.bookjuk.secondhand.repository.SecondhandAttatchRepository;
import com.bookjuk.secondhand.repository.SecondhandInsertRepository;
import com.bookjuk.secondhand.repository.SecondhandRepository;
import com.bookjuk.secondhand.service.SecondhandService;
import com.bookjuk.user.dto.UserDto;
import com.bookjuk.util.FileUtil;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;


@Transactional
@RequiredArgsConstructor
@Service
public class SecondhandServiceImpl implements SecondhandService {
  
  private final SecondhandRepository secondhandRepository;
  private final GenreRepository genreRepository;
  private final AuthorRepository authorRepository;
  private final PublisherRepository publisherRepository;
  private final SecondhandInsertRepository secondhandInsertRepository;
  private final SecondhandAttatchRepository secondhandAttatchRepository; 

  private final SecondhandMapper secondhandMapper;
  
  private final ObjectMapper objectMapper;
  private final ModelMapper modelMapper;
  private final PageDto pageDto;
    
  private final FileUtil fileUtil; 
  
  @Value("${spring.servlet.multipart.location}")
  private String uploadDir;
  
  
  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> findSecondhandList(Pageable pageable) {
    
    // /* 사용안함 */
    pageDto.setPaging(pageable.getPageNumber(), pageable.getPageSize(), (int)secondhandRepository.count());    
    pageable = pageable.withPage(pageable.getPageNumber() - 1);
    Page<Secondhand> secondhandList = secondhandRepository.findAll(pageable);    
    List<SecondhandDto> secondhandDtos = secondhandList.stream()
        .map(secondhand -> {
          SecondhandDto secondhandDto = modelMapper.map(secondhand, SecondhandDto.class);
          secondhandDto.setGenre(modelMapper.map(secondhand.getGenre(), GenreDto.class));
          secondhandDto.setPublisher(modelMapper.map(secondhand.getPublisher(), PublisherDto.class));
          secondhandDto.setAuthor(modelMapper.map(secondhand.getAuthor(), AuthorDto.class));
          secondhandDto.setUser(modelMapper.map(secondhand.getUser(), UserDto.class));
          return secondhandDto;
        })
        .collect(Collectors.toList()); 
    
    return Map.of("secondhandList", secondhandDtos
                , "pageList", IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList()
                , "pageDto", pageDto);
  }
  
  
  @Override
  public Map<String, Object> secondhandSearchList(Pageable pageable, String search, String keyword, 
                                                  String page, String display, String sort) {
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("search", search);
    map.put("keyword", keyword);
    map.put("page", Integer.parseInt(page));
    map.put("display", Integer.parseInt(display));
    map.put("sort", sort);

    int searchCount = secondhandMapper.selectSecondhandSearchListCount(map);
    pageDto.setPaging(Integer.parseInt(page), Integer.parseInt(display), searchCount);

    int offset = pageDto.getOffset();
    map.put("offset", offset); 
    
    List<SecondhandDto> productList = secondhandMapper.selectSecondhandSearchList(map);

    return Map.of(
        "secondhandList", productList,
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }
  
  @Transactional(readOnly = true)
  @Override
  public SecondhandDto findSecondhandById(Integer id) {
    
    Secondhand secondhand = secondhandRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    SecondhandDto secondhandDto = modelMapper.map(secondhand, SecondhandDto.class);
    secondhandDto.setGenre(modelMapper.map(secondhand.getGenre(), GenreDto.class));
    secondhandDto.setPublisher(modelMapper.map(secondhand.getPublisher(), PublisherDto.class));
    secondhandDto.setAuthor(modelMapper.map(secondhand.getAuthor(), AuthorDto.class));
    secondhandDto.setUser(modelMapper.map(secondhand.getUser(), UserDto.class));
    
    return secondhandDto;
  }
  
  
  @Override
  public SecondhandInsertDto registSecondhand(String secondhandInsertDtoJson, MultipartFile multipartFile, String imageUrlsJson) {
    System.out.println(secondhandInsertDtoJson);
    // String로 받은 데이터를 json형식으로 변경 후 SecondhandDto에 저장
    objectMapper.registerModule(new JavaTimeModule()); // 이 부분 추가
    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // 타임스탬프 형식 사용 안함    
    SecondhandInsertDto secondhandInsertDto = null;
    try {
      secondhandInsertDto = objectMapper.readValue(secondhandInsertDtoJson, SecondhandInsertDto.class);
    } catch (Exception e) {
      e.printStackTrace();
    }    
    //System.out.println(secondhandInsertDto.toString());   // 받은 데이터 확인용
    
    // 작가 테이블에서 이름으로 id 찾기
    Author author = authorRepository.findByAuthorName(secondhandInsertDto.getAuthorName());
    // Author가 존재하지 않으면 새로운 Author를 추가
    if (author == null) {
        author = new Author();
        author.setAuthorName(secondhandInsertDto.getAuthorName());
        author = authorRepository.save(author);  // DB에 새 Author 저장                
    }    
    //System.out.println(author.toString());

    // 출판사 테이블에서 이름으로 id 찾기
    Publisher publisher = publisherRepository.findByPublisherName(secondhandInsertDto.getPublisherName());
    // publisher가 존재하지 않으면 새로운 publisher를 추가
    if (publisher == null) {
      publisher = new Publisher();
      publisher.setPublisherName(secondhandInsertDto.getPublisherName());
      publisher = publisherRepository.save(publisher);  // DB에 새 Author 저장          
    }
    //System.out.println(publisher.toString());
    secondhandInsertDto.setAuthorId(author.getAuthorId());
    secondhandInsertDto.setPublisherId(publisher.getPublisherId());
    //System.out.println(secondhandInsertDto.toString());          
                           
    // secondhandInsertDto의 사용할 데이터만 secondhandInsert에 넣기
    SecondhandInsert secondhandInsert = new SecondhandInsert();
    secondhandInsert.setSecondhandId(secondhandInsertDto.getSecondhandId());
    secondhandInsert.setUserId(secondhandInsertDto.getUserId());
    secondhandInsert.setGenreId(secondhandInsertDto.getGenreId());
    secondhandInsert.setPublisherId(secondhandInsertDto.getPublisherId());
    secondhandInsert.setAuthorId(secondhandInsertDto.getAuthorId());
    secondhandInsert.setSecondhandName(secondhandInsertDto.getSecondhandName());    
    secondhandInsert.setSecondhandDescription(secondhandInsertDto.getSecondhandDescription());
    secondhandInsert.setSecondhandPrice(secondhandInsertDto.getSecondhandPrice());
    secondhandInsert.setSecondhandDate(secondhandInsertDto.getSecondhandDate());
    secondhandInsert.setCreateDt(secondhandInsertDto.getCreateDt()); 
    secondhandInsert.setSalesYn(secondhandInsertDto.getSalesYn());
    
    // 상품이미지 파일저장 및 경로 db저장
    if(multipartFile != null && !multipartFile.isEmpty()) {
      String originalFilename = multipartFile.getOriginalFilename(); // 첨부 파일의 원래 이름
      String filesystemName = fileUtil.getFilesystemName(originalFilename); // 첨부 파일의 저장 이름
      String filePath = fileUtil.getFilePath(); // 첨부 파일의 저장 경로
      File dir = new File(filePath);
      if(!dir.exists())
        dir.mkdirs();  
      try {
        multipartFile.transferTo(new File(dir, filesystemName));
      } catch (Exception e) {
         e.printStackTrace();
      } 
      Path path = Paths.get(filePath);    // Path 객체로 변환      
      Path modifiedPath = path.subpath(1, path.getNameCount());   // 첫 번째 디렉토리만 제거      
      String newPath = modifiedPath.toString().replace("\\", "/");
      
      secondhandInsert.setSecondhandImage(newPath + "/" + filesystemName);
    }
    SecondhandInsert savedSecondhandInsert = secondhandInsertRepository.save(secondhandInsert);
        
    // 본문에 삽입된 이미지파일 경로 db에 저장하기
    List<String> imageUrls = null;
    try {
      imageUrls = objectMapper.readValue(imageUrlsJson, new TypeReference<List<String>>(){});
    } catch (Exception e) {
      e.printStackTrace();
    }
        
    for (String url : imageUrls) {            
      //System.out.println("저장된 이미지 URL: " + url);
      Path path = Paths.get(url);
      String folder = path.getParent().toString();
      String filename = path.getFileName().toString();
      String newfolder = folder.toString().replace("\\", "/");

      SecondhandAttatch secondhandAttatch = new SecondhandAttatch();
      secondhandAttatch.setSecondhandId(savedSecondhandInsert.getSecondhandId());
      secondhandAttatch.setSecondhandFilePath(newfolder);
      secondhandAttatch.setSecondhandOrgFilename(url);
      secondhandAttatch.setSecondhandSysFilename(filename);
      secondhandAttatchRepository.save(secondhandAttatch);
    }  
    
    return secondhandInsertDto; 
  }  
  
  
  @Override
  public SecondhandDto modifySecondhand(String secondhandDtoJson, MultipartFile multipartFile, String imageUrlsJson) {   
    //System.out.println(secondhandDtoJson);
    // String로 받은 데이터를 json형식으로 변경 후 SecondhandDto에 저장
    objectMapper.registerModule(new JavaTimeModule()); // 이 부분 추가
    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // 타임스탬프 형식 사용 안함    
    SecondhandDto secondhandDto = null;
    try {
      secondhandDto = objectMapper.readValue(secondhandDtoJson, SecondhandDto.class);
    } catch (Exception e) {
      e.printStackTrace();
    }    
    //System.out.println(secondhandDto.toString());   // 받은 데이터 확인용
                
    // 작가 테이블에서 이름으로 id 찾기
    Author author = authorRepository.findByAuthorName(secondhandDto.getAuthor().getAuthorName());    
    if (author == null) {   // Author가 존재하지 않으면 새로운 Author를 추가
        author = new Author();
        author.setAuthorName(secondhandDto.getAuthor().getAuthorName());
        author = authorRepository.save(author);  // DB에 새 Author 저장
                  
        AuthorDto authorDto = new AuthorDto();    // AuthorDto 객체에 대해 setAuthorId 호출
        authorDto.setAuthorId(author.getAuthorId());  // authorDto의 authorId 설정
        secondhandDto.setAuthor(authorDto);        
    }    
    //System.out.println(author.toString());

    // 출판사 테이블에서 이름으로 id 찾기
    Publisher publisher = publisherRepository.findByPublisherName(secondhandDto.getPublisher().getPublisherName());    
    if (publisher == null) {    // publisher가 존재하지 않으면 새로운 publisher를 추가
      publisher = new Publisher();
      publisher.setPublisherName(secondhandDto.getPublisher().getPublisherName());
      publisher = publisherRepository.save(publisher);  // DB에 새 Author 저장  
      
      PublisherDto publisherDto = new PublisherDto();   // PublisherDto 객체에 대해 setPublisherId 호출
      publisherDto.setPublisherId(publisher.getPublisherId()); // publisherDto의 publisherId 설정      
      secondhandDto.setPublisher(publisherDto);
    }
    //System.out.println(publisher.toString());   
    //System.out.println(secondhandDto.toString());

    // 정보를 중고상품 엔티티에 저장
    Secondhand secondhand = secondhandRepository.findById(secondhandDto.getSecondhandId()).orElseThrow(IllegalArgumentException::new);    // () -> new IllegalArgumentException()
    secondhand.setSecondhandName(secondhandDto.getSecondhandName());
    secondhand.setSecondhandDescription(secondhandDto.getSecondhandDescription());
    secondhand.setSecondhandPrice(secondhandDto.getSecondhandPrice());
    secondhand.setCreateDt(secondhandDto.getCreateDt());    
    secondhand.setAuthor(author);
    secondhand.setPublisher(publisher);
    
    // 장르 정보를 장르 엔티티에 저장 후 중고상품 엔티티에 저장
    Genre genre = new Genre();
    genre.setGenreId(secondhandDto.getGenre().getGenreId());
    genre.setGenreName(secondhandDto.getGenre().getGenreName());
    secondhand.setGenre(genre);              
    
    
    if(multipartFile != null && !multipartFile.isEmpty()) {
      // 기존에 저장된 상품이미지 파일삭제
      Path imgPath = Paths.get(secondhand.getSecondhandImage());
      Path dirName = imgPath.getParent();  // 디렉터리 경로
      String baseName = imgPath.getFileName().toString();  // 파일 이름    
      File file = new File(uploadDir + "upload\\" + dirName, baseName);
      if(file.exists())
        file.delete(); 
      
      // 새로운 상품이미지 파일저장 및 경로 db저장
      String originalFilename = multipartFile.getOriginalFilename(); // 첨부 파일의 원래 이름
      String filesystemName = fileUtil.getFilesystemName(originalFilename); // 첨부 파일의 저장 이름
      String filePath = fileUtil.getFilePath(); // 첨부 파일의 저장 경로
      File dir = new File(filePath);
      if(!dir.exists())
        dir.mkdirs();      
      try {
        multipartFile.transferTo(new File(dir, filesystemName));
      } catch (Exception e) {
         e.printStackTrace();
      }         
      Path path = Paths.get(filePath);    // Path 객체로 변환      
      Path modifiedPath = path.subpath(1, path.getNameCount());   // 첫 번째 디렉토리만 제거
      String newPath = modifiedPath.toString().replace("\\", "/");
      secondhand.setSecondhandImage(newPath + "/" + filesystemName);
    }

    if (imageUrlsJson != null && !imageUrlsJson.isEmpty() && !imageUrlsJson.equals("[]")) {
      // 기존본문에 저장된 이미지 파일삭제
      List<SecondhandAttatch> secondhandAttatchList = secondhandAttatchRepository.findBySecondhandId(secondhandDto.getSecondhandId());
      for (SecondhandAttatch secondhandAttatch : secondhandAttatchList) {
        //System.out.println("삭제할 이미지 : " + secondhandAttatch.getSecondhandOrgFilename());
        Path filePath = Paths.get(secondhandAttatch.getSecondhandOrgFilename());
        Path dirName = filePath.getParent();  // 디렉터리 경로
        String baseName = filePath.getFileName().toString();  // 파일 이름    
        File file = new File(uploadDir + "upload\\" + dirName, baseName);
        if(file.exists())
          file.delete();
      }
      
      // 기존본문에 저장된 이미지 db삭제
      secondhandAttatchRepository.deleteBySecondhandId(secondhandDto.getSecondhandId());  
      
      // 신규본문에 추가된 이미지경로 db저장 (이미지파일 저장은 첨부 시 이미 작업함)
      List<String> imageUrls = null;
      try {
        imageUrls = objectMapper.readValue(imageUrlsJson, new TypeReference<List<String>>(){});
      } catch (Exception e) {
        e.printStackTrace();
      }
          
      for (String url : imageUrls) {            
        //System.out.println("저장할 이미지 URL: " + url);
        Path path = Paths.get(url);
        String folder = path.getParent().toString();
        String filename = path.getFileName().toString();
        String newfolder = folder.toString().replace("\\", "/");
  
        SecondhandAttatch secondhandAttatch = new SecondhandAttatch();
        secondhandAttatch.setSecondhandId(secondhandDto.getSecondhandId());
        secondhandAttatch.setSecondhandFilePath(newfolder);
        secondhandAttatch.setSecondhandOrgFilename(url);
        secondhandAttatch.setSecondhandSysFilename(filename);
        secondhandAttatchRepository.save(secondhandAttatch);
      }  
    }
            
    return secondhandDto;
  }
  
  
  @Override
  public void deleteSecondhandById(Integer id) {
    // 상품이미지 경로 확인 및 삭제
    Secondhand secondhand = secondhandRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    // System.out.println(secondhand.getSecondhandImage());                
    if(secondhand.getSecondhandImage() != "" && secondhand.getSecondhandImage() != null) {
      Path filePath = Paths.get(secondhand.getSecondhandImage());
      Path dirName = filePath.getParent();  // 디렉터리 경로
      String baseName = filePath.getFileName().toString();  // 파일 이름    
      File file = new File(uploadDir + "upload\\" + dirName, baseName);
      if(file.exists())
        file.delete();
    }
    
    // db정보로 파일 삭제
    List<SecondhandAttatch> secondhandAttatchList = secondhandAttatchRepository.findBySecondhandId(id);
    for (SecondhandAttatch secondhandAttatch : secondhandAttatchList) {
      Path filePath = Paths.get(secondhandAttatch.getSecondhandOrgFilename());
      Path dirName = filePath.getParent();  // 디렉터리 경로
      String baseName = filePath.getFileName().toString();  // 파일 이름    
      File file = new File(uploadDir + "upload\\" + dirName, baseName);
      if(file.exists())
        file.delete();
    }
    
    // tbl_secondhand_attatch에서 데이터 삭제
    secondhandAttatchRepository.deleteBySecondhandId(id);
    
    // tbl_secondhand에서 데이터 삭제    
    secondhandRepository.deleteById(id);   

  }  
  
  
  @Transactional(readOnly = true)
  @Override
  public List<GenreDto> findGenreList() {
    
    List<Genre> genres = genreRepository.findAll();
    
    return genres.stream()
                 .map(genre -> modelMapper.map(genre, GenreDto.class))
                 .toList(); 
  }
  
  @Override
  public String uploadImage(MultipartFile multipartFile) {
    String originalFilename = multipartFile.getOriginalFilename(); // 첨부 파일의 원래 이름
    String filesystemName = fileUtil.getFilesystemName(originalFilename); // 첨부 파일의 저장 이름
    String filePath = fileUtil.getFilePath(); // 첨부 파일의 저장 경로
    File dir = new File(filePath);
    if(!dir.exists())
      dir.mkdirs();  
    try {
      multipartFile.transferTo(new File(dir, filesystemName));
    } catch (Exception e) {
       e.printStackTrace();
    } 
    Path path = Paths.get(filePath);    // Path 객체로 변환      
    Path modifiedPath = path.subpath(1, path.getNameCount());   // 첫 번째 디렉토리만 제거      
    String newPath = modifiedPath.toString().replace("\\", "/");
    
    return (newPath + "/" + filesystemName);
  }
  
  @Override
  public void deleteUploadImageUrls(List<String> imageUrls) {
    for (String url : imageUrls) {
      //System.out.println(url);
      Path filePath = Paths.get(url);
      Path dirName = filePath.getParent();  // 디렉터리 경로
      String baseName = filePath.getFileName().toString();  // 파일 이름    
      File file = new File(uploadDir + "upload\\" + dirName, baseName);
      if(file.exists())
        file.delete();           
    }  
  }
  
  
}
