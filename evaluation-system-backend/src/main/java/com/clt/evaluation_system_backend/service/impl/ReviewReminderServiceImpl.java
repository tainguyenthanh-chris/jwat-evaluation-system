package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.email.RemindEmployeeReviewRequest;
import com.clt.evaluation_system_backend.dto.request.EmployeeRequest;
import com.clt.evaluation_system_backend.dto.response.AdmEmployeeResponse;
import com.clt.evaluation_system_backend.dto.response.boss.review.BossReviewAssigneeResponse;
import com.clt.evaluation_system_backend.dto.response.employee.EmployeeWithFormResponse;
import com.clt.evaluation_system_backend.dto.response.form.submit.FormSubmitWithEmployeeResponse;
import com.clt.evaluation_system_backend.exception.custom.NotFoundException;
import com.clt.evaluation_system_backend.mapper.BossRevMapper;
import com.clt.evaluation_system_backend.mapper.EmpMapper;
import com.clt.evaluation_system_backend.mapper.FormSubmMapper;
import com.clt.evaluation_system_backend.model.BossRev;
import com.clt.evaluation_system_backend.model.FormSubm;
import com.clt.evaluation_system_backend.service.EmailService;
import com.clt.evaluation_system_backend.service.ReviewReminderService;
import com.clt.evaluation_system_backend.service.SeqService;
import com.clt.evaluation_system_backend.util.ReviewCycleUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewReminderServiceImpl implements ReviewReminderService {
    private final EmpMapper empMapper;
    private final SeqService seqService;
    private final FormSubmMapper formSubmMapper;
    private final BossRevMapper bossRevMapper;
    private final EmailService emailService;

    @Async
    @Override
    public void sendReviewReminderToEmployee(RemindEmployeeReviewRequest request) {
        EmployeeRequest employeeRequest = new EmployeeRequest();
        employeeRequest.setEmployeeNo(request.getEmployeeNo());

        List<AdmEmployeeResponse> employeeResponseList = empMapper.selectForAdm(employeeRequest);
        if(employeeResponseList.isEmpty()){
            throw new NotFoundException("Employee not found");
        }

        emailService.sendReviewReminderToEmployee(
                employeeResponseList.get(0).getEmployeeEmail(),
                employeeResponseList.get(0).getEmployeeName(),
                employeeResponseList.get(0).getEmployeeNo(),
                request.getDueDate());
    }

    @Override
    @Transactional
    public void sendReviewReminderToBoss() {
        List<EmployeeWithFormResponse> employees = empMapper.selectEmployeesForNextReviewWithForm();
        if (employees.isEmpty()) {
            return;
        }

        int size = employees.size();
        List<String> formSubmitId = seqService.generateListNewId(FormSubm.class, size);
        List<FormSubm> formSubmInsertList = new ArrayList<>(size);
        List<BossRev> bossRevInsertList = new ArrayList<>();
        Map<String, Map<String, Object>> bossEmailMap = new HashMap<>();

        for (int i = 0; i < size; i++) {
            EmployeeWithFormResponse e = employees.get(i);

            FormSubm fs = new FormSubm();
            fs.setFormSubmId(formSubmitId.get(i));
            fs.setFormId(e.getFormId());
            fs.setEmpId(e.getEmployeeId());
            fs.setEmpNo(e.getEmployeeNumber());
            fs.setEmpNm(e.getEmployeeName());
            fs.setEmpCurrDeptCd(e.getDepartmentCode());
            fs.setEmpCurrPosCd(e.getPositionCode());
            fs.setEmpCurrLvlCd(e.getLevelCode());
            fs.setRevDt(e.getNextReviewDate());
            fs.setNextRevDt(ReviewCycleUtil.calculateNextReviewDate(e.getSalaryLevel()));

            List<BossReviewAssigneeResponse> bossRevs = bossRevMapper.selectByEmployeeNumber(e.getEmployeeNumber());

            for (BossReviewAssigneeResponse boss : bossRevs) {
                BossRev br = new BossRev();
                br.setFormSubmId(formSubmitId.get(i));
                br.setEmpNo(e.getEmployeeNumber());
                br.setBossNo(boss.getBossNumber());
                br.setBossRevRole(boss.getBossReviewRole());
                br.setBossRevOrdNo(boss.getBossReviewOrder());
                br.setIsFinal(boss.getIsFinal());
                bossRevInsertList.add(br);

                Map<String, Object> bossData = bossEmailMap.computeIfAbsent(boss.getBossNumber(), k -> {
                    Map<String, Object> data = new HashMap<>();
                    data.put("bossName", boss.getBossName());
                    data.put("bossNumber", boss.getBossNumber());
                    data.put("bossEmail", boss.getBossEmail());
                    data.put("employees", new ArrayList<Map<String, String>>());
                    return data;
                });

                @SuppressWarnings("unchecked")
                List<Map<String, String>> empList = (List<Map<String, String>>) bossData.get("employees");
                Map<String, String> empData = new HashMap<>();
                empData.put("employeeName", e.getEmployeeName());
                empData.put("employeeNumber", e.getEmployeeNumber());
                empData.put("employeeEmail", e.getEmployeeEmail());
                empData.put("reviewDate", e.getNextReviewDate().format(DateTimeFormatter.ofPattern("MMM dd, yyyy")));
                empList.add(empData);
            }

            formSubmInsertList.add(fs);
        }

        saveReviewData(formSubmInsertList, bossRevInsertList);
        emailService.sendBulkReviewReminderToBoss(bossEmailMap);
    }

    @Transactional
    public void saveReviewData(List<FormSubm> formSubmitInsertList, List<BossRev> bossReviewInsertList) {
        if (!formSubmitInsertList.isEmpty()) {
            formSubmMapper.insertListFormSubmit(formSubmitInsertList);
        }

        if (!bossReviewInsertList.isEmpty()) {
            bossRevMapper.insertBatch(bossReviewInsertList);
        }
    }

    @Override
    @Transactional
    public void sendReviewReminderToEmployees() {
        List<FormSubmitWithEmployeeResponse> pendingSubmitForms = formSubmMapper
                .selectFormSubmitWithEmployeeByStatus("PENDING");
        emailService.sendBulkReviewReminderToEmployees(pendingSubmitForms);
    }

}
