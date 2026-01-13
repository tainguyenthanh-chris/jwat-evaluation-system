package com.clt.evaluation_system_backend.scheduler;

import com.clt.evaluation_system_backend.service.ReviewReminderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class ReviewReminderScheduler {
    private final ReviewReminderService reviewReminderService;

    @Scheduled(cron = "0 0 9 1 * ?")
    public void scheduledReviewReminderToEmployees() {
        log.info("scheduled task: Sending review reminders at 9 AM each 1 day");

        try {
            reviewReminderService.sendReviewReminderToEmployees();
            log.info("scheduled send review reminders to employees completed");
        } catch (Exception e) {
            log.error("scheduled task failed", e);
        }
    }


    @Scheduled(cron = "0 0 9 20 * ?")
    public void scheduledReviewReminderToBoss() {
        log.info("scheduled task: Sending review reminders at 9 AM each 20 day");

        try {
            reviewReminderService.sendReviewReminderToBoss();
            log.info("scheduled send review reminders to boss completed");
        } catch (Exception e) {
            log.error("scheduled task failed", e);
        }
    }
}
