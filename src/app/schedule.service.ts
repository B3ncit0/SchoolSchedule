import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  getTabs() {
    return tabs;
  }
  getTutoringTeachers() {
    return tutoringTeachers;
  }
}
export class Tab {
  type: string;
  text: string;
  icon: string;
  schedule?: Schedule[];
  activities?: Activity[];
  scheduleDivisions?: Division[];
  tutorClass?: Tutoring
}

export class Division {//Class or staff
  text: string;
  id: number;
}

export class Schedule {
  divisionID: number;
  activityID?: number;
  startDate: Date;
  endDate: Date;
  recurrenceRule?: string;
  teacher?:Teacher;
  students?:Student[];
}

export class Activity {
  activity: string;
  duration: number; //minutes
  color?: string;
  id: number;
}
export class Student {
  name: string;
  gradeLevelID: number;
  studentID: number;
  schedules?: Schedule[];
}

export class Teacher {
  name: string;
  // id: number;
  qualifications: String[];
  schedules?: Schedule[];
  breakTF:boolean;
}
export class Tutoring {
  name: string;
  numberOfStudentsPer:number;
  numberOfHours:number;
  students: Student[];
  scheduleCreatedTF:boolean;
}
let tutoringTeachers: Teacher[] = [
  {
    name: "Bruce Wayne",
    breakTF:false,
    qualifications: String[2] = ["Math-CoTeaching","Speech-Therapy" ]
  }, {
    name: "Mrs. Gutierrez",
    breakTF:false,
    qualifications: String[2] = ["Math-CoTeaching","Speech-Therapy" ]
  }, {
    name: "Dr. Freeze",
    breakTF:false,
    qualifications: String[1] = ["Speech-Therapy"]
  }, {
    name: "Mrs. Emsworth",
    breakTF:false,
    qualifications: String[2] = ["Speech-Therapy"]
  }
]
let staffSchedules: Schedule[] = [
  {
    divisionID: 0,
    activityID: 1,
    startDate: new Date(2015, 4, 25, 7, 30),
    endDate: new Date(2015, 4, 25, 9, 30),
  }, {
    divisionID: 0,
    activityID: 3,
    startDate: new Date(2015, 4, 25, 9, 45),
    endDate: new Date(2015, 4, 25, 11, 30),
  }, {
    divisionID: 0,
    activityID: 0,
    startDate: new Date(2015, 4, 25, 11, 30),
    endDate: new Date(2015, 4, 25, 15, 30),
  }, {
    divisionID: 0,
    activityID: 1,
    startDate: new Date(2015, 4, 25, 15, 30),
    endDate: new Date(2015, 4, 25, 16, 30),
  },
]
let staffActivities: Activity[] = [
  {
    activity: "Lunch",
    duration: 60,
    color: "#F2A355",
    id: 0
  }, {
    activity: "Office",
    duration: 150,
    color: "#F2A355",
    id: 1
  }, {
    activity: "Cleaning",
    duration: 120,
    color: "#F2A355",
    id: 2
  }, {
    activity: "Paying students",
    duration: 30,
    color: "#F2A355",
    id: 3
  }
]
let staff: Division[] = [
  {
    text: "Principal",
    id: 0
  }, {
    text: "Janitor",
    id: 1
  }, {
    text: "Admin",
    id: 2
  }, {
    text: "Student Intern",
    id: 3
  }
]
let classSchedules: Schedule[] = [
  {
    divisionID: 0,
    activityID: 2,
    startDate: new Date(2015, 4, 25, 7, 30),
    endDate: new Date(2015, 4, 25, 8, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 0,
    activityID: 3,
    startDate: new Date(2015, 4, 25, 8, 30),
    endDate: new Date(2015, 4, 25, 9, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 0,
    activityID: 4,
    startDate: new Date(2015, 4, 25, 9, 30),
    endDate: new Date(2015, 4, 25, 10, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 0,
    activityID: 7,
    startDate: new Date(2015, 4, 25, 10, 30),
    endDate: new Date(2015, 4, 25, 11, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 0,
    activityID: 0,
    startDate: new Date(2015, 4, 25, 11, 30),
    endDate: new Date(2015, 4, 25, 12, 0),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 0,
    activityID: 1,
    startDate: new Date(2015, 4, 25, 12, 0),
    endDate: new Date(2015, 4, 25, 12, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 0,
    activityID: 6,
    startDate: new Date(2015, 4, 25, 12, 30),
    endDate: new Date(2015, 4, 25, 13, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 0,
    activityID: 5,
    startDate: new Date(2015, 4, 25, 13, 30),
    endDate: new Date(2015, 4, 25, 14, 30),
    recurrenceRule: "FREQ=DAILY"
  },
  {
    divisionID: 1,
    activityID: 2,
    startDate: new Date(2015, 4, 25, 7, 30),
    endDate: new Date(2015, 4, 25, 8, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 1,
    activityID: 3,
    startDate: new Date(2015, 4, 25, 8, 30),
    endDate: new Date(2015, 4, 25, 9, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 1,
    activityID: 4,
    startDate: new Date(2015, 4, 25, 9, 30),
    endDate: new Date(2015, 4, 25, 10, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 1,
    activityID: 7,
    startDate: new Date(2015, 4, 25, 10, 30),
    endDate: new Date(2015, 4, 25, 11, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 1,
    activityID: 0,
    startDate: new Date(2015, 4, 25, 11, 30),
    endDate: new Date(2015, 4, 25, 12, 0),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 1,
    activityID: 1,
    startDate: new Date(2015, 4, 25, 12, 0),
    endDate: new Date(2015, 4, 25, 12, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 1,
    activityID: 6,
    startDate: new Date(2015, 4, 25, 12, 30),
    endDate: new Date(2015, 4, 25, 13, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 1,
    activityID: 5,
    startDate: new Date(2015, 4, 25, 13, 30),
    endDate: new Date(2015, 4, 25, 14, 30),
    recurrenceRule: "FREQ=DAILY"
  },
  {
    divisionID: 2,
    activityID: 2,
    startDate: new Date(2015, 4, 25, 7, 30),
    endDate: new Date(2015, 4, 25, 8, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 2,
    activityID: 3,
    startDate: new Date(2015, 4, 25, 8, 30),
    endDate: new Date(2015, 4, 25, 9, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 2,
    activityID: 4,
    startDate: new Date(2015, 4, 25, 9, 30),
    endDate: new Date(2015, 4, 25, 10, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 2,
    activityID: 7,
    startDate: new Date(2015, 4, 25, 10, 30),
    endDate: new Date(2015, 4, 25, 11, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 2,
    activityID: 0,
    startDate: new Date(2015, 4, 25, 11, 30),
    endDate: new Date(2015, 4, 25, 12, 0),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 2,
    activityID: 1,
    startDate: new Date(2015, 4, 25, 12, 0),
    endDate: new Date(2015, 4, 25, 12, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 2,
    activityID: 6,
    startDate: new Date(2015, 4, 25, 12, 30),
    endDate: new Date(2015, 4, 25, 13, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 2,
    activityID: 5,
    startDate: new Date(2015, 4, 25, 13, 30),
    endDate: new Date(2015, 4, 25, 14, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 3,
    activityID: 2,
    startDate: new Date(2015, 4, 25, 7, 30),
    endDate: new Date(2015, 4, 25, 8, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 3,
    activityID: 3,
    startDate: new Date(2015, 4, 25, 8, 30),
    endDate: new Date(2015, 4, 25, 9, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 3,
    activityID: 4,
    startDate: new Date(2015, 4, 25, 9, 30),
    endDate: new Date(2015, 4, 25, 10, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 3,
    activityID: 7,
    startDate: new Date(2015, 4, 25, 10, 30),
    endDate: new Date(2015, 4, 25, 11, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 3,
    activityID: 0,
    startDate: new Date(2015, 4, 25, 11, 30),
    endDate: new Date(2015, 4, 25, 12, 0),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 3,
    activityID: 1,
    startDate: new Date(2015, 4, 25, 12, 0),
    endDate: new Date(2015, 4, 25, 12, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 3,
    activityID: 6,
    startDate: new Date(2015, 4, 25, 12, 30),
    endDate: new Date(2015, 4, 25, 13, 30),
    recurrenceRule: "FREQ=DAILY"
  }, {
    divisionID: 3,
    activityID: 5,
    startDate: new Date(2015, 4, 25, 13, 30),
    endDate: new Date(2015, 4, 25, 14, 30),
    recurrenceRule: "FREQ=DAILY"
  },
]
let classData: Division[] = [
  {
    text: "Kindergarten",
    id: 0
  }, {
    text: "1st Grade",
    id: 1
  }, {
    text: "2nd Grade",
    id: 2
  }, {
    text: "3rd Grade",
    id: 3
  }
]
let activityData: Activity[] = [
  {
    activity: "Lunch",
    duration: 30,
    color: "#F50",
    id: 0
  }, {
    activity: "Recess",
    duration: 30,
    color: "#2FAD99",
    id: 1
  }, {
    activity: "Math 55",
    duration: 60,
    color: "#8D87C2",
    id: 2
  }, {
    activity: "Shakespearan English",
    duration: 60,
    color: "#5DA187",
    id: 3
  }, {
    activity: "Music Theory 101",
    duration: 60,
    color: "#31A4D3",
    id: 4
  }, {
    activity: "US Government",
    duration: 60,
    color: "#0CB1F3",
    id: 5
  }, {
    activity: "Picasso Training",
    duration: 60,
    color: "#F91547",
    id: 6
  }, {
    activity: "Aerospace",
    duration: 60,
    color: "#CA138F",
    id: 7
  }
];
let tutoring: Tutoring =
{
  name: "Math-CoTeaching",
  numberOfStudentsPer:3,
  scheduleCreatedTF:false,
  numberOfHours:1,
  students: Student[7] = [
    {
      name: "John Doe",
      gradeLevelID: 0,
      studentID: 134
    }, {
      name: "Mary Johnson",
      gradeLevelID: 0,
      studentID: 445
    }, {
      name: "Ben Matthews",
      gradeLevelID: 0,
      studentID: 829
    }, {
      name: "Terry McGinnis",
      gradeLevelID: 0,
      studentID: 1999
    }, {
      name: "Waldo",
      gradeLevelID: 0,
      studentID: 67
    }, {
      name: "Jane Davis",
      gradeLevelID: 0,
      studentID: 12
    }, {
      name: "Lauren Rodriguez",
      gradeLevelID: 0,
      studentID: 345
    }
  ]
}

let tabs: Tab[] = [
  {
    text: "Staff Schedule",
    icon: "event",
    type: "schedule",
    schedule: staffSchedules,
    activities: staffActivities,
    scheduleDivisions: staff
  },
  {
    text: "Class Schedule",
    icon: "event",
    type:"schedule",
    schedule: classSchedules,
    activities: activityData,
    scheduleDivisions: classData
  }, {
    text: "Tutoring Schedule",
    icon: "event",
    type:"tutoring",
    scheduleDivisions:classData,
    tutorClass: tutoring,
    schedule:null
  }
]