import React, { useEffect, useState } from "react";
import { Layout, Menu, message, Spin } from "antd";
import { Link, Switch, Route, useHistory, useLocation } from "react-router-dom";
import { getUser, removeUser } from "../../../utils/userInfo";
import { StyledHeader, LogoSpan } from "./style";
import ManagementHome from "./home";
import Students from "./students";
import { logout } from "../../../api";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { menuList_manager } from "../../../config/menuConfig";

const { Sider, Content } = Layout;
/**trying to render menu list through method */

const getMenuNodes = (menuList) => {
  return menuList.map((item) => {
    if (!item.children) {
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.key}>
            <span>{item.title}</span>
          </Link>
        </Menu.Item>
      );
    } else {
      return (
        <Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
          {getMenuNodes(item.children)}
        </Menu.SubMenu>
      );
    }
  });
};

export default function Manager() {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["/dashboard/manager"]);
  const history = useHistory();
  const location = useLocation();
  const user = getUser();

  useEffect(() => {
    const { pathname } = location;
    setSelectedKeys([pathname]);
  }, [location]);

  const handleLogout = async () => {
    setLoadingStatus(true);

    const result = await logout();
    if (result.code >= 200 && result.code < 300) {
      removeUser();
      history.push("/login");
    } else {
      message.error(result.msg);
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
            defaultSelectedKeys={["/dashboard/manager"]}
            selectedKeys={selectedKeys}
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
              <Route exact path="/dashboard/manager/">
                <ManagementHome />
              </Route>
              <Route path="/dashboard/manager/students">
                <Students />
              </Route>
              <Route path="/dashboard/manager/teachers">
                <div>teachers</div>
              </Route>
              <Route path="/dashboard/manager/courses">
                <div>courses</div>
              </Route>
              <Route path="/dashboard/manager/add-course">
                <div>add course</div>
              </Route>
              <Route path="/dashboard/manager/edit-course">
                <div>edit course</div>
              </Route>
              <Route path="/dashboard/manager/message">
                <div>message</div>
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Spin>
  );
}
