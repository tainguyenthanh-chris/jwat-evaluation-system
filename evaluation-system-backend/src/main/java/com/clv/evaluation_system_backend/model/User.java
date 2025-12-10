package com.clv.evaluation_system_backend.model;

import com.clv.evaluation_system_backend.util.Constant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "usr")
public class User {
    @Id
    @Column(name = "usr_id", length = Constant.ID_LEN)
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emp_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore
    private Employee employee;

    @Column(name = "usr_pwd", length = 10)
    private String userPassword;

    @Column(name = "cre_dt", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createDate;

    @Column(name = "del_flg", length = 1)
    private String deleteFlag = Constant.DEFAULT_DEL_FLAG;


}



