package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.request.CriteriaRequest;
import com.clt.evaluation_system_backend.dto.response.CriteriaResponse;
import com.clt.evaluation_system_backend.dto.response.SecResponse;
import com.clt.evaluation_system_backend.model.Criteria;
import com.clt.evaluation_system_backend.model.Sec;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Mapper
public interface CriteriaMapper {
    @Transactional
    int insert(Criteria criteria);

    @Transactional
    int insertList(List<Criteria> criteriaList);

    int update(Criteria criteria);

    List<CriteriaResponse> select(CriteriaRequest filter);
}
