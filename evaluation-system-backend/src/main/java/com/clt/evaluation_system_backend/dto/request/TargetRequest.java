package com.clt.evaluation_system_backend.dto.request;

import lombok.Data;

@Data
public class TargetRequest {
    private String employeeNo;
    private String formSubmissionId;
    private String queryType; // REVIEW or HISTORY
}
