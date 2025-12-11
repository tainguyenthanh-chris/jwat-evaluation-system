package com.clv.evaluation_system_backend.model;

import com.clv.evaluation_system_backend.util.Constant;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "seq")
public class Sequence {
    @Id
    @Column(name = "table_nm", length = Constant.ID_LEN)
    private String tableName;

    @Column(name = "last_idx")
    private Integer lastIndex;

    @Column(name = "last_upd_dt")
    @UpdateTimestamp
    private LocalDate lastUpdateDate;

}



