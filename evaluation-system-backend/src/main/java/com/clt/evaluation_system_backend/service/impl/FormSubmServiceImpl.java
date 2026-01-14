package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.response.SubmissionDataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clt.evaluation_system_backend.dto.request.ChangeFormRequest;
import com.clt.evaluation_system_backend.mapper.FormSubmMapper;
import com.clt.evaluation_system_backend.service.FormSubmService;

@Service
public class FormSubmServiceImpl implements FormSubmService {

    @Autowired
    private FormSubmMapper formSubmMapper;

    @Override
    public void updateFormId(ChangeFormRequest request) {
        try {
            formSubmMapper.updateFormId(request.getEmpId(), request.getFormId());
        } catch (Exception e) {
            throw new RuntimeException("Failed to update form ID for employee ID: " + request.getEmpId(), e);
        }
    }

    @Override
    public SubmissionDataResponse checkProgressingEvaluation(String userId) {
        return formSubmMapper.selectProgressingFormSubmission(userId);
    }

}
