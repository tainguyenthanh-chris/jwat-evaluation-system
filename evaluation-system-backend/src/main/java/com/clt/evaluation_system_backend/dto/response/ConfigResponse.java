package com.clt.evaluation_system_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ConfigResponse {
    private String configId;
    private String configCode;
    private String configType;
    private List<String> configRoleList;

}
