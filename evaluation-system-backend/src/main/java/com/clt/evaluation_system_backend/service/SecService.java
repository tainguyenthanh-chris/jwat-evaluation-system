package com.clt.evaluation_system_backend.service;

import java.util.List;

import com.clt.evaluation_system_backend.dto.request.section.CreateSectionRequest;
import com.clt.evaluation_system_backend.dto.request.section.SectionFilterCriteria;
import com.clt.evaluation_system_backend.dto.request.section.UpdateSecRequest;
import com.clt.evaluation_system_backend.dto.response.section.SecResponse;

public interface SecService {
    SecResponse createSection(CreateSectionRequest request);

    void updateSection(UpdateSecRequest request, String secId);

    void deleteSection(String secId);

    SecResponse getSectionById(String secId);

    List<SecResponse> getAllSections(SectionFilterCriteria filter);
}
