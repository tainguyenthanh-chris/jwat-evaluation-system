package com.clt.evaluation_system_backend.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DeptUpdateRequest {

    @Size(max = 100, message = "Department name must be <= 100 characters")
    private String deptNm;

    @Size(max = 10, message = "Department code must be <= 10 characters")
    private String deptCd;

    @Size(max = 30, message = "Director ID must be <= 30 characters")
    private String directorId;
}
