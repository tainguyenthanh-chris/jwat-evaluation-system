package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.request.FormSubmRequest;
import com.clt.evaluation_system_backend.dto.request.TargetRequest;
import com.clt.evaluation_system_backend.dto.response.FormDetailResponse;
import com.clt.evaluation_system_backend.dto.response.FormTmplItemResponse;
import com.clt.evaluation_system_backend.dto.response.TargetResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TargetMapper {
    List<TargetResponse> selectTarget(TargetRequest request);



}
