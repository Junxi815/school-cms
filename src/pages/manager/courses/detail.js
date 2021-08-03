import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Spin, Card, Badge, Steps, Tag, Collapse } from "antd";
import styled from "styled-components";
import { getCourseById } from "../../../lib/services/api";
import CourseOverview from "../../../components/courses/course-overview";
import WeekCalendar from "../../../components/common/week-calendar";

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 1px solid #f0f0f0;
  border-left: none;
  & span {
    font-size: 1.5em;
    font-weight: 500;
    color: #7356f1;
  }
  &:last-child {
    border-right: none;
  }
`;
const H3 = styled.h3`
  margin: 1em 0;
`;

const StyledRow = styled(Row)`
  margin: 0 -24px -24px !important;
`;

const StepsRow = styled(Row)`
  overflow-x: scroll;
  height: 50px;
`;

const courseBadgeStatus = ["warning", "success", "default"];
const courseStatusColor = ["default", "green", "orange"];
const courseStatusText = ["finished", "processing", "pending"];

const getPanelExtra = (schedule, index) => {
  const activeIndex = schedule.chapters.findIndex(
    (item) => item.id === schedule.current
  );
  const status = activeIndex === index ? 1 : activeIndex > index ? 0 : 2;
  return (
    <Tag style={{ color: courseStatusColor[status] }}>
      {courseStatusText[status]}
    </Tag>
  );
};

export default function CourseDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [data, setData] = useState(null);
  useEffect(() => {
    const getCourseDetail = async () => {
      setLoading(true);
      const { data } = await getCourseById(id);
      setLoading(false);
      if (data) {
        console.log(data);
        const { sales } = data;
        const info = [
          { label: "Price", value: sales.price },
          { label: "Batches", value: sales.batches },
          { label: "Students", value: sales.studentAmount },
          { label: "Earings", value: sales.earnings },
        ];
        setInfo(info);
        setActiveChapterIndex(
          data.schedule.chapters.findIndex(
            (item) => item.id === data.schedule.current
          )
        );
        setData(data);
      }
    };
    getCourseDetail();
  }, []);
  return (
    <>
      <Spin spinning={loading}>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col span={8}>
            <CourseOverview {...data}>
              <StyledRow>
                {info.map((item, index) => (
                  <StyledCol key={index} span={6}>
                    <span>{item?.value}</span>
                    <p>{item?.label}</p>
                  </StyledCol>
                ))}
              </StyledRow>
            </CourseOverview>
          </Col>

          <Col span={16}>
            <Card>
              <h2 style={{ color: "#7356f1", fontWeight: 700 }}>
                Course Detail
              </h2>
              <H3>Create Time</H3>
              <Row>{data?.ctime}</Row>

              <H3>Start Time</H3>
              <Row>{data?.startTime}</Row>

              <Badge status={courseBadgeStatus[data?.status]} offset={[3, 21]}>
                <H3>Status</H3>
              </Badge>
              <StepsRow>
                <Steps
                  size="small"
                  current={activeChapterIndex}
                  style={{ width: "auto" }}
                >
                  {data?.schedule.chapters.map((item) => (
                    <Steps.Step title={item.name} key={item.id}></Steps.Step>
                  ))}
                </Steps>
              </StepsRow>

              <H3>Course Code</H3>
              <Row>{data?.uid}</Row>

              <H3>Class Time</H3>
              <WeekCalendar data={data?.schedule.classTime} />

              <H3>Category</H3>
              <Row>
                {data?.type.map((item) => (
                  <Tag color={"geekblue"} key={item.id}>
                    {item.name}
                  </Tag>
                ))}
              </Row>

              <H3>Description</H3>
              <Row>{data?.detail}</Row>

              <H3>Chapter</H3>
              {data?.schedule && (
                <Collapse defaultActiveKey={data.schedule.current}>
                  {data.schedule.chapters.map((item, index) => (
                    <Collapse.Panel
                      header={item.name}
                      key={item.id}
                      extra={getPanelExtra(data.schedule, index)}
                    >
                      <p>{item.content}</p>
                    </Collapse.Panel>
                  ))}
                </Collapse>
              )}
            </Card>
          </Col>
        </Row>
      </Spin>
    </>
  );
}
