package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("criteria")
public class Criteria {

    private String criteriaId;
    private String criteriaCnt;
    private String secId;
    private String creUsrId;
    private LocalDateTime creDt;
    private String updUsrId;
    private LocalDateTime updDt;
    private String delFlg;

    public Criteria(String criteriaId, String criteriaCnt, String secId) {
        this.criteriaId = criteriaId;
        this.criteriaCnt = criteriaCnt;
        this.secId = secId;
    }
}
