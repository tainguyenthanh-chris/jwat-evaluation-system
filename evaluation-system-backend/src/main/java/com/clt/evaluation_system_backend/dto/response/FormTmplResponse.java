package com.clt.evaluation_system_backend.dto.response;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class FormTmplResponse {
    private String id;
    private String title;
    private String department;
    private String position;
    private String level;
    private List<Section> sectionList = new ArrayList<>();

    @Data
    static class Section {
        private String title;
        private int ordNo;
        private List<SectionItem> secItemList = new ArrayList<>();

        // to render cols for each reviewer do review
        private int reviewerNum; // = reviewerList size
        private List<String> reviewerRoleList = new ArrayList<>(); // keep order, ex: self, leader

        @Data
        static class SectionItem {
            private String title;
            private int ordNo;
        }

    }

}
