package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.request.LoginRequest;
import com.clt.evaluation_system_backend.dto.request.RegisterRequest;
import com.clt.evaluation_system_backend.dto.response.LoginResponse;

public interface AuthService {
    void register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

}
