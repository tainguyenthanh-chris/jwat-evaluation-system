package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.request.CriteriaRequest;
import com.clt.evaluation_system_backend.dto.request.SecRequest;
import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.dto.response.CriteriaResponse;
import com.clt.evaluation_system_backend.dto.response.SecResponse;
import com.clt.evaluation_system_backend.service.CriteriaService;
import com.clt.evaluation_system_backend.service.SecService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/criteria")
public class CriteriaController {
    private final CriteriaService criteriaService;

    // if has sectionId -> query by sectionId
    // else -> selectAll
    @GetMapping("")
    public ResponseEntity<?> get(CriteriaRequest request) {
        List<CriteriaResponse> res = criteriaService.get(request);
        return ApiResponse.ok(res);
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody CriteriaRequest request) {
        int re = criteriaService.create(request);
        return ApiResponse.success(re + " were inserted to database");
    }

    @PostMapping("/list")
    public ResponseEntity<?> createList(@RequestBody List<CriteriaRequest> reqList) {
        int re = criteriaService.createList(reqList);
        return ApiResponse.success(re + " were inserted to database");
    }

    @PutMapping("")
    public ResponseEntity<?> update(@RequestBody CriteriaRequest request) {
        int re = criteriaService.update(request);
        return ApiResponse.success(re + " were update");
    }

    @DeleteMapping("")
    public ResponseEntity<?> softDelete(@RequestBody CriteriaRequest request) {
        int re = criteriaService.delete(request);
        return ApiResponse.success(re + " were update");
    }

    @PutMapping("/cue")
    public ResponseEntity<?> updateCue(@RequestBody CriteriaRequest request) {
        int re = criteriaService.updateCue(request);
        return ApiResponse.success(re + " were update");
    }

}
