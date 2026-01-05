package com.clt.evaluation_system_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

import java.util.*;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FormTmplResponse extends BaseResponse {
//    private String id;
//    private String departmentCode;
//    private String positionCode;
//    private String levelCode;
//    private List<SecResponse> sectionList = new ArrayList<>();
//
//    @JsonIgnore
//    private Map<String, SecResponse> sectionData = new LinkedHashMap<>();
//
//    public void addSectionData(SecResponse section) {
//        System.out.println("Add section data: " + section.getSectionId());
//        if(!sectionData.containsKey(section.getSectionId())) {
//            sectionData.put(section.getSectionId(), section);
//        }
//    }
//
//    public void addCriteria(SecResponse section, CriteriaResponse criteria) {
//        String sectionTitle = section.getSectionTitle();
//        sectionData.get(sectionTitle).addCriteria(criteria);
//    }
//
//    public void addCriteria(CriteriaResponse criteria) {
//        System.out.println("addCriteria: parent: " + criteria.getParentSectionId());
//        String sectionId = criteria.getParentSectionId();
//        if (sectionData.containsKey(sectionId)) {
//            sectionData.get(sectionId).addCriteria(criteria);
//        }
//    }
//
//    public void addSectionDataToList() {
//        sectionList.clear();
//        sectionList.addAll(sectionData.values());
//    }

//    @Data
//    public static class Section {
//        private String id;
//        private String title;
//        private int ordNo;
//        private List<Criteria> criteriaList = new ArrayList<>();
//        private String type;
//        private List<String> roleList;
//
//        public void setRolesFromString(String roleListJson) {
//            if (roleListJson == null || roleListJson.isBlank()) {
//                this.roleList = List.of();
//                return;
//            }
//            this.roleList = Arrays.stream(roleListJson.split(","))
//                    .map(String::trim)
//                    .toList();
//
//        }
//
//        @Override
//        public boolean equals(Object o) {
//            if (o == null || getClass() != o.getClass()) return false;
//            Section section = (Section) o;
//            return Objects.equals(id, section.id);
//        }
//
//        @Override
//        public int hashCode() {
//            return Objects.hashCode(id);
//        }
//
//        public void addSectionItem(Section.Criteria criteria) {
//            criteriaList.add(criteria);
//        }
//
//
//    }

}
