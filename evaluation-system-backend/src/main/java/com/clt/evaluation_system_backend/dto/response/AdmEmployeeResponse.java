package com.clt.evaluation_system_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AdmEmployeeResponse extends BaseResponse {
    private String employeeId;
    private String employeeNo;
    private String employeeName;
    private String employeeEmail;
    private String employeeInfo;
    private List<BossReview> reviewBy;
    private String status;

    @JsonIgnore
    private String reviewByListRaw;

    @Data
    public static class BossReview {
        private String bossNo;
        private String bossName;
        private String order;
    }

    public void setReviewBy() {
        reviewBy = parseBossList(reviewByListRaw);
    }

    public static List<BossReview> parseBossList(String raw) {
        if (raw == null || raw.isBlank()) {
            return Collections.emptyList();
        }
        return Arrays.stream(raw.split("\\s*,\\s*"))
                .map(item -> {
                    String[] firstSplit = item.split("-", 2);
                    if (firstSplit.length < 2) return null;

                    String bossNo = firstSplit[0].trim();
                    String rest = firstSplit[1].trim();
                    String[] secondSplit = rest.split("\\s+", 2);
                    if (secondSplit.length < 2) return null;
                    String order = secondSplit[0].trim();
                    String bossName = secondSplit[1].trim();
                    BossReview br = new BossReview();
                    br.setBossNo(bossNo);
                    br.setOrder(order);
                    br.setBossName(bossName);
                    return br;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }





}
