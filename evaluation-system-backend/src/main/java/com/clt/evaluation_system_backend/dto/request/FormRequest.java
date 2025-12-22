package com.clt.evaluation_system_backend.dto.request;

import lombok.Data;

@Data
public class FormRequest {
    private String id;
    private String department;
    private String position;
    private String level;
}
