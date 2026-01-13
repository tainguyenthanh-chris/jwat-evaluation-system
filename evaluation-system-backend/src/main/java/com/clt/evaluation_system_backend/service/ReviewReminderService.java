package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.email.RemindEmployeeReviewRequest;
import jakarta.validation.Valid;

public interface ReviewReminderService {
    void sendReviewReminderToBoss();
    void sendReviewReminderToEmployees();

    void sendReviewReminderToEmployee(@Valid RemindEmployeeReviewRequest request);
}
