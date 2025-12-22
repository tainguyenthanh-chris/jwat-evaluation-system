package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.request.PosRequest;
import com.clt.evaluation_system_backend.mapper.PosMapper;
import com.clt.evaluation_system_backend.mapper.SeqMapper;
import com.clt.evaluation_system_backend.model.Lvl;
import com.clt.evaluation_system_backend.model.Pos;
import com.clt.evaluation_system_backend.service.PosService;
import com.clt.evaluation_system_backend.service.SeqService;
import com.clt.evaluation_system_backend.util.Constant;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PosServiceImpl implements PosService {
    private final PosMapper posMapper;
    private final SeqService seqService;

    @Transactional
    public void create(PosRequest req) {
        String newId = req.getPosId() !=null
                ? req.getPosId()
                : seqService.generateNewId(Pos.class);
        Pos pos = new Pos(newId,req.getPosNm(),req.getPosCd(),
                req.getPosDesc()!=null ? req.getPosDesc() : "Description for Position",
                "dev");
        posMapper.insert(pos);
    }
}
