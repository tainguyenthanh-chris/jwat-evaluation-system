package com.clt.evaluation_system_backend.dto.response;

import com.clt.evaluation_system_backend.util.JsonHelper;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SecResponse extends BaseResponse {
    private String sectionId;
    private String sectionTitle;
    @JsonIgnore
    private String cueListJson;
    @JsonIgnore
    private String configCode;
    @JsonIgnore
    private String configType;
    @JsonIgnore
    private String configRoleJson;

    private List<String> cueList;

    private ConfigResponse config;
    private List<CriteriaResponse> criteriaList = new ArrayList<>();
    private int sectionOrderNo;
    private SubmValueResponse submValueResponse;
    private String formDetailId;


    public void setCueList() {
        if (cueListJson == null) {
            this.cueList = List.of();
            return;
        }
        this.cueList = JsonHelper.toListString(cueListJson);

    }

    public void addCriteria(CriteriaResponse criteria) {
        criteriaList.add(criteria);
    }


    public void setConfig() {
        this.config = new ConfigResponse();
        if(configCode!=null)
            this.config.setConfigCode(this.configCode);
        if(configCode!=configType)
            this.config.setConfigType(this.configType);
        if(configRoleJson!=null) {
            List<String> roleList = JsonHelper.toListString(this.configRoleJson);
            this.config.setConfigRoleList(roleList);
        }

    }

    public SecResponse() {
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        SecResponse that = (SecResponse) o;
        return Objects.equals(sectionId, that.sectionId);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(sectionId);
    }
}
