package com.clt.evaluation_system_backend.dto.response.section;

import java.util.List;

import lombok.Data;

@Data
public class SecResponse {
    private String secId;
    private String secTitle;
    private String defaultRevConfCd;
    private String revConfType;
    private List<SecCue> cueList;

    @Data
    public static class SecCue {
        private String cueCd;
    }
}
