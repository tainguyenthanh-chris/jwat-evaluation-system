package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.request.BossRevRequest;
import com.clt.evaluation_system_backend.dto.request.CriteriaRequest;
import com.clt.evaluation_system_backend.dto.response.BossReviewResponse;
import com.clt.evaluation_system_backend.dto.response.CriteriaResponse;
import org.springframework.web.bind.annotation.*;

import com.clt.evaluation_system_backend.dto.response.ApiResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

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

    @GetMapping("")
    public ResponseEntity<?> get(BossRevRequest request) {
        List<BossReviewResponse> res = bossRevService.get(request);
        return ApiResponse.ok(res);
    }
}
