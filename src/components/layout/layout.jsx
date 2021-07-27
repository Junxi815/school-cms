import React, { useState } from "react";
import { Layout, message, Spin } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { getUser, removeUser } from "../../lib/services/userInfo";
import SideBar from "./sidebar";
import { StyledHeader } from "../styled-elements";
import { logout } from "../../lib/services/api";
import { sideNavLists } from "../../lib/constants/side-nav-list";
import { getSideNavWithKeys } from "../../lib/utils/side-nav";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import AppBreadcrumb from "./breadCrumb";

const { Content } = Layout;

export default function MainLayout({ children }) {
  console.log("2");
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);
  const { role } = getUser();
  const { pathname } = useLocation();
  const { sideNav } = sideNavLists.find((item) => item.role === role);
  const sideNavWithKeys = getSideNavWithKeys(sideNav, role);
  const history = useHistory();
  const handleLogout = async () => {
    setLoadingStatus(true);
    const result = await logout();
    setLoadingStatus(false);
    if (result.code >= 200 && result.code < 300) {
      removeUser();
      history.push("/login");
    } else {
      message.error(result.msg);
    }
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Spin spinning={isLoading} tip="loading......">
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar
          collapsed={collapsed}
          sideNavWithKeys={sideNavWithKeys}
          role={role}
          pathname={pathname}
        />

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
              <span>{`Hi, ${role}!`}</span>&nbsp;
              <span className="logout" onClick={handleLogout}>
                <LogoutOutlined style={{ margin: 5 }} />
                Logout
              </span>
            </div>
          </StyledHeader>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 280,
              overflow: "scroll",
            }}
          >
            <AppBreadcrumb
              sideNavWithKeys={sideNavWithKeys}
              role={role}
              pathname={pathname}
            />
            {children}
          </Content>
        </Layout>
      </Layout>
    </Spin>
  );
}
