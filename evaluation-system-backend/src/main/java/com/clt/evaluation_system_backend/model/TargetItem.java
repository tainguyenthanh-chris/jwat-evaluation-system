package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("target_item")
public class TargetItem {

    private String targetItemId;
    private String formSubmId;
    private String secTmplId;
    private Integer targetOrdNo;
    private String targetItemCnt;
    private String targetItemStatus;

    private String creUsrId;
    private LocalDateTime creDt;

    private String revUsrId;
    private LocalDateTime revDt;

    private String delFlg;
}
