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
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "sec_tmpl")
public class SectionTemplate extends AuditableEntity {
    @Id
    @Column(name = "sec_tmpl_id", length = Constant.ID_LEN)
    private String sectionTemplateId;

    @Column(name = "sec_tmpl_title", length = 100)
    private String sectionTemplateTitle;

    @Column(name = "sec_tmpl_answer_type", length = Constant.CODE_LEN)
    private String sectionTemplateAnswerType;

}



