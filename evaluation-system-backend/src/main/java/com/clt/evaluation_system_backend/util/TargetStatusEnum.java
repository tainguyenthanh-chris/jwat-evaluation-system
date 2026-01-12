package com.clt.evaluation_system_backend.util;

public enum TargetStatusEnum {
    NEW("NEW"),
    WAIT("WAIT"),
    SUCCESS("SUCCESS"),
    FAIL("FAIL");

    private final String code;

    TargetStatusEnum(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

}
