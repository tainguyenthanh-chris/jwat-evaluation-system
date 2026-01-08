package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.request.FormSubmRequest;
import com.clt.evaluation_system_backend.dto.request.form.CreateFormTemplateRequest;
import com.clt.evaluation_system_backend.dto.response.*;
import com.clt.evaluation_system_backend.mapper.CriteriaCueMapper;
import com.clt.evaluation_system_backend.mapper.CriteriaMapper;
import com.clt.evaluation_system_backend.mapper.FormMapper;
import com.clt.evaluation_system_backend.model.*;
import com.clt.evaluation_system_backend.service.FormService;
import com.clt.evaluation_system_backend.service.SeqService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FormServiceImpl implements FormService {
    private final FormMapper formMapper;
    private final SeqService seqService;
    private final CriteriaCueMapper criteriaCueMapper;
    private final CriteriaMapper criteriaMapper;

    @Override
    public FormTmplResponse findFormTmplResponse(String department, String position, String level) {
        return null;
    }

    @Override
    public int saveSubmList(List<FormSubmRequest> data) {
        return 0;
    }

    @Override
    @Transactional
    public void createFormTemplate(CreateFormTemplateRequest request) {
        String formId = seqService.generateNewId(Form.class);

        Form form = new Form();
        form.setFormId(formId);
        form.setFormTitle(request.getFormTitle());
        form.setDeptCd(request.getDepartmentCode());
        form.setPosCd(request.getPositionCode());
        form.setLvlCd(request.getLevelCode());
        form.setCreUsrId("SYSTEM");

        formMapper.insertForm(form);

        List<FormDetail> allDetails = new ArrayList<>();
        List<Criteria> criteriaList = new ArrayList<>();
        List<CriteriaCue> criteriaCueList = new ArrayList<>();

        int fromDetailOrder = 1;

        for (CreateFormTemplateRequest.SectionDto section : request.getSectionList()) {

            FormDetail sectionDetail = new FormDetail();
            sectionDetail.setFormId(formId);
            sectionDetail.setSecId(section.getSectionId());
            sectionDetail.setParentSecId(null);
            sectionDetail.setFormDetailOrdNo(fromDetailOrder++);
            sectionDetail.setFormDetailTitle(section.getSectionTitle());
            sectionDetail.setRevConfCd(section.getDefaultReviewConfigCode());
            sectionDetail.setCreUsrId("SYSTEM");

            allDetails.add(sectionDetail);


            List<CreateFormTemplateRequest.CriteriaDto> criteriaRequestList = section.getCriteriaList();
            int len = criteriaRequestList.size();
            if (len == 0) continue;

            List<String> newIdList = seqService.generateListNewId(Criteria.class, len);

            for (int i = 0; i < len; i++) {
                CreateFormTemplateRequest.CriteriaDto criteriaRequest = criteriaRequestList.get(i);

                FormDetail criteriaDetail = new FormDetail();
                criteriaDetail.setFormId(formId);
                criteriaDetail.setSecId(null);
                criteriaDetail.setParentSecId(section.getSectionId());
                criteriaDetail.setFormDetailOrdNo(fromDetailOrder++);
                criteriaDetail.setFormDetailTitle(criteriaRequest.getCriteriaTitle());
                criteriaDetail.setRevConfCd(section.getReviewConfigType());
                criteriaDetail.setCreUsrId("SYSTEM");
                allDetails.add(criteriaDetail);

                String criteriaId = newIdList.get(i);
                Criteria newCriteria = new Criteria();
                newCriteria.setCriteriaId(criteriaId);
                newCriteria.setCriteriaCnt(criteriaRequest.getCriteriaTitle());
                newCriteria.setSecId(section.getSectionId());
                newCriteria.setCreUsrId("SYSTEM");
                criteriaList.add(newCriteria);

                List<CriteriaCue> sectionCueList = new ArrayList<>();
                CriteriaCue deptCue = new CriteriaCue();
                deptCue.setCriteriaCueId(seqService.generateNewId(CriteriaCue.class));
                deptCue.setCriteriaId(criteriaId);
                deptCue.setCueCd(request.getDepartmentCode());
                sectionCueList.add(deptCue);

                CriteriaCue posCue = new CriteriaCue();
                posCue.setCriteriaCueId(seqService.generateNewId(CriteriaCue.class));
                posCue.setCriteriaId(criteriaId);
                posCue.setCueCd(request.getPositionCode());
                sectionCueList.add(posCue);

                criteriaCueList.addAll(sectionCueList);
            }
        }

        formMapper.insertFormDetails(allDetails);
        if (!criteriaList.isEmpty()) {
            criteriaMapper.insertList(criteriaList);
        }

        if (!criteriaCueList.isEmpty()) {
            criteriaCueMapper.insertList(criteriaCueList);
        }
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