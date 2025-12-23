package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.request.FormRequest;
import com.clt.evaluation_system_backend.dto.response.FormTmplItemResponse;
import com.clt.evaluation_system_backend.dto.response.FormTmplResponse;
import com.clt.evaluation_system_backend.mapper.FormMapper;
import com.clt.evaluation_system_backend.service.FormService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FormServiceImpl implements FormService {
    private final FormMapper formMapper;

    @Override
    public FormTmplResponse findFormTmplResponse(String department,String position,String level) {
        List<FormTmplItemResponse> itemList = formMapper.selectFormTmplItem(department,position,level);
        FormTmplResponse form = new FormTmplResponse();
        FormTmplResponse.Section.SectionItem sectionItem = new FormTmplResponse.Section.SectionItem();
        FormTmplResponse.Section section = new FormTmplResponse.Section();
        for(FormTmplItemResponse item : itemList) {
            form.setId(item.getFormId());
            form.setTitle(item.getFormTitle());

            section = new FormTmplResponse.Section();
            // create section
            section.setId(item.getSectionId());
            section.setTitle(item.getSectionTitle());
            section.setOrdNo(item.getSectionOrderNo());
            section.setAnswerType(item.getAnswerType());
            // add section to form
            form.addSection(section);

            // create section item
            sectionItem = new FormTmplResponse.Section.SectionItem();
            sectionItem.setId(item.getSectionItemId());
            sectionItem.setOrdNo(item.getSectionItemOrderNo());
            sectionItem.setContent(item.getSectionItemContent());
            sectionItem.setParentId(section.getId());

            // add section item to form
            form.addSectionItem(sectionItem);

        }
        return form;




    }
}
