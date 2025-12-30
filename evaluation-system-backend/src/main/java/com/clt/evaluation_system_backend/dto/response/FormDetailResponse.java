package com.clt.evaluation_system_backend.dto.response;

import lombok.Data;

@Data
public class FormDetailResponse {
    private String formDetailId;
    private String formId;
    private String sectionId;
    private String parentSectionId;
    private Integer formDetailOrderNo;
    private String formDetailTitle;
    private String reviewConfigCode;
    private String reviewConfigType;
    private String reviewConfigRoleJson;

    private String departmentCode;
    private String positionCode;
    private String levelCode;

}
