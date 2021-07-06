import { Typography, Form, Input, Checkbox, Button, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import {Link,useHistory} from 'react-router-dom'
import { useEffect } from "react";
import _ from "lodash"
import {reqLogin} from "../../api"
import { ROLE } from "../../utils/constants"
import "./login.css";
import { userInfo } from "../../utils/localStorage";


const { Title } = Typography;

const StyledButton = styled(Button)`
  width:100%;
`

const StyledTitle = styled(Title)`
  text-align: center;
  font-family: "BebasNeue";
  margin-bottom: 30px;
  letter-spacing: -3px;
`;

function Login() {
  
  const [form] = Form.useForm()
  let history = useHistory()

  const handleSubmit = async (values) => {
    const {role,email,password} = values
    //怎么加密
    const result = await reqLogin(role,email,password)

    console.log(result) //401错误

    // 如果成功{local storage保存userInf.saveUser('')，
    // 然后history.push('')跳转到相应的dashboard}
    // 否则{提示失败信息}
  }

  useEffect(()=>{
    const user = userInfo.getUser()
    if(!_.isEmpty(user)){
      //跳转到user的dashboard页面
    }
  },[])

  return (
    <div className="login">
      <StyledTitle>COURSE MANAGEMENT ASSISTANT</StyledTitle>
      <Form
        name="normal_login"
        className="login-form"
        form={form}
        initialValues={{ role: ROLE.student, remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="role"
          rules={[{required: true}]}
        >
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
            { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: "Please input a valid email!"}
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
            {min:4, max:16, message:"Password must be between 4 and 16 characters!"}
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
          No account? <Link to='/signup'>Sign up</Link>
    
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;
