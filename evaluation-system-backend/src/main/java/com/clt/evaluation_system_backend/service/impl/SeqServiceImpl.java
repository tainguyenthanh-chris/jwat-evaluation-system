package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.annotation.SeqTable;
import com.clt.evaluation_system_backend.exception.OverMaxRecordException;
import com.clt.evaluation_system_backend.mapper.SeqMapper;
import com.clt.evaluation_system_backend.service.SeqService;
import com.clt.evaluation_system_backend.util.Constant;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SeqServiceImpl implements SeqService {
    private final SeqMapper seqMapper;

    @Override
    public String generateNewId(Class<?> className) {
        SeqTable seqTable = className.getAnnotation(SeqTable.class);
        if (seqTable == null) {
            throw new IllegalStateException(
                    "Missing @SeqTable on class " + className.getName());
        }
        Integer nextIdx = seqMapper.nextSeq(seqTable.value());
        if (nextIdx > Constant.MAX_RECORD_A_DAY) {
            throw new OverMaxRecordException();
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String todayString = LocalDate.now().format(formatter);
        return seqTable.value() + todayString + String.format("%03d", nextIdx);
    }

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void resetDailySeq() {
        seqMapper.resetAllSeq();
    }

}
