package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.request.SumSubmRequest;
import com.clt.evaluation_system_backend.dto.response.SummaryTableResponse;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface SumSubmMapper {
    List<SummaryTableResponse> select(SumSubmRequest filter);
}
