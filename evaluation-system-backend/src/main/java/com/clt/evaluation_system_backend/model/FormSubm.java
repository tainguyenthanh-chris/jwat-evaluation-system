package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("form_subm")
public class FormSubm {

    private String formSubmId;
    private String formTmplId;
    private String empNm;
    private String empNo;
    private String empCurrDeptCd;
    private String empCurrLvlCd;
    private String empCurrPosCd;
    private LocalDate revDt;
    private LocalDate nextRevDt;
    private String formSubmStatus;
}

