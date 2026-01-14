package com.clt.evaluation_system_backend.util;

import java.time.LocalDate;

public class ReviewCycleUtil {
    private static final double YEARLY_REVIEW_SALARY_THRESHOLD = 40_000_000;

    public static LocalDate calculateNextReviewDate(double salary) {
        return calculateNextReviewDate(LocalDate.now(), salary);
    }

    public static LocalDate calculateNextReviewDate(LocalDate baseDate, double salary) {
        if (baseDate == null) {
            throw new IllegalArgumentException("baseDate must not be null");
        }

        return salary >= YEARLY_REVIEW_SALARY_THRESHOLD
                ? baseDate.plusYears(1)
                : baseDate.plusMonths(6);
    }
}
