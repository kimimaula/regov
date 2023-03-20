import { Col, Form } from "antd";
import { LoginContainer, LoginCard } from "./styled";
import { Link } from "react-router-dom";
import { TextField, FormButton } from "../../Components";

const LoginPage = () => {
  return (
    <LoginContainer>
      <Form name="loginForm">
        <LoginCard>
          <Col span={24}>
            <TextField
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            />
          </Col>
          <Col span={24}>
            <TextField
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            />
          </Col>
          <Col span={24}>
            <Link to="/forgot_password">Forgot Password</Link>
          </Col>
          <Col>
            <FormButton type="primary">Login</FormButton>
          </Col>
        </LoginCard>
      </Form>
    </LoginContainer>
  );
};

export default LoginPage;
