package com.clv.evaluation_system_backend.model;

import com.clv.evaluation_system_backend.util.Constant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "form_subm")
public class FormSubmission {
    @Id
    @Column(name = "form_subm_id", length = Constant.ID_LEN)
    private String formSubmissionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_tmpl_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore
    private FormTemplate formTemplate;

    @Column(name = "emp_no")
    private String employeeNo;

    @Column(name = "emp_nm")
    private String employeeName;

    @Column(name = "emp_curr_pos_cd")
    private String employeeCurrentPositionCode;

    @Column(name = "emp_curr_lvl_cd")
    private String employeeCurrentLevelCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emp_curr_dept_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore
    private Department department;

    @Column(name = "emp_curr_dept_nm", length = Constant.NAME_LEN)
    private String employeeCurrentDepartmentName;

    @Column(name = "rev_dt", nullable = false)
    @CreationTimestamp
    private LocalDate reviewDate;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name="leader_rev_id_list", columnDefinition = "jsonb")
    private List<String> leaderReviewIdList = new ArrayList<>();

    @Column(name = "next_rev_dt")
    private LocalDate nextReviewDate;

    @Column(name = "form_subm_status", length = Constant.STATUS_LEN)
    private String formSubmissionStatus;


}



