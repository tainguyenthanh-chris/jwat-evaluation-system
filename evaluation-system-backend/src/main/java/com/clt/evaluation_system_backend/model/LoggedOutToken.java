package com.clt.evaluation_system_backend.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoggedOutToken {
    private String tokenId;
    private java.util.Date expiryDate;
    private String creUsrId;
    private java.time.LocalDateTime creDt;
    private String updUsrId;
    private java.time.LocalDateTime updDt;
    private String delFlg;
}
