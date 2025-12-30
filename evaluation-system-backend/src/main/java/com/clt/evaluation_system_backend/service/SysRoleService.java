package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.model.SysRole;

public interface SysRoleService {
    SysRole getRoleByCode(String roleCode);
}
