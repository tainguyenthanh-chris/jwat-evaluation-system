package com.clt.evaluation_system_backend.service.impl;


import com.clt.evaluation_system_backend.dto.response.config.RevConfResponse;
import com.clt.evaluation_system_backend.mapper.RevConfMapper;
import com.clt.evaluation_system_backend.service.RevConfService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RevConfServiceImpl implements RevConfService {
    private final RevConfMapper revConfMapper;

    @Override
    public List<RevConfResponse> getAllRevConf() {
        return revConfMapper.selectAll();
    }
}
