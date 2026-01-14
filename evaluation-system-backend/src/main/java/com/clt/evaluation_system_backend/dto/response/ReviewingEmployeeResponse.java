package com.clt.evaluation_system_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReviewingEmployeeResponse extends BaseResponse {
    private String employeeName;
    private String employeeNo;
    private String formSubmissionStatusDatabase;
    private LocalDate reviewOn;
    private LocalDate reviewDueDate;
    private LocalDate reviewDate;
//    private
    private String formSubmissionStatus; // REMIND, BOSS_REVIEW, EMPLOYEE_REVIEW

    @JsonIgnore
    private String reviewRoleRaw;
    @JsonIgnore
    private String currentBossRole;


    public void setFormSubmissionStatus() {
        if(currentBossRole==null) return;
        if(formSubmissionStatusDatabase == null
                ||"PENDING".equalsIgnoreCase(formSubmissionStatusDatabase)){
            formSubmissionStatus = "REMIND";
            return;
        }
        if(currentBossRole.equalsIgnoreCase(formSubmissionStatusDatabase)){
            formSubmissionStatus = "EMPLOYEE_REVIEWED";
            return;
        }
        List<String> roleList = new ArrayList<>();

        if (reviewRoleRaw == null || reviewRoleRaw.isBlank()) {
            roleList = List.of();
            return;
        }
        roleList = Arrays.stream(reviewRoleRaw.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();

        int i =0;
        int bossRevIdx = 0;
        int statusIdx = 0;
        for(String str : roleList){
            i++;
            if(formSubmissionStatusDatabase.equalsIgnoreCase(str)){
                statusIdx = i;
            }
            if(formSubmissionStatusDatabase.equalsIgnoreCase(currentBossRole)){
                bossRevIdx = i;
            }
        }
        if(bossRevIdx > statusIdx){
            formSubmissionStatus = "REMIND";
        } else if(bossRevIdx == statusIdx){
            formSubmissionStatus = "EMPLOYEE_REVIEWED";
        } else {
            formSubmissionStatus = "BOSS_REVIEWED";
        }


        if (reviewDate == null) {
            this.reviewDueDate = null;
            return;
        }
        this.reviewDueDate = reviewOn.plusDays(7*(bossRevIdx+1));

    }

}
