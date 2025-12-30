package com.clt.evaluation_system_backend.service;

public interface UsrSysRoleService {
    void insertUsrSysRole(String createBy, String status, String usrId, String sysRoleId);

    void delete(String updateBy, String usrId, String sysRoleId);
}
