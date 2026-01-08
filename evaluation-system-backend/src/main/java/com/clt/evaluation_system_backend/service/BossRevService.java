package com.clt.evaluation_system_backend.service;

import org.springframework.transaction.annotation.Transactional;

import com.clt.evaluation_system_backend.dto.request.BossRevUpdateRequestDto;

public interface BossRevService {
    @Transactional
    void updateBatchBossRev(BossRevUpdateRequestDto request);
}
