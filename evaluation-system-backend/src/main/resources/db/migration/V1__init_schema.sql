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
                     emp_no VARCHAR(6) NOT NULL UNIQUE,
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
                     usr_pwd VARCHAR(10) NOT NULL,
                     cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                     del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);

-- form_tmpl definition
-- DROP TABLE form_tmpl;
CREATE TABLE form_tmpl (
                           form_tmpl_id VARCHAR(30) PRIMARY KEY,
                           form_tmpl_title VARCHAR(100),
                           form_tmpl_ver INT4 DEFAULT 1,
                           dept_cd VARCHAR(10),
                           pos_cd VARCHAR(10),
                           lvl_cd VARCHAR(10),
                           form_tmpl_status VARCHAR(10) DEFAULT 'ACTIVE'

);


-- sec_tmpl definition
-- DROP TABLE sec_tmpl;
CREATE TABLE sec_tmpl (
                          sec_tmpl_id VARCHAR(30) PRIMARY KEY,
                          sec_tmpl_title VARCHAR(100),
                          sec_tmpl_answer_type VARCHAR(10) NOT NULL DEFAULT 'NUMBER',

                          cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                          cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                          upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                          upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                          del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);

-- sec_item_tmpl definition
-- DROP TABLE sec_item_tmpl;
CREATE TABLE sec_item_tmpl (
                               sec_item_tmpl_id VARCHAR(30) PRIMARY KEY,
                               sec_tmpl_id VARCHAR(30) NULL,
                               sec_item_tmpl_cnt TEXT DEFAULT 'Content item',

                               cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
                               cre_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                               upd_usr_id VARCHAR(30)  NOT NULL DEFAULT 'default',
                               upd_dt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
                               del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);

-- form_sec_item_tmpl definition
-- DROP TABLE form_sec_item_tmpl;
CREATE TABLE form_sec_item_tmpl (
                                    form_sec_item_tmpl_id VARCHAR(30) PRIMARY KEY,
                                    form_tmpl_id VARCHAR(30),
                                    sec_tmpl_id VARCHAR(30) ,
                                    sec_ord_no INT4 DEFAULT 1,
                                    sec_item_tmpl_id VARCHAR(30),
                                    sec_item_ord_no INT4 DEFAULT 1,

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
                           form_tmpl_id VARCHAR(30) NOT NULL,
                           emp_nm VARCHAR(100),
                           emp_no VARCHAR(6) NOT NULL,
                           emp_curr_dept_cd VARCHAR(20),
                           emp_curr_lvl_cd VARCHAR(20),
                           emp_curr_pos_cd VARCHAR(20),
                           rev_dt date NULL,
                           next_rev_dt date NULL,
                           form_subm_status VARCHAR(10) DEFAULT 'PROCESSING'
);

-- boss_rev definition
-- DROP TABLE boss_rev;
CREATE TABLE boss_rev (
                          form_subm_id VARCHAR(30),
                          boss_id VARCHAR(30),
                          boss_comp_role_cd  VARCHAR(10),
                          boss_rev_ord_no  INT4,

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

-- target_item definition
-- DROP TABLE target_item;

CREATE TABLE target_item (
    target_item_id VARCHAR(30)  PRIMARY KEY,
    form_subm_id VARCHAR(30) NOT NULL,
    sec_tmpl_id VARCHAR(30),
    target_ord_no INT4,
    target_item_cnt text,
    target_item_status VARCHAR(10) NOT NULL DEFAULT 'NEW',
    cre_usr_id VARCHAR(30) NOT NULL DEFAULT 'default',
    cre_dt TIMESTAMP(6) NULL,
    rev_usr_id VARCHAR(30) NULL,
    rev_dt TIMESTAMP(6) NULL,
    del_flg VARCHAR(1) NOT NULL DEFAULT 'F'
);



