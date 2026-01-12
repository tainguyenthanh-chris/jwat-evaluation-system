package com.clt.evaluation_system_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clt.evaluation_system_backend.dto.request.ChangeFormRequest;
import com.clt.evaluation_system_backend.dto.response.ApiResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/form-subm")
public class FormSubmController {

    @Autowired
    private com.clt.evaluation_system_backend.service.FormSubmService formSubmService;

    @PutMapping("/change-form")
    public ResponseEntity<?> putMethodName(@RequestBody ChangeFormRequest request) {
        formSubmService.updateFormId(request);
        return ApiResponse.success("Updated form for form submit success!");
    }
}
