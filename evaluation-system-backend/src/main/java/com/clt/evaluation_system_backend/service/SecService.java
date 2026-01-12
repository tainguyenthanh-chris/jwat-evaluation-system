package com.clt.evaluation_system_backend.service;

import java.util.List;

import com.clt.evaluation_system_backend.dto.request.section.CreateSecRequest;
import com.clt.evaluation_system_backend.dto.request.section.SecFilterCriteria;
import com.clt.evaluation_system_backend.dto.request.section.UpdateSecRequest;
import com.clt.evaluation_system_backend.dto.response.section.SecResponse;

public interface SecService {
    SecResponse createSection(CreateSecRequest request);

    SecResponse updateSection(UpdateSecRequest request, String secId);

    void deleteSection(String secId);

    SecResponse getSectionById(String secId);

    List<SecResponse> getAllSections(SecFilterCriteria filter);
}
