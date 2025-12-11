package com.clv.evaluation_system_backend.model;

import com.clv.evaluation_system_backend.model.common.AuditableEntity;
import com.clv.evaluation_system_backend.util.Constant;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@EqualsAndHashCode(callSuper = true)
@Table(name = "dept")
public class Department extends AuditableEntity {
    @Id
    @Column(name = "dept_id", length = Constant.ID_LEN)
    private String departmentId;

    @Column(name = "dept_nm", length = 10)
    private String departmentName;

    @Column(name = "dept_cd", length = Constant.CODE_LEN)
    private String departmentCode;

}



