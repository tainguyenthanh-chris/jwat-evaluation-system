package com.clt.evaluation_system_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SeqMapper {
    Integer nextSeq(@Param("tableNm") String tableNm);

    int resetAllSeq();
}
