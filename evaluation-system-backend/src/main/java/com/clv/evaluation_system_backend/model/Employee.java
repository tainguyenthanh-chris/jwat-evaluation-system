package com.clv.evaluation_system_backend.model;

import com.clv.evaluation_system_backend.util.Constant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "emp")
public class Employee {
    @Id
    @Column(name = "emp_id", length = Constant.ID_LEN)
    private String employeeId;

    @Column(name = "emp_no", length = Constant.EMPLOYEE_NO_LEN)
    private String employeeNo;

    @Column(name = "emp_nm", length = Constant.NAME_LEN)
    private String employeeName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dept_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore
    private Department department;

    @Column(name = "pos_cd", length = Constant.CODE_LEN)
    private String positionCode;

    @Column(name = "lvl_cd", length = Constant.CODE_LEN)
    private String levelCode;

    @Column(name = "salary_lvl")
    private double salaryLevel;

    @Column(name = "emp_status_cd", length = Constant.CODE_LEN)
    private String employeeStatusCode;

    @Column(name = "del_flg", length = 1)
    private String deleteFlag = Constant.DEFAULT_DEL_FLAG;



}




