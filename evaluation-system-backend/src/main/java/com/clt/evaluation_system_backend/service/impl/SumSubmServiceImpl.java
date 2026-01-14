package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.request.SumSubmRequest;
import com.clt.evaluation_system_backend.dto.response.SummaryTableResponse;
import com.clt.evaluation_system_backend.mapper.SumSubmMapper;
import com.clt.evaluation_system_backend.service.SumSubmService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SumSubmServiceImpl implements SumSubmService {
    private final SumSubmMapper sumSubmMapper;

    @Override
    public List<SummaryTableResponse> get(SumSubmRequest request) {
        List<SummaryTableResponse> responseList = sumSubmMapper.select(request);
        for (SummaryTableResponse summaryTableResponse : responseList) {
            summaryTableResponse.setSummaryData();
        }
        return responseList;
    }

}