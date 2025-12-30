package com.clt.evaluation_system_backend.dto.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LvlSearchRequest {

    @Size(max = 100, message = "Level name must be <= 100 characters")
    private String lvlNm;

    @Size(max = 10, message = "Level code must be <= 10 characters")
    @Pattern(regexp = "^[A-Z0-9_]*$", message = "Level code must contain only uppercase letters, numbers, and underscores")
    private String lvlCd;
}
