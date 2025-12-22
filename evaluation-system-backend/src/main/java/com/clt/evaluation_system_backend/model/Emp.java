package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
    private Double salary;
    private String teamId;
    private String empStatusCd;

    private String delFlg;
}
