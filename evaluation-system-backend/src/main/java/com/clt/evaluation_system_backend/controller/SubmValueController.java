package com.clt.evaluation_system_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clt.evaluation_system_backend.dto.request.FormSubmRequest;
import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.service.SubmValueService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/form-subm")
public class SubmValueController {

    @Autowired
    private SubmValueService submValueService;

    @PostMapping
    public ResponseEntity<?> insertSubmValues(@RequestBody FormSubmRequest formSubmRequest) {
        submValueService.insertSubmValue(formSubmRequest);
        return ApiResponse.success("Insert submit values and targets success!");
    }

}
