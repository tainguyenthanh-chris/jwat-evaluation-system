package com.clt.evaluation_system_backend.dto.filter;

import lombok.Data;

@Data
public class TargetFilter {
    private String employeeNo;
    private String formSubmissionId;
    private String queryType; // REVIEW or HISTORY
}
