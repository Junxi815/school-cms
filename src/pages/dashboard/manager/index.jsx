import React, { useState } from "react";
import { Layout, Menu, message, Spin } from "antd";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import { userInfo } from "../../../utils/storage";
import { StyledHeader, LogoSpan } from "./style";
import ManagementHome from "./home";
import Students from "./students";
import { reqLogout } from "../../../api";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
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

const { Sider, Content } = Layout;

export default function Manager() {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);
  let history = useHistory();
  const user = userInfo.getUser();
  const handleLogout = async () => {
    setLoadingStatus(true);
    try {
      const result = await reqLogout();
      if (result.code === 201) {
        userInfo.removeUser();
        history.push("/login");
      }
    } catch (error) {
      message.error(error);
    }
    setLoadingStatus(false);
  };
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Spin spinning={isLoading} tip="loading......">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Link to="/" className="logo">
            <LogoSpan>CMS</LogoSpan>
          </Link>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={["/"]}>
            <Menu.Item key="/" icon={<DashboardOutlined />}>
              <Link to="/dashboard/manager">
                <span>Overview</span>
              </Link>
            </Menu.Item>

            <Menu.SubMenu
              key="/student"
              icon={<AuditOutlined />}
              title="Student"
            >
              <Menu.Item key="/students" icon={<TeamOutlined />}>
                <Link to="/dashboard/manager/students">
                  <span>Student List</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu
              key="/teacher"
              icon={<ApartmentOutlined />}
              title="Teacher"
            >
              <Menu.Item key="/teachers" icon={<TeamOutlined />}>
                <Link to="/dashboard/manager/teachers">
                  <span>Teacher List</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu
              key="/course"
              icon={<FileTextOutlined />}
              title="Course"
            >
              <Menu.Item key="/courses" icon={<BarChartOutlined />}>
                <Link to="/dashboard/manager/courses">
                  <span>Courses</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/add-course" icon={<FileAddOutlined />}>
                <Link to="/dashboard/manager/add-course">
                  <span>Add Courses</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/edit-course" icon={<EditOutlined />}>
                <Link to="/dashboard/manager/edit-course">
                  <span>Edit Courses</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item key="/message" icon={<MessageOutlined />}>
              <Link to="/dashboard/manager/message">
                <span>Message</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <StyledHeader
            className="site-layout-background"
            style={{ padding: 0 }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <div>
              <span>{`Hi, ${user.role}!`}</span>&nbsp;
              <span className="logout" onClick={handleLogout}>
                <LogoutOutlined style={{ margin: 5 }} />
                Logout
              </span>
            </div>
          </StyledHeader>

          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route exact path="/dashboard/manager">
                <ManagementHome />
              </Route>
              <Route path="/dashboard/manager/students">
                <Students />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Spin>
  );
}
