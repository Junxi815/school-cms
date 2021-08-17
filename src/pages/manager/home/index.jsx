import { useEffect, useState } from "react";
import { Card, Col, Progress, Row, Select } from "antd";
import {
  DeploymentUnitOutlined,
  ReadOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import {
  getStatisticsOverview,
  getStatistics,
} from "../../../lib/services/api";
import { ROLE } from "../../../lib/constants/role";
import Distribution from "../../../components/manager/distribution";

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

const Overview = ({ data, title, icon, style }) => {
  const [lastMonthAddedPercent, setLastMonthAddedPercent] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!!data) {
      const lastMonthAddedPercent = parseFloat(
        String(((data.lastMonthAdded / data.total) * 100).toFixed(2))
      );

      setLastMonthAddedPercent(lastMonthAddedPercent);
      setTotal(data.total);
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
            percent={100 - lastMonthAddedPercent}
            size="small"
            showInfo={false}
            strokeColor="white"
            trailColor="lightgreen"
          />
          <p>{`${lastMonthAddedPercent}% Increase in 30 Days`}</p>
        </OverviewCol>
      </Row>
    </Card>
  );
};

export default function ManagerHome() {
  const [overview, setOverview] = useState(null);
  const [distributionRole, setDistributionRole] = useState("student");
  const [studentStatistics, setStudentStatistics] = useState(null);
  const [teacherStatistics, setTeacherStatistics] = useState(null);
  const [courseStatistics, setCourseStatistics] = useState(null);

  useEffect(() => {
    getStatisticsOverview().then((res) => {
      const { data } = res;
      setOverview(data);
    });
    getStatistics(ROLE.student).then((res) => {
      const { data } = res;
      setStudentStatistics(data);
    });
    getStatistics(ROLE.teacher).then((res) => {
      const { data } = res;
      setTeacherStatistics(data);
    });
    getStatistics("course").then((res) => {
      const { data } = res;
      setCourseStatistics(data);
    });
  }, []);

  return (
    <Card>
      <Row align="middle" gutter={[24, 16]}>
        <Col span={8}>
          <Overview
            title="TOTAL STUDENTS"
            data={overview?.student}
            icon={<SolutionOutlined />}
            style={{ background: "#1890ff" }}
          />
        </Col>

        <Col span={8}>
          <Overview
            title="TOTAL TEACHERS"
            data={overview?.teacher}
            icon={<DeploymentUnitOutlined />}
            style={{ background: "#673bb7" }}
          />
        </Col>

        <Col span={8}>
          <Overview
            title="TOTAL COURSES"
            data={overview?.course}
            icon={<ReadOutlined />}
            style={{ background: "#ffaa16" }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card
            title="Distribution"
            extra={
              <Select defaultValue="student" onSelect={setDistributionRole}>
                <Select.Option value={ROLE.student}>Student</Select.Option>
                <Select.Option value={ROLE.teacher}>Teacher</Select.Option>
              </Select>
            }
          >
            <Distribution
              data={
                distributionRole === ROLE.student
                  ? studentStatistics?.country
                  : teacherStatistics?.country
              }
              title={distributionRole}
            />
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Card>
  );
}
