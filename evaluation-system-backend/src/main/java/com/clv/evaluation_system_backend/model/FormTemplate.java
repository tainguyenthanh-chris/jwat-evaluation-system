package com.clv.evaluation_system_backend.model;

import com.clv.evaluation_system_backend.model.common.AuditableEntity;
import com.clv.evaluation_system_backend.util.Constant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@EqualsAndHashCode(callSuper = true)
@Table(name = "form_tmpl")
public class FormTemplate extends AuditableEntity {
    @Id
    @Column(name = "form_tmpl_id", length = Constant.ID_LEN)
    private String formTemplateId;

    @Column(name = "form_tmpl_title", length = 100)
    private String formTemplateTitle;

    @Column(name = "pos_cd", length = Constant.CODE_LEN)
    private String positionCode;

    @Column(name = "lvl_cd", length = Constant.CODE_LEN)
    private String levelCode;

    @Column(name = "form_tmpl_ver")
    private int formTemplateVersion = 1;

    @Column(name = "form_tmpl_status", length = Constant.STATUS_LEN)
    private String formTemplateStatus;



}



