package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.response.config.RevConfResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RevConfMapper {
    List<RevConfResponse> selectAll();
}