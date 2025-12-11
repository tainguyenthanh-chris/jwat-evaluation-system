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
@Table(name = "form_sec_item_tmpl")
public class FormSectionItemTemplate extends AuditableEntity {
    @Id
    @Column(name = "form_sec_item_tmpl_id", length = Constant.ID_LEN)
    private String formSectionItemTemplateId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_tmpl_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private FormTemplate formTemplate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sec_tmpl_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private SectionTemplate sectionTemplate;

    @Column(name = "sec_ord_no")
    private int sectionOrderNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sec_item_tmpl_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private SectionItemTemplate sectionItemTemplate;

    @Column(name = "sec_item_ord_no")
    private int sectionItemOrderNo;

    public FormSectionItemTemplate(String formSectionItemTemplateId, FormTemplate formTemplate, SectionTemplate sectionTemplate, int sectionOrderNo) {
        this.formSectionItemTemplateId = formSectionItemTemplateId;
        this.formTemplate = formTemplate;
        this.sectionTemplate = sectionTemplate;
        this.sectionOrderNo = sectionOrderNo;
    }
}



