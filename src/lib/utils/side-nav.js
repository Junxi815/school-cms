import { Menu } from "antd";
import { Link } from "react-router-dom";

export const getMenuConfig = (sideNav, pathname) => {
  const activePath = getRouteWithoutDetail(pathname);
  const footprint = getSearchRecord(checkFn, activePath)(sideNav);
  const defaultSelectedKeys = [activePath];
  const defaultOpenKeys =
    footprint.length >= 2 ? [footprint[footprint.length - 2].key] : [];
  return { defaultSelectedKeys, defaultOpenKeys };
};

function getRouteWithoutDetail(pathname) {
  if (isDetailPath(pathname)) {
    const index = pathname.lastIndexOf("/");
    return pathname.slice(0, index);
  }
  return pathname;
}

export function isDetailPath(pathname) {
  const index = pathname.lastIndexOf("/");
  const lastPart = pathname.slice(index + 1);
  const reg = /^\d+$/;
  return reg.test(lastPart);
}

export const getSideNavWithKeys = (sideNav, userRole) => {
  if (sideNav.length > 0) {
    sideNav.forEach((item) => {
      if (!item.subNav) {
        item.key =
          item.path === ""
            ? `/dashboard/${userRole}`
            : `/dashboard/${userRole}/${item.path}`;
      } else {
        item.key = item.path;
        getSideNavWithKeys(item.subNav, userRole);
      }
    });
  }
  return sideNav;
};

export const getMenuNodes = (sideNav) => {
  return sideNav.map((item) => {
    if (!item.subNav) {
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.key}>
            <span>{item.label}</span>
          </Link>
        </Menu.Item>
      );
    } else {
      return (
        <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
          {getMenuNodes(item.subNav)}
        </Menu.SubMenu>
      );
    }
  });
};

export const getFootprint = (sideNav, pathname) => {
  const activePath = getRouteWithoutDetail(pathname);
  return getSearchRecord(checkFn, activePath)(sideNav);
};

function checkFn(node, path) {
  return node.key === path;
}

function getSearchRecord(checkFn, path, record = []) {
  return function deepSearchWithRecord(data) {
    const firstNode = data.slice(0, 1)[0];
    const restData = data.slice(1);
    if (firstNode) {
      record.push(firstNode);
      if (checkFn(firstNode, path)) {
        return record;
      }
      if (firstNode.subNav) {
        const res = deepSearchWithRecord(firstNode.subNav, path);
        if (res) {
          return res;
        } else {
          record.pop();
        }
      }
    }
    if (restData.length > 0) {
      record.pop();
      const res = deepSearchWithRecord(restData, path);
      if (res) {
        return res;
      }
    }
    return null;
  };
}

// const routePath = {
//   manager: "manager",
//   teachers: "teachers",
//   students: "students",
//   courses: "courses",
//   addCourse: "add-course",
//   editCourse: "edit-course",
//   message: "message",
// };

// const dataShow = [
//   {
//     path: "",
//     label: "Overview",
//     icon: <DashboardOutlined />,
//   },
//   {
//     path: "student",
//     label: "Student",
//     icon: <SolutionOutlined />,
//     hideLinkInBreadcrumb: true,
//     subNav: [
//       {
//         path: routePath.students,
//         label: "Student List",
//         icon: <TeamOutlined />,
//       },
//     ],
//   },

//   {
//     path: "teacher",
//     label: "Teacher",
//     icon: <DeploymentUnitOutlined />,
//     hideLinkInBreadcrumb: true,
//     subNav: [
//       {
//         path: routePath.teachers,
//         label: "Teacher List",
//         icon: <TeamOutlined />,
//       },
//     ],
//   },

//   {
//     path: "course",
//     label: "Course",
//     icon: <ReadOutlined />,
//     hideLinkInBreadcrumb: true,
//     subNav: [
//       {
//         path: routePath.courses,
//         label: "All Courses",
//         icon: <ProjectOutlined />,
//       },
//       {
//         path: routePath.addCourse,
//         label: "Add Course",
//         icon: <FileAddOutlined />,
//       },
//       {
//         path: routePath.editCourse,
//         label: "Edit Course",
//         icon: <EditOutlined />,
//       },
//     ],
//   },

//   {
//     path: routePath.message,
//     label: "Message",
//     icon: <MessageOutlined />,
//   },
// ];
