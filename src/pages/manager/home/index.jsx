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
import PieChart from "../../../components/manager/pie";
import LineChart from "../../../components/manager/line";

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
  const [selectedType, setSelectedType] = useState("studentType");

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
      <Row align="middle" gutter={[16, 24]}>
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
        <Col span={12}>
          <Card>
            <ChartSelect defaultValue="student" onSelect={setDistributionRole}>
              <Select.Option value={ROLE.student}>
                Students Distribution
              </Select.Option>
              <Select.Option value={ROLE.teacher}>
                Teachers Distribution
              </Select.Option>
            </ChartSelect>
            <Distribution
              data={
                distributionRole === ROLE.student
                  ? studentStatistics?.country
                  : teacherStatistics?.country
              }
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <ChartSelect defaultValue="studentType" onSelect={setSelectedType}>
              <Select.Option value="studentType">Student Types</Select.Option>
              <Select.Option value="courseType">Course Types</Select.Option>
              <Select.Option value="gender">Gender</Select.Option>
            </ChartSelect>
            {selectedType === "studentType" ? (
              <PieChart data={studentStatistics?.type} category="student" />
            ) : selectedType === "courseType" ? (
              <PieChart data={courseStatistics?.type} category="course" />
            ) : (
              <Row gutter={16}>
                <Col span={12}>
                  <PieChart
                    data={Object.entries(overview.student.gender).map(
                      ([name, amount]) => ({
                        name,
                        amount,
                      })
                    )}
                    category="gender"
                    title="student"
                  />
                </Col>

                <Col span={12}>
                  <PieChart
                    data={Object.entries(overview.teacher.gender).map(
                      ([name, amount]) => ({
                        name,
                        amount,
                      })
                    )}
                    category="gender"
                    title="teacher"
                  />
                </Col>
              </Row>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <LineChart
              data={{
                [ROLE.student]: studentStatistics?.createdAt,
                [ROLE.teacher]: teacherStatistics?.createdAt,
                course: courseStatistics?.createdAt,
              }}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
