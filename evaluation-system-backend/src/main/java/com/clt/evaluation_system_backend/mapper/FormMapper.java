package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.request.FormRequest;
import com.clt.evaluation_system_backend.dto.response.FormTmplItemResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FormMapper {
    List<FormTmplItemResponse> findFormTmplItem(@Param("department") String department,
                                                @Param("position") String position,
                                                @Param("level") String level);
}
