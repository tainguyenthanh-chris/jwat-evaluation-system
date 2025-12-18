package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.model.Pos;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SeqMapper {
    Integer nextSeq(@Param("tableNm") String tableNm);
    int resetAllSeq();
}
