package com.clv.evaluation_system_backend.service;

public interface SequenceService {
    String updateIdx(String tableName);
    int updateIdx(String tableName, int newIdx);
    String generateNewId(String currentId);
}


