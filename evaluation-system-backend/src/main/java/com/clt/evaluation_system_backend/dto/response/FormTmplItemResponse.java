package com.clt.evaluation_system_backend.dto.response;

import lombok.Data;

@Data
public class FormTmplItemResponse {
    private String formId;
    private String formTitle;
    private String departmentCode;
    private String positionCode;
    private String levelCode;
    private String sectionId;
    private String sectionTitle;
    private Integer sectionOrderNo;
    private String criteriaId;
    private String criteriaContent;
    private Integer criteriaOrderNo;
    private String type;
    private String roles;


}
