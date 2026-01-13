package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.request.EmployeeRequest;
import com.clt.evaluation_system_backend.dto.response.AdmEmployeeResponse;
import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.service.AdmEmpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/admin/employee")
public class AdminEmployeeController {
    private final AdmEmpService empService;

    // if has sectionId -> query by sectionId
    // else -> selectAll
    @GetMapping("")
    public ResponseEntity<?> get() {
        List<AdmEmployeeResponse> res = empService.getForAdm();
        return ApiResponse.ok(res);
    }


    @GetMapping("/employeeNo")
    public ResponseEntity<?> getByEmployeeNo(@RequestParam String employeeNo) {
        AdmEmployeeResponse response = empService.getByNo(employeeNo);
        return ApiResponse.ok(response);
    }


}
