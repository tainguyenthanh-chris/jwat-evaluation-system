package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.request.FormSubmRequest;
import com.clt.evaluation_system_backend.dto.response.*;
import com.clt.evaluation_system_backend.exception.FormException;
import com.clt.evaluation_system_backend.mapper.FormMapper;
import com.clt.evaluation_system_backend.service.FormService;
import com.clt.evaluation_system_backend.service.SeqService;
import com.clt.evaluation_system_backend.util.JsonHelper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FormServiceImpl implements FormService {
    private final FormMapper formMapper;
    private final SeqService seqService;

    @Override
    public FormTmplResponse findFormTmplResponse(String department, String position, String level) {
        return null;
    }

    @Override
    public int saveSubmList(List<FormSubmRequest> data) {
        return 0;
    }

//    @Override
//    public FormTmplResponse findFormTmplResponse(String department, String position, String level) {
//        List<FormDetailResponse> formDetailResponseList = formMapper.selectFormDetail(department, position, level);
//        if(formDetailResponseList == null || formDetailResponseList.isEmpty()) throw new FormException("Form does not have details");
////        if(formDetailResponseList.get(0).getParentSectionId() != null) throw new FormException("First section is null");
//        FormTmplResponse form = new FormTmplResponse();
//        ConfigResponse config = new ConfigResponse();
//        SecResponse section = new SecResponse();
//        CriteriaResponse criteria = new CriteriaResponse();
//        int sectionOrder = 1;
//        int criteriaOrder = 1;
//        List<String> configRoleList = new ArrayList<>();
//
//        for(FormDetailResponse item : formDetailResponseList) {
//            if(form.getDepartmentCode()==null
//                || form.getPositionCode()==null
//                || form.getLevelCode()==null) {
//                form.setDepartmentCode(item.getDepartmentCode());
//                form.setPositionCode(item.getPositionCode());
//                form.setLevelCode(item.getLevelCode());
//            }
//
//           if(item.getSectionId()!=null) {
//               section = new SecResponse();
//               section.setSectionId(item.getSectionId());
//               section.setFormDetailId(item.getFormDetailId());
//               section.setSectionTitle(item.getFormDetailTitle());
//               section.setSectionOrderNo(sectionOrder++);
//               if(item.getReviewConfigCode()!=null){
//                   config = new ConfigResponse();
//                   config.setConfigCode(item.getReviewConfigCode());
//                   config.setConfigType(item.getReviewConfigType());
//                   configRoleList = JsonHelper.toListString(item.getReviewConfigRoleJson());
//                   config.setConfigRoleList(configRoleList);
//                   section.setConfig(config);
//               }
//
//               form.addSectionData(section);
//           } else {
//               criteria = new CriteriaResponse();
//               criteria.setFormDetailId(item.getFormDetailId());
////               criteria.setCriteriaId(item.getFormDetailId());
//               criteria.setCriteriaContent(item.getFormDetailTitle());
//               criteria.setCriteriaOrdNo(criteriaOrder++);
//               criteria.setParentSectionId(item.getParentSectionId());
//               form.addCriteria(criteria);
//           }
//        }
//        form.addSectionDataToList();
//        return form;
//    }
//
//    @Override
//    public int saveSubmList(List<FormSubmRequest> submList) {
//        if (submList == null || submList.isEmpty()) {
//            throw new FormException("No value is found");
//        }
//        int rows = formMapper.insertSubmList(submList);
//        System.out.println("rows: " + rows);
//        return rows;
//    }
}