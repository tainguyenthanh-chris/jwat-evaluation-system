package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.request.PosRequest;

public interface SeqService {
    String generateNewId(Class<?> className);
    void resetDailySeq();
}
