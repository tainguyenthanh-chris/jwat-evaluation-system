package com.clt.evaluation_system_backend.dto.request;

import lombok.Data;

@Data
public class NewTargetDto {
    private Long formDetailId;

    private Integer targetOrderNo;

    private String targetContent;
}
