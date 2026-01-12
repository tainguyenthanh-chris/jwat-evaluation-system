package com.clt.evaluation_system_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private Long timestamp;

    private static <T> ResponseEntity<ApiResponse<T>> buildResponse(
            boolean success,
            String message,
            T data,
            HttpStatus status) {
        ApiResponse<T> res = ApiResponse.<T>builder()
                .success(success)
                .message(message)
                .data(data)
                .timestamp(System.currentTimeMillis())
                .build();
        return ResponseEntity.status(status).body(res);
    }

    public static <T> ResponseEntity<ApiResponse<T>> ok(T data) {
        return buildResponse(true, null, data, HttpStatus.OK);
    }

    public static <T> ResponseEntity<ApiResponse<T>> created(T data) {
        return buildResponse(true, null, data, HttpStatus.CREATED);
    }

    public static ResponseEntity<ApiResponse<Void>> success(String message) {
        return buildResponse(true, message != null ? message : "Operation successful", null, HttpStatus.OK);
    }

    public static ResponseEntity<ApiResponse<Void>> fail(String message) {
        return buildResponse(false, message != null ? message : "Operation failed", null, HttpStatus.BAD_REQUEST);
    }

    public static ResponseEntity<ApiResponse<Void>> notFound(String message) {
        return buildResponse(false, message != null ? message : "Resource not found", null, HttpStatus.NOT_FOUND);
    }

    public static ResponseEntity<ApiResponse<Void>> conflict(String message) {
        return buildResponse(false, message != null ? message : "Resource already exists", null, HttpStatus.CONFLICT);
    }

    public static ResponseEntity<ApiResponse<Void>> methodNotAllowed(String message) {
        return buildResponse(false, message != null ? message : "Method not allowed", null,
                HttpStatus.METHOD_NOT_ALLOWED);
    }

    public static ResponseEntity<ApiResponse<Void>> unauthorizedResponse() {
        return buildResponse(false, "You did not log in!", null, HttpStatus.UNAUTHORIZED);
    }
}
