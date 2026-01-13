package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.response.form.submit.FormSubmitWithEmployeeResponse;

import java.util.List;
import java.util.Map;

public interface EmailService {
    boolean sendTemplateEmail(String toEmail, String templateId, Map<String, Object> data);
    void sendBulkReviewReminderToEmployees(List<FormSubmitWithEmployeeResponse> employees);
    void sendBulkReviewReminderToBoss(Map<String, Map<String, Object>> data);
}
