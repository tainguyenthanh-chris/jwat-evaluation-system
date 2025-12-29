package com.clt.evaluation_system_backend.dto.response;

import lombok.Data;

import java.time.LocalDate;
import java.util.*;

@Data
public class FormDataResponse {
    private String formSubmissionId;
    private String employeeName;
    private String employeeCode;
    private String employeeCurrentDepartmentCode;
    private String employeeCurrentPositionCode;
    private String employeeCurrentLevelCode;
    private LocalDate reviewDate;
    private LocalDate nextReviewDate;
    private String submissionStatus;
    private List<FormTmplResponse> formDataDetailList = new ArrayList<>();

    public void addFormDataDetail(FormSubmissionDetailResponse list) {

    }



}
