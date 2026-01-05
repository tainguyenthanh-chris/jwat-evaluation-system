-- pos definition
-- DROP TABLE pos;
CREATE TABLE pos (
                     pos_id VARCHAR(30) PRIMARY KEY,
                     pos_nm VARCHAR(100) NULL,
                     pos_cd VARCHAR(10) NOT NULL,
                     pos_desc VARCHAR(100) NULL,

                     cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                     cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                     upd_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                     upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                     del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);

-- lvl definition
-- DROP TABLE lvl;
CREATE TABLE lvl (
                     lvl_id VARCHAR(30) PRIMARY KEY ,
                     lvl_nm VARCHAR(100),
                     lvl_cd VARCHAR(10) NOT NULL,
                     lvl_desc VARCHAR(100),

                     cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                     cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                     upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                     upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                     del_flg VARCHAR(1) NOT NULL DEFAULT 'F'

);

-- sys_role definition
-- DROP TABLE sys_role;

CREATE TABLE sys_role (
                        sys_role_id VARCHAR(30) PRIMARY KEY ,
                        sys_role_cd VARCHAR(10) NULL,
                        sys_role_desc VARCHAR(100),

                        cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                        cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                        upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                        upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                        del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);

-- usr_system_role definition
-- DROP TABLE usr_sys_role;
CREATE TABLE usr_sys_role (
                                 usr_id VARCHAR(30) NOT NULL,
                                 sys_role_id VARCHAR(30) NOT NULL,
                                 usr_role_status_cd VARCHAR(10) NOT NULL DEFAULT 'ACTIVE',

                                 cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                                 cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                                 upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                                 upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                                 del_flg VARCHAR(1) NOT NULL DEFAULT 'F',
                                 CONSTRAINT usr_sys_role_pk PRIMARY KEY (usr_id, sys_role_id)

);

-- company_role definition
-- DROP TABLE comp_role;
CREATE TABLE comp_role (
                              comp_role_id VARCHAR(30) PRIMARY KEY ,
                              comp_role_cd VARCHAR(10) NOT NULL,
                              comp_role_desc VARCHAR(100),

                              cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                              cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                              upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                              upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                              del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);

-- dept definition
-- DROP TABLE dept;
CREATE TABLE dept (
                      dept_id VARCHAR(30) PRIMARY KEY ,
                      dept_nm VARCHAR(100),
                      dept_cd VARCHAR(10) NOT NULL,
                      director_id VARCHAR(30),

                      cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                      cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                      upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                      upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                      del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);

-- team definition
-- DROP TABLE team;
CREATE TABLE team (
                      team_id VARCHAR(30) PRIMARY KEY ,
                      team_nm VARCHAR(100),
                      team_cd VARCHAR(10) NOT NULL,
                      leader_id VARCHAR(30),
                      manager_id VARCHAR(30),
                      dept_id VARCHAR(30),
                      parent_id VARCHAR(30) NULL,

                      cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                      cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                      upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                      upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                      del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);

-- emp definition
-- DROP TABLE emp;
CREATE TABLE emp (
                     emp_id VARCHAR(30) PRIMARY KEY,
                     emp_nm VARCHAR(100),
                     emp_no VARCHAR(30) NOT NULL UNIQUE,
                     emp_email VARCHAR(100) NOT NULL UNIQUE,
                     comp_role_cd VARCHAR(10),
                     dept_cd VARCHAR(10),
                     pos_cd VARCHAR(10),
                     lvl_cd VARCHAR(10),
                     salary_lvl float8 DEFAULT 0,
                     team_id VARCHAR(30),
                     emp_status_cd VARCHAR(10) NOT NULL DEFAULT 'ACTIVE',
                     del_flg VARCHAR(1) NOT NULL DEFAULT 'F'

);

-- usr definition
-- DROP TABLE usr;
CREATE TABLE usr (
                    usr_id VARCHAR(30) PRIMARY KEY,
                    usr_pwd VARCHAR(1000) NOT NULL,
                    usr_email VARCHAR(100) NOT NULL UNIQUE,
                    cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                    cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                    upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                    upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                    del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);

-- form definition
-- DROP TABLE form;
CREATE TABLE form (
                           form_id VARCHAR(30) PRIMARY KEY,
                           form_title VARCHAR(100),
                           form_ver INT4 DEFAULT 1,
                           dept_cd VARCHAR(10),
                           pos_cd VARCHAR(10),
                           lvl_cd VARCHAR(10),
                           form_status VARCHAR(30) NOT NULL DEFAULT 'NEW', -- NEW, ACTIVE, OLD

                           cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                           cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                           upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                           upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                           del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);


-- sec definition
-- DROP TABLE sec;
CREATE TABLE sec (
                          sec_id VARCHAR(30) PRIMARY KEY,
                          sec_title VARCHAR(100),
                          default_rev_conf_cd  VARCHAR(30) NOT NULL DEFAULT 'default',

                          cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                          cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                          upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                          upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                          del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);

-- criteria definition
-- DROP TABLE criteria;
CREATE TABLE criteria (
                                criteria_id VARCHAR(30) PRIMARY KEY,
                                criteria_cnt TEXT DEFAULT 'Content item',
                                sec_id VARCHAR(30) NULL,

                               cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                               cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                               upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                               upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                               del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);

CREATE TABLE rev_conf (
                          rev_conf_id VARCHAR(30) PRIMARY KEY,
                          rev_conf_cd VARCHAR(30),
                          rev_conf_type VARCHAR(30),
                          rev_conf_roles JSONB DEFAULT '[]'::jsonb,

                          cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                          cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                          upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                          upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                          del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);

-- DROP TABLE form_detail
CREATE TABLE form_detail (
                             form_detail_id BIGSERIAL PRIMARY KEY,
                             form_id  VARCHAR(30) NOT NULL,
                             sec_id  VARCHAR(30),
                             parent_sec_id  VARCHAR(30),
                             form_detail_ord_no int,
                             form_detail_title TEXT,
                             rev_conf_cd VARCHAR(30),

                             cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                             cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                             upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                             upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                             del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);



-- form_subm definition
-- DROP TABLE form_subm;
CREATE TABLE form_subm (
                        form_subm_id VARCHAR(30) PRIMARY KEY,
                        form_id VARCHAR(30) NOT NULL,
                        emp_id VARCHAR(30),
                        emp_nm VARCHAR(100),
                        emp_no VARCHAR(30) NOT NULL,
                        emp_curr_dept_cd VARCHAR(30),
                        emp_curr_pos_cd VARCHAR(30),
                        emp_curr_lvl_cd VARCHAR(30),
                        rev_dt date NULL,
                        next_rev_dt date NULL,
                        form_subm_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
                        cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                        cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                        upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                        upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                        del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);

CREATE TABLE subm_value (
                            subm_value_id BIGSERIAL PRIMARY KEY,
                            form_subm_id  VARCHAR(30) NOT NULL,
                            form_detail_id  BIGINT,
                            subm_value_role VARCHAR(30) NOT NULL,
                            subm_value TEXT,

                            cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                            cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                            upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                            upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                            del_flg VARCHAR(1) NOT NULL DEFAULT 'F'


);



CREATE TABLE sec_cue (
                         id BIGSERIAL PRIMARY KEY,
                         sec_id VARCHAR(30) NOT NULL,
                         object_cd_list JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE criteria_cue (
                         id BIGSERIAL PRIMARY KEY,
                         criteria_id VARCHAR(30) NOT NULL,
                         cue_cd VARCHAR(30)
);


-- boss_rev definition
-- DROP TABLE boss_rev;
CREATE TABLE boss_rev (
                          form_subm_id VARCHAR(30),
                          emp_cd VARCHAR(30),
                          boss_id VARCHAR(30),
                          boss_rev_role VARCHAR(30),
                          boss_rev_ord_no INT4,

                          cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                          cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                          upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                          upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                          del_flg VARCHAR(1) NOT NULL DEFAULT 'F',
                          CONSTRAINT boss_rev_pk PRIMARY KEY (form_subm_id, boss_id)

);

-- seq definition
-- DROP TABLE seq;
CREATE TABLE seq (
                     table_nm VARCHAR(30) PRIMARY KEY,
                     last_idx INT4 NULL,
                     last_upd_dt date NULL
);

-- sec_item_subm definition
-- DROP TABLE sec_item_subm;

-- CREATE TABLE sec_item_subm (
--     sec_item_subm_id VARCHAR(30) PRIMARY KEY,
--     form_subm_id VARCHAR(30) NOT NULL,
--     form_sec_item_tmpl_id VARCHAR(30) NOT NULL,
--     sec_item_type VARCHAR(10) NULL,
--     self_rev_point INT4 NULL,
--     leader_rev_point INT4 NULL,
--     text_rev_cnt text NULL,
--     cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
--     cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
--     upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
--     upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
--     del_flg VARCHAR(1) NOT NULL DEFAULT 'F',
-- );

-- target definition
-- DROP TABLE target;

CREATE TABLE target (
    target_id BIGSERIAL PRIMARY KEY,
    form_subm_id VARCHAR(30) NOT NULL,
    form_detail_id BIGINT,
    target_ord_no INT4,
    target_cnt text,
    target_status VARCHAR(30) NOT NULL DEFAULT 'NEW',
    rev_usr_id VARCHAR(30) NULL,
    rev_dt TIMESTAMP(6) NULL,
    
    cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
    cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
    upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);



