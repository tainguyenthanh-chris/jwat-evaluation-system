package com.clv.evaluation_system_backend.repository;

import com.clv.evaluation_system_backend.model.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionRepository extends JpaRepository<Position, String> {

}
