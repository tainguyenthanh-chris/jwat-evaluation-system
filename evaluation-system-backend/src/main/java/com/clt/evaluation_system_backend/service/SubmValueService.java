package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.request.FormSubmRequest;

public interface SubmValueService {
    void insertSubmValue(FormSubmRequest formSubmRequest);
}
