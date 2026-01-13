package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.request.CriteriaRequest;
import com.clt.evaluation_system_backend.dto.request.EmployeeRequest;
import com.clt.evaluation_system_backend.dto.response.AdmEmployeeResponse;
import com.clt.evaluation_system_backend.dto.response.CriteriaResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AdmEmpService {
    List<AdmEmployeeResponse> getForAdm();
    AdmEmployeeResponse getByNo(String employeeNo);
}
