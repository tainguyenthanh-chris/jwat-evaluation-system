package com.clt.evaluation_system_backend.service;

public interface SeqService {
    String generateNewId(Class<?> className);

    void resetDailySeq();
}
