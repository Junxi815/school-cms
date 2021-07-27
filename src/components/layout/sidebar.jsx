import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import { LogoSpan } from "../styled-elements";
import { getMenuNodes, getMenuConfig } from "../../lib/utils/side-nav";

const { Sider } = Layout;

export default function SideBar({ collapsed, sideNavWithKeys, pathname }) {
  console.log("3");
  const { defaultSelectedKeys, defaultOpenKeys } = getMenuConfig(
    sideNavWithKeys,
    pathname
  );

  //点击breadcrumb的第一项 也会执行组件SideBar
  //SideBar里也能取到新的defaultSelectedKeys，defaultOpenKeys值
  //但这里也是不变，不render()?
  console.log(defaultSelectedKeys);

  return (
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
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
      >
        {getMenuNodes(sideNavWithKeys)}
      </Menu>
    </Sider>
  );
}
