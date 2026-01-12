package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.request.CriteriaRequest;
import com.clt.evaluation_system_backend.dto.request.SumSubmRequest;
import com.clt.evaluation_system_backend.dto.response.CriteriaResponse;
import com.clt.evaluation_system_backend.dto.response.SummaryTableResponse;
import com.clt.evaluation_system_backend.model.Criteria;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Mapper
public interface SumSubmMapper {
    List<SummaryTableResponse> select(SumSubmRequest filter);
}
