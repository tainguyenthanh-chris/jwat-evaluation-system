package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("form_detail")
public class FormDetail {
    private String formDetailId;
    private String formId;
    private String secId;
    private String parentSecId;
    private Integer formDetailOrdNo;
    private String formDetailTitle;
    private String revConfCd;
    private String creUsrId;
    private String updUsrId;
    private LocalDateTime creDt;
    private LocalDateTime updDt;
    private String delFlg;
}
