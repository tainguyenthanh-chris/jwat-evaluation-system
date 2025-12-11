package com.clv.evaluation_system_backend.repository;

import com.clv.evaluation_system_backend.model.SectionItemTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionItemTemplateRepository extends JpaRepository<SectionItemTemplate, String> {

}
