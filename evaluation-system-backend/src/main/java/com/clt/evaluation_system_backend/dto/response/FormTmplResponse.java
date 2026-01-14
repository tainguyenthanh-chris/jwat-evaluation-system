package com.clt.evaluation_system_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.*;

@Data
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FormTmplResponse extends BaseResponse {
    private String id;
    private String departmentCode;
    private String positionCode;
    private String levelCode;
    private List<SecResponse> sectionList = new ArrayList<>();

    @JsonIgnore
    private Map<String, SecResponse> sectionData = new LinkedHashMap<>();

    public void addSectionData(SecResponse section) {
        System.out.println("Add section data: " + section.getSectionId());
        if (!sectionData.containsKey(section.getSectionId())) {
            sectionData.put(section.getSectionId(), section);
        }
    }

    public void addCriteria(SecResponse section, CriteriaResponse criteria) {
        String sectionTitle = section.getSectionTitle();
        sectionData.get(sectionTitle).addCriteria(criteria);
    }

    public void addCriteria(CriteriaResponse criteria) {
        System.out.println("addCriteria: parent: " + criteria.getParentSectionId());
        String sectionId = criteria.getParentSectionId();
        if (sectionData.containsKey(sectionId)) {
            sectionData.get(sectionId).addCriteria(criteria);
        }
    }

    public void addSectionDataToList() {
        sectionList.clear();
        sectionList.addAll(sectionData.values());
    }

}
