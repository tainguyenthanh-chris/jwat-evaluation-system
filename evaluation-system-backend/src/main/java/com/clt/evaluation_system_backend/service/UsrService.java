package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.model.Usr;

public interface UsrService {
    Usr findById(String usrId);

    Usr findByEmail(String email);

    boolean existsById(String usrId);

    boolean existsByEmail(String email);

    void insert(Usr usr);
}
