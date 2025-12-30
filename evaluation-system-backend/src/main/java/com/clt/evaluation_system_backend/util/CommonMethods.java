package com.clt.evaluation_system_backend.util;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class CommonMethods {
    public static String getCurrentUsrId() {
        SecurityContext context = SecurityContextHolder.getContext();
        String principalId = context.getAuthentication().getName();
        if (principalId == null) {
            throw new RuntimeException("No authenticated user found");
        }
        return principalId;
    }
}
