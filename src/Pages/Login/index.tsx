import { Col, Form, Row, Modal } from "antd";
import { LoginContainer, LoginCard, Title } from "./styled";
import { Link, useNavigate } from "react-router-dom";
import { TextField, FormButton } from "../../Components";
import LoginApiRoutes from "../../Api/routes/login";
import axios from "axios";
import Cookies from "js-cookie";

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}${LoginApiRoutes.login}`,
        values
      );
      const token = response.data.token;
      const username = response.data.user;
      Cookies.set("auth_token", token);
      Cookies.set("username", username);
      navigate("/");
    } catch (error: any) {
      const errMessage = error?.response?.data?.message || "An Error Occured";
      Modal.error({ title: "An Error Occured", content: errMessage });
    }
  };

  return (
    <LoginContainer>
      <Form onFinish={onFinish} name="loginForm">
        <LoginCard>
          <Col span={24}>
            <Title>Login</Title>
          </Col>
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
              type="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            />
          </Col>
          <Col span={24}>
            <Link to="/forgot-password">Forgot Password</Link>
          </Col>
          <Col span={24}>
            <Link to="/registration">Register</Link>
          </Col>
          <Col span={24}>
            <Row justify="space-between">
              <Col />
              <Col>
                <FormButton type="primary">Login</FormButton>
              </Col>
            </Row>
          </Col>
        </LoginCard>
      </Form>
    </LoginContainer>
  );
};

export default LoginPage;
