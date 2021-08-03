import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStudentById } from "../../../lib/services/api";
import { Card, Row, Col, Avatar, Typography, Tabs, Tag, Table } from "antd";
import styled from "styled-components";
import { programLanguageColors } from "../../../lib/constants/programLanguageColors";
import { getUser } from "../../../lib/services/userInfo";

const { Title } = Typography;
const { TabPane } = Tabs;

const InfoDiv = styled.div`
  display: inline-block;
  width: 50%;
  & p {
    text-align: center;
  }
  & p:first-child {
    font-weight: 600;
  }
`;

export default function StudentDetail() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [info, setInfo] = useState([]);
  const [about, setAbout] = useState([]);
  const [data, setData] = useState(null);
  const columns = [
    {
      title: "No.",
      key: "index",
      render: (_1, _2, index) => index + 1,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (value, record) => (
        <Link to={`/dashboard/${getUser.role}/courses/${record.id}`}>
          {value}
        </Link>
      ),
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (type) => type.map((item) => item.name).join(","),
    },
    {
      title: "Join Time",
      key: "ctime",
      dataIndex: "ctime",
    },
  ];

  useEffect(() => {
    (async () => {
      const result = await getStudentById(id);
      if (result.data) {
        const { data } = result;
        const info = [
          { label: "Name", value: data.name },
          { label: "Age", value: data.age },
          { label: "Email", value: data.email },
          { label: "Phone", value: data.phone },
        ];
        const about = [
          { label: "Education", value: data.education },
          { label: "Area", value: data.memberStartAt },
          { label: "Gender", value: data.gender === 1 ? "Male" : "Female" },
          {
            label: "Member Period",
            value: data.memberStartAt + " - " + data.memberEndAt,
          },
          { label: "Type", value: data.type.name },
          { label: "Create Time", value: data.ctime },
          { label: "Update Time", value: data.updateAt },
        ];
        setInfo(info);
        setCourses(data.courses);
        setAbout(about);
        setData(data);
      }
    })();
  }, [id]);

  return (
    <>
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
              {info.map((item) => (
                <InfoDiv key={item.label}>
                  <p>{item.label}</p>
                  <p>{item.value}</p>
                </InfoDiv>
              ))}
              <InfoDiv className="info-detail" style={{ width: "100%" }}>
                <p>Address</p>
                <p>{data?.address}</p>
              </InfoDiv>
            </div>
          </Card>
        </Col>

        <Col span={14}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="About" key="1">
                <Title level={3}>Information</Title>
                <Row gutter={[6, 16]} style={{ marginBottom: "16px" }}>
                  {about.map((item) => (
                    <Col span={24} key={item.label}>
                      <b
                        style={{
                          marginRight: 16,
                          minWidth: 150,
                          display: "inline-block",
                        }}
                      >
                        {item.label}:
                      </b>
                      <span>{item.value}</span>
                    </Col>
                  ))}
                </Row>

                <Title level={3}>Interesting</Title>
                <Row gutter={[16, 24]}>
                  <Col>
                    {data?.interest.map((item, index) => (
                      <Tag
                        color={programLanguageColors[index]}
                        key={item}
                        style={{ padding: "5px 10px" }}
                      >
                        {item}
                      </Tag>
                    ))}
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Courses" key="2">
                <Table dataSource={courses} columns={columns}></Table>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </>
  );
}
