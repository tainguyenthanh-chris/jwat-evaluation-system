package com.clt.evaluation_system_backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clt.evaluation_system_backend.mapper.UsrMapper;
import com.clt.evaluation_system_backend.model.Usr;
import com.clt.evaluation_system_backend.service.UsrService;

@Service
public class UsrServiceImpl implements UsrService {

    @Autowired
    private UsrMapper usrMapper;

    @Override
    public Usr findById(String usrId) {
        Usr usr = usrMapper.findById(usrId);
        if (usr == null) {
            throw new RuntimeException("User not found with id: " + usrId);
        }
        return usr;
    }

    @Override
    public Usr findByEmail(String email) {
        Usr usr = usrMapper.findByEmail(email);
        if (usr == null) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return usr;
    }

    @Override
    public boolean existsById(String usrId) {
        return usrMapper.existsById(usrId);
    }

    @Override
    public boolean existsByEmail(String email) {
        return usrMapper.existsByEmail(email);
    }

    @Override
    public void insert(Usr usr) {
        usrMapper.insert(usr);
    }

}
