package com.clt.evaluation_system_backend.dto.response.config;

import com.clt.evaluation_system_backend.util.JsonHelper;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.List;

@Data
public class RevConfResponse {
    private String reviewConfigId;
    private String reviewConfigCode;
    private String reviewConfigType;

    @JsonIgnore
    private String reviewConfigRolesJson;

    public List<String> getReviewConfigRoles() {
        return JsonHelper.toListString(this.reviewConfigRolesJson);
    }
}