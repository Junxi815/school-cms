import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStudentById } from "../../../../lib/services/api";
import { Breadcrumb, Card, Row, Col, Avatar, Typography, Tabs } from "antd";
import styled from "styled-components";

const { Text, Title } = Typography;
const { TabPane } = Tabs;

const InfoDiv = styled.div`
  display: inline-block;
  width: 50%;
  & p {
    text-align: center;
  }
`;

export default function StudentDetail() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const { data } = await getStudentById(id);
      setData(data);
    })();
  }, [id]);

  return (
    <>
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/dashboard/manager">CMS MANAGER SYSTEM</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Student</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/dashboard/manager/students">Student List</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>detail</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col span={10}>
          <Card
            title={
              <Avatar
                src={data?.avatar}
                style={{
                  width: 100,
                  height: 100,
                  display: "block",
                  margin: "auto",
                }}
              />
            }
          >
            <div className="info">
              <InfoDiv className="info-detail">
                <p>
                  <Text strong>Name</Text>
                </p>
                <p>{data.name}</p>
              </InfoDiv>
              <InfoDiv className="info-detail">
                <p>
                  <Text strong>Age</Text>
                </p>
                <p>{data.age}</p>
              </InfoDiv>
              <InfoDiv className="info-detail">
                <p>
                  <Text strong>Email</Text>
                </p>
                <p>{data.email}</p>
              </InfoDiv>
              <InfoDiv className="info-detail">
                <p>
                  <Text strong>Phone</Text>
                </p>
                <p>{data.phone}</p>
              </InfoDiv>
              <InfoDiv className="info-detail" style={{ width: "100%" }}>
                <p>
                  <Text strong>Address</Text>
                </p>
                <p>{data.address}</p>
              </InfoDiv>
            </div>
          </Card>
        </Col>

        <Col span={14}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="About" key="1">
                <Title level={4}>Information</Title>
              </TabPane>
              <TabPane tab="Courses" key="2">
                A table rendering courses
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </>
  );
}
