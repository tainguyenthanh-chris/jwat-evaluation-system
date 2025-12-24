package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.request.PosSearchRequest;
import com.clt.evaluation_system_backend.dto.response.PosResponse;
import com.clt.evaluation_system_backend.model.Pos;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface PosMapper {
    void insert(Pos pos);

    void update(Pos pos);

    void deleteById(String posId);

    PosResponse findById(String posId);

    List<PosResponse> findAll(PosSearchRequest searchRequest);
}
