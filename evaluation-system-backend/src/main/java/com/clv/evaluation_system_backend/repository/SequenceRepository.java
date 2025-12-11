package com.clv.evaluation_system_backend.repository;

import com.clv.evaluation_system_backend.model.Department;
import com.clv.evaluation_system_backend.model.Sequence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SequenceRepository extends JpaRepository<Sequence, String> {
    Optional<Sequence> findByTableName(String tableName);
}
