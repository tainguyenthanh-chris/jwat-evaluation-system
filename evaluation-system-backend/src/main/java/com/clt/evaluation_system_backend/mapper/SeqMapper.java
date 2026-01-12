package com.clt.evaluation_system_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SeqMapper {
    int nextSeq(@Param("tableNm") String tableNm,
                @Param("len") Integer len);

    int resetAllSeq();
}
