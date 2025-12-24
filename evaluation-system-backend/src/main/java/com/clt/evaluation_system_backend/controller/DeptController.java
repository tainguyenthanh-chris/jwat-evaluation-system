package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.request.DeptCreateRequest;
import com.clt.evaluation_system_backend.dto.request.DeptSearchRequest;
import com.clt.evaluation_system_backend.dto.request.DeptUpdateRequest;
import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.service.DeptService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/department")
public class DeptController {

    private final DeptService deptService;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody DeptCreateRequest dto) {
        deptService.create(dto);
        return ApiResponse.ok("insert department success");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable String id,
            @Valid @RequestBody DeptUpdateRequest dto) {

        deptService.update(dto, id);
        return ApiResponse.ok("update department success");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        deptService.deleteById(id);
        return ApiResponse.ok("delete department success");
    }

    @GetMapping
    public ResponseEntity<?> getAll(
            @ParameterObject @ModelAttribute DeptSearchRequest searchRequest) {
        return ApiResponse.ok(deptService.findAll(searchRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        return ApiResponse.ok(deptService.findById(id));
    }
}
