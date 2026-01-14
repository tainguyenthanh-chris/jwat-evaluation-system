package com.clt.evaluation_system_backend.model;

import java.time.LocalDateTime;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("emp")
public class Emp {
    private String empId;
    private String empNm;
    private String empNo;
    private String empEmail;

    private String compRoleCd;
    private String deptCd;
    private String posCd;
    private String lvlCd;
    private Double salaryLvl;
    private String teamId;
    private String empStatusCd;

    private LocalDateTime last_rev_dt;
    private LocalDateTime next_rev_dt;

    private String creUsrId;
    private LocalDateTime creDt;
    private String updUsrId;
    private LocalDateTime updDt;
    private String delFlg;
    private FormSubm formSubm;
}
