-- dept data
INSERT INTO dept (dept_id, dept_nm, dept_cd, director_id) VALUES
    ('dept20250101001','Information technology','IT','emp20250101999'), --IT director: 999
    ('dept20250101002','Hiring','HR','emp202501019991'); --HR director: 9991

-- pos data
INSERT INTO pos (pos_id, pos_nm, pos_cd, pos_desc) VALUES
    ('pos20250101001','Developer','DEV','Description for Position'),
    ('pos20250101002','Tester','TESTER','Description for Position'),
    ('pos20250101003','Business Analyst','BA','Description for Position'),
    ('pos20250101004','Product Manager','PM','Description for Position');

-- lvl data
INSERT INTO lvl (lvl_id, lvl_nm, lvl_cd, lvl_desc) VALUES
    ('lvl20250101001','Fresher','FRESHER','Description for Level'),
    ('lvl20250101002','Junior','JUNIOR','Description for Level'),
    ('lvl20250101003','Middle','MIDDLE','Description for Level'),
    ('lvl20250101004','Senior','SENIOR','Description for Level');

-- sys_role data
INSERT INTO sys_role (sys_role_id, sys_role_cd, sys_role_desc) VALUES
    ('sys_role20250101001','ADMIN','Description for System Role'),
    ('sys_role20250101002','FORM','Role that can access form management for CRUD'),
    ('sys_role20250101003','USER','Only access page of user');

-- usr data
-- INSERT INTO usr (usr_id, usr_pwd) VALUES
--     ('admin','1234'),
--     ('emp20250101001','1234'), -- nhat
--     ('emp20250101002','1234'), -- ha
--     ('emp20250101003','1234'), -- tai
--     ('emp20250101999','1234'), -- it director
--     ('emp202501019991','1234'), -- hr director
--     ('emp20250101099','1234'), -- gm 1
--     ('emp202501010991','1234'), -- gm 2
--     ('emp20250101009','1234'), -- leader an le
--     ('emp202501010091','1234'); -- leader toan nguyen
INSERT INTO
    usr (
    usr_id,
    usr_pwd,
    usr_email,
    cre_usr_id,
    cre_dt,
    upd_usr_id,
    upd_dt,
    del_flg
)
VALUES
    (
        'admin',
        '1234',
        'admin@company.com',
        'admin',
        CURRENT_TIMESTAMP,
        'admin',
        CURRENT_TIMESTAMP,
        'F'
    ),
    (
    'admin1',
    '$2a$10$LHLVDiLYyMnm8m4/0ufJq.uDD9NER/wBvd18gqUiNavViDvfKMwyO',
    'ad@company.com',
    'admin',
    CURRENT_TIMESTAMP,
    'admin',
    CURRENT_TIMESTAMP,
    'F'
    );
--pwd: 123456




-- comp_role data
INSERT INTO comp_role (comp_role_id, comp_role_cd, comp_role_desc) VALUES
    ('comp_role20250101001','MEMBER','MEMBER is a member of a team'),
    ('comp_role20250101002','LEADER','LEADER is a leader of a team'),
    ('comp_role20250101003','GM','GM is a general manager of a variety teams'),
    ('comp_role20250101004','DIRECTOR','DIRECTOR is a lead of a department');

-- team data
INSERT INTO team (team_id, team_nm, team_cd, leader_id, manager_id, dept_id, parent_id) VALUES
    ('team20250101001','LBU','LBU','emp20250101009','emp20250101099','dept20250101001',NULL),    --leader: 009, manager: 099
    ('team20250101002','ABC','ABC','emp202501010091','emp202501010991','dept20250101001',NULL);   --leader: 0091, manager: 0991
-- emp data
INSERT INTO emp (emp_id, emp_nm, emp_no, emp_email, comp_role_cd, dept_cd, pos_cd, lvl_cd, salary_lvl, team_id) VALUES
    ('emp20250101001', 'To Minh Nhat','258157','tominhat@cycberlogitec.com',
     'MEMBER','IT','DEV','FRESHER',14000000,'team20250101001'),
    ('emp20250101002', 'Hoang Manh Ha','258158','hoangmanhha@cycberlogitec.com',
    'MEMBER','IT','DEV','JUNIOR',19000000,'team20250101001'),
    ('emp20250101003', 'Nguyen Thanh Tai','258159','nguyenthanhtai@cycberlogitec.com',
    'MEMBER','IT','DEV','MIDDLE',25000000,'team20250101001'),
    ('emp20250101999', 'Director IT Nguyen','258200','directoritnguyen@cycberlogitec.com',
    NULL,'IT','DEV','SENIOR',60000000,NULL), -- it director
    ('emp202501019991', 'Director HR Duong','258201','directorhrduong@cycberlogitec.com',
    NULL,'HR','HR','SENIOR',60000000,NULL), -- hr director
    ('emp202501019099', 'Manager Minh','258300','managerminh@cycberlogitec.com',
    NULL,'IT','DEV','SENIOR',40000000,NULL), -- it manager
    ('emp2025010190991', 'Manager Hoang','258301','managerhoang@cycberlogitec.com',
    NULL,'IT','DEV','SENIOR',40000000,NULL), -- it manager
    ('emp202501019009', 'Leader An Le','258400','leaderanle@cycberlogitec.com',
    NULL,'IT','DEV','SENIOR',30000000,NULL), -- it leader an le
    ('emp2025010190091', 'Leader Nguyen Toan','258401','leadertoannguyen@cycberlogitec.com',
    NULL,'IT','DEV','SENIOR',30000000,NULL); -- it leader toan nguyen

-- usr_sys_role data
INSERT INTO usr_sys_role (usr_id, sys_role_id) VALUES
    ('admin','sys_role20250101001'), -- admin - admin
    ('emp20250101001','sys_role20250101001'), -- to minh nhat - admin
    ('emp20250101002','sys_role20250101003'), -- ha - user
    ('emp20250101003','sys_role20250101003'), -- tai - user
    ('emp202501019991','sys_role20250101002'); -- hr director - form

-- form data
INSERT INTO form (form_id, form_title, dept_cd, pos_cd, lvl_cd) VALUES
    ('form20250101001','IT DEV FRESHER','IT','DEV','FRESHER');

-- sec data
INSERT INTO sec (sec_id, sec_title,default_rev_conf_cd) VALUES
    ('sec20250101002','Customer Satisfaction','POINT_SELF_LEADER'),
    ('sec20250101001','General Evaluation','POINT_SELF_LEADER'),
    ('sec20250101003','Quality','POINT_SELF_LEADER'),
    ('sec20250101004','Performance','POINT_SELF_LEADER'),
    ('sec20250101005','Objectives','POINT_SELF_LEADER'),
    ('sec20250101006','Achievements','POINT_SELF_LEADER'),
    ('sec20250101007','Need Improvement','POINT_SELF_LEADER'),
    ('sec20250101008','Employee''''s suggestion/requests to Company','POINT_SELF_LEADER'),
    ('sec20250101009','Conclusion & Recommendation of the 1st Line Manager','POINT_SELF_LEADER'),
    ('sec20250101010','General Manager''''s comments and decision','POINT_SELF_LEADER');

-- rev_conf data
INSERT INTO rev_conf (rev_conf_id, rev_conf_cd,rev_conf_type, rev_conf_roles) VALUES
    ('rev_conf20250101001','POINT_SELF_LEADER', 'POINT', '["SELF","LEADER"]'::jsonb),
    ('rev_conf20250101002','COMMENT_SELF', 'COMMENT', '["SELF"]'::jsonb),
    ('rev_conf20250101003','COMMENT_LEADER', 'COMMENT', '["LEADER"]'::jsonb),
    ('rev_conf20250101004','COMMENT_MANAGER', 'COMMENT', '["MANAGER"]'::jsonb),
    ('rev_conf20250101005','COMMENT_DIRECTOR', 'COMMENT', '["DIRECTOR"]'::jsonb),
    ('rev_conf20250101006','TARGET_LEADER', 'TARGET', '["LEADER"]'::jsonb);

-- form_subm data
INSERT INTO form_subm (form_subm_id, form_id, emp_id, emp_nm, emp_no, emp_curr_dept_cd, emp_curr_pos_cd, emp_curr_lvl_cd, rev_dt, next_rev_dt,form_subm_status) VALUES
    ('form_subm20250101000','form20250101001','emp20250101001','To Minh Nhat','258157','IT','DEV','FRESHER','2025-12-01','2026-06-01','FINAL'),
    ('form_subm20250101001','form20250101001','emp20250101001','To Minh Nhat','258157','IT','DEV','FRESHER','2025-12-01','2026-06-01','PENDING');


INSERT INTO form_detail (form_id, sec_id, parent_sec_id, form_detail_ord_no, form_detail_title, rev_conf_cd) VALUES
                                                                                                             ('form20250101001','sec20250101001',NULL,1,'General Evaluation','POINT_SELF_LEADER'),
                                                                                                             ('form20250101001',NULL,'sec20250101001',2,'Background knowledge','POINT_SELF_LEADER'),
                                                                                                             ('form20250101001',NULL,'sec20250101001',3,'Has good thinking method & problem solving skills','POINT_SELF_LEADER'),
                                                                                                             ('form20250101001',NULL,'sec20250101001',4,'Cowork with leader','POINT_SELF_LEADER'),
                                                                                                             ('form20250101001','sec20250101002',NULL,5,'Customer Satisfaction','POINT_SELF_LEADER'),
                                                                                                             ('form20250101001',NULL,'sec20250101002',6,'Proactive to find new tasks','POINT_SELF_LEADER'),
                                                                                                             ('form20250101001',NULL,'sec20250101002',7,'Having suitable attitude in any situation','POINT_SELF_LEADER'),
                                                                                                             ('form20250101001',NULL,'sec20250101002',8,'Responsibility','POINT_SELF_LEADER'),
                                                                                                             ('form20250101001','sec20250101003',NULL,9,'Objectives','COMMENT_SELF'),
                                                                                                             ('form20250101001','sec20250101004',NULL,10,'Achievements','COMMENT_LEADER'),
                                                                                                             ('form20250101001','sec20250101005',NULL,11,'Conclusion & Recommendation of the 1st Line Manager','TARGET_LEADER');
INSERT INTO boss_rev (form_subm_id, emp_no, boss_no, boss_rev_role, boss_rev_ord_no, isFinal) VALUES
                                                                                                  ('form_subm20250101001','258157','258400','LEADER','1','F'),
                                                                                                  ('form_subm20250101001','258157','258401','MANAGER','1','F');

INSERT INTO target (form_subm_id,form_detail_id,target_ord_no,target_cnt,target_status) VALUES
                                                                                            ('form_subm20250101000','10',1,'Ielts 7.0','WAIT'),
                                                                                            ('form_subm20250101000','10',2,'Join 10 projects','WAIT'),
                                                                                            ('form_subm20250101001','11',1,'Promote to Middle','NEW'),
                                                                                            ('form_subm20250101001','11',2,'Lead a team','NEW');


INSERT INTO subm_value (subm_value_id,form_subm_id,form_detail_id,subm_value_role,subm_value,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg) VALUES
                                                                                                                                                     (1,'form_subm20250101001',3,'SELF','10','default','2026-01-06 15:35:16.795686','default','2026-01-06 15:35:16.795686','F'),
                                                                                                                                                     (2,'form_subm20250101001',3,'LEADER','9','default','2026-01-06 15:35:16.800495','default','2026-01-06 15:35:16.800495','F'),
                                                                                                                                                     (3,'form_subm20250101001',4,'SELF','10','default','2026-01-06 15:35:16.802848','default','2026-01-06 15:35:16.802848','F'),
                                                                                                                                                     (4,'form_subm20250101001',4,'LEADER','9','default','2026-01-06 15:35:16.805278','default','2026-01-06 15:35:16.805278','F'),
                                                                                                                                                     (5,'form_subm20250101001',9,'SELF','tuyet voi','default','2026-01-06 15:35:16.807745','default','2026-01-06 15:35:16.807745','F'),
                                                                                                                                                     (6,'form_subm20250101001',10,'LEADER','thang chuc','default','2026-01-06 15:35:16.811833','default','2026-01-06 15:35:16.811833','F');
