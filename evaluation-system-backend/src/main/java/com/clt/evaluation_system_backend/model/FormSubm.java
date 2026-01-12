package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("form_subm")
public class FormSubm {

    private String formSubmId;
    private String formId;

    private String empId;
    private String empNm;
    private String empNo;

    private String empCurrDeptCd;
    private String empCurrPosCd;
    private String empCurrLvlCd;

    private LocalDate revDt;
    private LocalDate nextRevDt;

    private String formSubmStatus;

    private String creUsrId;
    private LocalDateTime creDt;

    private String updUsrId;
    private LocalDateTime updDt;

    private String delFlg;

    private Form form;
    private List<BossRev> bossRevList;
}
