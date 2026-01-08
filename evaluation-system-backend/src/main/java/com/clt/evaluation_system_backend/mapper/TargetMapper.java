package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.filter.TargetFilter;
import com.clt.evaluation_system_backend.dto.response.SubmissionDataResponse;
import com.clt.evaluation_system_backend.model.Target;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TargetMapper {
    List<SubmissionDataResponse.Target> selectTarget(TargetFilter request);

    int insertTargets(@Param("list") List<Target> targets);

    int updateTargets(@Param("list") List<Target> targets);

    int deleteTargets(@Param("formSubmId") String formSubmId);

}
