package com.bookjuk.order.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Entity(name = "orderDeliveryAddress")
@Table(name = "tbl_delivery_address")
public class DeliAddr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "addr_id")
    private Integer addrId;

    // 회원과 다대일 관계
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "road_address")
    private String roadAddress;

    @Column(name = "jibun_address")
    private String jibunAddress;
    
    @Column(name = "detail_address")
    private String detailAddress;
    
    @Column(name = "extra_address")
    private String extraAddress;

    @Column(name = "postcode")
    private String postcode;

    @Column(name = "addr_name")
    private String addrName;

    @Column(name = "receiver_phone")
    private String receiverPhone;

    @Column(name = "primary_addr")
    private Boolean primaryAddr;
    
    @Column(name = "delivery_request")
    private String deliveryRequest;
}