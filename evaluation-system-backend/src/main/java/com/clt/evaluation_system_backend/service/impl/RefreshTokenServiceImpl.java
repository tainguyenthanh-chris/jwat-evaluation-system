package com.clt.evaluation_system_backend.service.impl;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.clt.evaluation_system_backend.config.JwtService;
import com.clt.evaluation_system_backend.dto.response.TokenRefreshResponse;
import com.clt.evaluation_system_backend.exception.custom.TokenRefreshException;
import com.clt.evaluation_system_backend.mapper.RefreshTokenMapper;
import com.clt.evaluation_system_backend.mapper.UsrMapper;
import com.clt.evaluation_system_backend.model.RefreshToken;
import com.clt.evaluation_system_backend.model.Usr;
import com.clt.evaluation_system_backend.service.RefreshTokenService;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Autowired
    private RefreshTokenMapper refreshTokenMapper;

    @Autowired
    private UsrMapper userMapper;

    @Autowired
    private JwtService jwtsService;

    @Value("${jwt.refreshExpiration}")
    private String refreshTokenDurationMs;

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenMapper.findByToken(token);
    }

    @Override
    public RefreshToken createRefreshToken(String userId) {
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUserId(userId);
        refreshToken.setExpiryDate(Instant.now().plusMillis(Long.parseLong(refreshTokenDurationMs)));
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setCreateBy(userId);
        refreshToken.setCreateDate(LocalDateTime.now());
        refreshToken.setUpdateBy(userId);
        refreshToken.setUpdateDate(LocalDateTime.now());
        refreshToken.setDeleteFlag("F");

        refreshTokenMapper.insert(refreshToken);
        return refreshToken;
    }

    @Override
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenMapper.delete(token.getToken());
            throw new TokenRefreshException(token.getToken(),
                    "Refresh token was expired. Please make a new signin request");
        }

        return token;
    }

    @Override
    public int deleteByUserId(String userId) {
        return refreshTokenMapper.deleteByUser(userMapper.findById(userId));
    }

    @Override
    public TokenRefreshResponse refreshToken(String requestRefreshToken) {
        try {
            RefreshToken refreshToken = refreshTokenMapper.findByToken(requestRefreshToken).get();
            this.verifyExpiration(refreshToken);
            Usr user = userMapper.findById(refreshToken.getUserId());
            String token = jwtsService.generateToken(user);
            TokenRefreshResponse response = new TokenRefreshResponse(token, requestRefreshToken);
            return response;
        } catch (Exception e) {
            throw new TokenRefreshException(requestRefreshToken,
                    "Refresh token is not in database!");
        }

    }
}
