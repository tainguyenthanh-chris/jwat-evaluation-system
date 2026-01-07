package com.clt.evaluation_system_backend.model;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SeqTable("sum_subm")
public class SumSubm {
    private String sumSubmId;
    private String formSubmId;
    private String secTitle;
    private String sumPoint;
    private String sumGrade;
    private String sumOrderNo;
}
