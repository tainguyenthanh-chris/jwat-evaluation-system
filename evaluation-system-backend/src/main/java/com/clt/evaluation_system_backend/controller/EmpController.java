package com.clt.evaluation_system_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.service.impl.EmpServiceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/emp")
public class EmpController {
    @Autowired
    private EmpServiceImpl empService;

    @GetMapping("/by-boss")
    public ResponseEntity<?> getEmpListByCurrentBoss() {
        return ApiResponse.ok(empService.getEmpListByCurrentBoss());
    }

    @GetMapping
    public ResponseEntity<?> getAllEmps() {
        return ApiResponse.ok(empService.getAllEmps());
    }
}
