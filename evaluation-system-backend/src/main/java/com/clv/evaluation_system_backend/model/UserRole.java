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
@Table(name = "usr_role")
public class UserRole extends AuditableEntity {
    @Id
    @Column(name = "usr_role_id", length = Constant.ID_LEN)
    private String userRoleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usr_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Role role;

    @Column(name = "usr_role_status_cd", length = Constant.CODE_LEN)
    private String userRoleStatusCode;

}




