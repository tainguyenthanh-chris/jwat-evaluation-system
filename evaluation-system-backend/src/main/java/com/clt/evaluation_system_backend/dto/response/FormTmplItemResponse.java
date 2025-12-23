package com.clt.evaluation_system_backend.dto.response;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class FormTmplItemResponse {
    private String formId;
    private String formTitle;
    private String sectionId;
    private String sectionTitle;
    private Integer sectionOrderNo;
    private String sectionItemId;
    private String sectionItemContent;
    private Integer sectionItemOrderNo;
    private String answerType;

    @Override
    public String toString() {
        return "FormTmplItemResponse{" +
                "formId='" + formId + '\'' +
                ", formTitle='" + formTitle + '\'' +
                ", sectionId='" + sectionId + '\'' +
                ", sectionTitle='" + sectionTitle + '\'' +
                ", sectionOrderNo=" + sectionOrderNo +
                ", sectionItemId='" + sectionItemId + '\'' +
                ", sectionItemTitle='" + sectionItemContent + '\'' +
                ", sectionItemOrderNo=" + sectionItemOrderNo +
                ", answerType='" + answerType + '\'' +
                '}';
    }
}
