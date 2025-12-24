package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.dto.response.FormTmplResponse;
import com.clt.evaluation_system_backend.service.FormService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/form")
public class FormController {
    private final FormService formService;

    @GetMapping("")
    public ResponseEntity<?> getTemplate(@RequestParam String department,
            @RequestParam String position,
            @RequestParam String level) {
        FormTmplResponse formTmplResponse = formService.findFormTmplResponse(department, position, level);
        return ApiResponse.ok(formTmplResponse);
    }
}
