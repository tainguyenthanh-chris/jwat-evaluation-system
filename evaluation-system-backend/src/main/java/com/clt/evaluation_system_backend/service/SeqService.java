package com.clt.evaluation_system_backend.service;

import java.util.List;

public interface SeqService {
    String generateNewId(Class<?> className);
    List<String> generateListNewId(Class<?> className, int len);

    void resetDailySeq();
}
