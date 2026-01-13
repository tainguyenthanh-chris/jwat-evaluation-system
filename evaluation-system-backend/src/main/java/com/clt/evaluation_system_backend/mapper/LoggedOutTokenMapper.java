package com.clt.evaluation_system_backend.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.clt.evaluation_system_backend.model.LoggedOutToken;

@Mapper
public interface LoggedOutTokenMapper {
    void insert(LoggedOutToken loggedOutToken);

    LoggedOutToken findByTokenId(String tokenId);
}
