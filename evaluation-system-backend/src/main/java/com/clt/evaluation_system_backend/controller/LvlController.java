package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.request.LvlRequest;
import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.service.LvlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/level")
public class LvlController {
    private final LvlService lvlService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody LvlRequest dto) {
        lvlService.create(dto);
        return ApiResponse.ok("insert lvl success");
    }

}
