package com.clt.evaluation_system_backend.mapper;

import com.clt.evaluation_system_backend.dto.request.BossRevDto;
import com.clt.evaluation_system_backend.dto.response.boss.review.BossReviewAssigneeResponse;
import com.clt.evaluation_system_backend.dto.request.BossRevRequest;
import com.clt.evaluation_system_backend.dto.response.BossReviewResponse;
import com.clt.evaluation_system_backend.model.BossRev;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface BossRevMapper {

        BossRev findByBossNo(@Param("bossNo") String bossNo, @Param("formSubmId") String formSubmId);

        BossRev findBossRev(@Param("bossNo") String bossNo);

        void insertBatchBossRev(List<BossRevDto> bossRevs, @Param("formSubmId") String formSubmId,
                        @Param("empNo") String empNo);

        void deleteBatchBossRev(
                        @Param("bossNo") String bossNo,
                        @Param("formSubmId") String formSubmId,
                        @Param("empNo") String empNo);

        List<BossReviewAssigneeResponse> selectByEmployeeNumber(@Param("employeeNumber") String employeeNumber);

        void insertBatch(List<BossRev> bossRevList);

        List<BossReviewResponse> select(BossRevRequest request);
}
