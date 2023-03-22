import axios from "axios";
import { useState, useEffect } from "react";
import NewsRoutes from "../../Api/routes/news";
import {
  Modal,
  Card,
  Typography,
  Row,
  Col,
  Image,
  Skeleton,
  Button,
  Table,
  Spin,
  Rate,
} from "antd";

import AddReviewModal from "./addReviewModal";
import ReviewRoutes from "../../Api/routes/reviews";

import Cookies from "js-cookie";

type displayDataProps = {
  _id: string;
  title: string;
  description: string;
};

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);

  const token = Cookies.get("auth_token");

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
      width: "70%",
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
    <div style={{ height: "100%" }}>
      <Spin spinning={loading}>
        <Typography.Title level={1} style={{ margin: 5 }}>
          Dashboard
        </Typography.Title>
        <div
          style={{
            height: "100%",
            borderRadius: 15,
            backgroundColor: "white",
            padding: "30px 10px 10px 10px",
          }}
        >
          <Row gutter={[10, 20]} justify="space-between">
            <Col>
              <Typography.Title level={3} style={{ margin: 5 }}>
                Reviews
              </Typography.Title>
            </Col>
            <Col span={3}>
              <AddReviewModal />
            </Col>
            <Col span={24}>
              <Table
                pagination={{ pageSize: 10 }}
                dataSource={reviewsData}
                columns={columns}
              />
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default HomePage;
