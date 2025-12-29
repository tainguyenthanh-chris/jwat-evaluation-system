package com.clt.evaluation_system_backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clt.evaluation_system_backend.mapper.SysRoleMapper;
import com.clt.evaluation_system_backend.model.SysRole;
import com.clt.evaluation_system_backend.service.SysRoleService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SysRoleImpl implements SysRoleService {
    @Autowired
    private SysRoleMapper sysRoleMapper;

    @Override
    public SysRole getRoleByCode(String roleCode) {

        SysRole role = sysRoleMapper.findByCode(roleCode);

        if (role == null) {
            throw new IllegalArgumentException("Role not found with code: " + roleCode);
        }
        return role;
    }

}
