import { Col, Form } from "antd";
import { LoginContainer, LoginCard } from "./styled";
import { Link, useNavigate } from "react-router-dom";
import { TextField, FormButton } from "../../Components";

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    navigate("/");
  };

  return (
    <LoginContainer>
      <Form onFinish={onFinish} name="loginForm">
        <LoginCard>
          <Col span={24}>
            <TextField
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            />
          </Col>
          <Col span={24}>
            <TextField
              label="New Password"
              name="password"
              type="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            />
          </Col>
          <Col span={24}>
            <TextField
              label="Confirm New Password"
              name="confirm_password"
              type="password"
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            />
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
