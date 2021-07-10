import { Typography, Form, Input, Checkbox, Button, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { reqLogin } from "../../api";
import { ROLE } from "../../utils/constants";
import { userInfo } from "../../utils/storage";
import { message } from "antd";
import Header from "../../components/header/header";

const { Title } = Typography;

const StyledDiv = styled.div`
  width: 700px;
  margin: 30px auto 0;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledTitle = styled(Title)`
  text-align: center;
  font-family: "BebasNeue";
  margin-bottom: 30px;
  letter-spacing: -3px;
`;

function Login() {
  const [form] = Form.useForm();
  let history = useHistory();

  const handleSubmit = async (values) => {
    const { role, email, password } = values;
    let result;
    try {
      result = await reqLogin(role, email, password);
      const user = result.data.data;
      userInfo.saveUser(user);
      history.push(`/dashboard/${user.role}`);
    } catch (error) {
      if (!!error.response) {
        message.error(error.response.data.msg);
      } else {
        message.error(error.message);
      }
    }
  };

  useEffect(() => {
    const user = userInfo.getUser();
    if (!!user.role) {
      return <Redirect to={`/dashboard/${user.role}`} />;
    }
  }, []);

  return (
    <StyledDiv>
      <Header />
      <StyledTitle>COURSE MANAGEMENT ASSISTANT</StyledTitle>
      <Form
        name="normal_login"
        className="login-form"
        form={form}
        initialValues={{ role: ROLE.student, remember: true }}
        validateTrigger="onBlur"
        onFinish={handleSubmit}
      >
        <Form.Item name="role" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio.Button value={ROLE.student}>Student</Radio.Button>
            <Radio.Button value={ROLE.teacher}>Teacher</Radio.Button>
            <Radio.Button value={ROLE.manager}>Manager</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="email"
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
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            {
              min: 4,
              max: 16,
              message: "Password must be between 4 and 16 characters!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <StyledButton
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign in
          </StyledButton>
          <span>No account?</span> <Link to="/signup">Sign up</Link>
        </Form.Item>
      </Form>
    </StyledDiv>
  );
}
export default Login;
