package com.clt.evaluation_system_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SecCue {
    private Long secCueId;
    private String secId;
    private String cueCd;
}
