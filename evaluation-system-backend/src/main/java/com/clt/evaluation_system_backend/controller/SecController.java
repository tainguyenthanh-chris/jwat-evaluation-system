package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.request.section.SectionFilterCriteria;
import com.clt.evaluation_system_backend.dto.response.section.SecResponse;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.clt.evaluation_system_backend.dto.request.section.CreateSectionRequest;
import com.clt.evaluation_system_backend.dto.request.section.UpdateSecRequest;
import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.service.SecService;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/section")
public class SecController {
    private final SecService secService;

    @PostMapping
    public ResponseEntity<ApiResponse<SecResponse>> createSection(
            @RequestBody CreateSectionRequest request) {
        SecResponse created = secService.createSection(request);
        return ApiResponse.created(created);
    }

    @PutMapping("/{secId}")
    public ResponseEntity<ApiResponse<SecResponse>> updateSection(
            @PathVariable String secId,
            @RequestBody UpdateSecRequest request) {
        secService.updateSection(request, secId);
        return ApiResponse.ok(null);
    }

    @DeleteMapping("/{secId}")
    public ResponseEntity<ApiResponse<Void>> deleteSection(@PathVariable String secId) {
        secService.deleteSection(secId);
        return ApiResponse.success("Section deleted successfully");
    }

    @GetMapping("/{secId}")
    public ResponseEntity<ApiResponse<SecResponse>> getSectionById(@PathVariable String secId) {
        SecResponse sec = secService.getSectionById(secId);
        return ApiResponse.ok(sec);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SecResponse>>> getAllSections(
            @ModelAttribute SectionFilterCriteria filter) {
        List<SecResponse> sections = secService.getAllSections(filter);
        return ApiResponse.ok(sections);
    }
}
