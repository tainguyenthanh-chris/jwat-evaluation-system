package com.clt.evaluation_system_backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.clt.evaluation_system_backend.model.Usr;

@Mapper
public interface UsrMapper {

    Usr findById(String usrId);

    Usr findByEmail(String email);

    boolean existsById(String usrId);

    boolean existsByEmail(String email);

    void insert(Usr usr);
}
