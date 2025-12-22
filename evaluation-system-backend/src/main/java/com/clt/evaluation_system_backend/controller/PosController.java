package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.request.PosRequest;
import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.service.PosService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/position")
public class PosController {
    private final PosService posService;

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody PosRequest req) {
        posService.create(req);
        return ApiResponse.ok("insert position success");
    }
}
