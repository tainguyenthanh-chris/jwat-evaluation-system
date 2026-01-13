package com.clt.evaluation_system_backend.mapper;

import java.util.List;

import com.clt.evaluation_system_backend.dto.request.EmployeeRequest;
import com.clt.evaluation_system_backend.dto.response.ReviewingEmployeeResponse;
import com.clt.evaluation_system_backend.dto.response.employee.EmployeeWithFormResponse;
import com.clt.evaluation_system_backend.dto.response.AdmEmployeeResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.clt.evaluation_system_backend.model.Emp;

@Mapper
public interface EmpMapper {

    Emp findByEmail(@Param("email") String email);

    List<Emp> findEmpByBossNo(@Param("bossNo") String bossNo);

    List<Emp> findAll();

    List<EmployeeWithFormResponse> selectEmployeesForNextReviewWithForm();

    List<AdmEmployeeResponse> selectForAdm(EmployeeRequest request);

    AdmEmployeeResponse selectByNo(@Param("employeeNo") String employeeNo);

    List<ReviewingEmployeeResponse> selectReviewingEmployee(EmployeeRequest request);
}