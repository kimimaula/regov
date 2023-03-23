import { useState } from "react";
import { Col, Form, Row, Button, Modal, Spin } from "antd";
import { LoginContainer, LoginCard, Title } from "./styled";
import { useNavigate } from "react-router-dom";
import { TextField } from "../../Components";
import LoginApiRoutes from "../../Api/routes/login";
import axios from "axios";

type status = "default" | "sentOtp" | "otpVerified" | "verifyOtp";

const LoginPage = () => {
  const [otpStatus, setOtpStatus] = useState("default");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (status: status) => {
    form.validateFields().then(async () => {
      try {
        setLoading(true);
        if (status === "sentOtp") {
          const sendData = { email: form.getFieldValue("email") };
          await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}${LoginApiRoutes.getOtp}`,
            sendData
          );
          setOtpStatus(status);
          setLoading(false);
        }
        if (status === "verifyOtp") {
          const sendData = {
            email: form.getFieldValue("email"),
            otp: form.getFieldValue("otp"),
          };

          await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}${LoginApiRoutes.verifyOtp}`,
            sendData
          );
          setOtpStatus("otpVerified");
          setLoading(false);
        }
        if (status === "otpVerified") {
          const sendData = {
            email: form.getFieldValue("email"),
            password: form.getFieldValue("password"),
          };

          await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}${LoginApiRoutes.changePassword}`,
            sendData
          );
          setLoading(false);
          Modal.success({
            title: "Success!",
            content: "Password Updated",
            onOk: () => {
              navigate("/login");
            },
          });
        }
      } catch (error: any) {
        const errMessage = error?.response?.data?.message || "An Error Occured";
        setLoading(false);
        Modal.error({ title: "An Error Occured", content: errMessage });
      }
    });

    // navigate("/login");
  };

  const RequestOtp = () => {
    return (
      <Row justify="end" gutter={5}>
        <Col>
          <Button onClick={() => navigate("/login")} type="primary" danger>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button onClick={() => onFinish("sentOtp")} type="primary">
            Request Otp
          </Button>
        </Col>
      </Row>
    );
  };

  const OtpVerificationBtn = () => {
    return (
      <Row justify="end" gutter={5}>
        <Col>
          <Button onClick={() => navigate("/login")} type="primary" danger>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button onClick={() => onFinish("verifyOtp")} type="primary">
            Verify Otp
          </Button>
        </Col>
      </Row>
    );
  };

  const OtpVerifiedBtns = () => {
    return (
      <Row justify="end" gutter={5}>
        <Col>
          <Button onClick={() => navigate("/login")} type="primary" danger>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button onClick={() => onFinish("otpVerified")} type="primary">
            Reset Password
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <LoginContainer>
      <Spin spinning={loading}>
        <Form form={form} name="loginForm">
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
            {otpStatus === "otpVerified" && (
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
            )}
            {otpStatus === "otpVerified" && (
              <Col span={24}>
                <TextField
                  label="Confirm New Password"
                  name="confirm_password"
                  type="password"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your new password!",
                    },
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
            )}
            {otpStatus === "sentOtp" && (
              <Col span={24}>
                <TextField
                  label="OTP"
                  name="otp"
                  type="password"
                  maxLength={6}
                  rules={[
                    { required: true, message: "Confirm OTP" },
                    {
                      pattern: /^[0-9]*$/,
                      message: "Please enter only numbers",
                    },
                    { max: 6, message: "OTP should be 6 digits" },
                  ]}
                />
              </Col>
            )}
            <Col span={24}>
              {otpStatus === "default" && <RequestOtp />}
              {otpStatus === "sentOtp" && <OtpVerificationBtn />}
              {otpStatus === "otpVerified" && <OtpVerifiedBtns />}
            </Col>
          </LoginCard>
        </Form>
      </Spin>
    </LoginContainer>
  );
};

export default LoginPage;
