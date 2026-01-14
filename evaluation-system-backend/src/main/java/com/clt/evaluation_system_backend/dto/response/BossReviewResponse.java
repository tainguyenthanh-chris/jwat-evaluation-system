package com.clt.evaluation_system_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Objects;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BossReviewResponse extends BaseResponse {
    private String employeeNo;
    private String bossNo;
    private String bossId;
    private String bossName;
    private int bossReviewOrder;
    private String bossReviewRole;
    private String isFinal;

}
