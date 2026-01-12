package com.clt.evaluation_system_backend.mapper;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.clt.evaluation_system_backend.model.RefreshToken;
import com.clt.evaluation_system_backend.model.Usr;

@Mapper
public interface RefreshTokenMapper {
    Optional<RefreshToken> findByToken(String token);

    void insert(RefreshToken refreshToken);

    int deleteByUser(Usr user);

    void delete(String refreshTokenId);
}
