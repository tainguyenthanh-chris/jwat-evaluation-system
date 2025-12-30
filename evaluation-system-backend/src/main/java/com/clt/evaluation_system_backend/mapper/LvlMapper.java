package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.request.LvlSearchRequest;
import com.clt.evaluation_system_backend.dto.response.LvlResponse;
import com.clt.evaluation_system_backend.model.Lvl;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface LvlMapper {
    void insert(Lvl lvl);

    void update(Lvl lvl);

    void deleteById(String lvlId);

    LvlResponse findById(String lvlId);

    List<LvlResponse> findAll(LvlSearchRequest searchRequest);

}
