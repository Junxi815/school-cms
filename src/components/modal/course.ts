type CourseStatus = 0 | 1 | 2;
type DurationUnit = 1 | 2 | 3 | 4 | 5;

export interface CourseType {
  id: number;
  name: string;
}

export interface StudentCourse {
  id: number;
  studentId: number;
  ctime: string;
  courseDate: string;
  course: Course;
}

export interface Course {
  id: number;
  name: string;
  uid: string; //code
  detail: string;
  startTime: string;
  price: number;
  maxStudents: number;
  star: number;
  status: CourseStatus;
  duration: number;
  durationUnit: DurationUnit;
  cover: string;
  teacherName: string;
  teacherId: number;
  type: CourseType[];
  ctime: string;
  scheduleId: number;
}
export interface Chapter {
  name: string;
  id: number;
  content: string;
  order: number;
}
export interface Schedule {
  id: number;
  status: number;
  current: number;
  chapters: Chapter[];
  classTime: string[];
}
export interface ClassSchedule extends Course {
  schedule: Schedule;
}
