package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.model.CriteriaCue;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Mapper
public interface CriteriaCueMapper {
    @Transactional
    int insertList(List<CriteriaCue> criteriaCueList);

    @Transactional
    int deleteByCriteria(CriteriaCue cue);
}
