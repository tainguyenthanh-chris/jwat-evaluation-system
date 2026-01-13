package com.clt.evaluation_system_backend.model;

import java.time.Instant;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RefreshToken {
    private long refreshTokenId;
    private String token;
    private Instant expiryDate;
    private String userId;

    private String createBy;
    private LocalDateTime createDate;
    private String updateBy;
    private LocalDateTime updateDate;
    private String deleteFlag;
}
