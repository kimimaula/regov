import { Col, Form, Row, Button } from "antd";
import { LoginContainer, LoginCard, Title } from "./styled";
import { useNavigate } from "react-router-dom";
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
          <Title>Forgot Password</Title>
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
          <Col span={24}>
            <Row justify="end" gutter={5}>
              <Col>
                <Button
                  onClick={() => navigate("/login")}
                  htmlType="submit"
                  type="primary"
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <FormButton danger type="primary">
                  Reset Password
                </FormButton>
              </Col>
            </Row>
          </Col>
        </LoginCard>
      </Form>
    </LoginContainer>
  );
};

export default LoginPage;
