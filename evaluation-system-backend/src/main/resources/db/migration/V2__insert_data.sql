-- dept data
INSERT INTO dept (dept_id, dept_nm, dept_cd, director_id) VALUES
('deptIT001','Information Technology','IT','empITDIR01'),
('deptHR001','Human Resources','HR','empHRDIR01');

-- pos data
INSERT INTO pos (pos_id, pos_nm, pos_cd, pos_desc, dept_id) VALUES
-- IT
('posITDEV','Developer','DEV','Software Developer','deptIT001'),
('posITTEST','Tester','TEST','Software Tester','deptIT001'),
('posITBA','Business Analyst','BA','Business Analyst','deptIT001'),
('posITOPS','IT Operations','OPS','IT Operations','deptIT001'),

-- HR
('posHRGEN','HR Generalist','HRG','HR Generalist','deptHR001'),
('posHRREC','Recruiter','REC','Recruiter','deptHR001'),
('posHRADM','HR Admin','ADM','HR Administrator','deptHR001');


-- lvl data
INSERT INTO lvl (lvl_id, lvl_nm, lvl_cd, lvl_desc, pos_id) VALUES
-- DEV
('lvlDEVF','Fresher','FRESHER','Entry','posITDEV'),
('lvlDEVJ','Junior','JUNIOR','Junior','posITDEV'),
('lvlDEVM','Middle','MIDDLE','Middle','posITDEV'),
('lvlDEVS','Senior','SENIOR','Senior','posITDEV'),

-- TEST
('lvlTESTF','Fresher','FRESHER','Entry','posITTEST'),
('lvlTESTJ','Junior','JUNIOR','Junior','posITTEST'),
('lvlTESTM','Middle','MIDDLE','Middle','posITTEST'),
('lvlTESTS','Senior','SENIOR','Senior','posITTEST'),

-- BA
('lvlBAF','Fresher','FRESHER','Entry','posITBA'),
('lvlBAJ','Junior','JUNIOR','Junior','posITBA'),
('lvlBAM','Middle','MIDDLE','Middle','posITBA'),

-- OPS
('lvlOPJ','Junior','JUNIOR','Junior','posITOPS'),
('lvlOPM','Middle','MIDDLE','Middle','posITOPS'),
('lvlOPS','Senior','SENIOR','Senior','posITOPS'),

-- HR
('lvlHRJ','Junior','JUNIOR','Junior','posHRGEN'),
('lvlHRM','Middle','MIDDLE','Middle','posHRGEN'),
('lvlHRS','Senior','SENIOR','Senior','posHRGEN');


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
    ),
    (
        'usr20260108001',
        '$2a$10$LHLVDiLYyMnm8m4/0ufJq.uDD9NER/wBvd18gqUiNavViDvfKMwyO',
        'tominhat@cycberlogitec.com',
        'admin',
        CURRENT_TIMESTAMP,
        'admin',
        CURRENT_TIMESTAMP,
        'F'
    );;
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


/* ---------- DEV / FRESHER (10) ---------- */
INSERT INTO emp (
    emp_id, emp_nm, emp_no, emp_email,
    comp_role_cd, dept_cd, pos_cd, lvl_cd, salary_lvl
)
SELECT
    'empDEVF' || LPAD(g::text,2,'0'),
    'Dev Fresher ' || g,
    '410' || LPAD(g::text,2,'0'),
    'dev.fresher'||g||'@company.com',
    'MEMBER','IT','DEV','FRESHER',12000000
FROM generate_series(1,10) g;


/* ---------- DEV / JUNIOR (12) ---------- */
INSERT INTO emp (
    emp_id, emp_nm, emp_no, emp_email,
    comp_role_cd, dept_cd, pos_cd, lvl_cd, salary_lvl
)
SELECT
    'empDEVJ' || LPAD(g::text,2,'0'),
    'Dev Junior ' || g,
    '420' || LPAD(g::text,2,'0'),
    'dev.junior'||g||'@company.com',
    'MEMBER','IT','DEV','JUNIOR',18000000
FROM generate_series(1,12) g;


/* ---------- DEV / MIDDLE (10) ---------- */
INSERT INTO emp (
    emp_id, emp_nm, emp_no, emp_email,
    comp_role_cd, dept_cd, pos_cd, lvl_cd, salary_lvl
)
SELECT
    'empDEVM' || LPAD(g::text,2,'0'),
    'Dev Middle ' || g,
    '430' || LPAD(g::text,2,'0'),
    'dev.middle'||g||'@company.com',
    'MEMBER','IT','DEV','MIDDLE',25000000
FROM generate_series(1,10) g;


/* ---------- DEV / SENIOR (15 incl director) ---------- */
INSERT INTO emp (
    emp_id, emp_nm, emp_no, emp_email,
    comp_role_cd, dept_cd, pos_cd, lvl_cd, salary_lvl
)
SELECT
    'empDEVS' || LPAD(g::text,2,'0'),
    'Dev Senior ' || g,
    '440' || LPAD(g::text,2,'0'),
    'dev.senior'||g||'@company.com',
    'LEADER','IT','DEV','SENIOR',30000000
FROM generate_series(1,14) g;

INSERT INTO emp (
    emp_id, emp_nm, emp_no, emp_email,
    comp_role_cd, dept_cd, pos_cd, lvl_cd, salary_lvl
) VALUES (
    'empITDIR01','IT Director','44999','it.director@company.com',
    'DIRECTOR','IT','DEV','SENIOR',60000000
);


/* ---------- HR / JUNIOR (10) ---------- */
INSERT INTO emp (
    emp_id, emp_nm, emp_no, emp_email,
    comp_role_cd, dept_cd, pos_cd, lvl_cd, salary_lvl
)
SELECT
    'empHRJ' || LPAD(g::text,2,'0'),
    'HR Junior ' || g,
    '510' || LPAD(g::text,2,'0'),
    'hr.junior'||g||'@company.com',
    'MEMBER','HR','HRG','JUNIOR',15000000
FROM generate_series(1,10) g;


/* ---------- HR / MIDDLE (10) ---------- */
INSERT INTO emp (
    emp_id, emp_nm, emp_no, emp_email,
    comp_role_cd, dept_cd, pos_cd, lvl_cd, salary_lvl
)
SELECT
    'empHRM' || LPAD(g::text,2,'0'),
    'HR Middle ' || g,
    '520' || LPAD(g::text,2,'0'),
    'hr.middle'||g||'@company.com',
    'MEMBER','HR','HRG','MIDDLE',22000000
FROM generate_series(1,10) g;


/* ---------- HR / SENIOR (12 incl director) ---------- */
INSERT INTO emp (
    emp_id, emp_nm, emp_no, emp_email,
    comp_role_cd, dept_cd, pos_cd, lvl_cd, salary_lvl
)
SELECT
    'empHRS' || LPAD(g::text,2,'0'),
    'HR Senior ' || g,
    '530' || LPAD(g::text,2,'0'),
    'hr.senior'||g||'@company.com',
    'LEADER','HR','HRG','SENIOR',28000000
FROM generate_series(1,11) g;

INSERT INTO emp (
    emp_id, emp_nm, emp_no, emp_email,
    comp_role_cd, dept_cd, pos_cd, lvl_cd, salary_lvl
) VALUES (
    'empHRDIR01','HR Director','53999','hr.director@company.com',
    'DIRECTOR','HR','HRG','SENIOR',55000000
);


INSERT INTO form (
    form_id,
    form_title,
    dept_cd,
    pos_cd,
    lvl_cd,
    form_status
)
SELECT
    'form_' || dept_cd || '_' || pos_cd || '_' || lvl_cd,
    dept_cd || ' ' || pos_cd || ' ' || lvl_cd || ' Evaluation Form',
    dept_cd,
    pos_cd,
    lvl_cd,
    'ACTIVE'
FROM (
    SELECT DISTINCT dept_cd, pos_cd, lvl_cd
    FROM emp
    WHERE del_flg = 'F'
) t;

INSERT INTO boss_rev (form_subm_id, emp_no, boss_no, boss_rev_role, boss_rev_ord_no, isFinal) VALUES
                                                                                                  ('form_subm20250101001','258157','258400','LEADER','1','F'),
                                                                                                  ('form_subm20250101001','258157','258401','MANAGER','1','F');

INSERT INTO target (form_subm_id,form_detail_id,target_ord_no,target_cnt,target_status) VALUES
                                                                                            ('form_subm20250101000','10',1,'Ielts 7.0','WAIT'),
                                                                                            ('form_subm20250101000','10',2,'Join 10 projects','WAIT'),
                                                                                            ('form_subm20250101001','11',1,'Promote to Middle','NEW'),
                                                                                            ('form_subm20250101001','11',2,'Lead a team','NEW');


INSERT INTO subm_value (form_subm_id,form_detail_id,subm_value_role,subm_value,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg) VALUES
                                                                                                                                                     ('form_subm20250101001',3,'SELF','10','default','2026-01-06 15:35:16.795686','default','2026-01-06 15:35:16.795686','F'),
                                                                                                                                                     ('form_subm20250101001',3,'LEADER','9','default','2026-01-06 15:35:16.800495','default','2026-01-06 15:35:16.800495','F'),
                                                                                                                                                     ('form_subm20250101001',4,'SELF','10','default','2026-01-06 15:35:16.802848','default','2026-01-06 15:35:16.802848','F'),
                                                                                                                                                     ('form_subm20250101001',4,'LEADER','9','default','2026-01-06 15:35:16.805278','default','2026-01-06 15:35:16.805278','F'),
                                                                                                                                                     ('form_subm20250101001',9,'SELF','tuyet voi','default','2026-01-06 15:35:16.807745','default','2026-01-06 15:35:16.807745','F'),
                                                                                                                                                     ('form_subm20250101001',10,'LEADER','thang chuc','default','2026-01-06 15:35:16.811833','default','2026-01-06 15:35:16.811833','F');
INSERT INTO form_subm (form_subm_id,
                       form_id,
                       emp_id,
                       emp_nm,
                       emp_no,
                       emp_curr_dept_cd,
                        emp_curr_pos_cd,
                          emp_curr_lvl_cd,
                          rev_dt,
                            next_rev_dt,
                       form_subm_status)
VALUES ('FS_IT_DEV_FRESHER_41002', 'form_IT_DEV_FRESHER', 'empDEVF02', 'Dev Fresher 2', '41002','IT', 'DEV', 'FRESHER', '2025-12-01', '2026-06-01', 'PENDING'),
       ('FS_IT_DEV_FRESHER_41003', 'form_IT_DEV_FRESHER', 'empDEVF03', 'Dev Fresher 3', '41003', 'IT', 'DEV', 'FRESHER', '2025-12-01', '2026-06-01', 'PENDING'),
       ('FS_IT_DEV_FRESHER_41004', 'form_IT_DEV_FRESHER', 'empDEVF04', 'Dev Fresher 4', '41004','IT', 'DEV', 'FRESHER', '2025-12-01', '2026-06-01', 'PENDING'),
       ('FS_IT_DEV_FRESHER_41005', 'form_IT_DEV_FRESHER', 'empDEVF05', 'Dev Fresher 5', '41005','IT', 'DEV', 'FRESHER', '2025-12-01', '2026-06-01', 'PENDING'),
       ('FS_IT_DEV_FRESHER_41006', 'form_IT_DEV_FRESHER', 'empDEVF06', 'Dev Fresher 6', '41006','IT', 'DEV', 'FRESHER', '2025-12-01', '2026-06-01', 'PENDING'),
       ('FS_IT_DEV_FRESHER_41007', 'form_IT_DEV_FRESHER', 'empDEVF07', 'Dev Fresher 7', '41007','IT', 'DEV', 'FRESHER', '2025-12-01', '2026-06-01', 'PENDING'),
       ('FS_IT_DEV_FRESHER_41008', 'form_IT_DEV_FRESHER', 'empDEVF08', 'Dev Fresher 8', '41008','IT', 'DEV', 'FRESHER', '2025-12-01', '2026-06-01', 'PENDING'),
       ('FS_IT_DEV_FRESHER_41009', 'form_IT_DEV_FRESHER', 'empDEVF09', 'Dev Fresher 9', '41009','IT', 'DEV', 'FRESHER', '2025-12-01', '2026-06-01', 'PENDING'),
       ('FS_IT_DEV_FRESHER_41010', 'form_IT_DEV_FRESHER', 'empDEVF10', 'Dev Fresher 10', '41010','IT', 'DEV', 'FRESHER', '2025-12-01', '2026-06-01', 'PENDING');
UPDATE emp SET emp_email = 'tai@gmail.com' WHERE emp_no = '41001';
UPDATE emp SET emp_email = 'tai2@gmail.com' WHERE emp_no = '53999';

INSERT INTO boss_rev (form_subm_id,
                      emp_no,
                      boss_no,
                      boss_rev_role,
                      boss_rev_ord_no,
                      isFinal)
VALUES ('FS_IT_DEV_FRESHER_41002', '41002', '41001', 'LEADER', 1, 'F'),
       ('FS_IT_DEV_FRESHER_41003', '41003', '41001', 'LEADER', 1, 'F'),
       ('FS_IT_DEV_FRESHER_41004', '41004', '41001', 'LEADER', 1, 'F'),
       ('FS_IT_DEV_FRESHER_41005', '41005', '41001', 'LEADER', 1, 'F'),
       ('FS_IT_DEV_FRESHER_41006', '41006', '41001', 'LEADER', 1, 'F'),
       ('FS_IT_DEV_FRESHER_41007', '41007', '41001', 'LEADER', 1, 'F'),
       ('FS_IT_DEV_FRESHER_41008', '41008', '41001', 'LEADER', 1, 'F'),
       ('FS_IT_DEV_FRESHER_41009', '41009', '41001', 'LEADER', 1, 'F'),
       ('FS_IT_DEV_FRESHER_41010', '41010', '41001', 'LEADER', 1, 'F');

INSERT INTO boss_rev (form_subm_id,
                      emp_no,
                      boss_no,
                      boss_rev_role,
                      boss_rev_ord_no,
                      isFinal)
VALUES ('FS_IT_DEV_FRESHER_41002', '41002', '53999', 'LEADER', 2, 'T'),
       ('FS_IT_DEV_FRESHER_41003', '41003', '53999', 'LEADER', 2, 'T'),
       ('FS_IT_DEV_FRESHER_41004', '41004', '53999', 'LEADER', 2, 'T'),
       ('FS_IT_DEV_FRESHER_41005', '41005', '53999', 'LEADER', 2, 'T'),
       ('FS_IT_DEV_FRESHER_41006', '41006', '53999', 'LEADER', 2, 'T'),
       ('FS_IT_DEV_FRESHER_41007', '41007', '53999', 'LEADER', 2, 'T'),
       ('FS_IT_DEV_FRESHER_41008', '41008', '53999', 'LEADER', 2, 'T'),
       ('FS_IT_DEV_FRESHER_41009', '41009', '53999', 'LEADER', 2, 'T'),
       ('FS_IT_DEV_FRESHER_41010', '41010', '53999', 'LEADER', 2, 'T');


INSERT INTO criteria (criteria_id,criteria_cnt,sec_id,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg) VALUES
                                                                                                              ('2','Has good thinking method & problem solving skills','sec20250101002','default','2026-01-09 00:28:14.327839','default','2026-01-09 00:28:14.327839','F'),
                                                                                                              ('3','Cowork with leader','sec20250101002','default','2026-01-09 00:28:14.330242','default','2026-01-09 00:28:14.330242','F'),
                                                                                                              ('4','Ability to adapt with the new environment and new changes.','sec20250101002','default','2026-01-09 00:28:14.331221','default','2026-01-09 00:28:14.331221','F'),
                                                                                                              ('5','Knowledges & skills improvement in the past 6 months','sec20250101002','default','2026-01-09 00:28:14.331994','default','2026-01-09 00:28:14.331994','F'),
                                                                                                              ('6','Proactive to find new tasks','sec20250101001','default','2026-01-09 00:28:14.332746','default','2026-01-09 00:28:14.332746','F'),
                                                                                                              ('7','Proactive for OT when necessary','sec20250101001','default','2026-01-09 00:28:14.333377','default','2026-01-09 00:28:14.333377','F'),
                                                                                                              ('8','Having suitable attitude in any situation','sec20250101001','default','2026-01-09 00:28:14.333918','default','2026-01-09 00:28:14.333918','F'),
                                                                                                              ('9','Responsibility','sec20250101001','default','2026-01-09 00:28:14.335185','default','2026-01-09 00:28:14.335185','F'),
                                                                                                              ('10','Cowork with teammate','sec20250101003','default','2026-01-09 00:28:14.336088','default','2026-01-09 00:28:14.336088','F'),
                                                                                                              ('1','Background knowledge','sec20250101002','default','2026-01-09 00:26:10.650206','default','2026-01-09 00:26:10.650206','F');
