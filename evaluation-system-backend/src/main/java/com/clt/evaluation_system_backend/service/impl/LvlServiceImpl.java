package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.request.LvlRequest;
import com.clt.evaluation_system_backend.dto.request.PosRequest;
import com.clt.evaluation_system_backend.mapper.LvlMapper;
import com.clt.evaluation_system_backend.model.Lvl;
import com.clt.evaluation_system_backend.model.Pos;
import com.clt.evaluation_system_backend.service.LvlService;
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
public class LvlServiceImpl implements LvlService {
    private final LvlMapper lvlMapper;
    private final SeqService seqService;

    @Override
    @Transactional
    public void create(LvlRequest req) {
        String newId = req.getLvlId() !=null
                                        ? req.getLvlId()
                                        : seqService.generateNewId(Lvl.class);
        Lvl lvl = new Lvl(newId,req.getLvlNm(), req.getLvlCd(),
                req.getLvlDesc()!=null ? req.getLvlDesc() : "Description for Level",
                "dev");
        lvlMapper.insert(lvl);
    }


}
