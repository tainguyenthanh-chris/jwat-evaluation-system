package com.clt.evaluation_system_backend.model;

import java.time.LocalDateTime;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("form")
public class Form {
    private String formId;
    private String formTitle;
    private Integer formVer;
    private String deptCd;
    private String posCd;
    private String lvlCd;
    private String formStatus;
    private String creUsrId;
    private LocalDateTime creDt;
    private String updUsrId;
    private LocalDateTime updDt;
    private String delFlg;
}
