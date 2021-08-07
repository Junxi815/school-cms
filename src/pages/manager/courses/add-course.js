import { useState } from "react";
import { Steps, Card, message } from "antd";
import AddCourseForm from "../../../components/courses/add-course-form";
import UpdateChapterForm from "../../../components/courses/update-chapter-form";
import Result from "./add-course-result";

const { Step } = Steps;

export default function AddCourse() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);

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
          onSuccess={() => {
            setCurrent(current + 1);
          }}
        />
      ),
    },
    {
      title: "Success",
      content: <Result />,
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