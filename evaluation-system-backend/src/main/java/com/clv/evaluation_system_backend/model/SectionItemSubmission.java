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
@Table(name = "sec_item_subm")
public class SectionItemSubmission {
    @Id
    @Column(name = "sec_item_subm_id", length = Constant.ID_LEN)
    private String sectionItemSubmissionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_subm_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore
    private FormSubmission formSubmission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_sec_item_tmpl_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore
    private FormSectionItemTemplate formSectionItemTemplate;

    @Column(name="sec_item_type", length = Constant.CODE_LEN)
    private String sectionItemType;

    @Column(name="self_rev_point")
    private Integer selfReviewPoint;

    @Column(name="leader_rev_point")
    private Integer leaderReviewPoint;

    @Column(name="text_rev_cnt",  columnDefinition = "text")
    private String textReviewContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cre_usr_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @JsonIgnore
    private User createUser;

    @Column(name = "cre_dt", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createDate;

    @Column(name = "upd_dt")
    @UpdateTimestamp
    private LocalDateTime updateDate;


}



