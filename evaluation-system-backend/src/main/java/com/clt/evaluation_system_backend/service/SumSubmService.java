package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.request.CriteriaRequest;
import com.clt.evaluation_system_backend.dto.request.SumSubmRequest;
import com.clt.evaluation_system_backend.dto.response.CriteriaResponse;
import com.clt.evaluation_system_backend.dto.response.SummaryTableResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SumSubmService {
    List<SummaryTableResponse> get(SumSubmRequest request);

}
