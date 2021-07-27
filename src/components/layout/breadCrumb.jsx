import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { getFootprint, isDetailPath } from "../../lib/utils/side-nav";

export default function AppBreadcrumb({ sideNavWithKeys, role, pathname }) {
  console.log("4");
  const footprintRecord = getFootprint(sideNavWithKeys, pathname);
  return (
    <Breadcrumb style={{ marginBottom: "20px" }}>
      <Breadcrumb.Item>
        <Link to={`/dashboard`}>{`CMS ${role.toUpperCase()} SYSTEM`}</Link>
        {/* 这里如果link到/dashboard/manager 就有问题 */}
      </Breadcrumb.Item>
      {footprintRecord.map((item, i) => {
        if (item.hideLinkInBreadcrumb) {
          return <Breadcrumb.Item key={i}>{item.label}</Breadcrumb.Item>;
        } else {
          return (
            <Breadcrumb.Item key={i}>
              {footprintRecord.length === i + 1 && !isDetailPath(pathname) ? (
                item.label
              ) : (
                <Link to={item.key}>{item.label}</Link>
              )}
            </Breadcrumb.Item>
          );
        }
      })}
      {isDetailPath(pathname) ? (
        <Breadcrumb.Item>Detail</Breadcrumb.Item>
      ) : null}
    </Breadcrumb>
  );
}
