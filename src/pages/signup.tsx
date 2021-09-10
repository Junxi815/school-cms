import { Typography, Form, Input, Button, Radio, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link, useHistory, Redirect } from "react-router-dom";
import { signup } from "../lib/services/api";
import { ROLE } from "../lib/constants/role";
import { getUser } from "../lib/services/userInfo";
import Header from "../components/header/header";

const { Title } = Typography;

const StyledDiv = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 20px 0;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledTitle = styled(Title)`
  text-align: center;
  font-family: "BebasNeue";
  margin-bottom: 15px;
`;

export default function Signup() {
  const [form] = Form.useForm();
  const history = useHistory();
  const user = getUser();
  if (!!user.role) {
    return <Redirect to={`/dashboard/${user.role}`} />;
  }
  const handleSubmit = async (values) => {
    const { role, email, password } = values;
    const result = await signup(role, email, password);
    if (result.data) {
      history.push("/login");
      message.success("Sign up successfully.");
    } else {
      message.error(result.msg);
    }
  };

  return (
    <>
      <Header />
      <StyledDiv>
        <StyledTitle>SIGN UP YOUR ACCOUNT</StyledTitle>
        <Form
          name="normal_login"
          className="login-form"
          labelCol={{ span: 24 }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={ROLE.student}>Student</Radio>
              <Radio value={ROLE.teacher}>Teacher</Radio>
              <Radio value={ROLE.manager}>Manager</Radio>
            </Radio.Group>
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
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Please input username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your Password!" },
              {
                min: 4,
                max: 16,
                message: "Password must be between 4 and 16 characters!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Please input password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please input your Password!" },
              {
                min: 4,
                max: 16,
                message: "Password must be between 4 and 16 characters!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Type password again"
            />
          </Form.Item>

          <Form.Item>
            <StyledButton
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign Up
            </StyledButton>
            <span>Already have an account?</span>{" "}
            <Link to="/login">Sign in</Link>
          </Form.Item>
        </Form>
      </StyledDiv>
    </>
  );
}
