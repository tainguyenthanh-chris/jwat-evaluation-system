package com.clt.evaluation_system_backend.dto.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TargetResponse {

    private Long targetId;

    private String formSubmId;
    private Long formDetailId;

    private Integer targetOrdNo;
    private String targetCnt;

    private String targetStatus;

    private String revUsrId;
    private LocalDateTime revDt;

    private String creUsrId;
    private LocalDateTime creDt;

    private String updUsrId;
    private LocalDateTime updDt;

    private String delFlg;
}
