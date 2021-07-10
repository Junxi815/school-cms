/**trying to render menu list through method */

// const menuList = [
//   {
//     title: "Overview",
//     key: "/",
//     icon: "<DashboardOutlined />",
//   },
//   {
//     title: "Student",
//     key: "/student",
//     icon: "<AuditOutlined />",
//     children: [
//       // submenu
//       {
//         title: "Student List",
//         key: "/students",
//         icon: "<TeamOutlined />",
//       },
//     ],
//   },
//   {
//     title: "Teacher",
//     key: "/teacher",
//     icon: "<ApartmentOutlined />",
//     children: [
//       {
//         title: "Teacher List",
//         key: "/teachers",
//         icon: "<TeamOutlined />",
//       },
//     ],
//   },
//   {
//     title: "Course",
//     key: "/course",
//     icon: "<FileTextOutlined />",
//     children: [
//       {
//         title: "All Courses",
//         key: "/courses",
//         icon: "<BarChartOutlined />",
//       },
//       {
//         title: "Add Courses",
//         key: "/courses/add-course",
//         icon: "<FileAddOutlined />",
//       },
//       {
//         title: "Edit Courses",
//         key: "/courses/edit-course",
//         icon: "<EditOutlined />",
//       },
//     ],
//   },
//   {
//     title: "Message",
//     key: "/message",
//     icon: "<MessageOutlined />",
//   },
// ];
// const getMenuNodes = (menuList) => {
//   return menuList.map((item) => {
//     if (!item.children) {
//       return (
//         <Menu.Item key={item.key} icon={item.icon}>
//           <Link to={item.key}>
//             <span>{item.title}</span>
//           </Link>
//         </Menu.Item>
//       );
//     } else {
//       return (
//         <Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
//           {getMenuNodes(item.children)}
//         </Menu.SubMenu>
//       );
//     }
//   });
// };
