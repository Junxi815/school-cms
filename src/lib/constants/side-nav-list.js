import {
  DashboardOutlined,
  DeploymentUnitOutlined,
  EditOutlined,
  FileAddOutlined,
  MessageOutlined,
  ProjectOutlined,
  ReadOutlined,
  SolutionOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { ROLE } from "./role";

export const routePath = {
  manager: "manager",
  teachers: "teachers",
  students: "students",
  courses: "courses",
  addCourse: "add-course",
  editCourse: "edit-course",
  message: "message",
  own: "own",
  schedule: "schedule",
};

const overview = {
  path: "",
  label: "Overview",
  icon: <DashboardOutlined />,
};

const students = {
  path: "student",
  label: "Student",
  icon: <SolutionOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [
    {
      path: routePath.students,
      label: "Student List",
      icon: <TeamOutlined />,
    },
  ],
};

const teachers = {
  path: "teacher",
  label: "Teacher",
  icon: <DeploymentUnitOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [
    {
      path: routePath.teachers,
      label: "Teacher List",
      icon: <TeamOutlined />,
    },
  ],
};

const courses = {
  path: "course",
  label: "Course",
  icon: <ReadOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [
    {
      path: routePath.courses,
      label: "All Courses",
      icon: <ProjectOutlined />,
    },
    {
      path: routePath.addCourse,
      label: "Add Course",
      icon: <FileAddOutlined />,
    },
    {
      path: routePath.editCourse,
      label: "Edit Course",
      icon: <EditOutlined />,
    },
  ],
};

const studentCourses = {
  path: "course",
  label: "Course",
  icon: <ReadOutlined />,
  hideLinkInBreadcrumb: true,
  subNav: [
    {
      path: routePath.courses,
      label: "All Courses",
      icon: <ProjectOutlined />,
    },
    {
      path: routePath.own,
      label: "My Courses",
      icon: <FileAddOutlined />,
    },
  ],
};

const classSchedule = {
  path: routePath.schedule,
  label: "Class Schedule",
  icon: <CalendarOutlined />,
};

const messages = {
  path: routePath.message,
  label: "Message",
  icon: <MessageOutlined />,
};

export const sideNavLists = [
  {
    role: ROLE.manager,
    sideNav: [overview, students, teachers, courses, messages],
  },
  { role: ROLE.teacher, sideNav: [overview] },
  {
    role: ROLE.student,
    sideNav: [overview, studentCourses, classSchedule, messages],
  },
];

// export const menuList_manager = [
//   {
//     title: "Overview",
//     key: prefixUrls.manager,
//     icon: <DashboardOutlined />,
//   },
//   {
//     title: "Student",
//     key: `${prefixUrls.manager}/student`,
//     icon: <AuditOutlined />,
//     children: [
//       // sub-menu
//       {
//         title: "Student List",
//         key: `${prefixUrls.manager}/students`,
//         icon: <TeamOutlined />,
//       },
//     ],
//   },
//   {
//     title: "Teacher",
//     key: `${prefixUrls.manager}/teacher`,
//     icon: <ApartmentOutlined />,
//     children: [
//       {
//         title: "Teacher List",
//         key: `${prefixUrls.manager}/teachers`,
//         icon: <TeamOutlined />,
//       },
//     ],
//   },
//   {
//     title: "Course",
//     key: `${prefixUrls.manager}/course`,
//     icon: <FileTextOutlined />,
//     children: [
//       {
//         title: "All Courses",
//         key: `${prefixUrls.manager}/courses`,
//         icon: <BarChartOutlined />,
//       },
//       {
//         title: "Add Courses",
//         key: `${prefixUrls.manager}/add-course`,
//         icon: <FileAddOutlined />,
//       },
//       {
//         title: "Edit Courses",
//         key: `${prefixUrls.manager}/edit-course`,
//         icon: <EditOutlined />,
//       },
//     ],
//   },
//   {
//     title: "Message",
//     key: `${prefixUrls.manager}/message`,
//     icon: <MessageOutlined />,
//   },
// ];
