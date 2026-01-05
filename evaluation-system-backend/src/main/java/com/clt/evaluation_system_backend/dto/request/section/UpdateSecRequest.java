package com.clt.evaluation_system_backend.dto.request.section;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateSecRequest {
    @Size(max = 100, message = "Section title must be <= 100 characters")
    private String secTitle;

    @Size(max = 10, message = "Section code must be <= 30 characters")
    private String defaultRevConfCd;

    private String deptCd;
    private String posCd;
}
