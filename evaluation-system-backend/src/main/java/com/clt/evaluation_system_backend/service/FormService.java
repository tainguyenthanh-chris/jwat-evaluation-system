package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.request.FormRequest;
import com.clt.evaluation_system_backend.dto.request.FormSubmRequest;
import com.clt.evaluation_system_backend.dto.request.form.CreateFormTemplateRequest;
import com.clt.evaluation_system_backend.dto.request.SubmissionDataRequest;
import com.clt.evaluation_system_backend.dto.response.FormTmplResponse;
import com.clt.evaluation_system_backend.dto.response.SubmissionDataResponse;
import com.clt.evaluation_system_backend.model.Form;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FormService {
    FormTmplResponse findFormTmplResponse(FormRequest request);

    @Transactional
    int saveSubmList(List<FormSubmRequest> data);

    void createFormTemplate(CreateFormTemplateRequest request);

    @Transactional
    SubmissionDataResponse getSubmissionDataByEmployeeNo(SubmissionDataRequest request);

    @Transactional
    List<Form> getAllForms();
}
