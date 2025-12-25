-- dept data
INSERT INTO
    dept (dept_id, dept_nm, dept_cd, director_id)
VALUES
    (
        'dept20250101001',
        'Information technology',
        'IT',
        'emp20250101999'
    ), --IT director: 999
    (
        'dept20250101002',
        'Hiring',
        'HR',
        'emp202501019991'
    );

--HR director: 9991
-- pos data
INSERT INTO
    pos (pos_id, pos_nm, pos_cd, pos_desc)
VALUES
    (
        'pos20250101001',
        'Developer',
        'DEV',
        'Description for Position'
    ),
    (
        'pos20250101002',
        'Tester',
        'TESTER',
        'Description for Position'
    ),
    (
        'pos20250101003',
        'Business Analyst',
        'BA',
        'Description for Position'
    ),
    (
        'pos20250101004',
        'Product Manager',
        'PM',
        'Description for Position'
    );

-- lvl data
INSERT INTO
    lvl (lvl_id, lvl_nm, lvl_cd, lvl_desc)
VALUES
    (
        'lvl20250101001',
        'Fresher',
        'FRESHER',
        'Description for Level'
    ),
    (
        'lvl20250101002',
        'Junior',
        'JUNIOR',
        'Description for Level'
    ),
    (
        'lvl20250101003',
        'Middle',
        'MIDDLE',
        'Description for Level'
    ),
    (
        'lvl20250101004',
        'Senior',
        'SENIOR',
        'Description for Level'
    );

-- sys_role data
INSERT INTO
    sys_role (sys_role_id, sys_role_cd, sys_role_desc)
VALUES
    (
        'sys_role20250101001',
        'ADMIN',
        'Description for System Role'
    ),
    (
        'sys_role20250101002',
        'FORM',
        'Role that can access form management for CRUD'
    ),
    (
        'sys_role20250101003',
        'USER',
        'Only access page of user'
    );

-- usr data
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
    );

-- comp_role data
INSERT INTO
    comp_role (comp_role_id, comp_role_cd, comp_role_desc)
VALUES
    (
        'comp_role20250101001',
        'MEMBER',
        'MEMBER is a member of a team'
    ),
    (
        'comp_role20250101002',
        'LEADER',
        'LEADER is a leader of a team'
    ),
    (
        'comp_role20250101003',
        'GM',
        'GM is a general manager of a variety teams'
    ),
    (
        'comp_role20250101004',
        'DIRECTOR',
        'DIRECTOR is a lead of a department'
    );

-- team data
INSERT INTO
    team (
        team_id,
        team_nm,
        team_cd,
        leader_id,
        manager_id,
        dept_id,
        parent_id
    )
VALUES
    (
        'team20250101001',
        'LBU',
        'LBU',
        'emp20250101009',
        'emp20250101099',
        'dept20250101001',
        NULL
    ), --leader: 009, manager: 099
    (
        'team20250101002',
        'ABC',
        'ABC',
        'emp202501010091',
        'emp202501010991',
        'dept20250101001',
        NULL
    );

--leader: 0091, manager: 0991
-- emp data
INSERT INTO
    emp (
        emp_id,
        emp_nm,
        emp_no,
        emp_email,
        comp_role_cd,
        dept_cd,
        pos_cd,
        lvl_cd,
        salary_lvl,
        team_id
    )
VALUES
    (
        'emp20250101001',
        'To Minh Nhat',
        '258157',
        'tominhat@cycberlogitec.com',
        'MEMBER',
        'IT',
        'DEV',
        'FRESHER',
        14000000,
        'team20250101001'
    ),
    (
        'emp20250101002',
        'Hoang Manh Ha',
        '258158',
        'hoangmanhha@cycberlogitec.com',
        'MEMBER',
        'IT',
        'DEV',
        'JUNIOR',
        19000000,
        'team20250101001'
    ),
    (
        'emp20250101003',
        'Nguyen Thanh Tai',
        '258159',
        'nguyenthanhtai@cycberlogitec.com',
        'MEMBER',
        'IT',
        'DEV',
        'MIDDLE',
        25000000,
        'team20250101001'
    ),
    (
        'emp20250101999',
        'Director IT Nguyen',
        '258200',
        'directoritnguyen@cycberlogitec.com',
        NULL,
        'IT',
        'DEV',
        'SENIOR',
        60000000,
        NULL
    ), -- it director
    (
        'emp202501019991',
        'Director HR Duong',
        '258201',
        'directorhrduong@cycberlogitec.com',
        NULL,
        'HR',
        'HR',
        'SENIOR',
        60000000,
        NULL
    ), -- hr director
    (
        'emp202501019099',
        'Manager Minh',
        '258300',
        'managerminh@cycberlogitec.com',
        NULL,
        'IT',
        'DEV',
        'SENIOR',
        40000000,
        NULL
    ), -- it manager
    (
        'emp2025010190991',
        'Manager Hoang',
        '258301',
        'managerhoang@cycberlogitec.com',
        NULL,
        'IT',
        'DEV',
        'SENIOR',
        40000000,
        NULL
    ), -- it manager
    (
        'emp202501019009',
        'Leader An Le',
        '258400',
        'leaderanle@cycberlogitec.com',
        NULL,
        'IT',
        'DEV',
        'SENIOR',
        30000000,
        NULL
    ), -- it leader an le
    (
        'emp2025010190091',
        'Leader Nguyen Toan',
        '258401',
        'leadertoannguyen@cycberlogitec.com',
        NULL,
        'IT',
        'DEV',
        'SENIOR',
        30000000,
        NULL
    );

-- it leader toan nguyen
-- usr_sys_role data
INSERT INTO
    usr_sys_role (usr_id, sys_role_id)
VALUES
    ('admin', 'sys_role20250101001'), -- admin - admin
    ('emp20250101001', 'sys_role20250101001'), -- to minh nhat - admin
    ('emp20250101002', 'sys_role20250101003'), -- ha - user
    ('emp20250101003', 'sys_role20250101003'), -- tai - user
    ('emp202501019991', 'sys_role20250101002');

-- hr director - form
-- form data
INSERT INTO
    form (form_id, form_title, dept_cd, pos_cd, lvl_cd)
VALUES
    (
        'form20250101001',
        'IT DEV FRESHER',
        'IT',
        'DEV',
        'FRESHER'
    );

-- sec data
INSERT INTO
    sec (sec_id, sec_title, rev_conf_id)
VALUES
    (
        'sec20250101002',
        'Customer Satisfaction',
        'rev_conf20250101001'
    ),
    (
        'sec20250101001',
        'General Evaluation',
        'rev_conf20250101001'
    ),
    (
        'sec20250101003',
        'Quality',
        'rev_conf20250101001'
    ),
    (
        'sec20250101004',
        'Performance',
        'rev_conf20250101001'
    ),
    (
        'sec20250101005',
        'Objectives',
        'rev_conf20250101002'
    ),
    (
        'sec20250101006',
        'Achievements',
        'rev_conf20250101002'
    ),
    (
        'sec20250101007',
        'Need Improvement',
        'rev_conf20250101002'
    ),
    (
        'sec20250101008',
        'Employee''''s suggestion/requests to Company',
        'rev_conf20250101002'
    ),
    (
        'sec20250101009',
        'Conclusion & Recommendation of the 1st Line Manager',
        'rev_conf20250101003'
    ),
    (
        'sec20250101010',
        'General Manager''''s comments and decision',
        'rev_conf20250101002'
    );

-- sec_item
INSERT INTO
    sec_item (sec_item_id, sec_id, sec_item_cnt)
VALUES
    (
        'sec_item20250101001',
        'sec20250101001',
        'Background knowledge'
    ),
    (
        'sec_item20250101002',
        'sec20250101001',
        'Has good thinking method & problem solving skills'
    ),
    (
        'sec_item20250101003',
        'sec20250101001',
        'Cowork with leader'
    ),
    (
        'sec_item20250101004',
        'sec20250101001',
        'Ability to adapt with the new environment and new changes'
    ),
    (
        'sec_item20250101005',
        'sec20250101001',
        'Knowledges & skills improvement in the past 6 months'
    ),
    (
        'sec_item20250101006',
        'sec20250101001',
        'Proactive to find new tasks'
    ),
    (
        'sec_item20250101007',
        'sec20250101001',
        'Proactive for OT when necessary'
    ),
    (
        'sec_item20250101008',
        'sec20250101001',
        'Having suitable attitude in any situation'
    ),
    (
        'sec_item20250101009',
        'sec20250101001',
        'Responsibility'
    ),
    (
        'sec_item20250101010',
        'sec20250101001',
        'Cowork with teammate'
    ),
    (
        'sec_item20250101011',
        'sec20250101001',
        'Internal communication'
    ),
    (
        'sec_item20250101012',
        'sec20250101001',
        'Volunteer spirit'
    ),
    (
        'sec_item20250101013',
        'sec20250101001',
        'Follows company process'
    ),
    (
        'sec_item20250101014',
        'sec20250101002',
        'Listen and understand leader order carefully'
    ),
    (
        'sec_item20250101015',
        'sec20250101002',
        'Communicate with customer/leader efficiently and clearly'
    ),
    (
        'sec_item20250101016',
        'sec20250101002',
        'Report job in detail with evidence'
    ),
    (
        'sec_item20250101017',
        'sec20250101002',
        'Suggest solution/idea to customer/leader for enhancing system'
    ),
    (
        'sec_item20250101018',
        'sec20250101002',
        'Understand what&why about customer requirements'
    ),
    (
        'sec_item20250101019',
        'sec20250101002',
        'Working with passion'
    ),
    (
        'sec_item20250101020',
        'sec20250101003',
        'No causing basic bugs'
    ),
    (
        'sec_item20250101021',
        'sec20250101003',
        'Have ability of understanding all related tasks'
    ),
    (
        'sec_item20250101022',
        'sec20250101003',
        'Understand current job fully and deeply'
    ),
    (
        'sec_item20250101023',
        'sec20250101003',
        'Causing few bugs'
    ),
    (
        'sec_item20250101024',
        'sec20250101003',
        'No repeating bugs'
    ),
    (
        'sec_item20250101025',
        'sec20250101004',
        'Comment in code clearly'
    ),
    (
        'sec_item20250101026',
        'sec20250101004',
        'Complete more tasks than expected'
    ),
    (
        'sec_item20250101027',
        'sec20250101004',
        'Reading and Writing English skill'
    ),
    (
        'sec_item20250101028',
        'sec20250101004',
        'Speaking and listenning English skill'
    );

-- form_tmpl data
INSERT INTO
    form_tmpl (
        form_tmpl_id,
        form_id,
        sec_id,
        sec_ord_no,
        sec_item_id,
        sec_item_ord_no
    )
VALUES
    (
        'form_tmpl20250101001',
        'form20250101001',
        'sec20250101001',
        1,
        'sec_item20250101001',
        1
    ),
    (
        'form_tmpl20250101002',
        'for20250101001',
        'sec20250101001',
        1,
        'sec_item20250101002',
        2
    ),
    (
        'form_tmpl20250101003',
        'form20250101001',
        'sec20250101001',
        1,
        'sec_item20250101003',
        3
    ),
    (
        'form_tmpl20250101004',
        'form20250101001',
        'sec20250101001',
        1,
        'sec_item20250101004',
        4
    ),
    (
        'form_tmpl20250101005',
        'form20250101001',
        'sec20250101001',
        1,
        'sec_item20250101005',
        5
    ),
    (
        'form_tmpl20250101006',
        'form20250101001',
        'sec20250101001',
        1,
        'sec_item20250101006',
        6
    ),
    (
        'form_tmpl20250101007',
        'form20250101001',
        'sec20250101002',
        2,
        'sec_item20250101014',
        1
    ),
    (
        'form_tmpl20250101008',
        'form20250101001',
        'sec20250101002',
        2,
        'sec_item20250101015',
        2
    ),
    (
        'form_tmpl20250101009',
        'form20250101001',
        'sec20250101002',
        2,
        'sec_item20250101016',
        3
    ),
    (
        'form_tmpl20250101010',
        'form20250101001',
        'sec20250101002',
        2,
        'sec_item20250101017',
        4
    ),
    (
        'form_tmpl20250101011',
        'form20250101001',
        'sec20250101002',
        2,
        'sec_item20250101018',
        5
    ),
    (
        'form_tmpl20250101012',
        'form20250101001',
        'sec20250101003',
        3,
        'sec_item20250101020',
        1
    ),
    (
        'form_tmpl20250101013',
        'form20250101001',
        'sec20250101003',
        3,
        'sec_item20250101021',
        2
    ),
    (
        'form_tmpl20250101014',
        'form20250101001',
        'sec20250101003',
        3,
        'sec_item20250101022',
        3
    ),
    (
        'form_tmpl20250101015',
        'form20250101001',
        'sec20250101003',
        3,
        'sec_item20250101023',
        4
    ),
    (
        'form_tmpl20250101016',
        'form20250101001',
        'sec20250101004',
        4,
        'sec_item20250101025',
        1
    ),
    (
        'form_tmpl20250101017',
        'form20250101001',
        'sec20250101004',
        4,
        'sec_item20250101026',
        2
    ),
    (
        'form_tmpl20250101018',
        'form20250101001',
        'sec20250101004',
        4,
        'sec_item20250101027',
        3
    ),
    (
        'form_tmpl20250101019',
        'form20250101001',
        'sec20250101004',
        4,
        'sec_item20250101028',
        4
    ),
    (
        'form_tmpl20250101020',
        'form20250101001',
        'sec20250101005',
        5,
        '',
        1
    ),
    (
        'form_tmpl20250101021',
        'form20250101001',
        'sec20250101006',
        6,
        '',
        1
    );

-- rev_conf data
INSERT INTO
    rev_conf (
        rev_conf_id,
        rev_conf_type,
        rev_conf_num_usr,
        rev_conf_min,
        rev_conf_max
    )
VALUES
    ('rev_conf20250101001', 'POINT', 2, 0, 10),
    ('rev_conf20250101002', 'COMMENT', 1, 0, 0),
    ('rev_conf20250101003', 'COMMENT', 1, 0, 0),
    ('rev_conf20250101004', 'COMMENT', 1, 0, 0),
    ('rev_conf20250101005', 'COMMENT', 1, 0, 0);

-- rev_conf_item data
INSERT INTO
    rev_conf_item (
        rev_conf_item_id,
        rev_conf_id,
        rev_conf_item_role,
        rev_conf_item_ord_no
    )
VALUES
    (
        'rev_conf_item20250101001',
        'rev_conf20250101001',
        'SELF',
        1
    ),
    (
        'rev_conf_item20250101002',
        'rev_conf20250101001',
        'LEADER',
        2
    ),
    (
        'rev_conf_item20250101003',
        'rev_conf20250101002',
        'SELF',
        1
    ),
    (
        'rev_conf_item20250101004',
        'rev_conf20250101003',
        'LEADER',
        1
    ),
    (
        'rev_conf_item20250101005',
        'rev_conf20250101004',
        'GM',
        1
    ),
    (
        'rev_conf_item20250101006',
        'rev_conf20250101005',
        'DIRECTOR',
        1
    );

-- form_subm data
INSERT INTO
    form_subm (
        form_subm_id,
        form_id,
        emp_nm,
        emp_no,
        emp_curr_dept_cd,
        emp_curr_pos_cd,
        emp_curr_lvl_cd,
        rev_dt,
        next_rev_dt
    )
VALUES
    (
        'form_subm20250101001',
        'form20250101001',
        'To Minh Nhat',
        '258157',
        'IT',
        'DEV',
        'FRESHER',
        '2025-12-01',
        '2026-06-01'
    );