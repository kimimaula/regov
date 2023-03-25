import {
  Col,
  Form,
  Image,
  Layout,
  Menu,
  Modal,
  Rate,
  Row,
  Spin,
  Tag,
  Typography,
  Button,
} from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

import ReviewRoutes from "../../Api/routes/reviews";
import { AddReviews, EditReviews, TextField } from "../../Components";

import { StyledCard, StyledTable, LoginCard, Title } from "./styled";

import Cookies from "js-cookie";

import LoginApiRoutes from "../../Api/routes/login";

const { Content, Sider } = Layout;

type DecodedToken = {
  user: "string";
  email: "string";
};

type status = "default" | "sendOtp" | "changePassword";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const [editReviewsData, setEditReviewsData] = useState({
    visible: false,
    record: {},
  });
  const [activeMenuItem, setActiveMenuItem] = useState("userProfile");
  const [otpStatus, setOtpStatus] = useState("default");
  const [form] = Form.useForm();

  const handleMenuClick = (e: any) => {
    setActiveMenuItem(e.key);
  };

  const items = [
    {
      key: "userProfile",
      label: "User Profile",
    },
    {
      key: "reviews",
      label: "Reviews",
    },
    {
      key: "changePassword",
      label: "Change Password",
    },
  ];

  const token = Cookies.get("auth_token");
  const decodedToken: DecodedToken = jwtDecode(token as any);

  const UserReviews = () => {
    return (
      <StyledCard>
        <Row gutter={[10, 20]} justify="space-between">
          <Col>
            <Typography.Title level={3} style={{ margin: 5 }}>
              Reviews
            </Typography.Title>
          </Col>
          <Col span={3}>
            <AddReviews />
          </Col>
          <Col span={24}>
            <StyledTable
              size="middle"
              pagination={{ pageSize: 10 }}
              dataSource={reviewsData}
              columns={columns as any}
              rowClassName={() => "clickable-row"}
              onRow={(record) => {
                return {
                  onClick: () => {
                    setEditReviewsData({ visible: true, record });
                  },
                };
              }}
            />
          </Col>
        </Row>
      </StyledCard>
    );
  };

  const UserProfile = () => {
    return (
      <StyledCard>
        <Row
          style={{ height: "100%" }}
          justify="center"
          align="middle"
          gutter={[10, 20]}
        >
          <Col span={6}>
            <Image
              style={{ borderRadius: 15 }}
              src="https://picsum.photos/200/200"
            />
          </Col>
          <Col span={18}>
            <Row>
              <Col span={24}>
                <Typography.Title level={4}>
                  Welcome Back {decodedToken?.user}
                </Typography.Title>
              </Col>

              <Col span={24}>
                <Typography.Paragraph>
                  Username: {decodedToken?.user}
                </Typography.Paragraph>
              </Col>
              <Col span={24}>
                <Typography.Paragraph>
                  Email: {decodedToken?.email}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </StyledCard>
    );
  };

  const RequestOtpButtons = () => {
    return (
      <Row justify="end" gutter={5}>
        <Col>
          <Button onClick={() => setOtpStatus("default")} type="primary" danger>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button onClick={() => onFinish("sendOtp")} type="primary">
            Request Otp
          </Button>
        </Col>
      </Row>
    );
  };

  const ChangePasswordButtons = () => {
    return (
      <Row justify="end" gutter={5}>
        <Col>
          <Button onClick={() => setOtpStatus("default")} type="primary" danger>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button onClick={() => onFinish("changePassword")} type="primary">
            Reset Password
          </Button>
        </Col>
      </Row>
    );
  };

  const ChangePassword = () => {
    return (
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
            {otpStatus === "sendOtp" && (
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
            {otpStatus === "sendOtp" && (
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
            {otpStatus === "sendOtp" && (
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

            <Col span={24}>
              {otpStatus === "default" && <RequestOtpButtons />}
              {otpStatus === "sendOtp" && <ChangePasswordButtons />}
            </Col>
          </LoginCard>
        </Form>
      </Spin>
    );
  };

  const onFinish = async (status: status) => {
    form.validateFields().then(async () => {
      try {
        setLoading(true);
        if (status === "sendOtp") {
          const sendData = { email: form.getFieldValue("email") };
          await axios.post(
            `${process.env.REACT_APP_BASE_API_URL}${LoginApiRoutes.getOtp}`,
            sendData
          );
          setOtpStatus(status);
          setLoading(false);
        }
        if (status === "changePassword") {
          const sendData = {
            email: form.getFieldValue("email"),
            password: form.getFieldValue("password"),
            otp: form.getFieldValue("otp"),
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
              setOtpStatus("default");
            },
          });
        }
      } catch (error: any) {
        const errMessage = error?.response?.data?.message || "An Error Occured";
        setLoading(false);
        Modal.error({ title: "An Error Occured", content: errMessage });
      }
    });
  };

  const columns = [
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      width: "10%",
      render: (data: { _id: string; eventName: string }) => {
        return <div>{data?.eventName}</div>;
      },
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      width: "50%",
      render: (data: string) => {
        return <div style={{ whiteSpace: "pre-wrap" }}>{data}</div>;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: "20%",
      render: (data: string) => {
        return <Rate disabled defaultValue={parseInt(data)} />;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (data: string) => {
        return (
          <Tag color={data === "draft" ? "gold" : "blue"}>
            {data.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  useEffect(() => {
    const getEvents = async () => {
      if (token) {
        try {
          setLoading(true);
          const headers = {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          };
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}${ReviewRoutes.getUserReviews}`,
            { headers }
          );
          setReviewsData(response?.data?.data ?? []);
          setLoading(false);
        } catch (error: any) {
          const errMessage =
            error?.response?.data?.message || "An Error Occured";
          setLoading(false);
          Modal.error({ title: "An Error Occured", content: errMessage });
        }
      }
    };
    getEvents();
  }, [token]);

  return (
    <div style={{ height: "100%", padding: 25 }}>
      <EditReviews
        modalData={editReviewsData}
        setModalData={setEditReviewsData}
      />
      <Spin spinning={loading}>
        <Typography.Title level={5}>
          Welcome Back {decodedToken?.user}
        </Typography.Title>
        <Typography.Title level={1} style={{ margin: "15px 0" }}>
          User Dashboard
        </Typography.Title>

        <div>
          <Layout>
            <Sider style={{ height: 150 }} width={200}>
              <Menu
                onClick={handleMenuClick}
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
                items={items}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              {activeMenuItem === "userProfile" ? (
                <UserProfile />
              ) : activeMenuItem === "reviews" ? (
                <UserReviews />
              ) : (
                <ChangePassword />
              )}
            </Content>
          </Layout>
        </div>
      </Spin>
    </div>
  );
};

export default HomePage;
