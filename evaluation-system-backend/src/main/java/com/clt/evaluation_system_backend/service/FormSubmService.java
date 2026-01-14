package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.response.SubmissionDataResponse;

public interface FormSubmService {

    void updateFormId(com.clt.evaluation_system_backend.dto.request.ChangeFormRequest request);

    SubmissionDataResponse checkProgressingEvaluation(String userId);
}
