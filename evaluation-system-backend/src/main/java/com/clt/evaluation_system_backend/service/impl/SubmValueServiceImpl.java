package com.clt.evaluation_system_backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clt.evaluation_system_backend.dto.request.CurrentTargetDto;
import com.clt.evaluation_system_backend.dto.request.FormSubmRequest;
import com.clt.evaluation_system_backend.dto.request.NewTargetDto;
import com.clt.evaluation_system_backend.dto.response.FormSubmResponse;
import com.clt.evaluation_system_backend.mapper.FormSubmMapper;
import com.clt.evaluation_system_backend.mapper.SubmValueMapper;
import com.clt.evaluation_system_backend.mapper.TargetMapper;
import com.clt.evaluation_system_backend.model.Target;
import com.clt.evaluation_system_backend.service.SubmValueService;
import com.clt.evaluation_system_backend.util.CommonMethods;
import com.clt.evaluation_system_backend.util.TargetStatusEnum;

@Service
public class SubmValueServiceImpl implements SubmValueService {

    @Autowired
    private SubmValueMapper submValueMapper;

    @Autowired
    private FormSubmMapper formSubmMapper;

    @Autowired
    private TargetMapper targetMapper;

    @Transactional
    @Override
    public void insertSubmValue(FormSubmRequest formSubmRequest) {

        FormSubmResponse currentFormSubm = formSubmMapper.findByIdWithTargets(formSubmRequest.getFormSubmissionId());
        if (currentFormSubm == null) {
            throw new RuntimeException("Form submission not found: " + formSubmRequest.getFormSubmissionId());
        }

        FormSubmResponse latestFormSubm = formSubmMapper.findLatestByEmpIdWithTargets(currentFormSubm.getEmpId());
        List<Target> lastTarget = latestFormSubm.getTargets();
        List<CurrentTargetDto> currentTarget = formSubmRequest.getCurrentTargetList();

        Map<Long, String> statusMap = currentTarget.stream()
                .collect(Collectors.toMap(
                        CurrentTargetDto::getTargetId,
                        CurrentTargetDto::getTargetStatus));

        lastTarget.forEach(a -> {
            String newStatus = statusMap.get(a.getTargetId());
            if (newStatus != null) {
                a.setTargetStatus(newStatus);
            }
            a.setUpdDt(LocalDateTime.now());
            a.setUpdUsrId(CommonMethods.getCurrentUsrId());
        });

        if (formSubmRequest.getNewTargetList() != null &&
                !formSubmRequest.getNewTargetList().isEmpty()) {
            List<Target> newTargets = buildNewTargets(formSubmRequest.getFormSubmissionId(),
                    formSubmRequest.getNewTargetList());
            try {
                targetMapper.insertTargets(newTargets);
            } catch (Exception e) {
                throw new RuntimeException("Failed to build new targets: " + e.getMessage());
            }
        }

        if (lastTarget != null && !lastTarget.isEmpty()) {
            try {
                targetMapper.updateTargets(lastTarget);
            } catch (Exception e) {
                throw new RuntimeException("Failed to update targets: " + e.getMessage());
            }
        }

        if (formSubmRequest.getSubmissionValueList() != null && !formSubmRequest.getSubmissionValueList().isEmpty()) {
            try {
                submValueMapper.insertBatch(
                        formSubmRequest.getFormSubmissionId(),
                        formSubmRequest.getSubmissionValueList(),
                        CommonMethods.getCurrentUsrId());

            } catch (Exception e) {
                throw new RuntimeException("Failed to insert submission values: " + e.getMessage());
            }
        }

    }

    private List<Target> buildNewTargets(String formSubmId, List<NewTargetDto> newTargets) {
        return newTargets.stream()
                .map(dto -> {
                    Target target = new Target();
                    target.setFormSubmId(formSubmId);
                    target.setFormDetailId(dto.getFormDetailId());
                    target.setTargetOrdNo(dto.getTargetOrderNo());
                    target.setTargetCnt(dto.getTargetContent());
                    target.setRevUsrId(CommonMethods.getCurrentUsrId());
                    target.setRevDt(LocalDateTime.now());

                    target.setTargetStatus(TargetStatusEnum.NEW.getCode());
                    target.setCreUsrId(CommonMethods.getCurrentUsrId());
                    target.setUpdUsrId(CommonMethods.getCurrentUsrId());

                    return target;
                })
                .toList();
    }

}
