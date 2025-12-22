package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("sec_item_tmpl")
public class SecItemTmpl {

    private String secItemTmplId;
    private String secTmplId;
    private String secItemTmplCnt;

    private String creUsrId;
    private LocalDateTime creDt;
    private String updUsrId;
    private LocalDateTime updDt;
    private String delFlg;
}
