package com.clt.evaluation_system_backend.dto.response.section;

import java.util.List;

import lombok.Data;

@Data
public class SecResponse {
    private String sectionId;
    private String sectionTitle;
    private String defaultReviewConfigCode;
    private String reviewConfigType;
    private List<SecCue> cueList;

    @Data
    public static class SecCue {
        private String cueCd;
    }
}
