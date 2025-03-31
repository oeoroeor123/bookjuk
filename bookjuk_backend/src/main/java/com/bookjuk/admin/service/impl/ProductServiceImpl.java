package com.bookjuk.admin.service.impl;

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
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.bookjuk.admin.domain.AdminProductAttach;
import com.bookjuk.admin.domain.Author;
import com.bookjuk.admin.domain.Genre;
import com.bookjuk.admin.domain.Product;
import com.bookjuk.admin.domain.ProductRequest;
import com.bookjuk.admin.domain.Publisher;
import com.bookjuk.admin.dto.AuthorDto;
import com.bookjuk.admin.dto.GenreDto;
import com.bookjuk.admin.dto.ProductDto;
import com.bookjuk.admin.dto.ProductRequestDto;
import com.bookjuk.admin.dto.PublisherDto;
import com.bookjuk.admin.mapper.IAuthorMapper;
import com.bookjuk.admin.mapper.IProductMapper;
import com.bookjuk.admin.mapper.IPublisherMapper;
import com.bookjuk.admin.repository.AdminProductAttatchRepository;
import com.bookjuk.admin.repository.AdminProductRepository;
import com.bookjuk.admin.repository.AdminProductRequestRepository;
import com.bookjuk.admin.repository.AuthorRepository;
import com.bookjuk.admin.repository.GenreRepository;
import com.bookjuk.admin.repository.PublisherRepository;
import com.bookjuk.admin.service.IProductService;
import com.bookjuk.model.dto.PageDto;
import com.bookjuk.upload.sevice.UploadService;
import com.bookjuk.util.FileUtil;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements IProductService {

  private final AdminProductRepository        productRepository;
  private final AdminProductAttatchRepository productAttatchRepository;
  private final AdminProductRequestRepository productRequestRepository;
  private final GenreRepository               genreRepository;
  private final AuthorRepository              authorRepository;
  private final PublisherRepository           publisherRepository;

  private final IProductMapper   productMapper;
  private final IAuthorMapper    authorMapper;
  private final IPublisherMapper publisherMapper;
  private final ObjectMapper     objectMapper;
  private final ModelMapper      modelMapper;
  private final PageDto          pageDto;
  private final FileUtil         fileUtil;
  private final UploadService    uploadService;

  @Value("${spring.servlet.multipart.location}")
  private String uploadDir;

  // 상품 조회
  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> findProductList(Pageable pageable) {
    pageDto.setPaging(
        pageable.getPageNumber(), pageable.getPageSize(), (int) productRepository.count()
    );

    pageable = pageable.withPage(pageable.getPageNumber() - 1);
    Page<Product> findproductList = productRepository.findAll(pageable);

    List<ProductDto> productList = findproductList.stream().map(product -> {
      ProductDto productDto = modelMapper.map(product, ProductDto.class);
      productDto.setGenre(modelMapper.map(product.getGenre(), GenreDto.class)); // Genre DTO 변환
      productDto.setAuthor(modelMapper.map(product.getAuthor(), AuthorDto.class)); // Author DTO 변환
      productDto.setPublisher(modelMapper.map(product.getPublisher(), PublisherDto.class)); // Publisher DTO 변환
      return productDto;
    }).collect(Collectors.toList());

    return Map.of(
        "productList", productList, "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  // 특정 상품(도서) 조회
  @Transactional(readOnly = true)
  @Override
  public ProductDto findProductById(Integer productId) {

    Product    product    =
        productRepository.findById(productId).orElseThrow(IllegalArgumentException::new);
    ProductDto productDto = modelMapper.map(product, ProductDto.class);
    productDto.setGenre(modelMapper.map(product.getGenre(), GenreDto.class));
    productDto.setPublisher(modelMapper.map(product.getPublisher(), PublisherDto.class));
    productDto.setAuthor(modelMapper.map(product.getAuthor(), AuthorDto.class));

    return productDto;
  }

  // 새 상품(도서) 등록
  @Override
  public ProductRequestDto registProduct(
      String productRequestDtoJson, MultipartHttpServletRequest multipartRequest,
      String imageUrlsJson
  ) {
    // String로 받은 데이터를 json 형식으로 변경 후 ProductRequestDto에 저장
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // 타임스탬프 형식 사용 안함

    ProductRequestDto productRequestDto = null;
    try {
      productRequestDto = objectMapper.readValue(productRequestDtoJson, ProductRequestDto.class);
    }
    catch (Exception e) {
      e.printStackTrace();
    }

    // 작가 테이블에서 이름으로 id 찾기
    Author author =
        authorRepository.findByAuthorName(productRequestDto.getAuthor().getAuthorName());
    // Author가 존재하지 않으면 새로운 Author 추가
    if (author == null) {
      author = new Author();
      author.setAuthorName(productRequestDto.getAuthor().getAuthorName());
      author.setAuthorBirth(productRequestDto.getAuthor().getAuthorBirth()); // 생년월일 추가
      author.setBiography(productRequestDto.getAuthor().getBiography()); // 전기 추가
      author.setMajorWorks(productRequestDto.getAuthor().getMajorWorks()); // 주요 작품 추가
      author = authorRepository.save(author); // DB에 새 Author 저장
    }

    // 출판사 테이블에서 이름으로 id 찾기
    Publisher publisher = publisherRepository
        .findByPublisherName(productRequestDto.getPublisher().getPublisherName());
    // Publisher가 존재하지 않으면 새로운 Publisher 추가
    if (publisher == null) {
      publisher = new Publisher();
      publisher.setPublisherName(productRequestDto.getPublisher().getPublisherName());
      publisher.setWebsite(productRequestDto.getPublisher().getWebsite());
      publisher = publisherRepository.save(publisher); // DB에 새 Publisher 저장
    }

    String imgUrl = uploadService.imgUpload(multipartRequest).join();

    // uploadService.imgUpload(multipartRequest)
    // .thenAccept(img -> {
    // // 업로드 성공 시 처리 로직
    // System.out.println("Uploaded image URL: " + img);
    // // 여기에 성공 시 수행할 작업 추가
    // })
    // .exceptionally(ex -> {
    // // 업로드 실패 시 처리 로직
    // System.err.println("Upload failed: " + ex.getMessage());
    // // 여기에 실패 시 수행할 작업 추가
    // return null;
    // });

    ProductRequest productInsert = new ProductRequest();
    productInsert.setProductId(productRequestDto.getProductId());
    productInsert.setGenreId(productRequestDto.getGenreId());
    productInsert.setProductName(productRequestDto.getProductName());
    productInsert.setDescription(productRequestDto.getDescription());
    productInsert.setProductPrice(productRequestDto.getProductPrice());
    productInsert.setPublicationDate(productRequestDto.getPublicationDate());
    productInsert.setStock(productRequestDto.getStock());
    productInsert.setTotalPages(productRequestDto.getTotalPages());
    productInsert.setCreateDt(productRequestDto.getCreateDt());
    productInsert.setAuthorId(author.getAuthorId());
    productInsert.setPublisherId(publisher.getPublisherId());
    productInsert.setProductImage(imgUrl);

    MultipartFile multipartFile = multipartRequest.getFile("");

    // 상품 이미지 파일 저장 및 경로 DB 저장
    if (multipartFile != null && !multipartFile.isEmpty()) {
      String originalFilename = multipartFile.getOriginalFilename();          // 첨부 파일의 원래 이름
      String filesystemName   = fileUtil.getFilesystemName(originalFilename); // 첨부 파일의 저장 이름
      String filePath         = fileUtil.getFilePath();                       // 첨부 파일의 저장 경로
      File   dir              = new File(filePath);
      if (!dir.exists()) {
        dir.mkdirs();
      }
      try {
        multipartFile.transferTo(new File(dir, filesystemName));
      }
      catch (Exception e) {
        e.printStackTrace();
      }

    }

    ProductRequest savedProductInsert = productRequestRepository.save(productInsert);

    // 본문에 삽입된 이미지파일 경로 db에 저장하기
    List<String> imageUrls = null;
    try {
      imageUrls = objectMapper.readValue(imageUrlsJson, new TypeReference<List<String>>() {});
    }
    catch (Exception e) {
      e.printStackTrace();
    }

    for (String url : imageUrls) {
      // System.out.println("저장된 이미지 URL: " + url);
      Path   path      = Paths.get(url);
      String folder    = path.getParent().toString();
      String filename  = path.getFileName().toString();
      String newfolder = folder.toString().replace("\\", "/");

      AdminProductAttach attatch = new AdminProductAttach();
      attatch.setProductId(savedProductInsert.getProductId());
      attatch.setFilePath(newfolder);
      attatch.setOriginalFilename(url);
      attatch.setFilesystemName(filename);
      productAttatchRepository.save(attatch);
    }

    return productRequestDto;
  }

  // 상품 수정
  @Override
  public ProductDto modifyProduct(
      String productDtoJson, MultipartHttpServletRequest multipartRequest, String imageUrlsJson
  ) {
    objectMapper.registerModule(new JavaTimeModule());
    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    ProductDto productDto = null;
    try {
      productDto = objectMapper.readValue(productDtoJson, ProductDto.class);
    }
    catch (Exception e) {
      e.printStackTrace();
    }

    // 작가 테이블에서 이름으로 id 찾기
    Author author = authorRepository.findByAuthorName(productDto.getAuthor().getAuthorName());
    // Author가 존재하지 않으면 새로운 Author 추가
    if (author == null) {
      author = new Author();
      author.setAuthorName(productDto.getAuthor().getAuthorName());
      author.setAuthorBirth(productDto.getAuthor().getAuthorBirth()); // 생년월일 추가
      author.setBiography(productDto.getAuthor().getBiography()); // 전기 추가
      author.setMajorWorks(productDto.getAuthor().getMajorWorks()); // 주요 작품 추가
      author = authorRepository.save(author); // DB에 새 Author 저장
    }

    // 출판사 테이블에서 이름으로 id 찾기
    Publisher publisher =
        publisherRepository.findByPublisherName(productDto.getPublisher().getPublisherName());
    // Publisher가 존재하지 않으면 새로운 Publisher 추가
    if (publisher == null) {
      publisher = new Publisher();
      publisher.setPublisherName(productDto.getPublisher().getPublisherName());
      publisher.setWebsite(productDto.getPublisher().getWebsite());
      publisher = publisherRepository.save(publisher); // DB에 새 Publisher 저장
    }

    // Genre 처리
    Genre genre = new Genre();
    genre.setGenreId(productDto.getGenre().getGenreId());
    genre.setGenreName(productDto.getGenre().getGenreName());

    String imgUrl = uploadService.imgUpload(multipartRequest).join();

    Product product = productRepository.findById(productDto.getProductId())
        .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

    product.setProductName(productDto.getProductName());
    product.setProductImage(productDto.getProductImage());
    product.setDescription(productDto.getDescription());
    product.setProductPrice(productDto.getProductPrice());
    product.setStock(productDto.getStock());
    product.setTotalPages(productDto.getTotalPages());
    product.setCreateDt(productDto.getCreateDt());
    product.setAuthor(author);
    product.setPublisher(publisher);
    product.setGenre(genre);
    product.setProductImage(imgUrl);

    MultipartFile multipartFile = multipartRequest.getFile("file");

    // 상품 이미지 파일 저장 및 경로 DB 저장
    if (multipartFile != null && !multipartFile.isEmpty()) {
      String originalFilename = multipartFile.getOriginalFilename();          // 첨부 파일의 원래 이름
      String filesystemName   = fileUtil.getFilesystemName(originalFilename); // 첨부 파일의 저장 이름
      String filePath         = fileUtil.getFilePath();                       // 첨부 파일의 저장 경로
      File   dir              = new File(filePath);
      if (!dir.exists()) {
        dir.mkdirs();
      }
      try {
        multipartFile.transferTo(new File(dir, filesystemName));
      }
      catch (Exception e) {
        e.printStackTrace();
      }

    }

    productAttatchRepository.deleteByProductId(productDto.getProductId());
    
    // 본문에 삽입된 이미지파일 경로 db에 저장하기
    List<String> imageUrls = null;
    try {
      imageUrls = objectMapper.readValue(imageUrlsJson, new TypeReference<List<String>>() {});
    }
    catch (Exception e) {
      e.printStackTrace();
    }

    for (String url : imageUrls) {
      // System.out.println("저장된 이미지 URL: " + url);
      Path   path      = Paths.get(url);
      String folder    = path.getParent().toString();
      String filename  = path.getFileName().toString();
      String newfolder = folder.toString().replace("\\", "/");

      AdminProductAttach attatch = new AdminProductAttach();
      attatch.setProductId(productDto.getProductId());
      attatch.setFilePath(newfolder);
      attatch.setOriginalFilename(url);
      attatch.setFilesystemName(filename);
      productAttatchRepository.save(attatch);
    }

    return productDto;
  }

  // 상품 삭제
  @Override
  public void deleteProductById(Integer productId) {
    Product foundProduct = productRepository.findById(productId)
        .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

    productRepository.delete(foundProduct);
  }

  // 상품 검색
  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getProductSearchList(
      Pageable pageable, String search, String keyword, String page, String display, String sort
  ) {
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("search", search);
    map.put("keyword", keyword);
    map.put("page", Integer.parseInt(page));
    map.put("display", Integer.parseInt(display));
    map.put("sort", sort);

    int searchCount = productMapper.selectProductSearchListCount(map);
    pageDto.setPaging(Integer.parseInt(page), Integer.parseInt(display), searchCount);

    int offset = pageDto.getOffset();
    map.put("offset", offset);

    List<ProductDto> productList = productMapper.selectProductSearchList(map);

    return Map.of(
        "productList", productList,
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  // 장르 리스트 조회
  @Transactional(readOnly = true)
  @Override
  public List<GenreDto> findGenreList() {

    List<Genre> genres = genreRepository.findAll();

    return genres.stream().map(genre -> modelMapper.map(genre, GenreDto.class)).toList();
  }

  // 작가 리스트 조회
  @Transactional(readOnly = true)
  @Override
  public List<AuthorDto> findAuthorList() {

    List<Author> authorList = authorRepository.findAll();

    return authorList.stream().map(author -> modelMapper.map(author, AuthorDto.class))
        .collect(Collectors.toList());
  }

  // 작가 이름으로 검색
  public List<AuthorDto> searchAuthors(String searchAuthor) {
    return authorMapper.searchAuthorsByName(searchAuthor); // MyBatis 호출
  }

  // 출판사 리스트 조회
  @Transactional(readOnly = true)
  @Override
  public List<PublisherDto> findPublisherList() {

    List<Publisher> publisherList = publisherRepository.findAll();

    return publisherList.stream().map(publisher -> modelMapper.map(publisher, PublisherDto.class))
        .collect(Collectors.toList());
  }

  // 출판사 이름으로 검색
  public List<PublisherDto> searchPublisher(String searchPublisher) {
    return publisherMapper.searchPublishersByName(searchPublisher); // MyBatis 호출
  }

  // 신규 작가 등록
  @Override
  public AuthorDto createAuthor(AuthorDto authorDto) {
    // 작가 테이블에서 이름으로 id 찾기
    Author author = authorRepository.findByAuthorName(authorDto.getAuthorName());

    // Author가 존재하지 않으면 새로운 Author 추가
    if (author == null) {
      author = new Author();
      author.setAuthorName(authorDto.getAuthorName());
      author.setAuthorBirth(authorDto.getAuthorBirth()); // 생년월일 추가
      author.setBiography(authorDto.getBiography()); // 소개 추가
      author.setMajorWorks(authorDto.getMajorWorks()); // 주요 작품 추가
      author = authorRepository.save(author); // DB에 새 Author 저장
    }

    // Author를 AuthorDto로 변환하여 반환
    return new AuthorDto(
        author.getAuthorId(),
        author.getAuthorName(),
        author.getAuthorBirth(),
        author.getBiography(),
        author.getMajorWorks()
    );
  }

  // 신규 출판사 등록
  @Override
  public PublisherDto createPublisher(PublisherDto publisherDto) {
    // 출판사 테이블에서 이름으로 id 찾기
    Publisher publisher = publisherRepository.findByPublisherName(publisherDto.getPublisherName());

    // Publisher가 존재하지 않으면 새로운 Publisher 추가
    if (publisher == null) {
      publisher = new Publisher();
      publisher.setPublisherName(publisherDto.getPublisherName());
      publisher.setWebsite(publisherDto.getWebsite()); // 웹사이트 추가
      publisher = publisherRepository.save(publisher); // 저장
    }

    // Publisher를 PublisherDto로 변환하여 반환
    return new PublisherDto(
        publisher.getPublisherId(),
        publisher.getPublisherName(),
        publisher.getWebsite()
    );
  }

  @Override
  public String uploadImage(MultipartFile multipartFile) {
    String originalFilename = multipartFile.getOriginalFilename();          // 첨부 파일의 원래 이름
    String filesystemName   = fileUtil.getFilesystemName(originalFilename); // 첨부 파일의 저장 이름
    String filePath         = fileUtil.getFilePath();                       // 첨부 파일의 저장 경로
    File   dir              = new File(filePath);
    if (!dir.exists())
      dir.mkdirs();
    try {
      multipartFile.transferTo(new File(dir, filesystemName));
    }
    catch (Exception e) {
      e.printStackTrace();
    }
    Path   path         = Paths.get(filePath);                       // Path 객체로 변환
    Path   modifiedPath = path.subpath(1, path.getNameCount());      // 첫 번째 디렉토리만 제거
    String newPath      = modifiedPath.toString().replace("\\", "/");

    return (newPath + "/" + filesystemName);
  }

  @Override
  public void deleteUploadImageUrls(List<String> imageUrls) {
    for (String url : imageUrls) {
      System.out.println(url);
      Path   filePath = Paths.get(url);
      Path   dirName  = filePath.getParent();                                // 디렉터리 경로
      String baseName = filePath.getFileName().toString();                   // 파일 이름
      File   file     = new File(uploadDir + "upload\\" + dirName, baseName);
      if (file.exists())
        file.delete();
    }

  }

}
