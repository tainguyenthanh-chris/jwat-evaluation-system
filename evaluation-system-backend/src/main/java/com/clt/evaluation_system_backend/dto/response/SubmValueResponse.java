package com.clt.evaluation_system_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SubmValueResponse extends BaseResponse {
    private String role;
    private String value;
}
