package com.clt.evaluation_system_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@EqualsAndHashCode(callSuper = false)
class SubmValueResponse extends BaseResponse {
    private String role;
    private String value;
}
