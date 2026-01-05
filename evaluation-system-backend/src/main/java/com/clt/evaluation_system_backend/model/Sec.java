package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("sec")
public class Sec {
    private String secId;
    private String secTitle;
    private String defaultRevConfCd;
    private String creUsrId;
    private String updUsrId;
    private LocalDateTime creDt;
    private LocalDateTime updDt;
    private String delFlg;
}
