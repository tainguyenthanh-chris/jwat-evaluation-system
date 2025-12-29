package com.clt.evaluation_system_backend.service;

import com.clt.evaluation_system_backend.dto.request.SecRequest;
import com.clt.evaluation_system_backend.dto.response.SecResponse;

import java.util.List;

public interface SecService {
    int create(SecRequest request);
    // use when query active tmpl
    List<SecResponse> findActiveSection();

    // use when query tmpl for subm (don't care the status of sec)
    List<SecResponse> findByTmpl(String tmplId);
}
