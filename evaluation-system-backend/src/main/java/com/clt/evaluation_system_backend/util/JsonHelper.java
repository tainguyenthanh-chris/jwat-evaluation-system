package com.clt.evaluation_system_backend.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class JsonHelper {
    public static List<String> toListString(String json) {
        if (json == null) {return List.of();}
        try {
            ObjectMapper mapper = new ObjectMapper();
            List<String> list = mapper.readValue(
                    json,
                    new TypeReference<List<String>>() {}
            );
            return list;
        } catch (JsonProcessingException e) {
            return List.of();
//            throw new RuntimeException(e);
        }
    }
}
