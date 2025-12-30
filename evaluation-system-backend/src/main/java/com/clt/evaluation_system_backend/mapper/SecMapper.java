package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.response.SecResponse;
import com.clt.evaluation_system_backend.model.Sec;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SecMapper {
    int insert(Sec sec);
    int insertSectionCue(@Param("secId") String secId,
                         @Param("objectCdList") List<String> objectCdList);
    List<SecResponse> findActiveSection();
}
