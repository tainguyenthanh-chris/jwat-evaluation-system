package com.clt.evaluation_system_backend.dto.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FormSubmissionDetailResponse {
    private String formSubmissionId;
    private String employeeName;
    private String employeeNo;
    private String employeeCurrentDepartmentCode;
    private String employeeCurrentPositionCode;
    private String employeeCurrentLevelCode;
    private LocalDate reviewDate;
    private LocalDate nextReviewDate;
    private String submissionStatus;
    private String departmentCode;
    private String positionCode;
    private String levelCode;
    private String formDetailId;
    private String formId;
    private String parentId;
    private String formDetailOrderNo;
    private String formDetailTitle;
    private String reviewConfigCode;
    private String reviewConfigType;
    private String reviewConfigRoleJson;
    private String svalueFormDetailId;
    private String submissionRole;
    private String submissionValue;






}
