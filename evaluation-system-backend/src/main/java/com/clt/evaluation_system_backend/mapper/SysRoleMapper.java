package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.model.SysRole;

public interface SysRoleMapper {
    SysRole findByCode(String roleCode);
}
