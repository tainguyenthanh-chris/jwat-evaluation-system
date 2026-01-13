package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.response.form.submit.FormSubmitWithEmployeeResponse;
import com.clt.evaluation_system_backend.service.EmailService;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final SendGrid sendGrid;

    @Value("${sendgrid.from.email}")
    private String fromEmail;

    @Value("${sendgrid.from.name}")
    private String fromName;

    @Value("${sendgrid.template.review-reminder-employees}")
    private String reviewReminderEmployeesTemplate;

    @Value("${sendgrid.template.review-reminder-boss}")
    private String reviewReminderBossTemplate;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Override
    public boolean sendTemplateEmail(String toEmail, String templateId, Map<String, Object> data) {
        Email from = new Email(fromEmail, fromName);
        Email to = new Email(toEmail);

        Mail mail = new Mail();
        mail.setFrom(from);
        mail.setTemplateId(templateId);

        Personalization personalization = new Personalization();
        personalization.addTo(to);

        if (data != null && !data.isEmpty()) {
            data.forEach(personalization::addDynamicTemplateData);
        }

        mail.addPersonalization(personalization);

        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sendGrid.api(request);

            int statusCode = response.getStatusCode();
            if (statusCode >= 200 && statusCode < 300) {
                log.info("email sent successfully to: {}", toEmail);
                return true;
            } else {
                log.error("failed to send email. Status: {}", statusCode);
                return false;
            }

        } catch (IOException ex) {
            log.error("error sending email to: {}", toEmail, ex);
            return false;
        }
    }

    @Override
    public void sendBulkReviewReminderToEmployees(List<FormSubmitWithEmployeeResponse> employees) {
        if (employees == null || employees.isEmpty()) {
            log.info("no employees to send emails to");
            return;
        }

        log.info("starting to send review reminders to {} employees...", employees.size());

        int successCount = 0;
        int failCount = 0;

        for (FormSubmitWithEmployeeResponse employee : employees) {
            try {
                Map<String, Object> emailData = new HashMap<>();
                emailData.put("employeeName", employee.getEmployeeName());
                emailData.put("employeeNumber", employee.getEmployeeNumber());
                emailData.put("employeeEmail", employee.getEmployeeEmail());
                emailData.put("reviewDate", employee.getReviewDate().format(DateTimeFormatter.ofPattern("MMM dd, yyyy")));
                emailData.put("link", frontendUrl + "/review");
                emailData.put("year", String.valueOf(LocalDate.now().getYear()));

                boolean sent = sendTemplateEmail(employee.getEmployeeEmail(),
                        reviewReminderEmployeesTemplate,
                        emailData
                );

                if (sent) {
                    successCount++;
                    log.info("email sent to: {} ({})", employee.getEmployeeName(), employee.getEmployeeEmail());
                } else {
                    failCount++;
                    log.error("failed to send email to: {} ({})", employee.getEmployeeName(), employee.getEmployeeEmail());
                }

            } catch (Exception e) {
                failCount++;
                log.error("error sending email to: {} ({})", employee.getEmployeeName(), employee.getEmployeeEmail(), e);
            }
        }

        log.info("bulk email completed - Success: {}, Failed: {}, Total: {}", successCount, failCount, employees.size());
    }

    @Override
    public void sendBulkReviewReminderToBoss(Map<String, Map<String, Object>> data) {
        if (data == null || data.isEmpty()) {
            log.info("No bosses to send notifications");
            return;
        }

        log.info("starting to send review reminders to {} boss...", data.size());

        int successCount = 0;
        int failCount = 0;

        for (Map.Entry<String, Map<String, Object>> entry : data.entrySet()) {
            String bossNumber = entry.getKey();
            Map<String, Object> bossData = entry.getValue();

            try {
                Map<String, Object> emailData = new HashMap<>();
                emailData.put("bossEmail", bossData.get("bossEmail"));
                emailData.put("bossName", bossData.get("bossName"));
                emailData.put("bossNumber", bossData.get("bossNumber"));
                emailData.put("employees", bossData.get("employees"));
                emailData.put("link", frontendUrl + "/my-employee-list");
                emailData.put("year", String.valueOf(LocalDate.now().getYear()));

                boolean sent = sendTemplateEmail((String) bossData.get("bossEmail"), reviewReminderBossTemplate, emailData);

                if (sent) {
                    successCount++;
                    log.info("boss review reminders sent to: {} ({})", bossData.get("bossName"), bossNumber);
                } else {
                    failCount++;
                    log.error("failed to send boss review reminders to: {}", bossData.get("bossName"));
                }

            } catch (Exception e) {
                failCount++;
                log.error("error sending boss review reminders to: {}", bossNumber, e);
            }
        }

        log.info("boss review reminders completed - success: {}, failed: {}, total: {}", successCount, failCount, data.size());
    }
}
