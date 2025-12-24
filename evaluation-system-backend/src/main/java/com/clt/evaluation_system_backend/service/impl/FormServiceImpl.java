package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.response.FormTmplResponse;
import com.clt.evaluation_system_backend.service.FormService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FormServiceImpl implements FormService {
    @Override
    public FormTmplResponse findFormTmplResponse(String department, String position, String level) {
        return null;
    }
}
