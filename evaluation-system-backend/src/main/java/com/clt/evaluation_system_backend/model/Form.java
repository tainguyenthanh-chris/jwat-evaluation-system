package com.clt.evaluation_system_backend.model;

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
    private String updUsrId;
    private LocalDateTime creDt;
    private LocalDateTime updDt;
    private String delFlg;
}
