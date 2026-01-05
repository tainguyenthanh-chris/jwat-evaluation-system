package com.clt.evaluation_system_backend.exception;

import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(OverMaxRecordException.class)
    public ResponseEntity<ApiResponse<Void>> handleOverMaxRecordException(
            OverMaxRecordException ex) {
        return ApiResponse.fail(ex.getMessage());
    }

    @ExceptionHandler(FormException.class)
    public ResponseEntity<ApiResponse<Void>> handleFormException(
            FormException ex) {
        return ApiResponse.fail(ex.getMessage());
    }

    @ExceptionHandler(AnyException.class)
    public ResponseEntity<ApiResponse<Void>> handleAnyException(
            AnyException ex) {
        return ApiResponse.fail(ex.getMessage());
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleException(Exception ex) {
        log.error("Unhandled exception", ex);
        return ApiResponse.fail("Internal server error");
    }
}

