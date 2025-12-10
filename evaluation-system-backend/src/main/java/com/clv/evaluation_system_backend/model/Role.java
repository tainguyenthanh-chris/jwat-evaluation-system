package com.clv.evaluation_system_backend.model;

import com.clv.evaluation_system_backend.model.common.AuditableEntity;
import com.clv.evaluation_system_backend.util.Constant;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@EqualsAndHashCode(callSuper = true)
@Table(name = "role")
public class Role extends AuditableEntity {
    @Id
    @Column(name = "role_id", length = Constant.ID_LEN)
    private String roleId;

    @Column(name = "role_cd", length = Constant.CODE_LEN)
    private String roleCode;

    @Column(name = "role_desc", length = 100)
    private String roleDescription;

}

