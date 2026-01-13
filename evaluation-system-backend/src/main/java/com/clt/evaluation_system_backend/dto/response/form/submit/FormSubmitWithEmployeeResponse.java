package com.clt.evaluation_system_backend.dto.response.form.submit;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FormSubmitWithEmployeeResponse {
    private String formSubmitId;
    private String formId;
    private String employeeId;
    private String employeeName;
    private String employeeNumber;
    private String employeeEmail;
    private LocalDate reviewDate;
    private LocalDate nextReviewDate;
    private String formSubmitStatus;
}
