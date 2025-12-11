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
@Table(name = "pos")
public class Position extends AuditableEntity {
    @Id
    @Column(name = "pos_id", length = Constant.ID_LEN)
    private String positionId;

    @Column(name = "pos_cd", length = Constant.CODE_LEN)
    private String positionCode;

    @Column(name = "pos_nm", length = 100)
    private String positionName;

    @Column(name = "pos_desc", length = 100)
    private String positionDescription;


}



