package com.clt.evaluation_system_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clt.evaluation_system_backend.dto.request.BossRevUpdateRequestDto;
import com.clt.evaluation_system_backend.service.BossRevService;

@Service
public class BossRevServiceImpl implements BossRevService {

    @Autowired
    private com.clt.evaluation_system_backend.mapper.BossRevMapper bossRevMapper;

    @Override
    public void updateBatchBossRev(BossRevUpdateRequestDto request) {
        List<String> bossRevNos = request.getBossRevs().stream()
                .map(bossRevDto -> bossRevDto.getBossEmpNo())
                .toList();

        for (String string : bossRevNos) {
            bossRevMapper.deleteBatchBossRev(string, request.getFormSubmId(), request.getEmpNo());
        }

        bossRevMapper.insertBatchBossRev(request.getBossRevs(), request.getFormSubmId(), request.getEmpNo());
    }

}
