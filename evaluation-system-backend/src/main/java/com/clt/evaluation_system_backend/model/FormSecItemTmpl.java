package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("form_sec_item_tmpl")
public class FormSecItemTmpl {

    private String formSecItemTmplId;
    private String formTmplId;
    private String secTmplId;
    private Integer secOrdNo;
    private String secItemTmplId;
    private Integer secItemOrdNo;

    private String creUsrId;
    private LocalDateTime creDt;
    private String updUsrId;
    private LocalDateTime updDt;
    private String delFlg;
}
