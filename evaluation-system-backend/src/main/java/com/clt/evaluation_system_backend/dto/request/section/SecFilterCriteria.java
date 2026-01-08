package com.clt.evaluation_system_backend.dto.request.section;

import lombok.Data;

@Data
public class SecFilterCriteria {
    private String search;
    private String departmentCode;
    private String positionCode;
}
