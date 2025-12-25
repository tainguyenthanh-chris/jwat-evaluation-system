package com.clt.evaluation_system_backend.config;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.clt.evaluation_system_backend.mapper.UsrMapper;
import com.clt.evaluation_system_backend.model.Usr;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsrMapper usrMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usr usr = usrMapper.findByEmail(username);
        if (usr == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        return new org.springframework.security.core.userdetails.User(
                usr.getUsrId(),
                usr.getUsrPwd(),
                Collections.emptyList());
    }
}
