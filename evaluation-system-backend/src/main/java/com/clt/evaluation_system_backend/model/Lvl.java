package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("lvl")
public class Lvl {
    private String lvlId;
    private String lvlNm;
    private String lvlCd;
    private String lvlDesc;

    private String creUsrId;
    private LocalDateTime creDt;
    private String updUsrId;
    private LocalDateTime updDt;
    private String delFlg;

    public Lvl(String lvlId, String lvlNm, String lvlCd, String lvlDesc, String creUsrId) {
        this.lvlId = lvlId;
        this.lvlNm = lvlNm;
        this.lvlCd = lvlCd;
        this.lvlDesc = lvlDesc;
        this.creUsrId = creUsrId;
    }
}
