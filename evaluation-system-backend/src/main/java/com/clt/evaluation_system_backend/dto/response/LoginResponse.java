package com.clt.evaluation_system_backend.dto.response;

import java.util.List;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String refreshToken;
    private String type = "Bearer";
    private String email;
    private List<String> roles;
    private List<String> permissions;
    private String username;
}
