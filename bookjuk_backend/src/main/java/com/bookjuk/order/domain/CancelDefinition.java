package com.bookjuk.order.domain;

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
@Entity(name = "cancelDefinition")
@Table(name = "tbl_cancel_definition")
public class CancelDefinition {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "cancel_definition_id", updatable = false)
  private Integer cancelDefinitionId;

  @Column(name = "cancel_reason_definition", updatable = false)
  private String cancelReasonDefinition;

}
