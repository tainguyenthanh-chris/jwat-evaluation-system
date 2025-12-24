package com.clt.evaluation_system_backend.dto.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DeptSearchRequest {
    @Size(max = 100, message = "Department name must be <= 100 characters")
    private String deptNm;

    @Size(max = 10, message = "Department code must be <= 10 characters")
    @Pattern(regexp = "^[A-Z0-9_]*$", message = "Department code must contain only uppercase letters, numbers, and underscores")
    private String deptCd;

    @Size(max = 30, message = "Director ID must be <= 30 characters")
    private String directorId;
}
