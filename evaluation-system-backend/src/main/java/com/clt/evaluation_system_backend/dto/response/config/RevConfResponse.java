package com.clt.evaluation_system_backend.dto.response.config;

import com.clt.evaluation_system_backend.util.JsonHelper;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.List;

@Data
public class RevConfResponse {
    private String revConfId;
    private String revConfCd;
    private String revConfType;

    @JsonIgnore
    private String revConfRolesJson;

    public List<String> getRevConfRoles() {
        return JsonHelper.toListString(this.revConfRolesJson);
    }
}