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
import com.clt.evaluation_system_backend.dto.request.SubmissionValueDto;
import com.clt.evaluation_system_backend.dto.response.FormSubmResponse;
import com.clt.evaluation_system_backend.mapper.BossRevMapper;
import com.clt.evaluation_system_backend.mapper.EmpMapper;
import com.clt.evaluation_system_backend.mapper.FormSubmMapper;
import com.clt.evaluation_system_backend.mapper.SubmValueMapper;
import com.clt.evaluation_system_backend.mapper.TargetMapper;
import com.clt.evaluation_system_backend.mapper.UsrMapper;
import com.clt.evaluation_system_backend.model.BossRev;
import com.clt.evaluation_system_backend.model.Emp;
import com.clt.evaluation_system_backend.model.Target;
import com.clt.evaluation_system_backend.model.Usr;
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

    @Autowired
    private EmpMapper empMapper;

    @Autowired
    private UsrMapper usrMapper;

    @Autowired
    private BossRevMapper bossRevMapper;

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
            targetMapper.deleteTargets(formSubmRequest.getFormSubmissionId());
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

        if (formSubmRequest.getSubmissionValueList() != null && !formSubmRequest.getSubmissionValueList().isEmpty()
                && validateReviewRole(formSubmRequest.getRole(), formSubmRequest.getFormSubmissionId())) {
            List<SubmissionValueDto> insertList = formSubmRequest.getSubmissionValueList().stream()
                    .filter(dto -> dto.getSubmissionValueId() == null)
                    .collect(Collectors.toList());

            List<SubmissionValueDto> updateList = formSubmRequest.getSubmissionValueList().stream()
                    .filter(dto -> dto.getSubmissionValueId() != null)
                    .collect(Collectors.toList());

            if (!updateList.isEmpty()) {
                try {
                    submValueMapper.updateBatch(
                            updateList,
                            CommonMethods.getCurrentUsrId());
                } catch (Exception e) {
                    throw new RuntimeException("Failed to update submission values: " + e.getMessage());
                }
            }

            if (insertList.isEmpty()) {
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

    private boolean validateReviewRole(String role, String formSubmId) {
//        String usrId = CommonMethods.getCurrentUsrId();
        String usrId = "usr20260108001";
//        Usr currentUsr = usrMapper.findById(usrId);
//        if (currentUsr == null) {
//            throw new RuntimeException("User not found: " + usrId);
//        }
//        Emp executor = empMapper.findByEmail(currentUsr.getUsrEmail());
//        if (executor == null) {
//            throw new RuntimeException("Employee not found for user: " + usrId);
//        }

//        BossRev bossRevRole = bossRevMapper.findByBossNo(executor.getEmpNo(), formSubmId);
//        if (bossRevRole == null) {
//            throw new RuntimeException("Boss review role not found for employee: " + executor.getEmpNo());
//        }

        // return bossRevRole.getBossRevRole().equalsIgnoreCase(role);
        return true;
    }

}
