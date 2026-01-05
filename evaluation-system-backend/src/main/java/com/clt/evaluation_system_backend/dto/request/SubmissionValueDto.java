package com.clt.evaluation_system_backend.dto.request;

import lombok.Data;

@Data
public class SubmissionValueDto {
    private Long formDetailId;

    private String submissionRole;

    private String formSubmissionValue;

}
