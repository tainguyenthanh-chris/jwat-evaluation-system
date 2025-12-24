package com.clt.evaluation_system_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PosCreateRequest {
    @Size(max = 100, message = "Position name must not exceed 100 characters")
    private String posNm;

    @NotBlank(message = "Position code is required")
    @Size(max = 10, message = "Position code must not exceed 10 characters")
    private String posCd;

    @Size(max = 100, message = "Position description must not exceed 100 characters")
    private String posDesc;
}
