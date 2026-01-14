package com.clt.evaluation_system_backend.dto.response;

import com.clt.evaluation_system_backend.dto.row.FormSubmissionRow;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;
import java.util.*;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SubmissionDataResponse {
    private String formSubmissionId;
    private String formId;
    private String employeeName;
    private String employeeNo;
    private String employeeCurrentDepartmentCode;
    private String employeeCurrentPositionCode;
    private String employeeCurrentLevelCode;
    private LocalDate reviewDate;
    private LocalDate nextReviewDate;
    private String submissionStatus;
    private List<FormTmplItemResponse> formDataDetailList = new ArrayList<>();
    private FormTmplResponse formTemplate;
    private Map<String, SubmissionValue> submissionValueMap; // key = formDetailId_submissionRole
    private List<BossReview> reviewBy;
    private List<Target> newTargetList = new ArrayList<>();
    private List<Target> currentTargetList = new ArrayList<>();
    private String revRoleList;

    public void setTargetList(List<Target> targetList,String formSubmissionId) {
        for(Target target : targetList) {
            if(formSubmissionId.equalsIgnoreCase(target.getFormSubmissionId())) {
                newTargetList.add(target);
            } else {
                currentTargetList.add(target);
            }
        }
    }


    public void setFormSubmission(List<FormSubmissionRow> baseRows){
        if(baseRows==null || baseRows.isEmpty()) return;
        FormSubmissionRow firstRow = baseRows.get(0);
        this.formSubmissionId = firstRow.getFormSubmissionId();
        this.formId = firstRow.getFormId();
        this.employeeName = firstRow.getEmployeeName();
        this.employeeNo = firstRow.getEmployeeNo();
        this.employeeCurrentDepartmentCode = firstRow.getCurrentDepartmentCode();
        this.employeeCurrentPositionCode = firstRow.getCurrentPositionCode();
        this.employeeCurrentLevelCode = firstRow.getCurrentLevelCode();
        this.reviewDate = firstRow.getReviewDate();
        this.nextReviewDate = firstRow.getNextReviewDate();
        this.submissionStatus = firstRow.getSubmissionStatus();
        this.reviewBy = new ArrayList<>();
        for(FormSubmissionRow row : baseRows){
            BossReview bossReview = new BossReview();
            bossReview.setBossNo(row.getBossNo());
            bossReview.setBossName(row.getBossName());
            bossReview.setOrder(row.getBossReviewOrder());
            this.reviewBy.add(bossReview);
        }
    }

    public void setSubmissionValueMap(List<SubmissionValue> list) {
        if (list == null || list.isEmpty()) {
            this.submissionValueMap = Collections.emptyMap();
            return;
        }
        Map<String, SubmissionValue> map = new HashMap<>();
        for (SubmissionValue value : list) {
            if (value == null
                    || value.getFormDetailId() == null
                    || value.getSubmissionRole() == null) {
                continue;
            }
            String key = value.getFormDetailId()
                    + "_" + value.getSubmissionRole();

            map.put(key, value);
        }
        this.submissionValueMap = map;
    }

    @Data
    public static class BossReview {
        private String bossNo;
        private String bossName;
        private String order;
    }

    @Data
    public static class SubmissionValue {
        private String submissionValueId;
        private String formDetailId;
        private String submissionRole;
        private String formSubmissionValue;
    }

    @Data
    public static class Target {
        private String targetId;
        private String targetContent;
        private String targetStatus;
        private String targetOrderNo;
        private String formDetailId;
        private String formSubmissionId;
    }
}
