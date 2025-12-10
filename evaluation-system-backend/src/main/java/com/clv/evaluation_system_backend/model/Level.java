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
@Table(name = "lvl")
public class Level extends AuditableEntity {
    @Id
    @Column(name = "lvl_id", length = Constant.ID_LEN)
    private String levelId;

    @Column(name = "lvl_cd", length = Constant.CODE_LEN)
    private String levelCode;

    @Column(name = "lvl_nm", length = 100)
    private String levelName;

    @Column(name = "lvl_desc", length = 100)
    private String levelDescription;



}



