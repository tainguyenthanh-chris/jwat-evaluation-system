package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.model.SecCue;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SecCueMapper {
    void insert(SecCue secCue);
    void insertBatch(List<SecCue> secCues);
    List<SecCue> findBySecId( String secId);
    void deleteBySecId(String secId);
}
