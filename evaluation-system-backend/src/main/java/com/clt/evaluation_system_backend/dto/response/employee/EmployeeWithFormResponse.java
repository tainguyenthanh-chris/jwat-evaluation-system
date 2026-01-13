package com.clt.evaluation_system_backend.dto.response.employee;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeWithFormResponse {
    private String employeeId;
    private String employeeNumber;
    private String employeeName;
    private String employeeEmail;
    private String departmentCode;
    private String positionCode;
    private String levelCode;
    private LocalDate nextReviewDate;
    private Double salaryLevel;
    private String formId;
}
