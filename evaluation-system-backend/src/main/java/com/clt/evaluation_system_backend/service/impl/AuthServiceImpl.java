package com.clt.evaluation_system_backend.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clt.evaluation_system_backend.config.JwtService;
import com.clt.evaluation_system_backend.dto.request.LoginRequest;
import com.clt.evaluation_system_backend.dto.request.RegisterRequest;
import com.clt.evaluation_system_backend.dto.response.LoginResponse;
import com.clt.evaluation_system_backend.mapper.BossRevMapper;
import com.clt.evaluation_system_backend.mapper.EmpMapper;
import com.clt.evaluation_system_backend.model.Emp;
import com.clt.evaluation_system_backend.model.RefreshToken;
import com.clt.evaluation_system_backend.model.SysRole;
import com.clt.evaluation_system_backend.model.Usr;
import com.clt.evaluation_system_backend.service.AuthService;
import com.clt.evaluation_system_backend.service.SeqService;
import com.clt.evaluation_system_backend.service.SysRoleService;
import com.clt.evaluation_system_backend.service.UsrService;
import com.clt.evaluation_system_backend.service.UsrSysRoleService;
import com.clt.evaluation_system_backend.util.CommonMethods;
import com.clt.evaluation_system_backend.util.Constant;
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
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenServiceImpl refreshTokenService;
    private final BossRevMapper bossRevMapper;
    private final EmpMapper empMapper;

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
        String email = request.getEmail();
        String rawPassword = request.getPassword();
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, rawPassword);
        Authentication authentication = authenticationManager.authenticate(authToken);
        if (authentication == null) {
            throw new RuntimeException("Authentication failed for user: " + email);
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User userDetails = (User) authentication.getPrincipal();
        Usr usr = usrService.findByEmail(email);

        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());

        List<String> permissions = new ArrayList<>();

        Emp emp = empMapper.findByEmail(email);

        if (emp != null && bossRevMapper.findBossRev(emp.getEmpNo()) != null) {
            roles.add("ROLE_MANAGER");
        }

        if (roles.contains("ROLE_ADMIN")) {
            permissions = Arrays.asList(Constant.ADMIN_PERMISSION);
        } else if (roles.contains("ROLE_MANAGER")) {
            permissions = Arrays.asList(Constant.MANAGER_PERMISSION);
        } else {
            permissions = Arrays.asList(Constant.MANUAL_USER_PERMISSION);
        }

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getUsername());

        String token = jwtService.generateToken(usr);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(token);
        loginResponse.setRefreshToken(refreshToken.getToken());
        loginResponse.setEmail(userDetails.getUsername());
        loginResponse.setRoles(roles);
        loginResponse.setPermissions(permissions);

        return loginResponse;
    }

}
