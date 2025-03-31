package com.bookjuk.admin.domain;

import java.time.LocalDateTime;
import java.util.List;
import org.apache.commons.lang3.builder.ToStringExclude;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
@Entity(name = "AdminSecondhand")
@Table(name = "tbl_secondhand")
public class AdminSecondhand {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "secondhand_id")
  private Integer secondhandId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = true, table = "tbl_secondhand") // nullable = true : user_id 가 없어도 조회 되게
  @ToStringExclude
  private AdminUser user;

  @ManyToOne(fetch = FetchType.EAGER)
  @ToStringExclude
  @JoinColumn(name = "genre_id", nullable = true, table = "tbl_secondhand")
  private AdminGenre genre;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "publisher_id", nullable = true, table = "tbl_secondhand")
  @ToStringExclude
  private Publisher publisher;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "author_id", nullable = true, table = "tbl_secondhand")
  @ToStringExclude
  private Author author;

  @Column(name = "secondhand_name")
  private String secondhandName;

  @Column(name = "secondhand_image")
  private String secondhandImage;

  @Column(name = "secondhand_description")
  private String secondhandDescription;

  @Column(name = "secondhand_price")
  private Integer secondhandPrice;

  @Column(name = "secondhand_date")
  private LocalDateTime secondhandDate;

  @Column(name = "create_dt")
  private LocalDateTime createDt;

  @Column(name = "sales_yn")
  private Character salesYn;

  @OneToMany(mappedBy = "secondhandId", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<AdminSecondhandAttach> attachList;

}
