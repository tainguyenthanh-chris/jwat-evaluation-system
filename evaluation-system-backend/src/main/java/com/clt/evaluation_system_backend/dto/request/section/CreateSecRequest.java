package com.clt.evaluation_system_backend.dto.request.section;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateSecRequest {
    @Size(max = 100, message = "Section title must be <= 100 characters")
    private String sectionTitle;
    @Size(max = 30, message = "Section code must be <= 30 characters")
    private String defaultReviewConfigCode;
    private String departmentCode;
    private String positionCode;
}
