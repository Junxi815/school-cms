import { Form, Input, Button, Select, Col, Row, Slider } from "antd";
import styled from "styled-components";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { offset: 1 },
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="86">+86</Option>
      <Option value="1">+1</Option>
      <Option value="61">+61</Option>
      <Option value="64">+64</Option>
    </Select>
  </Form.Item>
);

const SkillCol = styled(Col)`
  .ant-form-item .ant-col-offset-1 {
    margin-left: 0;
  }
`;

const SkillDes = ["Know", "Practiced", "Comprehend", "Expert", "Master"];

const ModalFormSubmit = styled(Form.Item)`
  position: absolute;
  bottom: 0;
  right: 8em;
  margin-bottom: 10px;
`;

export default function AddEditForm({ teacher, handleFormSubmit }) {
  const [form] = Form.useForm();
  // Note that initialValues cannot be updated by setState dynamically,
  // you should use setFieldsValue in that situation.
  // You shouldn't call setState manually, please use form.setFieldsValue to change value programmatically.
  form.setFieldsValue({
    name: teacher?.name,
    email: teacher?.email,
    country: teacher?.country,
    phone: teacher?.phone,
    skills: teacher?.skills || [{ name: "", level: 2 }],
  });

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={(values) => handleFormSubmit(values)}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input placeholder="teacher name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please input your Username!" },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: "Please input a valid email!",
          },
        ]}
      >
        <Input placeholder="email" />
      </Form.Item>
      <Form.Item
        name="country"
        label="Country"
        rules={[{ required: true, message: "Please select your country!" }]}
      >
        <Select>
          <Option value="China">China</Option>
          <Option value="New zealand">New Zealand</Option>
          <Option value="Canada">Canada</Option>
          <Option value="Australia">Australia</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true }, { pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}" }]}
      >
        <Input addonBefore={prefixSelector} placeholder="mobile phone" />
      </Form.Item>

      <Form.Item label="Skills"> </Form.Item>
      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Row align="middle" key={field.name}>
                <SkillCol span={6} offset={1}>
                  <Form.Item
                    {...field}
                    name={[field.name, "name"]}
                    fieldKey={[field.fieldKey, "name"]}
                    rules={[{ required: true }]}
                  >
                    <Input style={{ textAlign: "right" }} />
                  </Form.Item>
                </SkillCol>

                <Col span={15}>
                  <Form.Item
                    {...field}
                    name={[field.name, "level"]}
                    fieldKey={[field.fieldKey, "level"]}
                    initialValue={2}
                  >
                    <Slider
                      step={1}
                      min={1}
                      max={5}
                      tipFormatter={(value) => SkillDes[value - 1]}
                    />
                  </Form.Item>
                </Col>

                <SkillCol style={{ alignSelf: "stretch" }}>
                  {fields.length > 1 && (
                    <MinusCircleOutlined
                      onClick={() => remove(field.name)}
                      style={{ margin: "10px 0 0 10px", color: "red" }}
                    />
                  )}
                </SkillCol>
              </Row>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Skill
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <ModalFormSubmit>
        <Button type="primary" htmlType="submit">
          {!!teacher ? "Update" : "Add"}
        </Button>
      </ModalFormSubmit>
    </Form>
  );
}
