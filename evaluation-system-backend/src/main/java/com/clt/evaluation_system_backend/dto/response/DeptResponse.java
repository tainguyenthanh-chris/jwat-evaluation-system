package com.clt.evaluation_system_backend.dto.response;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class DeptResponse {
    private String departmentId;
    private String departmentName;
    private String departmentCode;
    private String directorId;

    private String createBy;
    private LocalDateTime createDate;
    private String updateBy;
    private LocalDateTime updateDate;
    private String deleteFlag;
}
