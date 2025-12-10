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
@Table(name = "sec_item_tmpl")
public class SectionItemTemplate extends AuditableEntity {
    @Id
    @Column(name = "sec_item_tmpl_id", length = Constant.ID_LEN)
    private String sectionItemTemplateId;

    @Column(name = "sec_tmpl_cnt", length = 100)
    private String SectionTemplateContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sec_tmpl_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore
    private SectionTemplate sectionTemplate;


}



