package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.request.LvlCreateRequest;
import com.clt.evaluation_system_backend.dto.request.LvlSearchRequest;
import com.clt.evaluation_system_backend.dto.request.LvlUpdateRequest;
import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.service.LvlService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/level")
public class LvlController {
    private final LvlService lvlService;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody LvlCreateRequest dto) {
        lvlService.create(dto);
        return ApiResponse.ok("insert level success");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @Valid @RequestBody LvlUpdateRequest dto) {
        lvlService.update(dto, id);
        return ApiResponse.ok("update level success");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        lvlService.deleteById(id);
        return ApiResponse.ok("delete level success");
    }

    @GetMapping
    public ResponseEntity<?> getAll(@ParameterObject @ModelAttribute LvlSearchRequest searchRequest) {
        return ApiResponse.ok(lvlService.findAll(searchRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        return ApiResponse.ok(lvlService.findById(id));
    }

}
