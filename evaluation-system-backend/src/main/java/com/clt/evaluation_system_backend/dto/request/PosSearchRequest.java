package com.clt.evaluation_system_backend.dto.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PosSearchRequest {

    @Size(max = 100, message = "Position name must be <= 100 characters")
    private String posNm;

    @Size(max = 10, message = "Position code must be <= 10 characters")
    @Pattern(regexp = "^[A-Z0-9_]*$", message = "Position code must contain only uppercase letters, numbers, and underscores")
    private String posCd;
}
