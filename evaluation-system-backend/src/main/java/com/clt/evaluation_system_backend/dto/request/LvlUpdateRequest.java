package com.clt.evaluation_system_backend.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LvlUpdateRequest {
    @Size(max = 100, message = "Level name must not exceed 100 characters")
    private String lvlNm;

    @Size(max = 10, message = "Level code must not exceed 10 characters")
    private String lvlCd;

    @Size(max = 100, message = "Level description must not exceed 100 characters")
    private String lvlDesc;
}
