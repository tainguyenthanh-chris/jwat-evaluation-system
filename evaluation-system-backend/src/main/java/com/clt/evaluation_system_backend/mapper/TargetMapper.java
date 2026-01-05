package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.request.TargetRequest;
import com.clt.evaluation_system_backend.dto.response.TargetResponse;
import com.clt.evaluation_system_backend.model.Target;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TargetMapper {
    List<TargetResponse> selectTarget(TargetRequest request);

    int insertTargets(@Param("list") List<Target> targets);

    int updateTargets(@Param("list") List<Target> targets);

}
