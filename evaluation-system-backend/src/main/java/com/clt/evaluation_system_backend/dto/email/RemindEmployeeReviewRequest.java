package com.clt.evaluation_system_backend.dto.email;

import lombok.Data;

import java.util.List;

@Data
public class RemindEmployeeReviewRequest {
    private String employeeName;
    private String employeeNumber;
    private Integer duaDate;
}

