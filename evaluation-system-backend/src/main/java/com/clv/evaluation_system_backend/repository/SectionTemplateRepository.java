package com.clv.evaluation_system_backend.repository;

import com.clv.evaluation_system_backend.model.SectionTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionTemplateRepository extends JpaRepository<SectionTemplate, String> {

}
