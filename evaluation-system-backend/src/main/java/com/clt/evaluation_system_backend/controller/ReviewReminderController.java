package com.clt.evaluation_system_backend.controller;

import com.clt.evaluation_system_backend.dto.email.RemindEmployeeReviewRequest;
import com.clt.evaluation_system_backend.service.ReviewReminderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/review-reminder")
public class ReviewReminderController {
    private final ReviewReminderService reviewReminderService;

    // @PostMapping("/boss")
    // public ResponseEntity<String> testSendReviewReminderToBoss() {
    // reviewReminderService.sendReviewReminderToBoss();
    // return ResponseEntity.ok("Review reminder to boss job triggered
    // successfully");
    // }
    //
    // @PostMapping("/employees")
    // public ResponseEntity<String> testSendReviewReminderToEmployees() {
    // reviewReminderService.sendReviewReminderToEmployees();
    // return ResponseEntity.ok("Review reminder to employees job triggered
    // successfully");
    // }

    @PostMapping("/employee")
    public ResponseEntity<String> sendReviewReminderToEmployee(
            @Valid @RequestBody RemindEmployeeReviewRequest request) {
        reviewReminderService.sendReviewReminderToEmployee(request);
        return ResponseEntity.ok("Send email to remind employee successfully");
    }
}
