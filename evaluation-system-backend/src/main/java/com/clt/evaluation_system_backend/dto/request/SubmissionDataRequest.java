package com.clt.evaluation_system_backend.dto.request;

import lombok.Data;

@Data
public class SubmissionDataRequest {
    private String formSubmissionId;
    private String employeeNo;
    private String mode; // REVIEW or HISTORY
}
