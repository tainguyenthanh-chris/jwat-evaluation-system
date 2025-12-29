package com.clt.evaluation_system_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.clt.evaluation_system_backend.model.Usr;

@Mapper
public interface UsrMapper {

    Usr findById(@Param("usrId") String usrId);

    Usr findByEmail(@Param("email") String email);

    boolean existsById(@Param("usrId") String usrId);

    boolean existsByEmail(String email);

    void insert(Usr usr);
}
