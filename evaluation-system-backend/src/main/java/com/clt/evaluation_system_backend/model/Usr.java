package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("usr")
public class Usr {

    private String usrId;
    private String usrPwd;
    private LocalDateTime creDt;
    private String delFlg;
}
