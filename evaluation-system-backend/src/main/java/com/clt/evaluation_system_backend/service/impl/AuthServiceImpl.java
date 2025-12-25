package com.clt.evaluation_system_backend.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clt.evaluation_system_backend.config.JwtService;
import com.clt.evaluation_system_backend.dto.request.LoginRequest;
import com.clt.evaluation_system_backend.dto.request.RegisterRequest;
import com.clt.evaluation_system_backend.dto.response.LoginResponse;
import com.clt.evaluation_system_backend.mapper.UsrMapper;
import com.clt.evaluation_system_backend.model.Usr;
import com.clt.evaluation_system_backend.service.AuthService;
import com.clt.evaluation_system_backend.service.SeqService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UsrMapper usrMapper;
    private final PasswordEncoder passwordEncoder;
    private final SeqService seqService;
    private final JwtService jwtService;

    @Override
    public void register(RegisterRequest request) {
        if (usrMapper.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        String newId = seqService.generateNewId(Usr.class);

        Usr usr = Usr.builder()
                .usrId(newId)
                .usrPwd(passwordEncoder.encode(request.getPassword()))
                .usrEmail(request.getEmail())
                .creUsrId("system")
                .updUsrId("system")
                .delFlg("F")
                .build();

        usrMapper.insert(usr);
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        String token = jwtService.loginHandle(request.getEmail(), request.getPassword());
        if (token == null) {
            throw new RuntimeException("Invalid email or password");
        }
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        return response;
    }

}
