package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("form_tmpl")
public class FormTmpl {
    private String formTmplId;
    private String formTmplTitle;
    private Integer formTmplVer;
    private String deptCd;
    private String posCd;
    private String lvlCd;
    private String formTmplStatus;
}
