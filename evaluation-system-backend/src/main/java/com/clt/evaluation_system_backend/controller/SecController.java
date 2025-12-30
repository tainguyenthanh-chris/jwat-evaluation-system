package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.request.SecRequest;
import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.dto.response.SecResponse;
import com.clt.evaluation_system_backend.service.SecService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/section")
public class SecController {
    private final SecService secService;

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody SecRequest req) {
        secService.create(req);
        return ApiResponse.success("Insert section success");
    }

    @GetMapping("")
    public ResponseEntity<?> findAllActive() {
        System.out.println("api: section: findAllActive");
        List<SecResponse> response = secService.findActiveSection();
        return ApiResponse.ok(response);
    }



}
