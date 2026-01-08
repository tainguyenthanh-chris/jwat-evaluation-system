package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.request.PosCreateRequest;
import com.clt.evaluation_system_backend.dto.request.PosSearchRequest;
import com.clt.evaluation_system_backend.dto.request.PosUpdateRequest;
import com.clt.evaluation_system_backend.dto.response.PosResponse;
import com.clt.evaluation_system_backend.mapper.PosMapper;
import com.clt.evaluation_system_backend.model.Pos;
import com.clt.evaluation_system_backend.service.PosService;
import com.clt.evaluation_system_backend.service.SeqService;
import com.clt.evaluation_system_backend.util.CommonMethods;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PosServiceImpl implements PosService {
    private final PosMapper posMapper;
    private final SeqService seqService;

    @Override
    public void create(PosCreateRequest req) {

        try {
            String newId = seqService.generateNewId(Pos.class);

            Pos pos = new Pos();
            pos.setPosId(newId);
            pos.setPosNm(req.getPosNm());
            pos.setPosCd(req.getPosCd());
            pos.setPosDesc(req.getPosDesc());
            pos.setCreUsrId(CommonMethods.getCurrentUsrId());
            pos.setUpdUsrId(CommonMethods.getCurrentUsrId());
            pos.setDeptId(req.getDeptId());

            posMapper.insert(pos);
        } catch (Exception e) {
            throw new RuntimeException("Insert Position failed");
        }

    }

    @Override
    public void deleteById(String posId) {
        try {
            posMapper.deleteById(posId);
        } catch (Exception e) {
            throw new RuntimeException("Position not found");
        }

    }

    @Override
    public void update(PosUpdateRequest req, String posId) {
        try {
            Pos pos = new Pos();
            pos.setPosId(posId);
            pos.setPosNm(req.getPosNm());
            pos.setPosCd(req.getPosCd());
            pos.setPosDesc(req.getPosDesc());
            pos.setUpdUsrId(CommonMethods.getCurrentUsrId());

            posMapper.update(pos);
        } catch (Exception e) {
            throw new RuntimeException("Position not found");
        }

    }

    @Override
    @Transactional(readOnly = true)
    public PosResponse findById(String posId) {
        var pos = posMapper.findById(posId);
        if (pos == null) {
            throw new RuntimeException("Position not found");
        }
        return pos;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PosResponse> findAll(PosSearchRequest searchRequest) {
        return posMapper.findAll(searchRequest);
    }

}
