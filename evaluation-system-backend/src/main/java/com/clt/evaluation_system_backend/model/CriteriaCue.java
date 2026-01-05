package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriteriaCue {
    private String criteriaCueId;
    private String criteriaId;
    private String cueCd;

    public CriteriaCue(String criteriaId, String cueCd) {
        this.criteriaId = criteriaId;
        this.cueCd = cueCd;
    }
}
