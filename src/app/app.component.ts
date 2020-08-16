import { NgModule, Component, ViewChild, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
    DxSchedulerModule,
    DxSchedulerComponent,
    DxTemplateModule,
    DxTabsModule
} from 'devextreme-angular';
import { ScheduleService, MovieData, TheatreData, Data, Activity, Division, Tab, Schedule } from './schedule.service';
import Query from 'devextreme/data/query';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ScheduleService]
})
export class AppComponent {
    @ViewChild(DxSchedulerComponent, { static: false }) scheduler: DxSchedulerComponent;

    data: Data[];
    currentDate: Date = new Date(2015, 4, 25);
    moviesData: MovieData[];
    theatreData: TheatreData[];
    tabs: Tab[];
    currentSchedule: Schedule[];
    currentActivities: Activity[];
    currentDivisions: Division[];
    constructor(service: ScheduleService) {
        // this.data = service.getData();
        // this.moviesData = service.getMoviesData();
        //  this.theatreData = service.getTheatreData();
        this.tabs = service.getTabs();
        this.currentSchedule = this.tabs[0].schedule;
        this.currentActivities = this.tabs[0].activities;
        this.currentDivisions = this.tabs[0].scheduleDivisions;
        //this.schedulesData=this.tabs[1].schedule;
        // this.classesData=service.getClassData();         
        // this.activitiesData=service.getActivities();

        // this.staff=service.getStaffData();
        // this.staffActivities=service.getStaffActivities();
        //this.staffSchedule=this.tabschedule;
        // this.schedulesData.forEach(schedule=>{
        //   schedule.startDate.getMinutes()
        //   schedule.endDate.getMinutes();

        // })
    }

    onAppointmentFormOpening(data) {
        var that = this,
            form = data.form,
            movieInfo = that.getMovieById(data.appointmentData.movieId) || {},
            startDate = data.appointmentData.startDate;

        form.option("items", [{
            label: {
                text: "Movie"
            },
            editorType: "dxSelectBox",
            dataField: "movieId",
            editorOptions: {
                items: that.moviesData,
                displayExpr: "text",
                valueExpr: "id",
                onValueChanged: function (args) {
                    movieInfo = that.getMovieById(args.value);
                    form.getEditor("director")
                        .option("value", movieInfo.director);
                    form.getEditor("endDate")
                        .option("value", new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
                }.bind(this)
            }
        }, {
            label: {
                text: "Director"
            },
            name: "director",
            editorType: "dxTextBox",
            editorOptions: {
                value: movieInfo.director,
                readOnly: true
            }
        }, {
            dataField: "startDate",
            editorType: "dxDateBox",
            editorOptions: {
                width: "100%",
                type: "datetime",
                onValueChanged: function (args) {
                    startDate = args.value;
                    form.getEditor("endDate")
                        .option("value", new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
                }
            }
        }, {
            name: "endDate",
            dataField: "endDate",
            editorType: "dxDateBox",
            editorOptions: {
                width: "100%",
                type: "datetime",
                readOnly: true
            }
        }, {
            dataField: "price",
            editorType: "dxRadioGroup",
            editorOptions: {
                dataSource: [5, 10, 15, 20],
                itemTemplate: function (itemData) {
                    return "$" + itemData;
                }
            }
        }]);
    }

    getDataObj(objData) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].startDate.getTime() === objData.startDate.getTime() && this.data[i].theatreId === objData.theatreId)
                return this.data[i];
        }
        return null;
    }

    getMovieById(id) {
        return Query(this.moviesData).filter(["id", "=", id]).toArray()[0];
    }
    // getActivityByID(id){
    //   return Query(this.activitiesData).filter(["id","=",id]).toArray()[0];
    // }
    getActivityByID(id) {
        //console.log(this.activitiesData[id].activity);
            //console.log(this.currentActivities[id]);
            return this.currentActivities[id];
        
    }
    selectTab(e) {
        console.log(e.itemIndex);
        this.currentSchedule = this.tabs[e.itemIndex].schedule;
        this.currentActivities = this.tabs[e.itemIndex].activities;
        this.currentDivisions = this.tabs[e.itemIndex].scheduleDivisions;


    }
}


