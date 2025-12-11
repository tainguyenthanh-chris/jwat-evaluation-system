package com.clv.evaluation_system_backend.controller;

import com.clv.evaluation_system_backend.dto.response.ApiResponse;
import com.clv.evaluation_system_backend.service.InsertDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/test")
public class TestController {
    private final InsertDataService insertDataService;

    @PostMapping("/insert")
    public ResponseEntity<?> insertAll() {
        System.out.println("insert sample data");
        insertDataService.insertSampleData();
        return ApiResponse.ok("insert success");
    }

}
