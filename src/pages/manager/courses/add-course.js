import { useState } from "react";
import { Steps, Card, Result, Button } from "antd";
import { Link } from "react-router-dom";
import AddCourseForm from "../../../components/courses/add-course-form";
import UpdateChapterForm from "../../../components/courses/update-chapter-form";

const { Step } = Steps;

export default function AddCourse() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);
  const { scheduleId, uId } = data;
  const steps = [
    {
      title: "Course Detail",
      content: (
        <AddCourseForm
          onSuccess={(data) => {
            setData(data);
            setCurrent(current + 1);
          }}
        />
      ),
    },
    {
      title: "Course Schedule",
      content: (
        <UpdateChapterForm
          courseId={uId}
          scheduleId={scheduleId}
          onSuccess={() => {
            setCurrent(current + 1);
          }}
        />
      ),
    },
    {
      title: "Success",
      content: (
        <Result
          status="success"
          title="Successfully Create Course!"
          extra={[
            <Button type="primary">
              <Link to={`/dashboard/manager/courses/${data?.id}`}>
                Go Course
              </Link>
            </Button>,
            <Button>
              <Link to="/dashboard/manager/add-course">Create Again</Link>
            </Button>,
          ]}
        />
      ),
    },
  ];

  return (
    <Card>
      <Steps
        type="navigation"
        current={current}
        className="site-navigation-steps"
      >
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
    </Card>
  );
}
