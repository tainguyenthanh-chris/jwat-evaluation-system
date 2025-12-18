package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.model.Lvl;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LvlMapper {
    List<Lvl> findAll();
    void insert(Lvl lvl);

}
