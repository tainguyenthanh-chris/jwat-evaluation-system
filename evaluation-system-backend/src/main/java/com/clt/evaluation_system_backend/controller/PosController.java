package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.request.PosCreateRequest;
import com.clt.evaluation_system_backend.dto.request.PosSearchRequest;
import com.clt.evaluation_system_backend.dto.request.PosUpdateRequest;
import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.service.PosService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/position")
public class PosController {

    private final PosService posService;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody PosCreateRequest dto) {
        posService.create(dto);
        return ApiResponse.ok("insert position success");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id,
            @Valid @RequestBody PosUpdateRequest dto) {
        posService.update(dto, id);
        return ApiResponse.ok("update position success");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        posService.deleteById(id);
        return ApiResponse.ok("delete position success");
    }

    @GetMapping
    public ResponseEntity<?> getAll(@ParameterObject @ModelAttribute PosSearchRequest searchRequest) {
        return ApiResponse.ok(posService.findAll(searchRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        return ApiResponse.ok(posService.findById(id));
    }
}
