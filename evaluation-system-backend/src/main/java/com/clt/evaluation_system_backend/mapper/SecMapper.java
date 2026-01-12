package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.request.section.SecFilterCriteria;
import com.clt.evaluation_system_backend.dto.response.section.SecResponse;
import com.clt.evaluation_system_backend.model.Sec;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SecMapper {

    void insert(Sec sec);

    void update(Sec sec);

    void delete(Sec sec);

    SecResponse selectById(String secId);

    List<SecResponse> selectAll(SecFilterCriteria filter);

    int existsById(String secId);
}
