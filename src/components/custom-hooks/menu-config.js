import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMenuConfig } from "../../lib/utils/side-nav";

export function useFormatMenuConfig(
  sideNavWithKeys,
  setDefaultOpenKeys,
  setDefaultSelectedKeys
) {
  const { pathname } = useLocation();
  const menuConfig = getMenuConfig(sideNavWithKeys, pathname);
  useEffect(() => {
    setDefaultOpenKeys([menuConfig.defaultOpenKeys]);
    setDefaultSelectedKeys([menuConfig.defaultSelectedKeys]);
  }, []);
}
