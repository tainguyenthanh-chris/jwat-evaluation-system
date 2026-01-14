package com.clt.evaluation_system_backend.dto.request;

import lombok.Data;

@Data
public class LogoutRequestDto {
    private String token;
    private String refreshToken;
}
