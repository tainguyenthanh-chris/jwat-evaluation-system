package com.clv.evaluation_system_backend.service.impl;

import com.clv.evaluation_system_backend.model.*;
import com.clv.evaluation_system_backend.repository.*;
import com.clv.evaluation_system_backend.service.InsertDataService;
import com.clv.evaluation_system_backend.service.SequenceService;
import com.clv.evaluation_system_backend.util.Constant;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InsertDataServiceImpl implements InsertDataService {
    private final SequenceRepository sequenceRepository;
    private final SequenceService sequenceService;
    private final PositionRepository positionRepository;
    private final LevelRepository levelRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final SectionTemplateRepository sectionTemplateRepository;
    private final SectionItemTemplateRepository sectionItemTemplateRepository;
    private final FormTemplateRepository formTemplateRepository;
    private final FormSectionItemTemplateRepository formSectionItemTemplateRepository;
    private final TargetItemRepository targetItemRepository;



    //    User exampleUser = new User("emp10122025001","1234", LocalDateTime.now(),Constant.DEFAULT_DEL_FLAG);
    @Transactional
    public int insertSampleData() {
        String insertDate = "11122025";

        // position
        List<Position> positionList = new ArrayList<>();
        positionList.add(new Position(Constant.Position_TABLE_NM+insertDate+"001","dev","Developer","Lập trình viên"));
        positionList.add(new Position(Constant.Position_TABLE_NM+insertDate+"002","tester","Tester","Kiểm thử viên"));
        positionList.add(new Position(Constant.Position_TABLE_NM+insertDate+"003","BA","Business Analyst","Phân tích Nghiệp vụ"));
        positionList.add(new Position(Constant.Position_TABLE_NM+insertDate+"004","PM","Product Manager","Quản lý Sản phẩm"));
        positionRepository.saveAll(positionList);
        System.out.println("saved position");
        delayExecution(1000);

        // level
        List<Level> levelList = new ArrayList<>();
        levelList.add(new Level(Constant.Level_TABLE_NM+insertDate+"001","fresher","Fresher","0 yoe, fresh graduate"));
        levelList.add(new Level(Constant.Level_TABLE_NM+insertDate+"002","junior","Junior","1-2 yoe"));
        levelList.add(new Level(Constant.Level_TABLE_NM+insertDate+"003","middle","Middle","3-5 yoe"));
        levelList.add(new Level(Constant.Level_TABLE_NM+insertDate+"004","senior","Senior","5+ yoe"));
        levelRepository.saveAll(levelList);
        System.out.println("saved level");
        delayExecution(1000);

        // department
        List<Department> departmentList = new ArrayList<>();
        departmentList.add(new Department(Constant.Department_TABLE_NM+insertDate+"001","Toan Ky","toanky"));
        departmentList.add(new Department(Constant.Department_TABLE_NM+insertDate+"002","Scetpa","scetpa"));
        departmentList.add(new Department(Constant.Department_TABLE_NM+insertDate+"003","korea","korea"));
        departmentRepository.saveAll(departmentList);
        System.out.println("saved department");
        delayExecution(1000);

        // Employee
        List<Employee> employeeList = new ArrayList<>();
        employeeList.add(new Employee(Constant.Employee_TABLE_NM+insertDate+"001","257158","To Minh Nhat","tominhat@cyberlogitec.com",departmentList.get(0),"dev","fresher",14000000,"ACTIVE",Constant.DEFAULT_DEL_FLAG));
        employeeList.add(new Employee(Constant.Employee_TABLE_NM+insertDate+"002","257200","Hoang Manh Ha","hoangmanhha@cyberlogitec.com",departmentList.get(0),"dev","junior",20000000,"ACTIVE",Constant.DEFAULT_DEL_FLAG));
        employeeList.add(new Employee(Constant.Employee_TABLE_NM+insertDate+"003","257300","Nguyen Thanh Tai","nguyenthanhtai@cyberlogitec.com",departmentList.get(0),"dev","middle",24000000,"ACTIVE",Constant.DEFAULT_DEL_FLAG));
        employeeRepository.saveAll(employeeList);
        System.out.println("saved Employee");
        delayExecution(1000);

        // User
        List<User> userList = new ArrayList<>();
        userList.add(new User(Constant.Employee_TABLE_NM+insertDate+"001","1234", LocalDateTime.now(),Constant.DEFAULT_DEL_FLAG));
        userList.add(new User(Constant.Employee_TABLE_NM+insertDate+"002","1234", LocalDateTime.now(),Constant.DEFAULT_DEL_FLAG));
        userList.add(new User(Constant.Employee_TABLE_NM+insertDate+"003","1234", LocalDateTime.now(),Constant.DEFAULT_DEL_FLAG));
        userRepository.saveAll(userList);
        System.out.println("saved User");
        delayExecution(1000);

        // SectionTemplate
        List<SectionTemplate> sectionTemplateList = new ArrayList<>();
        sectionTemplateList.add(new SectionTemplate(Constant.SectionTemplate_TABLE_NM+insertDate+"001","General Evaluation",Constant.POINT_TYPE));
        sectionTemplateList.add(new SectionTemplate(Constant.SectionTemplate_TABLE_NM+insertDate+"002","Customer Satisfaction",Constant.POINT_TYPE));
        sectionTemplateList.add(new SectionTemplate(Constant.SectionTemplate_TABLE_NM+insertDate+"003","Quality",Constant.POINT_TYPE));
        sectionTemplateList.add(new SectionTemplate(Constant.SectionTemplate_TABLE_NM+insertDate+"004","Performance",Constant.POINT_TYPE));
        sectionTemplateList.add(new SectionTemplate(Constant.SectionTemplate_TABLE_NM+insertDate+"005","Objectives",Constant.TEXT_TYPE));
        sectionTemplateList.add(new SectionTemplate(Constant.SectionTemplate_TABLE_NM+insertDate+"006","Achievements",Constant.TEXT_TYPE));
        sectionTemplateList.add(new SectionTemplate(Constant.SectionTemplate_TABLE_NM+insertDate+"007","Need Improvement",Constant.TEXT_TYPE));
        sectionTemplateList.add(new SectionTemplate(Constant.SectionTemplate_TABLE_NM+insertDate+"008","Employee's suggestion/requests to Company",Constant.TEXT_TYPE));
        sectionTemplateList.add(new SectionTemplate(Constant.SectionTemplate_TABLE_NM+insertDate+"009","Conclusion & Recommendation of the 1st Line Manager",Constant.TEXT_TYPE));
        sectionTemplateList.add(new SectionTemplate(Constant.SectionTemplate_TABLE_NM+insertDate+"010","General Manager's comments and decision",Constant.TEXT_TYPE));
        sectionTemplateList.add(new SectionTemplate(Constant.SectionTemplate_TABLE_NM+insertDate+"011","Director's comments and decision",Constant.TEXT_TYPE));
        sectionTemplateRepository.saveAll(sectionTemplateList);
        System.out.println("saved SectionTemplate");
        delayExecution(1000);

        // SectionItemTemplate
        List<SectionItemTemplate> sectionItemTemplateList = new ArrayList<>();
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"001","Background knowledge",Constant.SectionTemplate_TABLE_NM+insertDate+"001"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"002","Has good thinking method & problem solving skills",Constant.SectionTemplate_TABLE_NM+insertDate+"001"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"003","Cowork with leader",Constant.SectionTemplate_TABLE_NM+insertDate+"001"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"004","Ability to adapt with the new environment and new changes.",Constant.SectionTemplate_TABLE_NM+insertDate+"001"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"005","Knowledges & skills improvement in the past 6 months",Constant.SectionTemplate_TABLE_NM+insertDate+"001"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"006","Proactive to find new tasks",Constant.SectionTemplate_TABLE_NM+insertDate+"001"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"007","Proactive for OT when necessary",Constant.SectionTemplate_TABLE_NM+insertDate+"001"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"008","Having suitable attitude in any situation",Constant.SectionTemplate_TABLE_NM+insertDate+"001"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"009","Responsibility",Constant.SectionTemplate_TABLE_NM+insertDate+"001"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"010","Cowork with teammate",Constant.SectionTemplate_TABLE_NM+insertDate+"001"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"011","Internal communication",Constant.SectionTemplate_TABLE_NM+insertDate+"001"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"012","Volunteer spirit",Constant.SectionTemplate_TABLE_NM+insertDate+"001"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"013","Follows company process",Constant.SectionTemplate_TABLE_NM+insertDate+"001"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"014","Listen and understand leader order carefully",Constant.SectionTemplate_TABLE_NM+insertDate+"002"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"015","Communicate with customer/leader efficiently and clearly",Constant.SectionTemplate_TABLE_NM+insertDate+"002"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"016","Report job in detail with evidence",Constant.SectionTemplate_TABLE_NM+insertDate+"002"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"017","Suggest solution/idea to customer/leader for enhancing system",Constant.SectionTemplate_TABLE_NM+insertDate+"002"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"018","Understand what&why about customer requirements",Constant.SectionTemplate_TABLE_NM+insertDate+"002"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"019","Working with passion",Constant.SectionTemplate_TABLE_NM+insertDate+"002"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"020","No causing basic bugs",Constant.SectionTemplate_TABLE_NM+insertDate+"003"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"021","Have ability of understanding all related tasks",Constant.SectionTemplate_TABLE_NM+insertDate+"003"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"022","Understand current job fully and deeply",Constant.SectionTemplate_TABLE_NM+insertDate+"003"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"023","Causing few bugs",Constant.SectionTemplate_TABLE_NM+insertDate+"003"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"024","No repeating bugs",Constant.SectionTemplate_TABLE_NM+insertDate+"003"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"025","Keep plan",Constant.SectionTemplate_TABLE_NM+insertDate+"004"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"026","Comment in code clearly",Constant.SectionTemplate_TABLE_NM+insertDate+"004"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"027","Complete more tasks than expected",Constant.SectionTemplate_TABLE_NM+insertDate+"004"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"028","Reading and Writing English skill",Constant.SectionTemplate_TABLE_NM+insertDate+"004"));
        sectionItemTemplateList.add(new SectionItemTemplate(Constant.SectionItemTemplate_TABLE_NM+insertDate+"029","Speaking and listenning English skill",Constant.SectionTemplate_TABLE_NM+insertDate+"004"));
        sectionItemTemplateRepository.saveAll(sectionItemTemplateList);
        System.out.println("saved SectionItemTemplate");
        delayExecution(1000);

        // FormTemplate
        List<FormTemplate> formTemplateList = new ArrayList<>();
        formTemplateList.add(new FormTemplate(Constant.FormTemplate_TABLE_NM+insertDate+"001","Developer Fresher","dev", "fresher",1,Constant.ACTIVE_STATUS));
        formTemplateList.add(new FormTemplate(Constant.FormTemplate_TABLE_NM+insertDate+"002","Developer Middle","dev", "middle",1,Constant.ACTIVE_STATUS));
        formTemplateRepository.saveAll(formTemplateList);
        System.out.println("saved FormTemplate");
        delayExecution(1000);

        // Form Section Item Template
        List<FormSectionItemTemplate> formSectionItemTemplateList = new ArrayList<>();
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"001",formTemplateList.get(0),sectionTemplateList.get(0),1,sectionItemTemplateList.get(0),1));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"002",formTemplateList.get(0),sectionTemplateList.get(0),1,sectionItemTemplateList.get(1),2));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"003",formTemplateList.get(0),sectionTemplateList.get(0),1,sectionItemTemplateList.get(2),3));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"004",formTemplateList.get(0),sectionTemplateList.get(0),1,sectionItemTemplateList.get(3),4));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"005",formTemplateList.get(0),sectionTemplateList.get(0),1,sectionItemTemplateList.get(4),5));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"006",formTemplateList.get(0),sectionTemplateList.get(1),2,sectionItemTemplateList.get(5),6));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"007",formTemplateList.get(0),sectionTemplateList.get(1),2,sectionItemTemplateList.get(6),7));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"008",formTemplateList.get(0),sectionTemplateList.get(1),2,sectionItemTemplateList.get(9),8));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"009",formTemplateList.get(0),sectionTemplateList.get(1),2,sectionItemTemplateList.get(10),9));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"010",formTemplateList.get(0),sectionTemplateList.get(1),2,sectionItemTemplateList.get(14),10));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"011",formTemplateList.get(0),sectionTemplateList.get(2),3,sectionItemTemplateList.get(16),11));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"012",formTemplateList.get(0),sectionTemplateList.get(2),3,sectionItemTemplateList.get(19),12));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"013",formTemplateList.get(0),sectionTemplateList.get(2),3,sectionItemTemplateList.get(20),13));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"014",formTemplateList.get(0),sectionTemplateList.get(3),4,sectionItemTemplateList.get(21),1));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"015",formTemplateList.get(0),sectionTemplateList.get(3),4,sectionItemTemplateList.get(22),1));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"016",formTemplateList.get(0),sectionTemplateList.get(3),4,sectionItemTemplateList.get(23),1));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"017",formTemplateList.get(0),sectionTemplateList.get(3),4,sectionItemTemplateList.get(24),1));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"018",formTemplateList.get(0),sectionTemplateList.get(4),5));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"019",formTemplateList.get(0),sectionTemplateList.get(5),6));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"020",formTemplateList.get(0),sectionTemplateList.get(6),7));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"021",formTemplateList.get(0),sectionTemplateList.get(8),8));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"022",formTemplateList.get(0),sectionTemplateList.get(9),9));
        formSectionItemTemplateList.add(new FormSectionItemTemplate(Constant.FormSectionItemTemplate_TABLE_NM+insertDate+"023",formTemplateList.get(0),sectionTemplateList.get(10),10));
        formSectionItemTemplateRepository.saveAll((formSectionItemTemplateList));
        System.out.println("saved Form Section Item Template");
        delayExecution(1000);

//        // target
//        List<TargetItem> targetItemList = new ArrayList<>();
//        targetItemList.add(new TargetItem(Constant.TargetItem_TABLE_NM+insertDate+"001",form))
//        targetItemRepository.saveAll(targetItemList);
//        System.out.println("saved target");
//        delayExecution(1000);

        LocalDate today = LocalDate.now();
        List<Sequence> sequenceList = new ArrayList<>();
        sequenceList.add(new Sequence(Constant.Department_TABLE_NM,departmentList.size(),today));
        sequenceList.add(new Sequence(Constant.Employee_TABLE_NM,employeeList.size(),today));
        sequenceList.add(new Sequence(Constant.FormSectionItemTemplate_TABLE_NM,formSectionItemTemplateList.size(),today));
        sequenceList.add(new Sequence(Constant.FormSubmission_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.FormTemplate_TABLE_NM,formTemplateList.size(),today));
        sequenceList.add(new Sequence(Constant.Level_TABLE_NM,levelList.size(),today));
        sequenceList.add(new Sequence(Constant.Position_TABLE_NM,positionList.size(),today));
        sequenceList.add(new Sequence(Constant.Role_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.SectionItemSubmission_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.SectionItemTemplate_TABLE_NM,sectionItemTemplateList.size(),today));
        sequenceList.add(new Sequence(Constant.SectionTemplate_TABLE_NM,sectionTemplateList.size(),today));
        sequenceList.add(new Sequence(Constant.TargetItem_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.User_TABLE_NM, userList.size(), today));
        sequenceList.add(new Sequence(Constant.UserRole_TABLE_NM,0,today));
        sequenceRepository.saveAll(sequenceList);
        System.out.println("saved sequence");
        return 1;
    }

    @Transactional
    public List<Sequence> insertSampleSequence() {
        LocalDate today = LocalDate.now();
        List<Sequence> sequenceList = new ArrayList<>();
        sequenceList.add(new Sequence(Constant.Department_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.Employee_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.FormSectionItemTemplate_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.FormSubmission_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.FormTemplate_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.Level_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.Position_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.Role_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.SectionItemSubmission_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.SectionItemTemplate_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.SectionTemplate_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.TargetItem_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.User_TABLE_NM,0,today));
        sequenceList.add(new Sequence(Constant.UserRole_TABLE_NM,0,today));
        sequenceList = sequenceRepository.saveAll(sequenceList);
        return sequenceList;
    }

    private void delayExecution(long milliseconds) {
        try {
            System.out.println(String.format("Stop for %d ms...", milliseconds));
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("Data initial is interrupted.");
        }
    }
}
