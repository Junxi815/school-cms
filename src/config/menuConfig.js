import {
  DashboardOutlined,
  AuditOutlined,
  TeamOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  BarChartOutlined,
  FileAddOutlined,
  EditOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const prefixUrls = {
  manager: "/dashboard/manager",
  teacher: "/dashboard/teacher",
  student: "/dashboard/student",
};

export const menuList_manager = [
  {
    title: "Overview",
    key: prefixUrls.manager,
    icon: <DashboardOutlined />,
  },
  {
    title: "Student",
    key: `${prefixUrls.manager}/student`,
    icon: <AuditOutlined />,
    children: [
      // sub-menu
      {
        title: "Student List",
        key: `${prefixUrls.manager}/students`,
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    title: "Teacher",
    key: `${prefixUrls.manager}/teacher`,
    icon: <ApartmentOutlined />,
    children: [
      {
        title: "Teacher List",
        key: `${prefixUrls.manager}/teachers`,
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    title: "Course",
    key: `${prefixUrls.manager}/course`,
    icon: <FileTextOutlined />,
    children: [
      {
        title: "All Courses",
        key: `${prefixUrls.manager}/courses`,
        icon: <BarChartOutlined />,
      },
      {
        title: "Add Courses",
        key: `${prefixUrls.manager}/add-course`,
        icon: <FileAddOutlined />,
      },
      {
        title: "Edit Courses",
        key: `${prefixUrls.manager}/edit-course`,
        icon: <EditOutlined />,
      },
    ],
  },
  {
    title: "Message",
    key: `${prefixUrls.manager}/message`,
    icon: <MessageOutlined />,
  },
];
