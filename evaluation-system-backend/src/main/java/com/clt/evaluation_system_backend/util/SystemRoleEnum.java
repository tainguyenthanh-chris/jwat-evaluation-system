package com.clt.evaluation_system_backend.util;

public enum SystemRoleEnum {
    ADMIN("ADMIN"),
    USER("USER");

    private final String code;

    SystemRoleEnum(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
