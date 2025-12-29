package com.clt.evaluation_system_backend.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clt.evaluation_system_backend.config.JwtService;
import com.clt.evaluation_system_backend.dto.request.LoginRequest;
import com.clt.evaluation_system_backend.dto.request.RegisterRequest;
import com.clt.evaluation_system_backend.dto.response.LoginResponse;
import com.clt.evaluation_system_backend.model.SysRole;
import com.clt.evaluation_system_backend.model.Usr;
import com.clt.evaluation_system_backend.service.AuthService;
import com.clt.evaluation_system_backend.service.SeqService;
import com.clt.evaluation_system_backend.service.SysRoleService;
import com.clt.evaluation_system_backend.service.UsrService;
import com.clt.evaluation_system_backend.service.UsrSysRoleService;
import com.clt.evaluation_system_backend.util.CommonMethods;
import com.clt.evaluation_system_backend.util.SystemRoleEnum;
import com.clt.evaluation_system_backend.util.UsrSysRoleStatusEnum;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UsrService usrService;
    private final PasswordEncoder passwordEncoder;
    private final SeqService seqService;
    private final JwtService jwtService;
    private final SysRoleService sysRoleService;
    private final UsrSysRoleService usrSysRoleService;

    @Override
    public void register(RegisterRequest request) {
        if (usrService.existsByEmail(request.getEmail())) {
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

        usrService.insert(usr);

        SysRole defaultRole = sysRoleService.getRoleByCode(SystemRoleEnum.USER.getCode());
        if (defaultRole == null) {
            throw new RuntimeException("Default role not found");
        }
        usrSysRoleService.insertUsrSysRole(CommonMethods.getCurrentUsrId(), UsrSysRoleStatusEnum.ACTIVE.getCode(),
                newId,
                defaultRole.getSysRoleId());
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
