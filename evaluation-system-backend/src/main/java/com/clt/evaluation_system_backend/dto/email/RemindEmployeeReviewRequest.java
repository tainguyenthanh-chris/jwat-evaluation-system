package com.clt.evaluation_system_backend.dto.email;

import lombok.Data;

@Data
public class RemindEmployeeReviewRequest {
    private String employeeNo;
    private String dueDate;
}
