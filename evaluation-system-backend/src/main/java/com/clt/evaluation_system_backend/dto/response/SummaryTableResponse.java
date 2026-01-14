package com.clt.evaluation_system_backend.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SummaryTableResponse {
    private String reviewDate;
    private String formSubmissionId;
    private List<SummaryItem> summaryData = new ArrayList<>();
    private String formSubmissionStatus;

    @JsonIgnore
    private String summaryDataRaw;

    public void setSummaryData() {
        if(summaryDataRaw == null) return;
        String[] summaryDataRawTokens =  summaryDataRaw.trim().split(",");
        SummaryItem summaryItem;
        String[] tokenItems;
        for(String token : summaryDataRawTokens) {
            tokenItems = token.trim().split(":");
            if(tokenItems.length != 2) continue;
            summaryItem = new SummaryItem();
            summaryItem.setSectionTitle(tokenItems[0]);
            try {
                summaryItem.setSummaryPoint(Double.parseDouble(tokenItems[1]));
            } catch (NumberFormatException e) {
                continue;
            }
            summaryData.add(summaryItem);
        }
    }

    @Data
    public static class SummaryItem {
        private String sectionTitle;
        private double summaryPoint;
    }

}
