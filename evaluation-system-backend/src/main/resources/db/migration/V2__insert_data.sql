-- dept data
INSERT INTO dept (dept_id,dept_nm,dept_cd,director_id,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg) VALUES
    ('dept20250101001','Information Technology','IT','emp20250101999','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('dept20250101002','Human Resources','HR','emp20250101999','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F');

-- pos data
INSERT INTO pos (pos_id,pos_nm,pos_cd,pos_desc,dept_id,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg) VALUES
    ('pos20250101001','Developer','DEV','Software Developer','dept20250101001','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('pos20250101002','Tester','TEST','Software Tester','dept20250101001','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('pos20250101003','Business Analyst','BA','Business Analyst','dept20250101001','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('pos20250101004','IT Operations','OPS','IT Operations','dept20250101001','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('pos20250101005','HR Generalist','HRG','HR Generalist','dept20250101002','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('pos20250101006','Recruiter','REC','Recruiter','dept20250101002','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('pos20250101007','HR Admin','ADM','HR Administrator','dept20250101001','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F');
-- lvl data
INSERT INTO lvl (lvl_id,lvl_nm,lvl_cd,lvl_desc,pos_id,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg) VALUES
    ('lvl20250101001','Fresher','FRESHER','Entry','pos20250101001','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101002','Junior','JUNIOR','Junior','pos20250101001','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101003','Middle','MIDDLE','Middle','pos20250101001','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101004','Senior','SENIOR','Senior','pos20250101001','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101005','Fresher','FRESHER','Entry','pos20250101002','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101006','Junior','JUNIOR','Junior','pos20250101002','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101007','Middle','MIDDLE','Middle','pos20250101002','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101008','Senior','SENIOR','Senior','pos20250101002','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101009','Fresher','FRESHER','Entry','pos20250101003','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101010','Junior','JUNIOR','Junior','pos20250101003','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101011','Middle','MIDDLE','Middle','pos20250101003','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101012','Junior','JUNIOR','Junior','pos20250101003','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101013','Middle','MIDDLE','Middle','pos20250101004','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101014','Senior','SENIOR','Senior','pos20250101004','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101015','Junior','JUNIOR','Junior','pos20250101005','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101016','Middle','MIDDLE','Middle','pos20250101005','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('lvl20250101017','Senior','SENIOR','Senior','pos20250101005','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F');

-- sys_role data
INSERT INTO sys_role (sys_role_id, sys_role_cd, sys_role_desc) VALUES
    ('sys_role20250101001','ADMIN','Description for System Role'),
    ('sys_role20250101002','FORM','Role that can access form management for CRUD'),
    ('sys_role20250101003','USER','Only access page of user');

-- emp data
INSERT INTO emp (emp_id,emp_nm,emp_no,emp_email,comp_role_cd,dept_cd,pos_cd,lvl_cd,salary_lvl,team_id,emp_status_cd,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg,last_rev_dt,next_rev_dt) VALUES
    ('emp20250101001','To Minh Nhat','258157','tominhat@cycberlogitec.com','MEMBER','IT','DEV','FRESHER',14000000,'team20250101001','ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F',NULL,NULL),
    ('emp20250101002','Hoang Manh Ha','258158','hoangmanhha@cycberlogitec.com','MEMBER','IT','DEV','JUNIOR',19000000,'team20250101001','ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F',NULL,NULL),
    ('emp20250101003','Nguyen Thanh Tai','258159','nguyenthanhtai@cycberlogitec.com','MEMBER','IT','DEV','MIDDLE',25000000,'team20250101001','ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F',NULL,NULL),
    ('emp202501019991','Director HR Duong','258201','directorhrduong@cycberlogitec.com',NULL,'HR','HR','SENIOR',60000000,NULL,'ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F',NULL,NULL),
    ('emp202501019099','Manager Minh','258300','managerminh@cycberlogitec.com',NULL,'IT','DEV','SENIOR',40000000,NULL,'ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F',NULL,NULL),
    ('emp2025010190991','Manager Hoang','258301','managerhoang@cycberlogitec.com',NULL,'IT','DEV','SENIOR',40000000,NULL,'ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F',NULL,NULL),
    ('emp202501019009','Leader An Le','258400','leaderanle@cycberlogitec.com',NULL,'IT','DEV','SENIOR',30000000,NULL,'ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F',NULL,NULL),
    ('emp2025010190091','Leader Nguyen Toan','258401','leadertoannguyen@cycberlogitec.com',NULL,'IT','DEV','SENIOR',30000000,NULL,'ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F',NULL,NULL),
    ('emp20250101999','Dir IT Nguyen','258200','directoritnguyen@cycberlogitec.com',NULL,'IT','DEV','SENIOR',60000000,NULL,'ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F',NULL,NULL);

-- usr data
INSERT INTO usr (usr_id,usr_pwd,usr_email,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg) VALUES
    ('admin1','$2a$10$LHLVDiLYyMnm8m4/0ufJq.uDD9NER/wBvd18gqUiNavViDvfKMwyO','ad@company.com','admin','2026-01-14 11:16:45.4041','admin','2026-01-14 11:16:45.4041','F'),
    ('emp20250101002','$2a$10$LHLVDiLYyMnm8m4/0ufJq.uDD9NER/wBvd18gqUiNavViDvfKMwyO','hoangmanhha@cycberlogitec.com','default','2026-01-14 11:20:14.229691','default','2026-01-14 11:20:14.229691','F'),
    ('emp20250101003','$2a$10$LHLVDiLYyMnm8m4/0ufJq.uDD9NER/wBvd18gqUiNavViDvfKMwyO','nguyenthanhtai@cycberlogitec.com','default','2026-01-14 11:20:14.230889','default','2026-01-14 11:20:14.230889','F'),
    ('emp20250101999','$2a$10$LHLVDiLYyMnm8m4/0ufJq.uDD9NER/wBvd18gqUiNavViDvfKMwyO','directoritnguyen@cycberlogitec.com','default','2026-01-14 11:20:14.231528','default','2026-01-14 11:20:14.231528','F'),
    ('emp202501019991','$2a$10$LHLVDiLYyMnm8m4/0ufJq.uDD9NER/wBvd18gqUiNavViDvfKMwyO','directorhrduong@cycberlogitec.com','default','2026-01-14 11:20:14.231911','default','2026-01-14 11:20:14.231911','F'),
    ('emp202501019099','$2a$10$LHLVDiLYyMnm8m4/0ufJq.uDD9NER/wBvd18gqUiNavViDvfKMwyO','managerminh@cycberlogitec.com','default','2026-01-14 11:20:14.232295','default','2026-01-14 11:20:14.232295','F'),
    ('emp2025010190991','$2a$10$LHLVDiLYyMnm8m4/0ufJq.uDD9NER/wBvd18gqUiNavViDvfKMwyO','managerhoang@cycberlogitec.com','default','2026-01-14 11:20:14.232647','default','2026-01-14 11:20:14.232647','F'),
    ('emp202501019009','$2a$10$LHLVDiLYyMnm8m4/0ufJq.uDD9NER/wBvd18gqUiNavViDvfKMwyO','leaderanle@cycberlogitec.com','default','2026-01-14 11:20:14.233107','default','2026-01-14 11:20:14.233107','F'),
    ('emp2025010190091','$2a$10$LHLVDiLYyMnm8m4/0ufJq.uDD9NER/wBvd18gqUiNavViDvfKMwyO','leadertoannguyen@cycberlogitec.com','default','2026-01-14 11:20:14.233629','default','2026-01-14 11:20:14.233629','F'),
    ('emp20250101001','$2a$10$LHLVDiLYyMnm8m4/0ufJq.uDD9NER/wBvd18gqUiNavViDvfKMwyO','tominhat@cycberlogitec.com','admin','2026-01-14 11:16:45.4041','admin','2026-01-14 11:16:45.4041','F'),
    ('admin','$2a$10$LHLVDiLYyMnm8m4/0ufJq.uDD9NER/wBvd18gqUiNavViDvfKMwyO','admin@company.com','admin','2026-01-14 11:16:45.4041','admin','2026-01-14 11:16:45.4041','F');
--pwd: 123456

-- comp_role data
INSERT INTO comp_role (comp_role_id, comp_role_cd, comp_role_desc) VALUES
    ('comp_role20250101001','MEMBER','MEMBER is a member of a team'),
    ('comp_role20250101002','LEADER','LEADER is a leader of a team'),
    ('comp_role20250101003','GM','GM is a general manager of a variety teams'),
    ('comp_role20250101004','DIRECTOR','DIRECTOR is a lead of a department');

-- team data
-- INSERT INTO team (team_id, team_nm, team_cd, leader_id, manager_id, dept_id, parent_id) VALUES
--     ('team20250101001','LBU','LBU','emp20250101009','emp20250101099','dept20250101001',NULL),    --leader: 009, manager: 099
--     ('team20250101002','ABC','ABC','emp202501010091','emp202501010991','dept20250101001',NULL);   --leader: 0091, manager: 0991

-- usr_sys_role data
INSERT INTO usr_sys_role (usr_id,sys_role_id,usr_role_status_cd,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg) VALUES
    ('admin','sys_role20250101001','ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('emp20250101002','sys_role20250101003','ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('emp20250101003','sys_role20250101003','ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('emp20250101001','sys_role20250101003','ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('emp202501019099','sys_role20250101003','ACTIVE','default','2026-01-14 11:28:30.726772','default','2026-01-14 11:28:30.726772','F'),
    ('emp2025010190991','sys_role20250101003','ACTIVE','default','2026-01-14 11:28:30.728144','default','2026-01-14 11:28:30.728144','F'),
    ('emp202501019009','sys_role20250101003','ACTIVE','default','2026-01-14 11:28:30.729404','default','2026-01-14 11:28:30.729404','F'),
    ('emp2025010190091','sys_role20250101003','ACTIVE','default','2026-01-14 11:28:30.730833','default','2026-01-14 11:28:30.730833','F'),
    ('emp20250101999','sys_role20250101003','ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('emp202501019991','sys_role20250101003','ACTIVE','default','2026-01-14 11:28:40.921077','default','2026-01-14 11:28:40.921077','F');

-- form data
INSERT INTO form (form_id,form_title,form_ver,dept_cd,pos_cd,lvl_cd,form_status,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg) VALUES
    ('form20250101001','IT DEV FRESHER',1,'IT','DEV','FRESHER','NEW','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('form20250101002','IT DEV JUNIOR',1,'IT','DEV','JUNIOR','ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('form20250101003','IT DEV MIDDLE',1,'IT','DEV','MIDDLE','ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('form20250101004','IT DEV SENIOR',1,'IT','DEV','SENIOR','ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F'),
    ('form20250101005','IT TESTER FRESHER',1,'IT','TESTER','FRESHER','ACTIVE','default','2026-01-14 11:16:45.4041','default','2026-01-14 11:16:45.4041','F');

-- sec data
-- INSERT INTO sec (sec_id, sec_title,default_rev_conf_cd) VALUES
--     ('sec20250101002','Customer Satisfaction','POINT_SELF_LEADER'),
--     ('sec20250101001','General Evaluation','POINT_SELF_LEADER'),
--     ('sec20250101003','Quality','POINT_SELF_LEADER'),
--     ('sec20250101004','Performance','POINT_SELF_LEADER'),
--     ('sec20250101005','Objectives','POINT_SELF_LEADER'),
--     ('sec20250101006','Achievements','POINT_SELF_LEADER'),
--     ('sec20250101007','Need Improvement','POINT_SELF_LEADER'),
--     ('sec20250101008','Employee''''s suggestion/requests to Company','POINT_SELF_LEADER'),
--     ('sec20250101009','Conclusion & Recommendation of the 1st Line Manager','POINT_SELF_LEADER'),
--     ('sec20250101010','General Manager''''s comments and decision','POINT_SELF_LEADER');

-- rev_conf data
INSERT INTO rev_conf (rev_conf_id, rev_conf_cd,rev_conf_type, rev_conf_roles) VALUES
    ('rev_conf20250101001','POINT_SELF_LEADER', 'POINT', '["SELF","LEADER"]'::jsonb),
    ('rev_conf20250101002','COMMENT_SELF', 'COMMENT', '["SELF"]'::jsonb),
    ('rev_conf20250101003','COMMENT_LEADER', 'COMMENT', '["LEADER"]'::jsonb),
    ('rev_conf20250101004','COMMENT_MANAGER', 'COMMENT', '["MANAGER"]'::jsonb),
    ('rev_conf20250101005','COMMENT_DIRECTOR', 'COMMENT', '["DIRECTOR"]'::jsonb),
    ('rev_conf20250101006','TARGET_LEADER', 'TARGET', '["LEADER"]'::jsonb);

-- form_subm data
INSERT INTO form_subm (form_subm_id,form_id,emp_id,emp_nm,emp_no,emp_curr_dept_cd,emp_curr_pos_cd,emp_curr_lvl_cd,rev_dt,next_rev_dt,form_subm_status,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg) VALUES
    ('form_subm20250101098','form20250101001','emp20250101001','To Minh Nhat','258157','IT','DEV','FRESHER','2025-01-01','2025-06-01','FINAL','default','2026-01-13 10:00:12.917961','default','2026-01-13 10:00:12.917961','F'),
    ('form_subm20250101099','form20250101001','emp20250101001','To Minh Nhat','258157','IT','DEV','FRESHER','2025-06-01','2026-01-01','FINAL','default','2026-01-13 10:00:12.917961','default','2026-01-13 10:00:12.917961','F'),
    ('form_subm20250101001','form20250101001','emp20250101001','To Minh Nhat','258157','IT','DEV','FRESHER','2026-01-01','2026-06-01','PENDING','default','2026-01-13 10:00:12.917961','default','2026-01-13 10:00:12.917961','F'),
    ('form_subm20250101002','form20250101002','emp20250101002','Hoang Manh Ha','258158','IT','DEV','JUNIOR','2026-01-01','2026-06-01','PENDING','default','2026-01-13 14:19:23.6095','default','2026-01-13 14:19:23.6095','F'),
    ('form_subm20250101003','form20250101003','emp20250101003','Nguyen Thanh Tai','258159','IT','DEV','MIDDLE','2026-01-01','2026-06-01','PENDING','default','2026-01-13 14:19:36.873754','default','2026-01-13 14:19:36.873754','F');

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

INSERT INTO form_detail (form_id, sec_id, parent_sec_id, form_detail_ord_no, form_detail_title, rev_conf_cd) VALUES
    ('form20250101002','sec20250101001',NULL,1,'General Evaluation','POINT_SELF_LEADER'),
    ('form20250101002',NULL,'sec20250101001',2,'Cowork with leader','POINT_SELF_LEADER'),
    ('form20250101002',NULL,'sec20250101001',3,'Ability to adapt with the new environment and new changes.','POINT_SELF_LEADER'),
    ('form20250101002',NULL,'sec20250101001',4,'Knowledges & skills improvement in the past 6 months','POINT_SELF_LEADER'),
    ('form20250101002','sec20250101002',NULL,5,'Customer Satisfaction','POINT_SELF_LEADER'),
    ('form20250101002',NULL,'sec20250101002',6,'Report job in detail with evidence','POINT_SELF_LEADER'),
    ('form20250101002',NULL,'sec20250101002',7,'Suggest solution/idea to customer/leader for enhancing system','POINT_SELF_LEADER'),
    ('form20250101002',NULL,'sec20250101002',8,'Working with passion','POINT_SELF_LEADER'),
    ('form20250101002','sec20250101003',NULL,9,'Objectives','COMMENT_SELF'),
    ('form20250101002','sec20250101004',NULL,10,'Achievements','COMMENT_LEADER'),
    ('form20250101002','sec20250101005',NULL,11,'Conclusion & Recommendation of the 1st Line Manager','TARGET_LEADER');

INSERT INTO form_detail (form_id, sec_id, parent_sec_id, form_detail_ord_no, form_detail_title, rev_conf_cd) VALUES
('form20250101003','sec20250101001',NULL,1,'General Evaluation','POINT_SELF_LEADER'),
('form20250101003',NULL,'sec20250101001',2,'Cowork with leader','POINT_SELF_LEADER'),
('form20250101003',NULL,'sec20250101001',3,'Ability to adapt with the new environment and new changes.','POINT_SELF_LEADER'),
('form20250101003',NULL,'sec20250101001',4,'Knowledges & skills improvement in the past 6 months','POINT_SELF_LEADER'),
('form20250101003','sec20250101002',NULL,5,'Customer Satisfaction','POINT_SELF_LEADER'),
('form20250101003',NULL,'sec20250101002',6,'Report job in detail with evidence','POINT_SELF_LEADER'),
('form20250101003',NULL,'sec20250101002',7,'Suggest solution/idea to customer/leader for enhancing system','POINT_SELF_LEADER'),
('form20250101003',NULL,'sec20250101002',8,'Working with passion','POINT_SELF_LEADER'),
('form20250101003','sec20250101003',NULL,9,'Objectives','COMMENT_SELF'),
('form20250101003','sec20250101004',NULL,10,'Achievements','COMMENT_LEADER'),
('form20250101003','sec20250101005',NULL,11,'Conclusion & Recommendation of the 1st Line Manager','TARGET_LEADER');

INSERT INTO target (form_subm_id,form_detail_id,target_ord_no,target_cnt,target_status,rev_form_subm_id) VALUES
                                                                                             ('form_subm20250101099','11',1,'Toeic 900','SUCCESS','form_subm20250101000'),
                                                                                             ('form_subm20250101099','11',2,'Have a presentation','FAIL','form_subm20250101000'),
                                                                                            ('form_subm20250101000','10',1,'Ielts 7.0','WAIT','form_subm20250101001'),
                                                                                            ('form_subm20250101000','10',2,'Join 10 projects','WAIT','form_subm20250101001'),
                                                                                            ('form_subm20250101001','11',1,'Promote to Middle','NEW',NULL),
                                                                                            ('form_subm20250101001','11',2,'Lead a team','NEW',NULL);


-- INSERT INTO criteria (criteria_id,criteria_cnt,sec_id,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg) VALUES
--                                                                                                               ('2','Has good thinking method & problem solving skills','sec20250101002','default','2026-01-09 00:28:14.327839','default','2026-01-09 00:28:14.327839','F'),
--                                                                                                               ('3','Cowork with leader','sec20250101002','default','2026-01-09 00:28:14.330242','default','2026-01-09 00:28:14.330242','F'),
--                                                                                                               ('4','Ability to adapt with the new environment and new changes.','sec20250101002','default','2026-01-09 00:28:14.331221','default','2026-01-09 00:28:14.331221','F'),
--                                                                                                               ('5','Knowledges & skills improvement in the past 6 months','sec20250101002','default','2026-01-09 00:28:14.331994','default','2026-01-09 00:28:14.331994','F'),
--                                                                                                               ('6','Proactive to find new tasks','sec20250101001','default','2026-01-09 00:28:14.332746','default','2026-01-09 00:28:14.332746','F'),
--                                                                                                               ('7','Proactive for OT when necessary','sec20250101001','default','2026-01-09 00:28:14.333377','default','2026-01-09 00:28:14.333377','F'),
--                                                                                                               ('8','Having suitable attitude in any situation','sec20250101001','default','2026-01-09 00:28:14.333918','default','2026-01-09 00:28:14.333918','F'),
--                                                                                                               ('9','Responsibility','sec20250101001','default','2026-01-09 00:28:14.335185','default','2026-01-09 00:28:14.335185','F'),
--                                                                                                               ('10','Cowork with teammate','sec20250101003','default','2026-01-09 00:28:14.336088','default','2026-01-09 00:28:14.336088','F'),
--                                                                                                               ('1','Background knowledge','sec20250101002','default','2026-01-09 00:26:10.650206','default','2026-01-09 00:26:10.650206','F');
--

INSERT INTO sum_subm (sum_subm_id,form_subm_id,sec_title,sum_point,sum_order_no,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg) VALUES
                                                                                                                                        ('sum20260901001','form_subm20250101098','General','9.9',1,'default','2026-01-09 22:41:28.468339','default','2026-01-09 22:41:28.468339','F'),
                                                                                                                                        ('sum20260901002','form_subm20250101098','CUSTOMER','10',2,'default','2026-01-09 22:43:48.772862','default','2026-01-09 22:43:48.772862','F'),
                                                                                                                                        ('sum20260901003','form_subm20250101098','QUALITY','9',3,'default','2026-01-09 22:43:48.784842','default','2026-01-09 22:43:48.784842','F'),
                                                                                                                                        ('sum20260901004','form_subm20250101098','PERFORMANCE','8',4,'default','2026-01-09 22:43:48.79656','default','2026-01-09 22:43:48.79656','F'),
                                                                                                                                        ('sum20260901005','form_subm20250101099','GENERAL EVALUATION','7',1,'default','2026-01-09 22:43:48.808347','default','2026-01-09 22:43:48.808347','F'),
                                                                                                                                        ('sum20260901006','form_subm20250101099','CUSTOMER SATISFACTION','9',2,'default','2026-01-09 22:43:48.820126','default','2026-01-09 22:43:48.820126','F'),
                                                                                                                                        ('sum20260901007','form_subm20250101099','QUALITY','10',3,'default','2026-01-09 22:43:48.832184','default','2026-01-09 22:43:48.832184','F'),
                                                                                                                                        ('sum20260901008','form_subm20250101099','PERFORMANCE','9',4,'default','2026-01-09 22:43:48.877769','default','2026-01-09 22:43:48.877769','F');

INSERT INTO boss_rev (form_subm_id,emp_no,boss_no,boss_rev_role,boss_rev_ord_no,isfinal,cre_usr_id,cre_dt,upd_usr_id,upd_dt,del_flg) VALUES
    (NULL,'258157','258401','MANAGER',2,NULL,'default','2026-01-14 11:44:39.177597','default','2026-01-14 11:44:39.177597','F'),
    (NULL,'258158','258201','LEADER',1,NULL,'default','2026-01-14 11:44:39.180287','default','2026-01-14 11:44:39.180287','F'),
    (NULL,'258158','258401','MANAGER',2,NULL,'default','2026-01-14 11:44:39.181572','default','2026-01-14 11:44:39.181572','F'),
    (NULL,'258159','258401','LEADER',1,NULL,'default','2026-01-14 11:44:39.183877','default','2026-01-14 11:44:39.183877','F'),
    (NULL,'258159','258200','MANAGER',2,NULL,'default','2026-01-14 11:44:39.184853','default','2026-01-14 11:44:39.184853','F'),
    (NULL,'258157','258200','DIRECTOR',3,'T','default','2026-01-14 11:44:39.178977','default','2026-01-14 11:44:39.178977','F'),
    (NULL,'258158','258200','DIRECTOR',3,'T','default','2026-01-14 11:44:39.182764','default','2026-01-14 11:44:39.182764','F'),
    (NULL,'258159','258400','DIRECTOR',3,'T','default','2026-01-14 11:44:39.186248','default','2026-01-14 11:44:39.186248','F'),
    ('form_subm20250101001','258157','258400','LEADER',1,NULL,'default','2026-01-14 11:54:43.694664','default','2026-01-14 11:54:43.694664','F'),
    ('form_subm20250101001','258157','258401','MANAGER',2,NULL,'default','2026-01-14 11:54:43.69579','default','2026-01-14 11:54:43.69579','F'),
    ('form_subm20250101001','258157','258200','DIRECTOR',3,'T','default','2026-01-14 11:54:43.696648','default','2026-01-14 11:54:43.696648','F'),
    ('form_subm20250101002','258158','258201','LEADER',1,NULL,'default','2026-01-14 11:54:43.697361','default','2026-01-14 11:54:43.697361','F'),
    ('form_subm20250101002','258158','258401','MANAGER',2,NULL,'default','2026-01-14 11:54:43.698133','default','2026-01-14 11:54:43.698133','F'),
    ('form_subm20250101002','258158','258200','DIRECTOR',3,'T','default','2026-01-14 11:54:43.699475','default','2026-01-14 11:54:43.699475','F'),
    ('form_subm20250101003','258159','258401','LEADER',1,NULL,'default','2026-01-14 11:54:43.70062','default','2026-01-14 11:54:43.70062','F'),
    ('form_subm20250101003','258159','258200','MANAGER',2,NULL,'default','2026-01-14 11:54:43.701772','default','2026-01-14 11:54:43.701772','F'),
    ('form_subm20250101003','258159','258400','DIRECTOR',3,'T','default','2026-01-14 11:54:43.702767','default','2026-01-14 11:54:43.702767','F');