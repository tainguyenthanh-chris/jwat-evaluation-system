package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("dept")
public class Dept {

    private String deptId;
    private String deptNm;
    private String deptCd;
    private String directorId;

    private String creUsrId;
    private LocalDateTime creDt;
    private String updUsrId;
    private LocalDateTime updDt;
    private String delFlg;
    private List<Pos> posList;
}
