package com.clt.evaluation_system_backend.util;

public enum EmpCompRoleEnum {
    MEMBER("MEMBER"),
    LEADER("LEADER"),
    GM("GM"),
    DIRECTOR("DIRECTOR");

    private final String role;

    EmpCompRoleEnum(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}