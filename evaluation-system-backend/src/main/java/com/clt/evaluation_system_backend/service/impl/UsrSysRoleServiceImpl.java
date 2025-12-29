package com.clt.evaluation_system_backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clt.evaluation_system_backend.mapper.UsrSysRoleMapper;
import com.clt.evaluation_system_backend.service.SysRoleService;
import com.clt.evaluation_system_backend.service.UsrService;
import com.clt.evaluation_system_backend.service.UsrSysRoleService;

@Service
public class UsrSysRoleServiceImpl implements UsrSysRoleService {

    @Autowired
    UsrSysRoleMapper usrSysRoleMapper;

    @Autowired
    SysRoleService sysRoleService;

    @Autowired
    UsrService usrService;

    @Override
    public void insertUsrSysRole(String createBy, String status, String usrId, String sysRoleId) {

        try {
            usrSysRoleMapper.insertUsrSysRole(createBy, status, usrId, sysRoleId);
        } catch (Exception e) {
            System.out.println("Error inserting UsrSysRole: " + e.getMessage());
        }
    }

    @Override
    public void delete(String updateBy, String usrId, String sysRoleId) {
        usrSysRoleMapper.delete(updateBy, usrId, sysRoleId);
    }

}
