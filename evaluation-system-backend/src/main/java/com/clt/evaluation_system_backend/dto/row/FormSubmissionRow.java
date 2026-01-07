package com.clt.evaluation_system_backend.dto.row;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FormSubmissionRow {
    private String formSubmissionId;
    private String formId;
    private String employeeNo;
    private String employeeName;
    private String currentDepartmentCode;
    private String currentPositionCode;
    private String currentLevelCode;
    private LocalDate reviewDate;
    private LocalDate nextReviewDate;
    private String submissionStatus;
    private String bossNo;
    private String bossName;
    private String bossReviewOrder;

}
