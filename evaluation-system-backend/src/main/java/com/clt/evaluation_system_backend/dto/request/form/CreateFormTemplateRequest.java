package com.clt.evaluation_system_backend.dto.request.form;

import lombok.Data;
import java.util.List;

@Data
public class CreateFormTemplateRequest {
    private String formTitle;
    private String departmentCode;
    private String positionCode;
    private String levelCode;
    private List<SectionDto> sectionList;

    @Data
    public static class SectionDto {
        private String sectionId;
        private String sectionTitle;
        private String reviewConfigType;
        private String defaultReviewConfigCode;
        private List<CriteriaDto> criteriaList;
    }

    @Data
    public static class CriteriaDto {
        private String criteriaId;
        private String criteriaTitle;
        private String sectionId;
    }
}
