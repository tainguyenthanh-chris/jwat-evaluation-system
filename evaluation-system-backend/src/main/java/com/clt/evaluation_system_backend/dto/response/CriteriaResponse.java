package com.clt.evaluation_system_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Objects;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CriteriaResponse extends BaseResponse {
    private String criteriaId;
    private String criteriaContent;
    private int criteriaOrdNo;
    private String parentId;
    private SubmValueResponse submValueResponse;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CriteriaResponse that = (CriteriaResponse) o;
        return Objects.equals(criteriaId, that.criteriaId);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(criteriaId);
    }
}
