package com.clt.evaluation_system_backend.dto.email;

import lombok.Data;

import java.util.List;

@Data
public class BossEmailData {
    private String managerName;
    private String managerNumber;
    private Integer totalEmployees;
    private List<EmployeeReviewData> employees;

    @Data
    public static class EmployeeReviewData {
        private String employeeName;
        private String employeeNumber;
        private String employeeEmail;
        private String reviewDate;
    }
}

