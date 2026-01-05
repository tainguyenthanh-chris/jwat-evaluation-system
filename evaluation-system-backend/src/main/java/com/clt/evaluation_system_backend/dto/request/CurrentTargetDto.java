package com.clt.evaluation_system_backend.dto.request;

import lombok.Data;

@Data
public class CurrentTargetDto {
    private Long targetId;

    private String formDetailId;

    private Integer targetOrderNo;

    private String targetContent;

    private String targetStatus;
}
