package com.clt.evaluation_system_backend.service.impl;

import com.clt.evaluation_system_backend.dto.request.CriteriaRequest;
import com.clt.evaluation_system_backend.dto.request.SecRequest;
import com.clt.evaluation_system_backend.dto.response.CriteriaResponse;
import com.clt.evaluation_system_backend.dto.response.SecResponse;
import com.clt.evaluation_system_backend.exception.AnyException;
import com.clt.evaluation_system_backend.mapper.CriteriaCueMapper;
import com.clt.evaluation_system_backend.mapper.CriteriaMapper;
import com.clt.evaluation_system_backend.mapper.SecMapper;
import com.clt.evaluation_system_backend.model.Criteria;
import com.clt.evaluation_system_backend.model.CriteriaCue;
import com.clt.evaluation_system_backend.model.Sec;
import com.clt.evaluation_system_backend.service.CriteriaService;
import com.clt.evaluation_system_backend.service.SecService;
import com.clt.evaluation_system_backend.service.SeqService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CriteriaServiceImpl implements CriteriaService {
    private final CriteriaMapper criteriaMapper;
    private final CriteriaCueMapper criteriaCueMapper;
    private final SeqService seqService;


    @Override
    public int create(CriteriaRequest request) {
        String newId = seqService.generateNewId(Criteria.class);
        Criteria criteria = new Criteria();
        criteria.setCriteriaId(newId);
        criteria.setCriteriaCnt(request.getCriteriaContent());
        criteria.setSecId(request.getSectionId());
        criteria.setCreUsrId("dev");
        List<String> cueCodeList = request.getCueCodeList();
        List<CriteriaCue> criteriaCueList = new ArrayList<>();
        if(cueCodeList!=null && cueCodeList.size()>0){
            criteriaCueList=new ArrayList<>();
            for(String cueCode:cueCodeList){
                criteriaCueList.add(new CriteriaCue(criteria.getCriteriaId(), cueCode));
            }
            criteriaCueMapper.insertList(criteriaCueList);
        }
        int re = criteriaMapper.insert(criteria);
        return re;
    }

    @Override
    public int createList(List<CriteriaRequest> requestList) {
        int len = requestList.size();
        if(len == 0) return 0;
        List<String> newIdList = seqService.generateListNewId(Criteria.class,len);
        Criteria criteria = new Criteria();
        List<Criteria> criteriaList = new ArrayList<>();
        List<CriteriaCue> criteriaCueList = new ArrayList<>();
        for(int i=0;i<len;i++){
            criteria = new Criteria();
            criteria.setCriteriaId(newIdList.get(i));
            criteria.setCriteriaCnt(requestList.get(i).getCriteriaContent());
            criteria.setSecId(requestList.get(i).getSectionId());
            criteria.setCreUsrId("dev");
            criteriaList.add(criteria);
            List<String> cueCodeList = requestList.get(i).getCueCodeList();
            if(cueCodeList!=null && cueCodeList.size()>0){
                criteriaCueList=new ArrayList<>();
                for(String cueCode:cueCodeList){
                    criteriaCueList.add(new CriteriaCue(criteria.getCriteriaId(), cueCode));
                }
                criteriaCueMapper.insertList(criteriaCueList);
            }
        }
        int re = criteriaMapper.insertList(criteriaList);
        return re;

    }

    @Override
    public int update(CriteriaRequest request) {
        if(request.getCriteriaId()==null)  throw new AnyException("Not found criteria");
        if (request.getCriteriaContent() == null && request.getSectionId() == null) {
            throw new AnyException("No field to update");
        }
        Criteria criteria = new Criteria();
        criteria.setCriteriaId(request.getCriteriaId());
        criteria.setCriteriaCnt(request.getCriteriaContent());
        criteria.setSecId(request.getSectionId());
        int re = criteriaMapper.update(criteria);
        return re;
    }

    @Override
    public int delete(CriteriaRequest request) {
        if(request.getCriteriaId()==null)  throw new AnyException("Not found criteria");
        Criteria criteria = new Criteria();
        criteria.setCriteriaId(request.getCriteriaId());
        criteria.setDelFlg("T");
        int re = criteriaMapper.update(criteria);
        return re;
    }

    @Override
    @Transactional
    public int updateCue(CriteriaRequest request) {
        if(request.getCriteriaId()==null)  throw new AnyException("Not found criteria");
        List<String> cueCodeList = request.getCueCodeList();
        String criteriaId = request.getCriteriaId().trim();
        if(cueCodeList==null || cueCodeList.isEmpty())  throw new AnyException("No field to update");
        CriteriaCue criteriaCue = new CriteriaCue();
        criteriaCue.setCriteriaId(criteriaId);
        criteriaCueMapper.deleteByCriteria(criteriaCue);
        List<CriteriaCue> criteriaCueList = new ArrayList<>();
        criteriaCueList=new ArrayList<>();
        for(String cueCode:cueCodeList){
            criteriaCueList.add(new CriteriaCue(criteriaId, cueCode.trim()));
        }
        int re = criteriaCueMapper.insertList(criteriaCueList);
        return re;
    }

    @Override
    public List<CriteriaResponse> get(CriteriaRequest request) {
        return criteriaMapper.select(request);
    }


}