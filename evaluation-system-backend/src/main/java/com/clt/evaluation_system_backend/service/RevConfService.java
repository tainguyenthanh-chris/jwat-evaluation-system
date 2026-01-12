package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.response.config.RevConfResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RevConfService {
    List<RevConfResponse> getAllRevConf();
}
