package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.request.CriteriaRequest;
import com.clt.evaluation_system_backend.dto.response.CriteriaResponse;
import com.clt.evaluation_system_backend.model.Criteria;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface CriteriaMapper {
    int insert(Criteria criteria);

    int insertList(List<Criteria> criteriaList);

    int update(Criteria criteria);

    List<CriteriaResponse> select(CriteriaRequest filter);
}
