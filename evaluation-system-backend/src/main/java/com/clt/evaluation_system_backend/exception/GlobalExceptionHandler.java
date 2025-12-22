package com.clt.evaluation_system_backend.exception;

import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(OverMaxRecordException.class)
    public ResponseEntity<ApiResponse<Void>> handleOverMaxRecordException(
            OverMaxRecordException ex) {
        return ApiResponse.fail(ex.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Void>> handleRuntime(
            RuntimeException ex) {

        return ApiResponse.fail("Internal server error");
    }
}

