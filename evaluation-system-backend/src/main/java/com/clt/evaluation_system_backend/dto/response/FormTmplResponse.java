package com.clt.evaluation_system_backend.dto.response;

import lombok.Data;

import java.util.*;

@Data
public class FormTmplResponse {
    private String id;
    private String title;
//    private String department;
//    private String position;
//    private String level;
    private List<Section> sectionList = new ArrayList<>();
    private Map<String, Section> sectionData = new LinkedHashMap<>();
    private Set<String> sectionIdSet = new HashSet<>();

    public void addSection(Section section) {
        if(!sectionData.containsKey(section.getId())) {
            sectionData.put(section.getId(), section);
        }
    }

    public void addSectionItem(Section.SectionItem sectionItem) {
        String parentId = sectionItem.getParentId();
        sectionData.get(parentId).addSectionItem(sectionItem);
    }

    @Data
    public static class Section {
        private String id;
        private String title;
        private int ordNo;
        private List<SectionItem> sectionItemList = new ArrayList<>();
        private String answerType;

        @Override
        public boolean equals(Object o) {
            if (o == null || getClass() != o.getClass()) return false;
            Section section = (Section) o;
            return Objects.equals(id, section.id);
        }

        @Override
        public int hashCode() {
            return Objects.hashCode(id);
        }

        public void addSectionItem(Section.SectionItem sectionItem) {
            sectionItemList.add(sectionItem);
        }

        @Data
        public static class SectionItem {
            private String id;
            private String content;
            private int ordNo;
            private String parentId;

            @Override
            public boolean equals(Object o) {
                if (o == null || getClass() != o.getClass()) return false;
                SectionItem that = (SectionItem) o;
                return Objects.equals(id, that.id);
            }

            @Override
            public int hashCode() {
                return Objects.hashCode(id);
            }
        }



    }

}
