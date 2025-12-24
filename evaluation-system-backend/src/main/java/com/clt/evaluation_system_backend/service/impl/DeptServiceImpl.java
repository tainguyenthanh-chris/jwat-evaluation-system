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

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DeptServiceImpl implements DeptService {

    DeptMapper deptMapper;
    SeqService seqService;

    @Override
    public void create(DeptCreateRequest req) {
        try {
            String newId = seqService.generateNewId(Dept.class);

            Dept dept = new Dept(
                    newId,
                    req.getDeptNm(),
                    req.getDeptCd(),
                    req.getDirectorId(),
                    "dev",
                    null,
                    null,
                    null,
                    "F");

            deptMapper.insert(dept);
        } catch (Exception e) {
            throw new RuntimeException("Insert department failed");
        }
    }

    @Override
    public void update(DeptUpdateRequest req, String deptId) {
        try {
            Dept dept = new Dept(
                    deptId,
                    req.getDeptNm(),
                    req.getDeptCd(),
                    req.getDirectorId(),
                    null,
                    null,
                    "dev",
                    null,
                    null);

            deptMapper.update(dept);
        } catch (Exception e) {
            throw new RuntimeException("Department not found");
        }
    }

    @Override
    public void deleteById(String deptId) {
        try {
            deptMapper.deleteById(deptId);
        } catch (Exception e) {
            throw new RuntimeException("Department not found");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public DeptResponse findById(String deptId) {
        DeptResponse dept = deptMapper.findById(deptId);
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
