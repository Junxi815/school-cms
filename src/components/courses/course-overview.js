import { Card, Row, Col } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const durationUnits = ["year", "month", "day", "week", "hour"];

const getDuration = (data) => {
  const { duration, durationUnit } = data;
  const text = `${duration} ${durationUnits[durationUnit - 1]}`;

  return duration > 1 ? text + "s" : text;
};

const StyledRow = styled(Row)`
  position: relative;
  margin: 0 !important;
  :after {
    content: "";
    position: absolute;
    bottom: 0;
    background: #f0f0f0;
    width: 100%;
    height: 1px;
  }
`;

export default function CourseOverview(props) {
  return (
    <Card
      cover={<img src={props.cover} style={{ height: 260 }} alt="cover" />}
      {...props.cardProps}
    >
      <Row gutter={[6, 16]}>
        <h3>{props.name}</h3>
      </Row>

      <StyledRow gutter={[6, 16]} justify="space-between" align="middle">
        <Col>{props.startTime}</Col>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <HeartFilled style={{ marginRight: 5, fontSize: 16, color: "red" }} />
          <b>{props.star}</b>
        </Col>
      </StyledRow>

      <StyledRow gutter={[6, 16]} justify="space-between">
        <Col>Duration:</Col>
        <Col>
          <b>{getDuration(props)}</b>
        </Col>
      </StyledRow>

      <StyledRow gutter={[6, 16]} justify="space-between">
        <Col>Teacher:</Col>
        <Col style={{ fontWeight: "bold" }}>
          {props?.teacherName && (
            <Link to="/dashboard/manager">{props.teacherName}</Link>
          )}
        </Col>
      </StyledRow>

      <Row gutter={[6, 16]} justify="space-between" style={{ margin: "0px" }}>
        <Col>
          <UserOutlined
            style={{ marginRight: 5, fontSize: 16, color: "#1890ff" }}
          />
          <span>Student Limit:</span>
        </Col>
        <Col>
          <b>{props.maxStudents}</b>
        </Col>
      </Row>

      {props.children}
    </Card>
  );
}
