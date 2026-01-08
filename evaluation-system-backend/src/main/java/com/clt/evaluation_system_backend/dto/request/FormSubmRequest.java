package com.clt.evaluation_system_backend.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class FormSubmRequest {
    private String formSubmissionId;

    private List<SubmissionValueDto> submissionValueList;

    private List<NewTargetDto> newTargetList;

    private List<CurrentTargetDto> currentTargetList;

}
