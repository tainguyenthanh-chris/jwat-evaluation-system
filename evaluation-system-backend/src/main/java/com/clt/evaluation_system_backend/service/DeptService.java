package com.clt.evaluation_system_backend.service;

import java.util.List;

import com.clt.evaluation_system_backend.dto.request.DeptCreateRequest;
import com.clt.evaluation_system_backend.dto.request.DeptSearchRequest;
import com.clt.evaluation_system_backend.dto.request.DeptUpdateRequest;
import com.clt.evaluation_system_backend.dto.response.DeptResponse;
import com.clt.evaluation_system_backend.model.Dept;

public interface DeptService {
    void create(DeptCreateRequest req);

    void update(DeptUpdateRequest req, String deptId);

    void deleteById(String deptId);

    Dept findById(String deptId);

    List<DeptResponse> findAll(DeptSearchRequest searchRequest);
}
