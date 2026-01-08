package com.clt.evaluation_system_backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.clt.evaluation_system_backend.dto.request.DeptSearchRequest;
import com.clt.evaluation_system_backend.dto.response.DeptResponse;
import com.clt.evaluation_system_backend.model.Dept;

@Mapper
public interface DeptMapper {

    void insert(Dept dept);

    void update(Dept dept);

    void deleteById(String deptId, String updUsrId);

    Dept findById(String deptId);

    List<DeptResponse> findAll(DeptSearchRequest searchRequest);
}
