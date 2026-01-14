package com.clt.evaluation_system_backend.service;

import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import com.clt.evaluation_system_backend.dto.response.TokenRefreshResponse;
import com.clt.evaluation_system_backend.model.RefreshToken;

public interface RefreshTokenService {
    Optional<RefreshToken> findByToken(String token);

    @Transactional
    RefreshToken createRefreshToken(String userId);

    RefreshToken verifyExpiration(RefreshToken token);

    @Transactional
    int deleteByUserId(String userId);

    TokenRefreshResponse refreshToken(String requestRefreshToken);

    @Transactional
    void deleteByToken(String refreshToken);
}
