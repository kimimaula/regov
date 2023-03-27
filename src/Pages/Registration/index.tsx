import { Col, Form, Button, Row, Modal } from "antd";
import { LoginContainer, LoginCard, Title } from "./styled";
import { useNavigate } from "react-router-dom";
import { TextField, FormButton, FileUploaderField } from "../../Components";
import LoginApiRoutes from "../../Api/routes/login";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const file = values.avatar.fileList[0];
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append(
      "avatar",
      new File([file.originFileObj], file.name, { type: file.type })
    );

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}${LoginApiRoutes.register}`,
        formData
      );
      Modal.success({
        title: "Account Created!",
        onOk: () => navigate("/login"),
      });
    } catch (error: any) {
      const errMessage = error?.response?.data?.message || "An Error Occured";
      Modal.error({ title: "An Error Occured", content: errMessage });
    }
  };

  return (
    <LoginContainer>
      <Form onFinish={onFinish} name="loginForm">
        <LoginCard>
          <Title>Registration</Title>
          <Col span={24}>
            <FileUploaderField
              label="Avatar Image"
              name="avatar"
              rules={[{ required: true, message: "Please upload an avatar" }]}
            />
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
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
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
            <TextField
              label="Confirm Password"
              name="confirm_password"
              type="password"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }: any) => ({
                  validator(_: any, value: string) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match!");
                  },
                }),
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
                  Register
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
