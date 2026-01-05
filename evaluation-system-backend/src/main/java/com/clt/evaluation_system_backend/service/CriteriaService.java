package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.request.CriteriaRequest;
import com.clt.evaluation_system_backend.dto.request.SecRequest;
import com.clt.evaluation_system_backend.dto.response.CriteriaResponse;
import com.clt.evaluation_system_backend.dto.response.SecResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CriteriaService {
    @Transactional
    int create(CriteriaRequest request);

    @Transactional
    int createList(List<CriteriaRequest> requestList);

    int update(CriteriaRequest request);

    int delete(CriteriaRequest request);

    int updateCue(CriteriaRequest request);

    List<CriteriaResponse> get(CriteriaRequest request);
}
