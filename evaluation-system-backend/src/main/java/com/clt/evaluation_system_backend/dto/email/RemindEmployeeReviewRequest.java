package com.clt.evaluation_system_backend.dto.email;

import lombok.Data;

@Data
public class RemindEmployeeReviewRequest {
    private String employeeName;
    private String employeeNumber;
    private String employeeEmail;
    private String dueDate;
}
