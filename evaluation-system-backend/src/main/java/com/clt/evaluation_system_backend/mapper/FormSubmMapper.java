package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.response.FormSubmResponse;
import com.clt.evaluation_system_backend.dto.response.form.submit.FormSubmitWithEmployeeResponse;
import com.clt.evaluation_system_backend.model.FormSubm;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FormSubmMapper {
    FormSubmResponse findByIdWithTargets(String formSubmId);

    FormSubmResponse findLatestByEmpIdWithTargets(String empId);

    void updateFormId(String empId, String formId);

    void insertListFormSubmit(List<FormSubm> formSubmitList);

    List<FormSubmitWithEmployeeResponse> selectFormSubmitWithEmployeeByStatus(@Param("formSubmitStatus") String formSubmitStatus);
}
