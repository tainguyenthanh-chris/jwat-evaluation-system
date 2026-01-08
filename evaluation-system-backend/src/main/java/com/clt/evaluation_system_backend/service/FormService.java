package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.request.FormSubmRequest;
import com.clt.evaluation_system_backend.dto.request.form.CreateFormTemplateRequest;
import com.clt.evaluation_system_backend.dto.response.FormTmplResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FormService {
    FormTmplResponse findFormTmplResponse(String department, String position, String level);

    @Transactional
    int saveSubmList(List<FormSubmRequest> data);
    void createFormTemplate(CreateFormTemplateRequest request);
}
