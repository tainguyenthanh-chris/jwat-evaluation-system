package com.clt.evaluation_system_backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clt.evaluation_system_backend.dto.request.DeptCreateRequest;
import com.clt.evaluation_system_backend.dto.request.DeptSearchRequest;
import com.clt.evaluation_system_backend.dto.request.DeptUpdateRequest;
import com.clt.evaluation_system_backend.dto.response.DeptResponse;
import com.clt.evaluation_system_backend.mapper.DeptMapper;
import com.clt.evaluation_system_backend.model.Dept;
import com.clt.evaluation_system_backend.service.DeptService;
import com.clt.evaluation_system_backend.service.SeqService;
import com.clt.evaluation_system_backend.util.CommonMethods;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeptServiceImpl implements DeptService {

    private final DeptMapper deptMapper;
    private final SeqService seqService;

    @Override
    public void create(DeptCreateRequest req) {
        try {
            String newId = seqService.generateNewId(Dept.class);

            Dept dept = new Dept();
            dept.setDeptId(newId);
            dept.setDeptNm(req.getDeptNm());
            dept.setDeptCd(req.getDeptCd());
            dept.setDirectorId(req.getDirectorId());
            dept.setCreUsrId(CommonMethods.getCurrentUsrId());
            dept.setUpdUsrId(CommonMethods.getCurrentUsrId());

            deptMapper.insert(dept);
        } catch (Exception e) {
            throw new RuntimeException("Insert department failed");
        }
    }

    @Override
    public void update(DeptUpdateRequest req, String deptId) {
        try {
            Dept dept = new Dept();
            dept.setDeptId(deptId);
            dept.setDeptNm(req.getDeptNm());
            dept.setDeptCd(req.getDeptCd());
            dept.setDirectorId(req.getDirectorId());
            dept.setUpdUsrId(CommonMethods.getCurrentUsrId());

            deptMapper.update(dept);
        } catch (Exception e) {
            throw new RuntimeException("Department not found");
        }
    }

    @Override
    public void deleteById(String deptId) {
        try {
            deptMapper.deleteById(deptId, CommonMethods.getCurrentUsrId());
        } catch (Exception e) {
            throw new RuntimeException("Department not found");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Dept findById(String deptId) {
        Dept dept = deptMapper.findById(deptId);
        if (dept == null) {
            throw new RuntimeException("Department not found");
        }
        return dept;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DeptResponse> findAll(DeptSearchRequest searchRequest) {
        return deptMapper.findAll(searchRequest);
    }
}
