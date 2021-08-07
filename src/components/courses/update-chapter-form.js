import {
  Form,
  Row,
  Col,
  Button,
  Input,
  message,
  Select,
  TimePicker,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { weekDays } from "../../lib/constants/week-days";
import { useState } from "react";
import { updateCourseSchedule } from "../../lib/services/api";
const { List, Item } = Form;
const { Option } = Select;

const cpts = "chapters";
const clsTime = "classTime";

const initialValues = {
  [cpts]: [{ name: "", content: "" }],
  [clsTime]: [{ weekday: "", time: "" }],
};

export default function UpdateChapterForm({ courseId, scheduleId, onSuccess }) {
  const [form] = Form.useForm();
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const onFinish = (values) => {
    console.log(values);
    if (!courseId && !scheduleId) {
      message.error("You must select a course to update!");
      return;
    }

    const { classTime, chapters } = values;
    const cTime = classTime.map(
      ({ weekday, time }) => `${weekday} ${time.format("hh:mm:ss")}`
    );
    const scheduleUpdateReq = {
      chapters: chapters.map((item, index) => ({ ...item, order: index + 1 })),
      classTime: cTime,
      scheduleId,
      courseId,
    };
    (async () => {
      const result = await updateCourseSchedule(scheduleUpdateReq);
      if (result.data) {
        onSuccess();
      }
    })();
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={initialValues}
    >
      <Row gutter={[22, 6]} style={{ marginTop: "1em" }}>
        <Col span={12}>
          <h2>Chapters</h2>
          <List name={cpts}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Row key={field.key} gutter={20}>
                    <Col span={8}>
                      <Item
                        {...field}
                        name={[field.name, "name"]}
                        fieldKey={[field.fieldKey, "name"]}
                        rules={[
                          {
                            required: true,
                            message: "Name is required.",
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Chapter Name" />
                      </Item>
                    </Col>

                    <Col span={12}>
                      <Item
                        {...field}
                        name={[field.name, "content"]}
                        fieldKey={[field.fieldKey, "content"]}
                        rules={[
                          {
                            required: true,
                            message: "Content is required.",
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Chapter content" />
                      </Item>
                    </Col>

                    <Col span={2}>
                      <Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            if (fields.length > 1) {
                              remove(field.name);
                            } else {
                              message.warn(
                                "You must set at least one chapter."
                              );
                            }
                          }}
                        />
                      </Item>
                    </Col>
                  </Row>
                ))}

                <Row>
                  <Col span={20}>
                    <Item>
                      <Button
                        type="dashed"
                        size="large"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Chapter
                      </Button>
                    </Item>
                  </Col>
                </Row>
              </>
            )}
          </List>
        </Col>

        <Col span={12}>
          <h2>Class times</h2>
          <List name={clsTime}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Row key={field.key} gutter={20}>
                    <Col span={8}>
                      <Form.Item
                        {...field}
                        name={[field.name, "weekday"]}
                        fieldKey={[field.fieldKey, "weekday"]}
                        rules={[
                          { required: true, message: "Weekday is required." },
                        ]}
                      >
                        <Select
                          size="large"
                          onChange={(value) => {
                            const selectedItem = {
                              fieldKey: field.fieldKey,
                              value,
                            };
                            console.log(selectedWeekdays);
                            const trimSelectedWeekdays =
                              selectedWeekdays.filter(
                                (item) => item.fieldKey !== field.fieldKey
                              );
                            console.log(trimSelectedWeekdays);
                            trimSelectedWeekdays.push(selectedItem);
                            setSelectedWeekdays(trimSelectedWeekdays);
                          }}
                        >
                          {weekDays.map((day) => (
                            <Option
                              key={day}
                              value={day}
                              disabled={
                                !!selectedWeekdays.find(
                                  (item) => item.value === day
                                )
                              }
                            >
                              {day}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Item
                        {...field}
                        name={[field.name, "time"]}
                        fieldKey={[field.fieldKey, "time"]}
                        rules={[
                          {
                            required: true,
                            message: "Exact time is required.",
                          },
                        ]}
                      >
                        <TimePicker size="large" style={{ width: "100%" }} />
                      </Item>
                    </Col>

                    <Col span={2}>
                      <Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            if (fields.length > 1) {
                              const SelectedWeekdaysAfterDelete =
                                selectedWeekdays.filter(
                                  (item) => item.fieldKey !== field.fieldKey
                                );
                              setSelectedWeekdays(SelectedWeekdaysAfterDelete);
                              remove(field.name);
                            } else {
                              message.warn(
                                "You must set at least one class time."
                              );
                            }
                          }}
                        />
                      </Item>
                    </Col>
                  </Row>
                ))}

                <Row>
                  <Col span={20}>
                    <Form.Item>
                      <Button
                        type="dashed"
                        size="large"
                        disabled={fields.length >= 7}
                        onClick={() => {
                          add();
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Class Time
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </List>
        </Col>
      </Row>

      <Item>
        <Button type="primary" htmlType="submit" style={{ width: "150px" }}>
          Submit
        </Button>
      </Item>
    </Form>
  );
}
