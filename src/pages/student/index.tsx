import { useEffect, useState } from "react";
import { Card, Col, Progress, Row, Select } from "antd";
import {
  DesktopOutlined,
  SafetyOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { getStatistics } from "../../lib/services/api";
import { ROLE } from "../../lib/constants/role";
import { groupBy } from "lodash";
import { getUser } from "../../lib/services/userInfo";
import { Statistic } from "../../components/modal/statistics";

const OverviewIconCol = styled(Col)`
  display: flex;
  align-items: center;
  & .anticon {
    background: #fff;
    font-size: 32px;
    border-radius: 50%;
    color: #999;
    padding: 24px;
  }
`;
const OverviewCol = styled(Col)`
  color: #fff;
  h2,
  h3 {
    color: #fff;
    margin-bottom: 0;
  }
  h2 {
    font-size: 32px;
  }
  p {
    margin-bottom: 0;
  }
`;

const ChartSelect = styled(Select)`
  position: "relative";
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5em;
  .ant-select:not(.ant-select-customize-input),
  .ant-select-selector {
    border: 0 !important;
  }
  .ant-select-selector,
  .ant-select-selector:focus,
  .ant-select-selector:active {
    box-shadow: none !important;
  }
`;

export const Overview = ({ data, title, icon, style }) => {
  const [percent, setPercent] = useState(0);
  const [total, setTotal] = useState(0);
  const [text, setText] = useState("");
  useEffect(() => {
    if (!!data) {
      if (data.lastMonthAdded >= 0) {
        const lastMonthAddedPercent = parseFloat(
          String(((data.lastMonthAdded / data.total) * 100).toFixed(2))
        );
        setPercent(lastMonthAddedPercent);
        setText(`${lastMonthAddedPercent}% Increase in 30 Days`);
        setTotal(data.total);
      } else {
        const percent = parseFloat(
          String(((data.amount / data.total) * 100).toFixed(2))
        );
        setPercent(percent);
        setText(`${percent}% course ${title}`);
        setTotal(data.amount);
      }
    }
  }, [data]);

  return (
    <Card style={{ borderRadius: 5, cursor: "pointer", ...style }}>
      <Row>
        <OverviewIconCol span={7}>{icon}</OverviewIconCol>
        <OverviewCol span={17}>
          <h3>{title}</h3>
          <h2>{total}</h2>
          <Progress
            percent={100 - percent}
            size="small"
            showInfo={false}
            strokeColor="white"
            trailColor="lightgreen"
          />
          <p>{text}</p>
        </OverviewCol>
      </Row>
    </Card>
  );
};

export default function StudentHome() {
  const { userId } = getUser();
  const [overview, setOverview] = useState([
    { status: "0", amount: 0, total: 10000 },
    { status: "1", amount: 0, total: 10000 },
    { status: "2", amount: 0, total: 10000 },
  ]);

  const getOverviewData = (status: string) => {
    const target = overview.find((item) => item.status === status);

    return target ? target : { status, amount: 0, total: overview[0].total };
  };

  useEffect(() => {
    getStatistics(ROLE.student, userId).then((res) => {
      const { own, recommend } = res.data;
      const ownCourses = (own as Statistic).courses;

      const overview = Object.entries(
        //{ '0': Array, '1': Array }  ->  [["0",Array],["1",Array]]
        groupBy(ownCourses, (item) => item.course.status)
      ).map(([status, values]) => ({
        status: status,
        total: ownCourses.length,
        amount: (values as Array<Object>).length,
      }));
      setOverview(overview);
    });
  }, []);

  return (
    <Card>
      <Row align="middle" gutter={[16, 24]}>
        <Col span={8}>
          <Overview
            title="Pending"
            icon={<BulbOutlined />}
            data={getOverviewData("0")}
            style={{ background: "#1890ff" }}
          />
        </Col>

        <Col span={8}>
          <Overview
            title="Active"
            icon={<DesktopOutlined />}
            data={getOverviewData("1")}
            style={{ background: "#673bb7" }}
          />
        </Col>

        <Col span={8}>
          <Overview
            title="Done"
            icon={<SafetyOutlined />}
            data={getOverviewData("2")}
            style={{ background: "#ffaa16" }}
          />
        </Col>
      </Row>
    </Card>
  );
}
