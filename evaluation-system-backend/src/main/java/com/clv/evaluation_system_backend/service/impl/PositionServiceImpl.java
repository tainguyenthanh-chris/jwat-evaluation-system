package com.clv.evaluation_system_backend.service.impl;

import com.clv.evaluation_system_backend.model.Position;
import com.clv.evaluation_system_backend.repository.PositionRepository;
import com.clv.evaluation_system_backend.service.PositionService;
import com.clv.evaluation_system_backend.service.SequenceService;
import com.clv.evaluation_system_backend.util.Constant;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PositionServiceImpl implements PositionService {
    private final PositionRepository positionRepository;
    private final SequenceService sequenceService;

    @Transactional
    public Position insert(Position position) {
        String newId = sequenceService.updateIdx(Constant.Position_TABLE_NM);
        return positionRepository.save(position);
    }

    @Transactional
    public List<Position> insertAll(List<Position> itemList) {
        if(itemList.isEmpty()) return null;
        String newId = sequenceService.updateIdx(Constant.Position_TABLE_NM);
        for(Position item : itemList) {
            item.setPositionId(newId);
            newId = sequenceService.generateNewId(newId);

        }
        sequenceService.updateIdx(Constant.Position_TABLE_NM, itemList.size());
        return positionRepository.saveAll(itemList);
    }


}


