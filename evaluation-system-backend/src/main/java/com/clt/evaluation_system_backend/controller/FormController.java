package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.request.FormSubmRequest;
import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.dto.response.FormTmplResponse;
import com.clt.evaluation_system_backend.service.FormService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/form")
public class FormController {
    private final FormService formService;

    @GetMapping("")
    public ResponseEntity<?> getTemplate(@RequestParam String department,
                                        @RequestParam String position,
                                        @RequestParam String level) {
        FormTmplResponse formTmplResponse = formService.findFormTmplResponse(department,position,level);
        return ApiResponse.ok(formTmplResponse);
    }

    // body
//    [
//        {
//            "formSubmissionId": "form_subm20250101001",
//                "formDetailId": 1,
//                "role": "SELF",
//                "value": "10"
//        },
//        {
//            "formSubmissionId": "form_subm20250101001",
//                "formDetailId": 1,
//                "role": "LEADER",
//                "value": "9"
//        },
//        {
//            "formSubmissionId": "form_subm20250101001",
//                "formDetailId": 2,
//                "role": "SELF",
//                "value": "10"
//        },
//        ...
//    ]
    @PostMapping("/subm")
    public ResponseEntity<?> saveSubmList(@RequestBody List<FormSubmRequest> request) {
        int rows = formService.saveSubmList(request);
        return ApiResponse.success(rows + " are inserted successfully");
    }




}
