package com.clt.evaluation_system_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BossRev {
    private Long bossRevId;

    private String formSubmId;
    private String empNo;
    private String bossNo;
    private String bossRevRole;
    private Integer bossRevOrdNo;
    private String isFinal;

    private String creUsrId;
    private LocalDateTime creDt;
    private String updUsrId;
    private LocalDateTime updDt;
    private String delFlg;
    private Emp bossEmp;
}
