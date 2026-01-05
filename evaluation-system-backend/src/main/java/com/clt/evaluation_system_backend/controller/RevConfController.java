package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.dto.response.config.RevConfResponse;
import com.clt.evaluation_system_backend.service.RevConfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/review-config")
public class RevConfController {
    private final RevConfService revConfService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<RevConfResponse>>> getAllRevConf() {
        List<RevConfResponse> sections = revConfService.getAllRevConf();
        return ApiResponse.ok(sections);
    }
}
