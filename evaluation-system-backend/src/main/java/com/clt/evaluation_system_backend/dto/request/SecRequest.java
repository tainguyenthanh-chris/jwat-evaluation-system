package com.clt.evaluation_system_backend.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class SecRequest {
    private String id;
    private String title;
    private List<String> objectIdList;

    @Override
    public String toString() {
        return "SectionRequest{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", objectIdList=" + objectIdList +
                '}';
    }
}
