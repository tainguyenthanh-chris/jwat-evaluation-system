package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.request.CriteriaRequest;
import com.clt.evaluation_system_backend.dto.request.EmployeeRequest;
import com.clt.evaluation_system_backend.dto.response.AdmEmployeeResponse;
import com.clt.evaluation_system_backend.dto.response.CriteriaResponse;
import com.clt.evaluation_system_backend.exception.AnyException;
import com.clt.evaluation_system_backend.mapper.CriteriaCueMapper;
import com.clt.evaluation_system_backend.mapper.CriteriaMapper;
import com.clt.evaluation_system_backend.mapper.EmpMapper;
import com.clt.evaluation_system_backend.model.Criteria;
import com.clt.evaluation_system_backend.model.CriteriaCue;
import com.clt.evaluation_system_backend.service.AdmEmpService;
import com.clt.evaluation_system_backend.service.CriteriaService;
import com.clt.evaluation_system_backend.service.SeqService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdmEmpServiceImpl implements AdmEmpService {
    private final EmpMapper empMapper;
    private final SeqService seqService;

    @Override
    public List<AdmEmployeeResponse> getForAdm() {
        List<AdmEmployeeResponse> responseList = empMapper.selectForAdm();
        for(AdmEmployeeResponse response : responseList){
            response.setReviewBy();
        }
        return responseList;
    }

    @Override
    public AdmEmployeeResponse getByNo(String employeeNo) {
        return empMapper.selectByNo(employeeNo);
    }
}