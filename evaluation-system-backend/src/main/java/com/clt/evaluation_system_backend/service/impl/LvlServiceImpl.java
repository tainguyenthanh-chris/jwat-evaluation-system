package com.clt.evaluation_system_backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clt.evaluation_system_backend.dto.request.LvlCreateRequest;
import com.clt.evaluation_system_backend.dto.request.LvlSearchRequest;
import com.clt.evaluation_system_backend.dto.request.LvlUpdateRequest;
import com.clt.evaluation_system_backend.dto.response.LvlResponse;
import com.clt.evaluation_system_backend.mapper.LvlMapper;
import com.clt.evaluation_system_backend.model.Lvl;
import com.clt.evaluation_system_backend.service.LvlService;
import com.clt.evaluation_system_backend.service.SeqService;
import com.clt.evaluation_system_backend.util.CommonMethods;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LvlServiceImpl implements LvlService {

    LvlMapper lvlMapper;
    SeqService seqService;

    @Override
    public void create(LvlCreateRequest req) {

        try {
            String newId = seqService.generateNewId(Lvl.class);

            Lvl lvl = new Lvl();
            lvl.setLvlId(newId);
            lvl.setLvlNm(req.getLvlNm());
            lvl.setLvlCd(req.getLvlCd());
            lvl.setLvlDesc(req.getLvlDesc());
            lvl.setPosId(req.getPosId());
            lvl.setCreUsrId(CommonMethods.getCurrentUsrId());
            lvl.setUpdUsrId(CommonMethods.getCurrentUsrId());

            lvlMapper.insert(lvl);
        } catch (Exception e) {
            throw new RuntimeException("Insert level failed");
        }

    }

    @Override
    public void deleteById(String lvlId) {
        try {
            lvlMapper.deleteById(lvlId);
        } catch (Exception e) {
            throw new RuntimeException("Level not found");
        }

    }

    @Override
    public void update(LvlUpdateRequest req, String lvlId) {
        try {
            Lvl lvl = new Lvl();
            lvl.setLvlId(lvlId);
            lvl.setLvlNm(req.getLvlNm());
            lvl.setLvlCd(req.getLvlCd());
            lvl.setLvlDesc(req.getLvlDesc());
            lvl.setUpdUsrId(CommonMethods.getCurrentUsrId());
            lvlMapper.update(lvl);
        } catch (Exception e) {
            throw new RuntimeException("Level not found");
        }

    }

    @Override
    @Transactional(readOnly = true)
    public LvlResponse findById(String lvlId) {
        var lvl = lvlMapper.findById(lvlId);
        if (lvl == null) {
            throw new RuntimeException("Level not found");
        }
        return lvl;
    }

    @Override
    @Transactional(readOnly = true)
    public List<LvlResponse> findAll(LvlSearchRequest searchRequest) {
        return lvlMapper.findAll(searchRequest);
    }

}
