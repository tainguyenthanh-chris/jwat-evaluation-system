package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.request.SecRequest;
import com.clt.evaluation_system_backend.dto.response.SecResponse;
import com.clt.evaluation_system_backend.mapper.SecMapper;
import com.clt.evaluation_system_backend.model.Sec;
import com.clt.evaluation_system_backend.service.SecService;
import com.clt.evaluation_system_backend.service.SeqService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecServiceImpl implements SecService {
    private final SecMapper secMapper;
    private final SeqService seqService;

    @Override
    @Transactional
    public int create(SecRequest request) {
        System.out.println(request.toString());
        String newId = request.getId() != null
                ? request.getId()
                : seqService.generateNewId(Sec.class);
        Sec sec = new Sec(newId, request.getTitle());
        sec.setCreUsrId("dev");

        List<String> objectIdList = request.getObjectIdList();
        if(objectIdList!=null && !objectIdList.isEmpty()) {
            secMapper.insertSectionCue(newId, objectIdList);
        }
        return secMapper.insert(sec);
    }

    @Override
    public List<SecResponse> findActiveSection() {
        List<SecResponse> secResponseList = secMapper.findActiveSection();
        for(SecResponse secResponse : secResponseList) {
            secResponse.setConfig();
            secResponse.setCueList();
        }
        return secResponseList;
    }

    @Override
    public List<SecResponse> findByTmpl(String tmplId) {
        return List.of();
    }

}