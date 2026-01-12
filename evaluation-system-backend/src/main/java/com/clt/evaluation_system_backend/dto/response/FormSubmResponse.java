package com.clt.evaluation_system_backend.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.clt.evaluation_system_backend.model.Target;

import lombok.Data;

@Data
public class FormSubmResponse {
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

    private List<Target> targets;
}
