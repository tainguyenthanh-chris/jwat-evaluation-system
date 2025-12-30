package com.clt.evaluation_system_backend.mapper;

public interface UsrSysRoleMapper {
    void insertUsrSysRole(String createBy, String status, String usrId, String sysRoleId);

    void delete(String updateBy, String usrId, String sysRoleId);

}
