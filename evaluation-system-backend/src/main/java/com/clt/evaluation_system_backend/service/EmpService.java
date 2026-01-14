package com.clt.evaluation_system_backend.service;

import java.util.List;

import com.clt.evaluation_system_backend.dto.response.AdmEmployeeResponse;
import com.clt.evaluation_system_backend.model.Emp;

public interface EmpService {
    List<Emp> getEmpListByCurrentBoss();

    List<Emp> getAllEmps();

    AdmEmployeeResponse getByNo(String employeeNo);
}
