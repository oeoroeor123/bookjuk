package com.bookjuk.faq.domain;

import java.time.LocalDateTime;

import com.bookjuk.user.domain.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
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

@Entity(name = "faq")
@Table(name = "tbl_faq")
public class Faq {

  @Id
  @Column(name = "faq_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer faqId;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;  
  
  @Column(name = "faq_title")
  private String faqTitle;
  
  @Column(name = "faq_content")
  private String faqContent;
  
  @Column(name = "faq_create_dt")
  private LocalDateTime faqCreateDt;
  
  @Column(name = "faq_update_dt")
  private LocalDateTime faqUpdateDt;
  
  @PrePersist                               //엔티티가 persist 되기 전에 createDt 값을 자동으로 설정
  public void prePersist() {
    if (faqCreateDt == null) 
      faqCreateDt = LocalDateTime.now();
    if (faqUpdateDt == null)  
      faqUpdateDt = LocalDateTime.now();    
  }

}
