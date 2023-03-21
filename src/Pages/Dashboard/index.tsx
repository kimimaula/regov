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
} from "antd";

import AddReviewModal from "./addReviewModal";

type displayDataProps = {
  _id: string;
  title: string;
  description: string;
};

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [displayData, setDisplayData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);

  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
  ];

  const getNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}${NewsRoutes.getNews}`
      );
      setDisplayData(response?.data?.data ?? []);
      setLoading(false);
    } catch (error: any) {
      const errMessage = error?.response?.data?.message || "An Error Occured";
      setLoading(false);
      Modal.error({ title: "An Error Occured", content: errMessage });
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div style={{ height: "100%" }}>
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
            <Table dataSource={reviewsData} columns={columns} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
