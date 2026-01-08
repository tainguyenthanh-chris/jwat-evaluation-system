package com.clt.evaluation_system_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LvlCreateRequest {

    @Size(max = 100, message = "Level name must not exceed 100 characters")
    private String lvlNm;

    @NotBlank(message = "Level code is required")
    @Size(max = 10, message = "Level code must not exceed 10 characters")
    private String lvlCd;

    @Size(max = 100, message = "Level description must not exceed 100 characters")
    private String lvlDesc;

    @NotBlank(message = "Position ID is required")
    @Size(max = 30, message = "Position ID must not exceed 30 characters")
    private String posId;
}
