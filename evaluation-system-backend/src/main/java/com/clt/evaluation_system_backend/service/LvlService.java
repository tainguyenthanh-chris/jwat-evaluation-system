package com.clt.evaluation_system_backend.service;

import java.util.List;

import com.clt.evaluation_system_backend.dto.request.LvlCreateRequest;
import com.clt.evaluation_system_backend.dto.request.LvlSearchRequest;
import com.clt.evaluation_system_backend.dto.request.LvlUpdateRequest;
import com.clt.evaluation_system_backend.dto.response.LvlResponse;

public interface LvlService {
    void create(LvlCreateRequest req);

    void deleteById(String lvlId);

    void update(LvlUpdateRequest req, String lvlId);

    LvlResponse findById(String lvlId);

    List<LvlResponse> findAll(LvlSearchRequest searchRequest);

}
