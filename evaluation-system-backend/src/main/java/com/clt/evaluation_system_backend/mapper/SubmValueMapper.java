package com.clt.evaluation_system_backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.clt.evaluation_system_backend.dto.request.SubmissionValueDto;

@Mapper
public interface SubmValueMapper {

    void insertBatch(
            @Param("formSubmId") String formSubmId,
            @Param("list") List<SubmissionValueDto> list,
            @Param("creUsrId") String creUsrId);
}
