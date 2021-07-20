import { Menu } from "antd";
import { Link } from "react-router-dom";

export const getMenuNodes = (menuList) => {
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
