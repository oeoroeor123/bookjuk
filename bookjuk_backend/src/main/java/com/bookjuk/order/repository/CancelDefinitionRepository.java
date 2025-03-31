package com.bookjuk.order.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.bookjuk.order.domain.CancelDefinition;
import com.bookjuk.order.dto.CancelDefinitionDto;

@Repository
public interface CancelDefinitionRepository extends JpaRepository<CancelDefinition, Integer> {


  @Query("SELECT new com.bookjuk.order.dto.CancelDefinitionDto(c.cancelDefinitionId, c.cancelReasonDefinition) FROM cancelDefinition c")
  List<CancelDefinitionDto> findAllCancelDefinitionDtos();

  
}