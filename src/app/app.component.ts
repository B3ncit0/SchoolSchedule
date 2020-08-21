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


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ScheduleService]
})
export class AppComponent {
    @ViewChild(DxSchedulerComponent, { static: false }) scheduler: DxSchedulerComponent;
    currentDate: Date = new Date(2015, 4, 25);
    currentDate1: Date = new Date(2015, 4, 26);
    startDayHour: number = 7;
    endDayHour: number = 17;
    tabs: Tab[];
    currentTab: Tab;
    timerSetTF: boolean;
    tutorTeachers: Teacher[];
    qualifiedTeachers: Teacher[] = [];
    constructor(service: ScheduleService) {
        this.tabs = service.getTabs();
        this.timerSetTF = true;
        this.currentTab = this.tabs[0];
        this.tutorTeachers = service.getTutoringTeachers();
    }

    // onAppointmentFormOpening(data) {
    //     var that = this,
    //         form = data.form,
    //         movieInfo = that.getMovieById(data.appointmentData.movieId) || {},
    //         startDate = data.appointmentData.startDate;

    //     form.option("items", [{
    //         label: {
    //             text: "Movie"
    //         },
    //         editorType: "dxSelectBox",
    //         dataField: "movieId",
    //         editorOptions: {
    //             items: that.moviesData,
    //             displayExpr: "text",
    //             valueExpr: "id",
    //             onValueChanged: function (args) {
    //                 movieInfo = that.getMovieById(args.value);
    //                 form.getEditor("director")
    //                     .option("value", movieInfo.director);
    //                 form.getEditor("endDate")
    //                     .option("value", new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
    //             }.bind(this)
    //         }
    //     }, {
    //         label: {
    //             text: "Director"
    //         },
    //         name: "director",
    //         editorType: "dxTextBox",
    //         editorOptions: {
    //             value: movieInfo.director,
    //             readOnly: true
    //         }
    //     }, {
    //         dataField: "startDate",
    //         editorType: "dxDateBox",
    //         editorOptions: {
    //             width: "100%",
    //             type: "datetime",
    //             onValueChanged: function (args) {
    //                 startDate = args.value;
    //                 form.getEditor("endDate")
    //                     .option("value", new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
    //             }
    //         }
    //     }, {
    //         name: "endDate",
    //         dataField: "endDate",
    //         editorType: "dxDateBox",
    //         editorOptions: {
    //             width: "100%",
    //             type: "datetime",
    //             readOnly: true
    //         }
    //     }, {
    //         dataField: "price",
    //         editorType: "dxRadioGroup",
    //         editorOptions: {
    //             dataSource: [5, 10, 15, 20],
    //             itemTemplate: function (itemData) {
    //                 return "$" + itemData;
    //             }
    //         }
    //     }]);
    // }

    // getDataObj(objData) {
    //     for (var i = 0; i < this.data.length; i++) {
    //         if (this.data[i].startDate.getTime() === objData.startDate.getTime() && this.data[i].theatreId === objData.theatreId)
    //             return this.data[i];
    //     }
    //     return null;
    // }

    // getMovieById(id) {
    //     return Query(this.moviesData).filter(["id", "=", id]).toArray()[0];
    // }
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
            //console.log("Student Schedule: ", !(students[i].schedules=null))
            let endingHour = startingHour + this.tabs[index].tutorClass.numberOfHours;
            let startingDate = new Date(2015, 4, 25, startingHour);
            let endingDate = new Date(2015, 4, 25, endingHour);
            if (typeof students[i].schedules=="undefined") {//Is Empty or null
                students[i].schedules = [];//make sure future code won't run into undefines
                console.log("Students Schedule is empty now", students[i].schedules);
            }
            if (this.noSchedConflictsTF(students[i], startingDate, endingDate)) {
                schedule.students.push(students[i]);
                studentSchedule.startDate = startingDate;
                    studentSchedule.endDate = endingDate;
                    //studentSchedule.teacher=schedule.teacher;
                    students[i].schedules.push(studentSchedule);
                    //console.log("Students Schedule", students[i].schedules);
                    studentSchedule=new Schedule();
            }
            if (schedule.students.length === this.tabs[index].tutorClass.numberOfStudentsPer)//3
            {
                schedule.teacher = this.applyTeacher();
                if (schedule.teacher !== undefined) {
                    schedule.startDate = startingDate;
                    schedule.endDate = endingDate;
                    this.tabs[index].schedule.push(schedule);

                    schedule = new Schedule();
                    schedule.divisionID = 0;
                    schedule.students = [];
                    startingHour++;
                } else
                    startingHour++;
            }
        }
        //console.log(this.tabs[index].schedule);
        if (schedule.students.length % this.tabs[index].tutorClass.numberOfStudentsPer !== 0) {
            schedule.startDate = new Date(2015, 4, 25, startingHour);
            schedule.endDate = new Date(2015, 4, 25, startingHour + this.tabs[index].tutorClass.numberOfHours);
            schedule.teacher = this.qualifiedTeachers[0];
            this.tabs[index].schedule.push(schedule);
        }
    }
    noSchedConflictsTF(student: Student, start: Date, end: Date): boolean {
        for (let i = 0; i < student.schedules.length; i++) {
            if (i < student.schedules.length - 1)//if not the last sched, check two scheds
                if ((student.schedules[i].startDate < start && student.schedules[i].endDate > start) || (student.schedules[i + 1].startDate < end && student.schedules[i + 1].endDate > end))
                    return false;
                else
                    return true;
            else if (student.schedules[i].startDate < start && student.schedules[i].endDate > start)// last sched
                return false
            else
                return true;
        }
        return true;
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


