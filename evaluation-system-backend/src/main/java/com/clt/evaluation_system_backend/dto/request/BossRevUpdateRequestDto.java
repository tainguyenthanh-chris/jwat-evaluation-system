package com.clt.evaluation_system_backend.dto.request;

import java.util.List;

import lombok.Data;

@Data
public class BossRevUpdateRequestDto {
    private String empNo;
    private String formSubmId;
    private List<BossRevDto> bossRevs;
}
