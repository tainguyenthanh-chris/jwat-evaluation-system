package com.clt.evaluation_system_backend.service.impl;

import java.util.List;

import com.clt.evaluation_system_backend.dto.response.AdmEmployeeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clt.evaluation_system_backend.mapper.EmpMapper;
import com.clt.evaluation_system_backend.mapper.UsrMapper;
import com.clt.evaluation_system_backend.model.Emp;
import com.clt.evaluation_system_backend.service.EmpService;

@Service
public class EmpServiceImpl implements EmpService {

    @Autowired
    private UsrMapper usrMapper;

    @Autowired
    private EmpMapper empMapper;

    @Override
    public List<Emp> getEmpListByCurrentBoss() {
        // String usrId = CommonMethods.getCurrentUsrId();
        // Usr currentUsr = usrMapper.findById(usrId);
        // if (currentUsr == null) {
        // throw new RuntimeException("User not found: " + usrId);
        // }
        // Emp executor = empMapper.findByEmail(currentUsr.getUsrEmail());
        // if (executor == null) {
        // throw new RuntimeException("Employee not found for user: " + usrId);
        // }
        List<Emp> empList = empMapper.findEmpByBossNo("41001");
        return empList;
    }

    @Override
    public List<Emp> getAllEmps() {
        List<Emp> empList = empMapper.findAll();
        return empList;
    }

    @Override
    public AdmEmployeeResponse getByNo(String employeeNo) {
        return empMapper.selectByNo(employeeNo);
    }


}
