package com.bookjuk.admin.domain;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Entity(name = "adminOrder")
@Table(name = "tbl_order")
public class AdminOrder {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "order_id")
  private Integer orderId;

  @Column(name = "user_id")
  private Integer userId;

  @Column(name = "addr_id")
  private Integer addrId;

  @Column(name = "total_price")
  private Integer totalPrice;

  @CreationTimestamp
  @Column(name = "create_dt", updatable = false)
  private LocalDateTime createDt;

  @UpdateTimestamp
  @Column(name = "modify_dt")
  private LocalDateTime modifyDt;

}
