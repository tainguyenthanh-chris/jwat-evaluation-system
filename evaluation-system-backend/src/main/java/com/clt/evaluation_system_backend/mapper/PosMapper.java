package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.model.Pos;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PosMapper {
    List<Pos> findAll();
    void insert(Pos pos);

}
