package com.clt.evaluation_system_backend.dto.response;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class FormTmplItemResponse {
    private String id;
    private String formTitle;
    private String sectionTitle;
    private String sectionOrderNo;
    private String sectionItemTitle;
    private String sectionItemOrderNo;
    private String reviewConfigItemRole;
    private String reviewConfigItemOrderNo;

}
