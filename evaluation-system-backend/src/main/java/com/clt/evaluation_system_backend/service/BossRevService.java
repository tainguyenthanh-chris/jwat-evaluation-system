package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.request.BossRevRequest;
import com.clt.evaluation_system_backend.dto.response.BossReviewResponse;
import org.springframework.transaction.annotation.Transactional;

import com.clt.evaluation_system_backend.dto.request.BossRevUpdateRequestDto;

import java.util.List;

public interface BossRevService {
    @Transactional
    void updateBatchBossRev(BossRevUpdateRequestDto request);

    List<BossReviewResponse> get(BossRevRequest request);
}
