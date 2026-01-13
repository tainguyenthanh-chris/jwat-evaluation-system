package com.clt.evaluation_system_backend.dto.request;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class EmployeeRequest {
    private String employeeNo;
    private String employeeName;
    private String bossNo;

}
