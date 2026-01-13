package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.service.ReviewReminderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/test")
public class TestController {
    private final ReviewReminderService reviewReminderService;

    @PostMapping("/send-review-reminder-boss")
    public ResponseEntity<String> testSendReviewReminderToBoss() {
        reviewReminderService.sendReviewReminderToBoss();
        return ResponseEntity.ok("Review reminder to boss job triggered successfully");
    }

    @PostMapping("/send-review-reminder-employees")
    public ResponseEntity<String> testSendReviewReminderToEmployees() {
        reviewReminderService.sendReviewReminderToEmployees();
        return ResponseEntity.ok("Review reminder to employees job triggered successfully");
    }
}
