package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.email.RemindEmployeeReviewRequest;

public interface ReviewReminderService {
    void sendReviewReminderToEmployee(RemindEmployeeReviewRequest request);

    void sendReviewReminderToBoss();

    void sendReviewReminderToEmployees();
}
