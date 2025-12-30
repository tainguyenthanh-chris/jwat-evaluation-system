package com.clt.evaluation_system_backend.service;

import java.util.List;

import com.clt.evaluation_system_backend.dto.request.PosCreateRequest;
import com.clt.evaluation_system_backend.dto.request.PosSearchRequest;
import com.clt.evaluation_system_backend.dto.request.PosUpdateRequest;
import com.clt.evaluation_system_backend.dto.response.PosResponse;

public interface PosService {
    void create(PosCreateRequest req);

    void deleteById(String lvlId);

    void update(PosUpdateRequest req, String lvlId);

    PosResponse findById(String lvlId);

    List<PosResponse> findAll(PosSearchRequest searchRequest);

}
