package com.clt.evaluation_system_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangeFormRequest {

    private String empId;
    private String formId;
}
