import React, { useState } from "react";
import { Layout, Menu, message, Spin } from "antd";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import { getUser, removeUser } from "../../../utils/userInfo";
import { StyledHeader, LogoSpan } from "./style";
import ManagementHome from "./home";
import Students from "./students";
import { reqLogout } from "../../../api";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { getMenuNodes, menuList_manager } from "../../../config/menuConfig";

const { Sider, Content } = Layout;
/**trying to render menu list through method */

export default function Manager() {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);
  const history = useHistory();
  const user = getUser();

  const handleLogout = async () => {
    setLoadingStatus(true);
    try {
      const result = await reqLogout();
      if (result.code > 200 && result.code < 300) {
        removeUser();
        history.push("/login");
      }
    } catch (error) {
      message.error(error.msg);
    }
    setLoadingStatus(false);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Spin spinning={isLoading} tip="loading......">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            top: 0,
            left: 0,
          }}
        >
          <Link to="/" className="logo">
            <LogoSpan>CMS</LogoSpan>
          </Link>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["/dashboard/manager/"]}
          >
            {getMenuNodes(menuList_manager)}
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
