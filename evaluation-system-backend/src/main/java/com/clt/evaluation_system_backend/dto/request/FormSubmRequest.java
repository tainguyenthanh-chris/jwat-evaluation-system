package com.clt.evaluation_system_backend.dto.request;

import lombok.Data;

@Data
public class FormSubmRequest {
    private String formSubmissionId;
    private Long formDetailId;
    private String role;
    private String value;

}
