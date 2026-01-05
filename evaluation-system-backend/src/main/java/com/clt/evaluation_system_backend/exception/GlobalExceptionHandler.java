package com.clt.evaluation_system_backend.exception;

import com.clt.evaluation_system_backend.dto.response.ApiResponse;
import com.clt.evaluation_system_backend.exception.custom.ConflictException;

import com.clt.evaluation_system_backend.exception.custom.NotFoundException;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFoundException(NotFoundException ex) {
        return ApiResponse.notFound(ex.getMessage());
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNoResourceFound(NoResourceFoundException ex) {
        return ApiResponse.notFound(ex.getMessage());
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ApiResponse<Void>> handleConflict(ConflictException ex) {
        return ApiResponse.notFound(ex.getMessage());
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiResponse<Void>> handleMethodNotAllowed(HttpRequestMethodNotSupportedException ex) {
        return ApiResponse.methodNotAllowed(ex.getMessage());
    }

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
