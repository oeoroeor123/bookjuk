package com.bookjuk.admin.service.impl;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bookjuk.admin.domain.AdminInquiry;
import com.bookjuk.admin.domain.AdminInquiryReply;
import com.bookjuk.admin.domain.AdminOrder;
import com.bookjuk.admin.domain.AdminOrderStatus;
import com.bookjuk.admin.domain.AdminProduct;
import com.bookjuk.admin.domain.AdminQna;
import com.bookjuk.admin.domain.AdminQnaReply;
import com.bookjuk.admin.domain.AdminReview;
import com.bookjuk.admin.domain.AdminSecondhand;
import com.bookjuk.admin.domain.AdminUser;
import com.bookjuk.admin.domain.DeleteLog;
import com.bookjuk.admin.domain.LoginLog;
import com.bookjuk.admin.dto.AdminAuthorDto;
import com.bookjuk.admin.dto.AdminGenreDto;
import com.bookjuk.admin.dto.AdminInquiryDto;
import com.bookjuk.admin.dto.AdminOrderStatusDto;
import com.bookjuk.admin.dto.AdminProductAttachDto;
import com.bookjuk.admin.dto.AdminProductDto;
import com.bookjuk.admin.dto.AdminPublisherDto;
import com.bookjuk.admin.dto.AdminQnaDto;
import com.bookjuk.admin.dto.AdminQnaReplyDto;
import com.bookjuk.admin.dto.AdminReviewDto;
import com.bookjuk.admin.dto.AdminSecondhandAttachDto;
import com.bookjuk.admin.dto.AdminSecondhandDto;
import com.bookjuk.admin.dto.DeleteLogDto;
import com.bookjuk.admin.dto.LoginLogDto;
import com.bookjuk.admin.mapper.IAdminReviewMapper;
import com.bookjuk.admin.mapper.IAdminSecondHandMapper;
import com.bookjuk.admin.mapper.IDeleteLogMapper;
import com.bookjuk.admin.mapper.ILoginLogMapper;
import com.bookjuk.admin.repository.AdminInquiryReplyRepository;
import com.bookjuk.admin.repository.AdminInquiryRepository;
import com.bookjuk.admin.repository.AdminOrderRepository;
import com.bookjuk.admin.repository.AdminOrderStatusRepository;
import com.bookjuk.admin.repository.AdminProductRepository2;
import com.bookjuk.admin.repository.AdminQnAReplyRepository;
import com.bookjuk.admin.repository.AdminQnARepository;
import com.bookjuk.admin.repository.AdminReviewRepository;
import com.bookjuk.admin.repository.AdminSecondhandRepository;
import com.bookjuk.admin.repository.DeleteLogRepository;
import com.bookjuk.admin.service.AdminService;
import com.bookjuk.main.repository.LoginLogRepository;
import com.bookjuk.model.dto.PageDto;
import com.bookjuk.user.dto.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class AdminServiceImpl implements AdminService {

  private final LoginLogRepository          loginLogRepository;
  private final DeleteLogRepository         deleteLogRepository;
  private final AdminProductRepository2     productRepository;
  private final AdminQnARepository          qnaRepository;
  private final AdminQnAReplyRepository     qnaReplyRepository;
  private final AdminInquiryRepository      inquiryRepository;
  private final AdminInquiryReplyRepository inquiryReplyRepository;
  private final AdminSecondhandRepository   secondhandRepository;
  private final AdminReviewRepository       reviewRepository;
  private final AdminOrderRepository        orderRepository;
  private final AdminOrderStatusRepository  orderStatusRepository;
  private final ILoginLogMapper             loginLogMapper;
  private final IDeleteLogMapper            deleteLogMapper;
  private final IAdminSecondHandMapper      secondhandMapper;
  private final IAdminReviewMapper          reviewMapper;
  private final ModelMapper                 modelMapper;
  private final PageDto                     pageDto;

  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getLoginLogList(Pageable pageable) {
    pageDto.setPaging(
        pageable.getPageNumber(), pageable.getPageSize(), (int) loginLogRepository.count()
    );
    pageable = pageable.withPage(pageable.getPageNumber() - 1);
    Page<LoginLog> findLoginLogList = loginLogRepository.findAll(pageable);

    // modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD); // STANDARD 전략 // error
    // modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE); // LOOSE 전략 // error
    // modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // STRICT 전략 // id 셋팅이 인됨

    return Map.of(
        "loginLogList",
        findLoginLogList.map(loginLog -> modelMapper.map(loginLog, LoginLogDto.class)).toList(),
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  @Override
  public Map<String, Object> getLoginLogSearchList(
      Pageable pageable, String search, String keyword, String page, String display, String sort,
      String startDt, String endDt
  ) {
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("search", search);
    map.put("keyword", keyword);
    map.put("page", Integer.parseInt(page));
    map.put("display", Integer.parseInt(display));
    map.put("sort", sort);
    map.put("startDt", startDt);
    map.put("endDt", endDt);

    int searchCount = secondhandMapper.selectSecondhandSearchListCount(map);
    pageDto.setPaging(Integer.parseInt(page), Integer.parseInt(display), searchCount);

    int offset = pageDto.getOffset();
    map.put("offset", offset);

    List<LoginLogDto> loginLogList = loginLogMapper.selectLoginLogSearchList(map);

    return Map.of(
        "loginLogList", loginLogList,
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  @Override
  public Map<String, Object> getDeleteLogList(Pageable pageable) {
    pageDto.setPaging(
        pageable.getPageNumber(), pageable.getPageSize(), (int) deleteLogRepository.count()
    );
    pageable = pageable.withPage(pageable.getPageNumber() - 1);
    Page<DeleteLog> findLoginLogList = deleteLogRepository.findAll(pageable);

    // modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD); // STANDARD 전략 // error
    // modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE); // LOOSE 전략 // error
    // modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // STRICT 전략 // id 셋팅이 인됨

    return Map.of(
        "deleteLogList",
        findLoginLogList.map(deleteLog -> modelMapper.map(deleteLog, DeleteLogDto.class)).toList(),
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  @Override
  public Map<String, Object> getDeleteLogSearchList(
      Pageable pageable, String search, String keyword, String page, String display, String sort,
      String startDt, String endDt
  ) {
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("search", search);
    map.put("keyword", keyword);
    map.put("page", Integer.parseInt(page));
    map.put("display", Integer.parseInt(display));
    map.put("sort", sort);
    map.put("startDt", startDt);
    map.put("endDt", endDt);

    int searchCount = secondhandMapper.selectSecondhandSearchListCount(map);
    pageDto.setPaging(Integer.parseInt(page), Integer.parseInt(display), searchCount);

    int offset = pageDto.getOffset();
    map.put("offset", offset);

    List<DeleteLogDto> deleteLogList = deleteLogMapper.selectDeleteLogSearchList(map);

    return Map.of(
        "deleteLogList", deleteLogList,
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getQnaList(Pageable pageable) {
    pageDto
        .setPaging(pageable.getPageNumber(), pageable.getPageSize(), (int) qnaRepository.count());
    pageable = pageable.withPage(pageable.getPageNumber() - 1);
    Page<AdminQna> qnaList = qnaRepository.findAll(pageable);

    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

    return Map.of(
        "qnaList",
        qnaList.map(qna -> modelMapper.map(qna, AdminQnaDto.class)).toList(),
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getByQnaId(Integer qnaId) {
    AdminQna qna = qnaRepository.findById(qnaId).orElseThrow(IllegalArgumentException::new);
    return Map.of("qna", modelMapper.map(qna, AdminQnaDto.class));
  }

  @Override
  public AdminQnaDto registQnaReply(AdminQnaDto adminQnaDto) {
    AdminQna findQna =
        qnaRepository.findById(adminQnaDto.getQnaId()).orElseThrow(IllegalArgumentException::new);

    // modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // STRICT 전략 // id 셋팅이 인됨

    // 답변 등록
    AdminQnaReply qnaReply = qnaReplyRepository.findByQna_QnaId(adminQnaDto.getQnaId())
        .orElse(new AdminQnaReply());

    // 답변 ID에 Q&A ID 셋팅
    qnaReply.setQna(AdminQna.builder().qnaId(adminQnaDto.getQnaId()).build());

    // 답변 등록자 셋팅
    qnaReply.setUser(
        AdminUser.builder().userId(adminQnaDto.getQnaReply().getUser().getUserId()).build()
    );

    // 답변 내용 셋팅
    qnaReply.setQnaReplyContents(adminQnaDto.getQnaReply().getQnaReplyContents());

    // 저장
    qnaReplyRepository.save(qnaReply);

    // 답변 여부 업데이트
    findQna.setQnaReplyYn('Y');

    // result 에 줄 결과 업데이트
    adminQnaDto.setQnaReplyYn('Y');
    return adminQnaDto;
  }

  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getInquiryList(Pageable pageable) {
    pageDto.setPaging(
        pageable.getPageNumber(), pageable.getPageSize(), (int) inquiryRepository.count()
    );
    pageable = pageable.withPage(pageable.getPageNumber() - 1);
    Page<AdminInquiry> inquiryList = inquiryRepository.findAll(pageable);

    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // STRICT 전략 // id 셋팅이 인됨

    return Map.of(
        "inquiryList",
        inquiryList.map(inquiry -> modelMapper.map(inquiry, AdminInquiryDto.class)).toList(),
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getByInquiryId(Integer inquiryId) {
    AdminInquiry inquiry =
        inquiryRepository.findById(inquiryId).orElseThrow(IllegalArgumentException::new);
    return Map.of("inquiry", modelMapper.map(inquiry, AdminInquiryDto.class));
  }

  @Override
  public AdminInquiryDto registInquiryReply(AdminInquiryDto adminInquiryDto) {
    AdminInquiry findInquiry =
        inquiryRepository.findById(adminInquiryDto.getInquiryId())
            .orElseThrow(IllegalArgumentException::new);

    // modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // STRICT 전략 // id 셋팅이 인됨

    // 답변 등록
    AdminInquiryReply inquiryReply =
        inquiryReplyRepository.findByInquiry_InquiryId(adminInquiryDto.getInquiryId())
            .orElse(new AdminInquiryReply());

    // 답변 ID 셋팅
    inquiryReply
        .setInquiry(AdminInquiry.builder().inquiryId(adminInquiryDto.getInquiryId()).build());

    // 답변 ID에 Inquiry ID 셋팅
    inquiryReply
        .setInquiry(AdminInquiry.builder().inquiryId(adminInquiryDto.getInquiryId()).build());

    // 답변 등록자 셋팅
    inquiryReply.setUser(
        AdminUser.builder().userId(adminInquiryDto.getInquiryReply().getUser().getUserId()).build()
    );
    // 답변 내용 셋팅
    inquiryReply.setInquiryReplyContent(adminInquiryDto.getInquiryReply().getInquiryReplyContent());

    // 저장
    inquiryReplyRepository.save(inquiryReply);

    // 답변 여부 업데이트
    findInquiry.setInquiryReplyYn('Y');

    // result 에 줄 결과 업데이트
    adminInquiryDto.setInquiryReplyYn('Y');
    return adminInquiryDto;
  }

  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getProductList(Pageable pageable) {
    pageDto.setPaging(
        pageable.getPageNumber(), pageable.getPageSize(), (int) productRepository.count()
    );
    pageable = pageable.withPage(pageable.getPageNumber() - 1);
    Page<AdminProduct> findProductList = productRepository.findAll(pageable);

    List<AdminProductDto> productList = findProductList.stream()
        .map(product -> {
          AdminProductDto productDto = modelMapper.map(product, AdminProductDto.class); // Product DTO 변환
          productDto.setGenre(modelMapper.map(product.getGenre(), AdminGenreDto.class)); // Genre DTO 변환
          productDto.setAuthor(modelMapper.map(product.getAuthor(), AdminAuthorDto.class)); // Author DTO 변환
          productDto.setPublisher(modelMapper.map(product.getPublisher(), AdminPublisherDto.class)); // Publisher DTO 변환
          productDto.setAttachList(
              product.getAttachList().stream()
                  .map(attach -> modelMapper.map(attach, AdminProductAttachDto.class))
                  .collect(Collectors.toList())
          ); // AdminAttatch DTO 변환
          return productDto;
        })
        .collect(Collectors.toList());

    return Map.of(
        "productList", productList,
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  @Transactional(readOnly = true)
  @Override
  public AdminProductDto getByProductId(Integer productId) {
    AdminProduct product =
        productRepository.findById(productId).orElseThrow(IllegalArgumentException::new);
    return modelMapper.map(product, AdminProductDto.class);
  }

  @Override
  public AdminProductDto modifyByProductId(AdminProductDto productDto) {
    AdminProduct findProduct = productRepository.findById(productDto.getProductId())
        .orElseThrow(IllegalArgumentException::new);
    findProduct.setSalesYn(productDto.getSalesYn());
    return modelMapper.map(findProduct, AdminProductDto.class);
  }

  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getSecondhandList(Pageable pageable) {
    pageDto.setPaging(
        pageable.getPageNumber(), pageable.getPageSize(), (int) secondhandRepository.count()
    );
    pageable = pageable.withPage(pageable.getPageNumber() - 1);
    Page<AdminSecondhand> findSecondhandList = secondhandRepository.findAll(pageable);

    // modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // STRICT 전략 // id 셋팅이 인됨

    List<AdminSecondhandDto> secondhandList = findSecondhandList.stream()
        .map(secondhand -> {
          AdminSecondhandDto secondhandDto = modelMapper.map(secondhand, AdminSecondhandDto.class);
          secondhandDto.setGenre(modelMapper.map(secondhand.getGenre(), AdminGenreDto.class)); // Genre DTO 변환
          secondhandDto.setAuthor(modelMapper.map(secondhand.getAuthor(), AdminAuthorDto.class)); // Author DTO 변환
          secondhandDto
              .setPublisher(modelMapper.map(secondhand.getPublisher(), AdminPublisherDto.class)); // Publisher DTO 변환
          secondhandDto.setAttachList(
              secondhand.getAttachList().stream()
                  .map(attach -> modelMapper.map(attach, AdminSecondhandAttachDto.class))
                  .collect(Collectors.toList())
          ); // AdminAttatch DTO 변환
          return secondhandDto;
        })
        .collect(Collectors.toList());

    return Map.of(
        "secondhandList", secondhandList,
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getSecondhandSearchList(
      Pageable pageable, String search, String keyword, String page, String display, String sort
  ) {
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

    List<AdminSecondhandDto> secondhandList = secondhandMapper.selectSecondhandSearchList(map);

    return Map.of(
        "secondhandList", secondhandList,
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  @Override
  public AdminSecondhandDto getBySecondhandId(Integer secondhandId) {
    AdminSecondhand findSecondhand =
        secondhandRepository.findById(secondhandId).orElseThrow(IllegalArgumentException::new);
    return modelMapper.map(findSecondhand, AdminSecondhandDto.class);
  }

  @Override
  public AdminSecondhandDto modifyBySecondhandId(AdminSecondhandDto secondhandDto) {
    AdminSecondhand findSecondhand = secondhandRepository.findById(secondhandDto.getSecondhandId())
        .orElseThrow(IllegalArgumentException::new);
    findSecondhand.setSalesYn(secondhandDto.getSalesYn());
    return modelMapper.map(findSecondhand, AdminSecondhandDto.class);
  }

  @Override
  public void registLoginLog(HttpServletRequest request, UserDto userDto) {
    try {
      String loginBrowser = request.getHeader("user-agent");
      String ipAddr       = getClientIp(request);

      LoginLog log = new LoginLog();
      log = LoginLog
          .builder()
          .loginBrowser(loginBrowser)
          .ipAddr(ipAddr)
          .userId(userDto.getUserId())
          .build();

      loginLogRepository.save(log);
    }
    catch (Exception e) {
      e.printStackTrace();
    }
  }

  /**
   * 접속 IP 확인
   * 
   * @param  request
   * 
   * @return
   */
  public String getClientIp(HttpServletRequest request) {
    String ip = request.getHeader("X-Forwarded-For");

    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
      ip = request.getHeader("Proxy-Client-IP");
    }
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
      ip = request.getHeader("WL-Proxy-Client-IP");
    }
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
      ip = request.getHeader("HTTP_CLIENT_IP");
    }
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
      ip = request.getHeader("HTTP_X_FORWARDED_FOR");
    }
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
      ip = request.getHeader("X-Real-IP");
    }
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
      ip = request.getHeader("X-RealIP");
    }
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
      ip = request.getHeader("REMOTE_ADDR");
    }
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
      ip = request.getRemoteAddr();
    }

    InetAddress address = null;
    if (ip.equals("0:0:0:0:0:0:0:1") || ip.equals("127.0.0.1")) {
      try {
        address = InetAddress.getLocalHost();
      }
      catch (UnknownHostException e) {
        e.printStackTrace();
      }
      ip = address.getHostName() + "/" + address.getHostAddress();
    }

    return ip;
  }

  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getReviewList(Pageable pageable) {
    pageDto.setPaging(
        pageable.getPageNumber(), pageable.getPageSize(), (int) inquiryRepository.count()
    );
    pageable = pageable.withPage(pageable.getPageNumber() - 1);
    Page<AdminReview> reviewList = reviewRepository.findAll(pageable);

    // modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // STRICT 전략 // id 셋팅이 인됨

    return Map.of(
        "reviewList",
        reviewList.map(review -> modelMapper.map(review, AdminReviewDto.class)).toList(),
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getReviewSearchList(
      Pageable pageable, String search, String keyword, String page, String display, String sort
  ) {
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("search", search);
    map.put("keyword", keyword);
    map.put("page", Integer.parseInt(page));
    map.put("display", Integer.parseInt(display));
    map.put("sort", sort);

    int searchCount = reviewMapper.selectReviewSearchListCount(map);
    pageDto.setPaging(Integer.parseInt(page), Integer.parseInt(display), searchCount);

    int offset = pageDto.getOffset();
    map.put("offset", offset);

    List<AdminReviewDto> reviewList = reviewMapper.selectReviewSearchList(map);

    return Map.of(
        "reviewList", reviewList,
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  @Transactional(readOnly = true)
  @Override
  public AdminReviewDto getReviewDetail(Integer reviewId) {
    AdminReview findReview = reviewRepository.findById(reviewId)
        .orElseThrow(IllegalArgumentException::new);
    return modelMapper.map(findReview, AdminReviewDto.class);
  }

  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getOrderStatusList() {
    List<AdminOrderStatus> findOrderStatusList = orderStatusRepository.findAll();

    List<AdminOrderStatusDto> orderStatusList = findOrderStatusList.stream()
        .map(orderStatus -> modelMapper.map(orderStatus, AdminOrderStatusDto.class))
        .toList();

    return Map.of("orderStatusList", orderStatusList);
  }

  @Override
  public int getTodayOrderCount() {
    LocalDateTime    start          = LocalDate.now().atStartOfDay();
    LocalDateTime    end            = LocalDate.now().atTime(23, 59, 59);
    List<AdminOrder> todayOrderList = orderRepository.findByCreateDtBetween(start, end);
    return todayOrderList.size();
  }

  @Override
  public int getTodayReviewCount() {
    LocalDateTime     start           = LocalDate.now().atStartOfDay();
    LocalDateTime     end             = LocalDate.now().atTime(23, 59, 59);
    List<AdminReview> todayReviewList = reviewRepository.findByCreateDtBetween(start, end);
    return todayReviewList.size();
  }

  @Override
  public int getTodayQnaCount() {
    LocalDateTime  start        = LocalDate.now().atStartOfDay();
    LocalDateTime  end          = LocalDate.now().atTime(23, 59, 59);
    List<AdminQna> todayQnaList = qnaRepository.findByQnaCreateDtBetween(start, end);
    return todayQnaList.size();
  }

  @Override
  public int getNeedReplyQna() {
    List<AdminQna> needReplyQnaList = qnaRepository.findByQnaReplyYn('N');
    return needReplyQnaList.size();
  }

  @Override
  public int getTodayInquiryCount() {
    LocalDateTime      start            = LocalDate.now().atStartOfDay();
    LocalDateTime      end              = LocalDate.now().atTime(23, 59, 59);
    List<AdminInquiry> todayInquiryList = inquiryRepository.findByCreateDtBetween(start, end);
    return todayInquiryList.size();
  }

  @Override
  public int getNeedReplyInquiry() {
    List<AdminInquiry> needReplyInquiryList = inquiryRepository.findByInquiryReplyYn('N');
    return needReplyInquiryList.size();
  }

}
