package com.clt.evaluation_system_backend.util;

public enum UsrSysRoleStatusEnum {
    ACTIVE("ACTIVE"),
    INACTIVE("INACTIVE");

    private final String code;

    UsrSysRoleStatusEnum(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
