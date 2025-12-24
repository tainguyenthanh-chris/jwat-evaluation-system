package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.response.FormTmplResponse;

public interface FormService {
    FormTmplResponse findFormTmplResponse(String department, String position, String level);
}
