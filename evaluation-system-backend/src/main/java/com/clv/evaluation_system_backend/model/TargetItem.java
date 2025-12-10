package com.clv.evaluation_system_backend.model;

import com.clv.evaluation_system_backend.util.Constant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "target_item")
public class TargetItem {
    @Id
    @Column(name = "target_item_id", length = Constant.ID_LEN)
    private String targetItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_subm_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore
    private FormSubmission formSubmission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sec_tmpl_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore
    private SectionTemplate sectionTemplate;

    @Column(name="target_ord_no")
    private Integer targetOrderNo;

    @Column(name="target_item_cnt", columnDefinition = "text")
    private String targetItemContent;

    @Column(name="target_item_status", length = Constant.STATUS_LEN)
    private String targetItemStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cre_usr_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore
    private User createUser;

    @Column(name = "cre_dt", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rev_usr_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore
    private User reviewUser;

    @Column(name = "rev_dt", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime reviewDate;

    @Column(name = "upd_dt")
    @UpdateTimestamp
    private LocalDateTime updateDate;


}



