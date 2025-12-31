package com.clt.evaluation_system_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TargetRequest {
    private String employeeNo;
}
