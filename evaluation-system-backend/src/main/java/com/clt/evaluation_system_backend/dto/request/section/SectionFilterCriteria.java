package com.clt.evaluation_system_backend.dto.request.section;

import lombok.Data;

@Data
public class SectionFilterCriteria {
    private String search;
    private String deptCd;
    private String posCd;
}
