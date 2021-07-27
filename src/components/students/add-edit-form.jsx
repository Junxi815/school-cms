import { Form, Input, Button, Select } from "antd";
import styled from "styled-components";
import { studentTypes } from "../../lib/constants/student-types";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { offset: 1 },
};

const ModalFormSubmit = styled(Form.Item)`
  position: absolute;
  bottom: 0;
  right: 8em;
  margin-bottom: 10px;
`;

export default function AddEditForm(props) {
  const { student, handleFormSubmit } = props;
  const [form] = Form.useForm();
  // Note that initialValues cannot be updated by setState dynamically,
  // you should use setFieldsValue in that situation.
  // You shouldn't call setState manually, please use form.setFieldsValue to change value programmatically.
  form.setFieldsValue({
    name: student?.name,
    email: student?.email,
    country: student?.country,
    type: student?.type?.id,
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
        <Input placeholder="student name" />
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
        label="Area"
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
        name="type"
        label="Student Type"
        rules={[{ required: true, message: "Please select student type!" }]}
      >
        <Select>
          <Option value={studentTypes.tester}>tester</Option>
          <Option value={studentTypes.developer}>developer</Option>
        </Select>
      </Form.Item>
      <ModalFormSubmit>
        <Button type="primary" htmlType="submit">
          {!!student ? "Update" : "Add"}
        </Button>
      </ModalFormSubmit>
    </Form>
  );
}
