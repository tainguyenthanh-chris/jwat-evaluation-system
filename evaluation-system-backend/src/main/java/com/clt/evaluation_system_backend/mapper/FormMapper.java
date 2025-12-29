package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.request.FormSubmRequest;
import com.clt.evaluation_system_backend.dto.response.FormDetailResponse;
import com.clt.evaluation_system_backend.dto.response.FormTmplItemResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FormMapper {
    List<FormTmplItemResponse> selectActiveFormTmplItem(@Param("department") String department,
                                                @Param("position") String position,
                                                @Param("level") String level);

    List<FormTmplItemResponse> selectFormTmplItem(@Param("department") String department,
                                                  @Param("position") String position,
                                                  @Param("level") String level);

    List<FormDetailResponse> selectFormDetail(@Param("department") String department,
                                                      @Param("position") String position,
                                                      @Param("level") String level);

    int insertSubmList(List<FormSubmRequest> list);


}
