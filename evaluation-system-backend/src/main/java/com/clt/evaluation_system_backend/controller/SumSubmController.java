package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.request.SumSubmRequest;
import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.dto.response.SummaryTableResponse;
import com.clt.evaluation_system_backend.service.SumSubmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/summary-submission")
public class SumSubmController {
    private final SumSubmService sumSubmService;

    // if has sectionId -> query by sectionId
    // else -> selectAll
    @GetMapping("")
    public ResponseEntity<?> get(SumSubmRequest request) {
        List<SummaryTableResponse> res = sumSubmService.get(request);
        return ApiResponse.ok(res);
    }

}
