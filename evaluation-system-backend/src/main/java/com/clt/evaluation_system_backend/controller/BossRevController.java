package com.clt.evaluation_system_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clt.evaluation_system_backend.dto.response.ApiResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/bossRev")
public class BossRevController {

    @Autowired
    private com.clt.evaluation_system_backend.service.BossRevService bossRevService;

    @PutMapping("/update-batch")
    public ResponseEntity<?> putMethodName(
            @RequestBody com.clt.evaluation_system_backend.dto.request.BossRevUpdateRequestDto request) {
        bossRevService.updateBatchBossRev(request);
        return ApiResponse.success("Updated boss reviewers for form submit success!");
    }
}
