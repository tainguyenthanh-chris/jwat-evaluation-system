package com.clv.evaluation_system_backend.repository;

import com.clv.evaluation_system_backend.model.TargetItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TargetItemRepository extends JpaRepository<TargetItem, String> {

}
