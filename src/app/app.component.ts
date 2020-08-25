import { NgModule, Component, ViewChild, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
    DxSchedulerModule,
    DxSchedulerComponent,
    DxTemplateModule,
    DxTabsModule
} from 'devextreme-angular';
import { ScheduleService, Activity, Division, Tab, Teacher, Student, Tutoring, Schedule } from './schedule.service';
import Query from 'devextreme/data/query';
import { expressionType } from '@angular/compiler/src/output/output_ast';
import { scheduled } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ScheduleService]
})
export class AppComponent {
    @ViewChild(DxSchedulerComponent, { static: false }) scheduler: DxSchedulerComponent;
    currentDate: Date = new Date(2015, 4, 25);
    startDayHour: number = 7;
    endDayHour: number = 17;
    tabs: Tab[];
    currentTab: Tab;
    timerSetTF: boolean;
    tutorTeachers: Teacher[];
    qualifiedTeachers: Teacher[] = [];
    conflictStudents: Student[] = [];
    constructor(service: ScheduleService) {
        this.tabs = service.getTabs();
        this.timerSetTF = true;
        this.currentTab = this.tabs[0];
        this.tutorTeachers = service.getTutoringTeachers();
    }
    getActivityByID(id) {
        return this.currentTab.activities[id];
    }
    getTutoringScheduleByID(id) {
        return this, this.currentTab.schedule[id];
    }
    selectTab(e) {
        this.timerSetTF = false;
        if (this.tabs[e.itemIndex].type === "tutoring" && this.tabs[e.itemIndex].tutorClass.scheduleCreatedTF === false)
            if (this.canMakeSchedule(e.itemIndex)) {
                this.makeTutoringSchedule(e.itemIndex);
                this.tabs[e.itemIndex].tutorClass.scheduleCreatedTF = true;
            }
            else
                return;
        setTimeout(() => {
            this.currentTab = this.tabs[e.itemIndex];
            //console.log(this.currentTab.schedule[0].teacher.name);
            this.timerSetTF = true;
        }, 250);
    }
    makeTutoringSchedule(index: number) {
        let students = this.tabs[index].tutorClass.students;
        this.setQualifiedTeachers(index);
        let schedule = new Schedule();
        let studentSchedule = new Schedule();
        schedule.students = [];
        schedule.divisionID = 0;
        this.tabs[index].schedule = [];
        let startingHour = this.startDayHour;
        for (let i = 0; i < students.length; i++) {
            let endingHour = startingHour + this.tabs[index].tutorClass.numberOfHours;
            let startingDate = new Date(2015, 4, 25, startingHour);
            let endingDate = new Date(2015, 4, 25, endingHour);
            if (this.checkIfUndefinedSchedule(students[i])) {
                //console.log(students[i].name + " is now Empty")
                students[i].schedules = [];
            }
            // if (this.conflictStudents.length > 0) {
            //     console.log("Should be John Doe:", this.conflictStudents[this.conflictStudents.length - 1].name);
            //     if (this.noSchedConflictsTF(this.conflictStudents[this.conflictStudents.length - 1], startingDate, endingDate)) {
            //         schedule.students.push(this.conflictStudents.pop());
            //         studentSchedule.startDate = startingDate;
            //         studentSchedule.endDate = endingDate;
            //         students[i].schedules.push(studentSchedule);
            //         console.log("Why Am I")
            //     }
            // }
            if (this.noSchedConflictsTF(students[i], startingDate, endingDate) && schedule.students.length < this.tabs[index].tutorClass.numberOfStudentsPer) {
                schedule.students.push(students[i]);
                studentSchedule.startDate = startingDate;
                studentSchedule.endDate = endingDate;
                //studentSchedule.teacher=schedule.teacher;
                students[i].schedules.push(studentSchedule);
                console.log("Students Schedule", students[i].schedules);
                studentSchedule = new Schedule();
            } else {
                console.log("John Doe's: ", students[i].schedules);
                this.conflictStudents.push(students[i]);
                students.splice(i, 0);
                console.log(this.conflictStudents);
            }
            if (schedule.students.length === this.tabs[index].tutorClass.numberOfStudentsPer)//3
            {
                schedule.teacher = this.applyTeacher();
                if (this.checkIfUndefinedSchedule(schedule.teacher))
                    schedule.teacher.schedules = [];
                if (schedule.teacher !== undefined && this.noSchedConflictsTF(schedule.teacher, startingDate, endingDate)) {
                    schedule.startDate = startingDate;
                    schedule.endDate = endingDate;
                    this.tabs[index].schedule.push(schedule);
                    console.log(schedule);

                    schedule = new Schedule();
                    schedule.divisionID = 0;
                    schedule.students = [];
                    startingHour++;
                } else
                    startingHour++;
            }
        }
        if (schedule.students.length % this.tabs[index].tutorClass.numberOfStudentsPer !== 0) {
            schedule.startDate = new Date(2015, 4, 25, startingHour);
            schedule.endDate = new Date(2015, 4, 25, startingHour + this.tabs[index].tutorClass.numberOfHours);
            schedule.teacher = this.qualifiedTeachers[0];
            this.tabs[index].schedule.push(schedule);
        }
        if (this.conflictStudents.length > 0) {
            this.createConflictingTutoringClasses(index);
        }
    }
    createConflictingTutoringClasses(index: number) {//assuming the schedule as already been sorted according to time
        let conflictScheds = new Map<String, Schedule>();
        let schedule = new Schedule();
        let desiredStudent:Student[];//it's only one but the splice can only return an array of that object even if it's only one object
        desiredStudent=[];
        schedule.divisionID=0;
        for (let i = 0; i < this.conflictStudents.length; i++) {
            console.log(this.conflictStudents[i]);
            schedule.students = [];

            schedule.startDate=this.conflictStudents[i].schedules[this.conflictStudents[i].schedules.length - 1].endDate;
            if (conflictScheds.get(schedule.startDate.toDateString())&&conflictScheds.get(schedule.startDate.toDateString()).students.length!==this.tabs[index].tutorClass.numberOfStudentsPer) {
                conflictScheds.get(schedule.startDate.toDateString()).students.push(this.conflictStudents[i]);
                console.log("Added to a  Conflict Schedule" + conflictScheds.get(schedule.startDate.toDateString()));
                desiredStudent=[];
            }
            else {

                schedule.students.push(this.conflictStudents[i]);
                schedule.endDate = new Date();
                schedule.endDate=new Date(2015,4,25,schedule.startDate.getHours()+this.tabs[index].tutorClass.numberOfHours, schedule.startDate.getMinutes())
                console.log("Start Date for Conflicts: ", schedule.startDate);
                console.log("End Date for Conflicts: ", schedule.endDate);
                conflictScheds.set(this.conflictStudents[i].schedules[this.conflictStudents[i].schedules.length - 1].endDate.toDateString(), schedule);
                console.log("Creating Conflict Schedule", conflictScheds.get(schedule.startDate.toDateString()).students[0]);
                schedule = new Schedule();
            }
        }
        conflictScheds.forEach(sched=>{
            sched.teacher=this.applyTeacher();
            console.log(sched)
             this.tabs[index].schedule.push(sched);
            
        })
        console.log(this.tabs[index].schedule);

    }
    noSchedConflictsTF(person: Student | Teacher, start: Date, end: Date): boolean {
        console.log(person.name);
        console.log(person.schedules.length);

        for (let i = 0; i < person.schedules.length; i++) {
            if (i < person.schedules.length - 1)
                if (person.schedules[i].startDate < start && person.schedules[i].endDate > start && person.schedules[i + 1].startDate < end && person.schedules[i + 1].endDate > end) {
                    console.log("Schedule Confict 2 sched", person.name);
                    return false;
                } else
                    return true;
            else if ((person.schedules[i].startDate < start && person.schedules[i].endDate > start) || (person.schedules[i].startDate < end && person.schedules[i].endDate > end)) {
                console.log("Schedule Confict 1 sched", person.name);
                return false;
            }
        }
        return true;
    }
    checkIfUndefinedSchedule(person: Student | Teacher): boolean {
        if (typeof person.schedules == "undefined") {//Is Empty or null
            return true;
        }
        return false;
    }
    applyTeacher(): Teacher {
        for (let i = 0; i < this.qualifiedTeachers.length; i++)
            if (!this.qualifiedTeachers[i].breakTF) {//if false
                this.qualifiedTeachers[i].breakTF = true;
                return this.qualifiedTeachers[i];
            }
            else//if true
                this.qualifiedTeachers[i].breakTF = false;
        console.log("No available qualified teachers");
        //could break here if there is no teacher available
    }
    setQualifiedTeachers(index: number) {
        this.tutorTeachers.forEach(teacher => {
            //console.log(teacher);
            if (teacher.qualifications.indexOf(this.tabs[index].tutorClass.name) !== -1) {
                // console.log(teacher.name);
                this.qualifiedTeachers.push(teacher);
            }
        });
    }
    canMakeSchedule(index: number): boolean {
        if (this.tutorTeachers.length === 0 || this.tutorTeachers.length === null)
            return false;
        if (this.tabs[index].tutorClass.students.length === 0 || this.tabs[index].tutorClass.students.length === null)
            return false;
        return true;
    }
}


