package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.request.section.CreateSectionRequest;
import com.clt.evaluation_system_backend.dto.request.section.SectionFilterCriteria;
import com.clt.evaluation_system_backend.dto.request.section.UpdateSecRequest;
import com.clt.evaluation_system_backend.dto.response.section.SecResponse;
import com.clt.evaluation_system_backend.exception.custom.NotFoundException;
import com.clt.evaluation_system_backend.mapper.SecCueMapper;
import com.clt.evaluation_system_backend.mapper.SecMapper;
import com.clt.evaluation_system_backend.model.Sec;
import com.clt.evaluation_system_backend.model.SecCue;
import com.clt.evaluation_system_backend.service.SecService;
import com.clt.evaluation_system_backend.service.SeqService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecServiceImpl implements SecService {
    private final SecMapper secMapper;
    private final SeqService seqService;
    private final SecCueMapper secCueMapper;

    @Override
    public SecResponse createSection(CreateSectionRequest request) {
        String secId = seqService.generateNewId(Sec.class);

        Sec sec = new Sec();
        sec.setSecId(secId);
        sec.setSecTitle(request.getSecTitle());
        sec.setCreUsrId("system");
        sec.setDefaultRevConfCd(request.getDefaultRevConfCd());

        secMapper.insert(sec);

        List<SecCue> cues = new ArrayList<>();

        if (request.getDeptCd() != null && !request.getDeptCd().isEmpty()) {
            SecCue deptCue = new SecCue();
            deptCue.setSecId(secId);
            deptCue.setCueCd(request.getDeptCd());
            cues.add(deptCue);
        }

        if (request.getPosCd() != null && !request.getPosCd().isEmpty()) {
            SecCue posCue = new SecCue();
            posCue.setSecId(secId);
            posCue.setCueCd(request.getPosCd());
            cues.add(posCue);
        }

        if (!cues.isEmpty()) {
            secCueMapper.insertBatch(cues);
        }

        return null;
    }

    @Override
    public void updateSection(UpdateSecRequest request, String secId) {
        if (secMapper.existsById(secId) == 0) {
            throw new NotFoundException("Section not found");
        }

        Sec updateSec = new Sec();
        updateSec.setSecId(secId);
        updateSec.setSecTitle(request.getSecTitle());
        updateSec.setDefaultRevConfCd(request.getDefaultRevConfCd());
        updateSec.setUpdUsrId("system");

        secMapper.update(updateSec);


        secCueMapper.deleteBySecId(secId);

        List<SecCue> cues = new ArrayList<>();

        if (request.getDeptCd() != null && !request.getDeptCd().isEmpty()) {
            SecCue deptCue = new SecCue();
            deptCue.setSecId(secId);
            deptCue.setCueCd(request.getDeptCd());
            cues.add(deptCue);
        }

        if (request.getPosCd() != null && !request.getPosCd().isEmpty()) {
            SecCue posCue = new SecCue();
            posCue.setSecId(secId);
            posCue.setCueCd(request.getPosCd());
            cues.add(posCue);
        }

        if (!cues.isEmpty()) {
            secCueMapper.insertBatch(cues);
        }
    }

    @Override
    public void deleteSection(String secId) {
        Sec secToDelete = new Sec();
        secToDelete.setSecId(secId);
        secToDelete.setUpdUsrId("system");

        secMapper.delete(secToDelete);
        secCueMapper.deleteBySecId(secId);
    }

    @Override
    public SecResponse getSectionById(String secId) {
        if (secMapper.existsById(secId) == 0) {
            throw new NotFoundException("Section not found");
        }

        return secMapper.selectById(secId);
    }

    @Override
    public List<SecResponse> getAllSections(SectionFilterCriteria filter) {
        return secMapper.selectAll(filter);
    }
}