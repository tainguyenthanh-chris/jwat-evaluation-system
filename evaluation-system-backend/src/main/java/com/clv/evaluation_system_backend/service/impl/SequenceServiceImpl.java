package com.clv.evaluation_system_backend.service.impl;

import com.clv.evaluation_system_backend.model.Sequence;
import com.clv.evaluation_system_backend.repository.SequenceRepository;
import com.clv.evaluation_system_backend.service.SequenceService;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SequenceServiceImpl implements SequenceService {
    private final EntityManager entityManager;
    private final SequenceRepository sequenceRepository;

    public String getNewId(String tableName) {
        Sequence sequence = sequenceRepository.findByTableName(tableName).orElse(null);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyyyy");
        LocalDate today = LocalDate.now();
        String todayString = LocalDate.now().format(formatter);
        if (sequence == null || !sequence.getLastUpdateDate().equals(today)) {
            return tableName+ todayString+"001";
        }
        String newIndex = "";
        int lastIndex = sequence.getLastIndex();
        if(lastIndex<10) newIndex = "00"+lastIndex;
        else if(lastIndex<100) newIndex = "0"+lastIndex;
        else newIndex = ""+lastIndex;
        return tableName + todayString + newIndex;
    }

    @Transactional
    public String updateIdx(String tableName) {
        Sequence sequence = sequenceRepository.findByTableName(tableName).orElse(null);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyyyy");
        LocalDate today = LocalDate.now();
        String todayString = LocalDate.now().format(formatter);
        if(sequence == null) {
            sequence = new Sequence();
            sequence.setLastUpdateDate(today);
            sequence.setTableName(tableName);
            sequence.setLastIndex(1);
            sequenceRepository.save(sequence);
            return tableName+ todayString+"001";
        }
        if (!sequence.getLastUpdateDate().equals(today)) {
            sequence.setLastUpdateDate(today);
            sequence.setLastIndex(1);
            sequenceRepository.save(sequence);
            return tableName+ todayString+"001";
        }
        String newId = tableName + todayString;
        int newIndex = sequence.getLastIndex()+1;
        if(newIndex<10) newId += "00"+newIndex;
        else if(newIndex<100) newId += "0"+newIndex;
        else newId += ""+newIndex;
        sequence.setLastIndex(newIndex);
        sequenceRepository.save(sequence);
        return newId;
    }

    @Transactional
    public int updateIdx(String tableName, int newIdx) {
        Sequence sequence = sequenceRepository.findByTableName(tableName).orElse(null);
        if(sequence == null) {
            sequence = new Sequence();
            sequence.setLastUpdateDate(LocalDate.now());
            sequence.setTableName(tableName);
            sequence.setLastIndex(1);
            sequence = sequenceRepository.save(sequence);
        }
        sequence.setLastUpdateDate(LocalDate.now());
        sequence.setLastIndex(newIdx);
        sequence = sequenceRepository.save(sequence);
        return 1;
    }



    public String generateNewId(String currentId) {
        String prefix = currentId.substring(0, currentId.length()-3);
        String lastIdxString = currentId.substring(currentId.length()-3);
        int lastIndex = Integer.parseInt(lastIdxString);
        int newIndex = lastIndex+1;
        String newId = prefix;
        if(newIndex<10) newId += "00"+newIndex;
        else if(newIndex<100) newId += "0"+newIndex;
        else newId += ""+newIndex;
        return newId;
    }
}


