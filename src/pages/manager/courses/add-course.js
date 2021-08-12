import { useState } from "react";
import { Steps, Card, Result, Button } from "antd";
import { Link } from "react-router-dom";
import AddCourseForm from "../../../components/courses/add-course-form";
import UpdateChapterForm from "../../../components/courses/update-chapter-form";

const { Step } = Steps;

export default function AddCourse() {
  const [current, setCurrent] = useState(0);
  const [availableNavigate, setAvailableNavigate] = useState([0]);
  const [isReset, setIsReset] = useState(false);
  const [data, setData] = useState([]);
  const { scheduleId, uId } = data;
  const steps = [
    <AddCourseForm
      isReset={isReset}
      onSuccess={(data) => {
        setData(data);
        setIsReset(false);
        setAvailableNavigate([...availableNavigate, current + 1]);
        setCurrent(current + 1);
      }}
    />,

    <UpdateChapterForm
      courseId={uId}
      scheduleId={scheduleId}
      onSuccess={() => {
        setAvailableNavigate([...availableNavigate, current + 1]);
        setCurrent(current + 1);
      }}
    />,

    <Result
      status="success"
      title="Successfully Create Course!"
      extra={[
        <Button type="primary">
          <Link to={`/dashboard/manager/courses/${data?.id}`}>Go Course</Link>
        </Button>,
        <Button
          onClick={() => {
            setCurrent(0);
            setAvailableNavigate([0]);
            setIsReset(true);
          }}
        >
          Create Again
        </Button>,
      ]}
    />,
  ];

  return (
    <Card>
      <Steps
        type="navigation"
        current={current}
        className="site-navigation-steps"
        onChange={(current) => {
          if (availableNavigate.includes(current)) {
            setCurrent(current);
          }
        }}
      >
        <Step title="Course Detail" />
        <Step title="Course Schedule" />
        <Step title="Success" />
      </Steps>
      {/* <div className="steps-content">{steps[current].content}</div> */}
      {steps.map((content, index) => (
        <div
          key={index}
          style={{ display: index === current ? "block" : "none" }}
        >
          {content}
        </div>
      ))}
    </Card>
  );
}
