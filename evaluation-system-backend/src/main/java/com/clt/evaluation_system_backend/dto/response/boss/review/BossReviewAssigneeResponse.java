package com.clt.evaluation_system_backend.dto.response.boss.review;

import lombok.Data;

@Data
public class BossReviewAssigneeResponse {
    private Long bossRevId;
    private String formSubmitId;
    private String employeeNumber;
    private String bossNumber;
    private String bossReviewRole;
    private Integer bossReviewOrder;
    private String isFinal;
    private String bossName;
    private String bossEmail;
}
