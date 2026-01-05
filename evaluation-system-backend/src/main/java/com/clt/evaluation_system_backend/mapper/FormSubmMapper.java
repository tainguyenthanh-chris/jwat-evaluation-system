package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.response.FormSubmResponse;

public interface FormSubmMapper {
    FormSubmResponse findByIdWithTargets(String formSubmId);

    FormSubmResponse findLatestByEmpIdWithTargets(String empId);

}
