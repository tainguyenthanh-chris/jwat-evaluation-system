package com.clv.evaluation_system_backend.model;

import com.clv.evaluation_system_backend.model.common.AuditableEntity;
import com.clv.evaluation_system_backend.util.Constant;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "sec_item_tmpl")
public class SectionItemTemplate extends AuditableEntity {
    @Id
    @Column(name = "sec_item_tmpl_id", length = Constant.ID_LEN)
    private String sectionItemTemplateId;

    @Column(name = "sec_tmpl_cnt", length = 100)
    private String SectionTemplateContent;

    @Column(name = "sec_tmpl_id", length = Constant.ID_LEN)
    private String sectionTemplateId;


}



