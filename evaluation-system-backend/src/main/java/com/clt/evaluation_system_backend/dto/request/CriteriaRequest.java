package com.clt.evaluation_system_backend.dto.request;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CriteriaRequest {
    private String criteriaId;
    private String criteriaContent;
    private String sectionId;
    private List<String> cueCodeList = new ArrayList<>();

}
