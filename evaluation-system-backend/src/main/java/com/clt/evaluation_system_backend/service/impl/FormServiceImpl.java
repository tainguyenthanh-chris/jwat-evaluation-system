package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.filter.TargetFilter;
import com.clt.evaluation_system_backend.dto.request.BossRevRequest;
import com.clt.evaluation_system_backend.dto.request.FormRequest;
import com.clt.evaluation_system_backend.dto.request.FormSubmRequest;
import com.clt.evaluation_system_backend.dto.request.form.CreateFormTemplateRequest;
import com.clt.evaluation_system_backend.dto.response.*;
import com.clt.evaluation_system_backend.exception.AnyException;
import com.clt.evaluation_system_backend.mapper.*;
import com.clt.evaluation_system_backend.model.*;
import com.clt.evaluation_system_backend.dto.request.SubmissionDataRequest;
import com.clt.evaluation_system_backend.dto.row.FormSubmissionRow;
import com.clt.evaluation_system_backend.exception.FormException;
import com.clt.evaluation_system_backend.model.Form;
import com.clt.evaluation_system_backend.service.FormService;
import com.clt.evaluation_system_backend.service.SeqService;
import com.clt.evaluation_system_backend.util.CommonMethods;
import com.clt.evaluation_system_backend.util.JsonHelper;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FormServiceImpl implements FormService {
    private final FormMapper formMapper;
    private final TargetMapper targetMapper;
    private final SeqService seqService;
    private final CriteriaCueMapper criteriaCueMapper;
    private final CriteriaMapper criteriaMapper;
    private final EmpMapper empMapper;
    private final BossRevMapper bossRevMapper;


    @Override
    public FormTmplResponse findFormTmplResponse(FormRequest request) {
        List<FormDetailResponse> formDetailResponseList = formMapper.selectFormDetail(request);
        if (formDetailResponseList == null || formDetailResponseList.isEmpty())
            throw new FormException("Form does not have details");
        // if(formDetailResponseList.get(0).getParentSectionId() != null) throw new
        // FormException("First section is null");
        FormTmplResponse form = new FormTmplResponse();
        ConfigResponse config = new ConfigResponse();
        SecResponse section = new SecResponse();
        CriteriaResponse criteria = new CriteriaResponse();
        int sectionOrder = 1;
        int criteriaOrder = 1;
        List<String> configRoleList = new ArrayList<>();

        for (FormDetailResponse item : formDetailResponseList) {
            if (form.getDepartmentCode() == null
                    || form.getPositionCode() == null
                    || form.getLevelCode() == null) {
                form.setDepartmentCode(item.getDepartmentCode());
                form.setPositionCode(item.getPositionCode());
                form.setLevelCode(item.getLevelCode());
            }

            if (item.getSectionId() != null) {
                section = new SecResponse();
                section.setSectionId(item.getSectionId());
                section.setFormDetailId(item.getFormDetailId());
                section.setSectionTitle(item.getFormDetailTitle());
                section.setSectionOrderNo(sectionOrder++);
                if (item.getReviewConfigCode() != null) {
                    config = new ConfigResponse();
                    config.setConfigCode(item.getReviewConfigCode());
                    config.setConfigType(item.getReviewConfigType());
                    configRoleList = JsonHelper.toListString(item.getReviewConfigRoleJson());
                    config.setConfigRoleList(configRoleList);
                    section.setConfig(config);
                }

                form.addSectionData(section);
            } else {
                criteria = new CriteriaResponse();
                criteria.setFormDetailId(item.getFormDetailId());
                // criteria.setCriteriaId(item.getFormDetailId());
                criteria.setCriteriaContent(item.getFormDetailTitle());
                criteria.setCriteriaOrdNo(criteriaOrder++);
                criteria.setParentSectionId(item.getParentSectionId());
                form.addCriteria(criteria);
            }
        }
        form.addSectionDataToList();
        return form;
    }

    @Override
    public int saveSubmList(List<FormSubmRequest> submList) {
        if (submList == null || submList.isEmpty()) {
            throw new FormException("No value is found");
        }
        int rows = formMapper.insertSubmList(submList);
        System.out.println("rows: " + rows);
        return rows;
    }

    @Override
    @Transactional
    public void createFormTemplate(CreateFormTemplateRequest request) {
        String userId = CommonMethods.getCurrentUsrId();
        String formId = seqService.generateNewId(Form.class);
        Form form = new Form();
        form.setFormId(formId);
        form.setFormTitle(request.getFormTitle());
        form.setDeptCd(request.getDepartmentCode());
        form.setPosCd(request.getPositionCode());
        form.setLvlCd(request.getLevelCode());
        form.setCreUsrId(userId);

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
            sectionDetail.setCreUsrId(userId);
            allDetails.add(sectionDetail);

            List<CreateFormTemplateRequest.CriteriaDto> criteriaRequestList = section.getCriteriaList();
            int len = criteriaRequestList.size();
            if (len == 0)
                continue;

            for (int i = 0; i < len; i++) {
                CreateFormTemplateRequest.CriteriaDto criteriaRequest = criteriaRequestList.get(i);
                FormDetail criteriaDetail = new FormDetail();
                criteriaDetail = new FormDetail();
                criteriaDetail.setFormId(formId);
                criteriaDetail.setSecId(null);
                criteriaDetail.setParentSecId(section.getSectionId());
                criteriaDetail.setFormDetailOrdNo(fromDetailOrder++);
                criteriaDetail.setFormDetailTitle(criteriaRequest.getCriteriaTitle());
                criteriaDetail.setRevConfCd(section.getReviewConfigType());
                criteriaDetail.setCreUsrId(userId);
                allDetails.add(criteriaDetail);

                Criteria newCriteria = new Criteria();
                newCriteria.setCriteriaCnt(criteriaRequest.getCriteriaTitle());
                newCriteria.setSecId(section.getSectionId());
                newCriteria.setCreUsrId(userId);
                criteriaList.add(newCriteria);

            }
        }

        List<String> newIdList = seqService.generateListNewId(Criteria.class, criteriaList.size());
        int i=0;
        for(Criteria criteria : criteriaList){
            criteria.setCriteriaId(newIdList.get(i));
            i++;
            CriteriaCue cue = new CriteriaCue();
            cue.setCriteriaId(criteria.getCriteriaId());

            if (request.getDepartmentCode() != null) {
                CriteriaCue deptCue = new CriteriaCue();
                deptCue.setCriteriaId(criteria.getCriteriaId());
                deptCue.setCueCd(request.getDepartmentCode());
                criteriaCueList.add(deptCue);
            }

            if (request.getPositionCode() != null) {
                CriteriaCue posCue = new CriteriaCue();
                posCue.setCriteriaId(criteria.getCriteriaId());
                posCue.setCueCd(request.getPositionCode());
                criteriaCueList.add(posCue);
            }
        }

        for(CriteriaCue criteriaCue : criteriaCueList){
            System.out.println(criteriaCue.toString());
        }

        formMapper.insertFormDetails(allDetails);
        if (!criteriaList.isEmpty()) {
            criteriaMapper.insertList(criteriaList);
        }

        if (!criteriaCueList.isEmpty()) {
            criteriaCueMapper.insertList(criteriaCueList);
        }
    }

    @Override
    public SubmissionDataResponse getSubmissionData(SubmissionDataRequest request) {
        String userId = CommonMethods.getCurrentUsrId();
        String empNo = empMapper.selectEmployeeNoByUserId(userId);
        if (empNo == null) {
            throw new AnyException("Notfound employeeNo from id of user");
        }
        SubmissionDataResponse response = new SubmissionDataResponse();

        boolean isOwnerAccess = false;
        if(request.getEmployeeNo()==null) {
            request.setEmployeeNo(empNo);
            isOwnerAccess = true;
        }

        // get form subm
        List<FormSubmissionRow> formSubmissionRowList = formMapper.selectFormSubmission(request);
        if(formSubmissionRowList.isEmpty()) {
            throw new AnyException("Not in review session");
        }
        response.setFormSubmission(formSubmissionRowList);

        LocalDate reviewDate = response.getReviewDate();
        LocalDate now = LocalDate.now();
        boolean isDifferentMonthOrYear =
                reviewDate != null &&
                        (reviewDate.getYear() != now.getYear()
                                || reviewDate.getMonthValue() != now.getMonthValue());
        if(isDifferentMonthOrYear) {
            throw new AnyException("Not in review session");
        }

        if(isOwnerAccess) {
            if("PENDING".equals(response.getSubmissionStatus())) {
                response.setRevRoleList("SELF");
            } else {
                response.setRevRoleList("NOTHING");
            }
        } else {
            BossRevRequest r = new BossRevRequest();
            r.setEmployeeNo(response.getEmployeeNo());
            r.setFormSubmissionId(response.getFormSubmissionId());
            List<BossReviewResponse> bossList = bossRevMapper.select(r);
            BossReviewResponse boss = bossList.stream()
                    .filter(b -> empNo.equals(b.getBossNo()))
                    .findFirst()
                    .orElse(null);
            if(boss==null) {
                throw new AnyException("You do not have permission to access this page");
            } else {
                String bossRole = boss.getBossReviewRole();
                if(bossRole.equals(response.getSubmissionStatus())) {
                    response.setRevRoleList(bossRole);
                } else {
                    response.setRevRoleList("NOTHING");
                }
            }
        }
        // get form template
        String formId = response.getFormId();
        FormRequest formRequest = new FormRequest();
        formRequest.setFormId(formId);
        System.out.println("formId: " + formId);
        FormTmplResponse formTmplResponse = findFormTmplResponse(formRequest);
        if (formTmplResponse == null)
            throw new FormException("Cannot find form tmpl");
        response.setFormTemplate(formTmplResponse);

        // get subm value
        String formSubmissionId = response.getFormSubmissionId();
        List<SubmissionDataResponse.SubmissionValue> submissionValueList = formMapper
                .selectSubmissionValue(formSubmissionId);
        response.setSubmissionValueMap(submissionValueList);

        // get target
        TargetFilter targetFilter = new TargetFilter();
        targetFilter.setFormSubmissionId(formSubmissionId);
        if("REVIEW".equalsIgnoreCase(request.getMode()))
            targetFilter.setQueryType("REVIEW");
        List<SubmissionDataResponse.Target> targetList = targetMapper.selectTarget(targetFilter);
        response.setTargetList(targetList,formSubmissionId);
        return response;
    }

    @Override
    public List<Form> getAllForms() {
        return formMapper.selectAllForms();
    }
}